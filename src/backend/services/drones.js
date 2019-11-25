const validations = require("../utils/validations");

function parseInstructions(instructions) {
    if (!validations.validateInstructions(instructions)) {
        throw new Error("Instructions are in an invalid format!");
    }

    return instructions.split("");
}

function splitInstructions(instructions, dronesCount) {
    if (dronesCount > 2) {
        throw new Error("Can only split instructions for up to 2 drones!");
    }
    
    const instructionsArr = parseInstructions(instructions);

    if (dronesCount === 1) return [instructionsArr];
    if (dronesCount === 2) {
        const multiInstructions = [[], []];
        const [droneOne, droneTwo] = multiInstructions;
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            const targetDrone = (i % 2 === 0) ? droneOne : droneTwo;
            targetDrone.push(instruction);
        }

        return multiInstructions;
    }

    return [];
}

module.exports = {
    parseInstructions,
    splitInstructions
}