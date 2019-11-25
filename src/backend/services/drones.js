const validations = require("../utils/validations");

function parseInstructions(instructions) {
    if (!validations.validateInstructions(instructions)) {
        throw new Error("Instructions are in an invalid format!");
    }

    return instructions.split("");
}

function splitInstructions(instructions, dronesCount) {
    const instructionsArr = parseInstructions(instructions);

    return [instructionsArr];
}

module.exports = {
    parseInstructions,
    splitInstructions
}