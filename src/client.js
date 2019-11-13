import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './client.css'
import { InstructionBox } from './components/InstructionBox'
import Header from './components/Header'
import Footer from './components/Footer'
import drone from './assets/drone.gif'
import Informations from './components/Informations'

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
            axios.post(`http://localhost:4001/`,{input: droneOneInstruction})
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
            axios.post(`http://localhost:4001/`,{input: droneTwoInstruction})
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
        return (
          <div className="App">
            <Header/>
            <img src={drone} alt="loading..." />
            <InstructionBox 
              placeholder="Instructions"
              handleChange={this.handleChange}
            />
            <Informations data={this.state}/>
            <Footer/>
          </div>
        )
      }
}


ReactDOM.render(<App />, document.getElementById('app'));
