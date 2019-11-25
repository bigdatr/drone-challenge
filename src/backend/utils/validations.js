const validateInstructions = (instructions) => {
    // ensure instruction set only contains valid action characters
    const validRegex = /^[\^v<>x]+$/;
    const regex = new RegExp(validRegex);
    return regex.test(instructions);
}

module.exports = {
    validateInstructions
}