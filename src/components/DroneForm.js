import React from 'react';
import ReactDOM from 'react-dom';
import './DroneForm.css';

class DroneForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            instructions: "",
            droneCount: 1
        }
    }

    handleInstructionChange = (e) => {
        e.preventDefault();
        this.setState({instructions: e.target.value})
    }

    handleDroneCountChange = (e) => {
        e.preventDefault();
        this.setState({droneCount: e.target.value})
    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        console.log(e.target)
    }

    render(){
        const {instructions, droneCount} = this.state;

        return (
            <div id="drone-form-wrapper">
                <h1>Calculate Drones</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="row">
                        <label>Instructions:</label>
                        <textarea rows="5" value={instructions} type="text" name="instructions" onChange={this.handleInstructionChange} />
                    </div>
                    <div className="row">
                        <label>Drone count: </label>
                        <input type="text" value={droneCount} name="droneCount" onChange={this.handleDroneCountChange}/>
                    </div>
                    <div className="row">
                        <button type="submit">Calculate</button>
                    </div>
                </form>
            </div>
        )}
}

export default DroneForm;