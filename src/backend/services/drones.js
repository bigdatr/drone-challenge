const validations = require("../utils/validations");

function parseInstructions(instructions) {
    if (!validations.validateInstructions(instructions)) {
        throw new Error("Instructions are in an invalid format!");
    }

    return instructions.split("");
}

module.exports = {
    parseInstructions
}