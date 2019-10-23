import React from 'react';
import ReactDOM from 'react-dom';

class DroneForm extends React.Component {
    constructor() {
        super();
        this.state = {
            instructions: '',
            disableExecution: false,
            message: ""
        };
    }

    handleChange = (e) => {
        this.setState({ instructions: e.target.value });

        let regex = /^[<>v\^x]*$/;
        if (e.target.value.match(regex)){
            this.setState({ disableExecution: false });
            this.setState({ message: "" });
        }
        else {
            this.setState({ disableExecution: true });
            this.setState({ message: "Invalid Input. Must be: <, >, ^, v, x" });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4001/', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({instructions: this.state.instructions})
        }).then((result) => {
            return result.text();
        }).then((data) => {
            this.setState({ message: data });
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        return(
            <React.Fragment>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Enter Instructions: </label>
                        <input style={{width:'40%'}} type="text" className="form-control" id="instructions"
                               placeholder="Enter Instructions" name="instructions" onChange={this.handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary"
                            disabled={this.state.disableExecution}>Execute</button>
                </form>
                <p>{this.state.message}</p>
            </React.Fragment>)
    }
}

ReactDOM.render(<DroneForm />, document.getElementById('app'));
