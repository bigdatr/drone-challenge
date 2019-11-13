let express = require('express');
let router = express.Router();

let Drone = require('../models/Drone');


router.get('/journey', (req, res) => {
    // instructions exist
    const instructions = req.body.instructions;
    const numDrones = req.body.numDrones;
    if(!instructions)
       return res.status(400).send("No instructions to read.");

    // instructions are valid
    if(!validateInstructions(instructions))
        return res.status(400).send("Instructions not formatted correctly.");

    if(!numDrones || isNaN(numDrones))
        return res.status(400).send("Number of drones not specified or incorrect.");


    // split instructions and complete 
    const droneInstructions = splitInstructions(instructions, numDrones);
    let drones = []
    for(let i = 0; i < droneInstructions.length; i++){
        const drone = new Drone(droneInstructions[i], i + 1);
        drone.completeJourney();
        drones.push(drone.getJourney());
    }
    
    
    // response
    const response = {drones: drones}
    res.send(response);
})

// Check if instruction is in valid format
function validateInstructions(instructions){
    const validInstructionRegex = /^[\^v<>x]+$/;
    return instructions.match(validInstructionRegex)
}

// Split instructions depending on number of drones
function splitInstructions(instructions, numSets){
    instructionSet = new Array(numSets).fill(""); // array of independent instructions
    let setNum = 0;
    for(let i = 0; i < instructions.length; i++){
        instructionSet[setNum] += instructions.charAt(i);
        if(++setNum === numSets)
            setNum = 0;
    }
    return instructionSet;
}

module.exports = router;