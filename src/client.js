import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { InstructionBox } from './components/InstructionBox'


class App extends React.Component {
    constructor() {
        super()
    
        this.state = {
          locationDroneOneX: 0,
          locationDroneOneY: 0,
          locationDroneTwoX: 0,
          locationDroneTwoY: 0,
          photosDroneOne: [],
          photosDroneTwo: []
        }
    }


    handleChange = (e) => {
        var self = this;

        let droneOne = {}
        let droneTwo = {}

        let instructions = e.target.value.split('')
        let droneOneInstruction = instructions.filter((v,i)=>i%2==0)
        let droneTwoInstruction = instructions.filter((v,i)=>i%2==1)

        if (droneOneInstruction.length > 0) {
            axios.get(`http://localhost:4001/${droneOneInstruction}`)
                .then(function (response) {
                    droneOne = response.data
                    self.setState({
                        locationDroneOneX: droneOne.locationX,
                        locationDroneOneY: droneOne.locationY,
                        photosDroneOne: droneOne.photos
                    })
                })
        } else {
            self.setState({
                locationDroneOneX: 0,
                locationDroneOneY: 0,
                photosDroneOne: []
            })
        }
        if (droneTwoInstruction.length > 0) {
            axios.get(`http://localhost:4001/${droneTwoInstruction}`)
                .then(function (response) {
                    droneTwo = response.data
                    self.setState({
                        locationDroneTwoX: droneTwo.locationX,
                        locationDroneTwoY: droneTwo.locationY,
                        photosDroneTwo: droneTwo.photos
                    })
                })
        } else {
            self.setState({
                locationDroneTwoX: 0,
                locationDroneTwoY: 0,
                photosDroneTwo: []
            })
        }
    }

    render() {
        const data = this.state
    
        return (
          <div className="App">
            <h1> Drone Challenge </h1>
            <InstructionBox 
              placeholder="Instructions"
              handleChange={this.handleChange}
            />
            <p>locationDroneOneX:{data.locationDroneOneX}</p>
            <p>locationDroneOneY:{data.locationDroneOneY}</p>
            <p>photosDroneOne:{data.photosDroneOne}</p>
            <br/>
            <p>locationDroneTwoX:{data.locationDroneTwoX}</p>
            <p>locationDroneTwoY:{data.locationDroneTwoY}</p>
            <p>photosDroneTwo:{data.photosDroneTwo}</p>
          </div>
        )
      }
}


ReactDOM.render(<App />, document.getElementById('app'));
