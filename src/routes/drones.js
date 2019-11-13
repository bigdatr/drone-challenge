let express = require('express');
let router = express.Router();

let Drone = require('../models/Drone');


router.get('/journey', (req, res) => {
    // instructions exist
    const instructions = req.body.instructions;
    if(!instructions)
       return res.status(400).send("No instructions to read.");

    // instructions are valid
    if(!validateInstructions(instructions))
        return res.status(400).send("Instructions not formatted correctly.");

    const drone = new Drone(instructions, 1)
    drone.completeJourney()
    
    res.send("works")
})

// Check if instruction is in valid format
function validateInstructions(instructions){
    const validInstructionRegex = /^[\^v<>x]+$/;
    return instructions.match(validInstructionRegex)
}


module.exports = router;