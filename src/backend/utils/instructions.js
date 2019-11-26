const ValidationError = require('../errors/ValidationError');

function validateInstructions(instructions) {
    // ensure instruction set only contains valid action characters
    const validRegex = /^[\^v<>x]+$/;
    const regex = new RegExp(validRegex);
    return regex.test(instructions);
}

function parseInstructions(instructions) {
    if (!validateInstructions(instructions)) {
        throw new ValidationError("Instructions are in an invalid format!");
    }

    return instructions.split("");
}

function splitInstructions(instructions, dronesCount) {
    const instructionsArr = parseInstructions(instructions);

    if (instructionsArr.length < dronesCount) {
        throw new ValidationError(`There is not enough instructions available for ${dronesCount} to launch!`);
    }

    // don't need to perform any grouping, just return array with one instruction group
    if (dronesCount === 1) return [instructionsArr];
    
    // split instructions into nth drone groups (n = dronesCount)
    if (dronesCount > 1) {
        const instructionGroups = [];
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            
            const droneGroupIdx = (i % dronesCount);
            
            if (instructionGroups[droneGroupIdx]) {
                // add instruction to existing drone group
                instructionGroups[droneGroupIdx].push(instruction)
            } else {
                // create new drone group with the first instruction
                instructionGroups[droneGroupIdx] = [instruction]
            }
        }

        return instructionGroups;
    }

    return [];
}

module.exports = {
    parseInstructions,
    splitInstructions,
    validateInstructions
}