import React from 'react';
import ReactDOM from 'react-dom';
import './DroneForm.css';
import axios from 'axios';

class DroneForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            instructions: "",
            droneCount: 1,
            instructionsValid: true,
            droneCountValid: true,
            response: {},
            error: undefined
        }
    }

    areInstructionsValid = (instructions) => {
        return instructions.match(/^[\^v<>x]+$/)
    }

    isDroneCountValid = (droneCount) => {
        return !isNaN(droneCount)
    }

    handleInstructionChange = (e) => {
        e.preventDefault();
        const instructions = e.target.value;
        const isValid = this.areInstructionsValid(instructions)
        this.setState({
            instructions: instructions,
            instructionsValid: isValid,
            error: isValid ? undefined : "Instruction does not meet allowed characters [v<>^x]"
        })
        
    }

    handleDroneCountChange = (e) => {
        e.preventDefault();
        const droneCount = e.target.value;
        const isValid = this.isDroneCountValid(droneCount)
        this.setState({
            droneCount: droneCount,
            droneCountValid: isValid,
            error: isValid ? undefined : "Count is not a number"
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:4001/api/drones/journey", {
            instructions: this.state.instructions,
            numDrones: this.state.droneCount
        })
        .then(res => {
            this.setState({
                error: undefined,
                response: res.data
            })
        })
        .catch(err => {
            this.setState({
                error: err.response.data,
                response: {}
            })
        })
    }

    render(){
        const {instructions, droneCount, response, error, instructionsValid, droneCountValid} = this.state;
        const {drones, billboardsWithMultiVisits} = response;
        return (
            <React.Fragment>
            <div id="drone-form-wrapper">
                <h1>Calculate Drones</h1>
                <form onSubmit={this.handleOnSubmit}>
                    <div className="row">
                        <label>Instructions:</label>
                        <textarea rows="5" className={!instructionsValid ? "field-error" : ""} value={instructions} type="text" name="instructions" onChange={this.handleInstructionChange} />
                    </div>
                    <div className="row">
                        <label>Drone count: </label>
                        <input type="text" className={!droneCountValid ? "field-error" : ""} value={droneCount} name="droneCount" onChange={this.handleDroneCountChange}/>
                    </div>
                    <div className="row">
                        <button type="submit">Calculate</button>
                    </div>
                </form>
                {error && <div id="drone-error">{error}</div>}
                {drones && 
                    <div id="drone-response">
                        <div className="row">
                            <h5># Multi visited billboards: {billboardsWithMultiVisits}</h5>
                        </div>
                        <div className="row">
                            <table>
                                <tr>
                                    <th>Drone #</th>
                                    <th>Path</th>
                                    <th># Billboards</th>
                                </tr>
                                {drones.map((drone, _) => 
                                    <tr>
                                        <td>{drone.id}</td>
                                        <td>{drone.instructions}</td>
                                        <td>{drone.billboards.length}</td>
                                    </tr>
                                )}
                            </table>
                        </div>
                </div>}   
            </div>
        </React.Fragment>
        )}
}

export default DroneForm;