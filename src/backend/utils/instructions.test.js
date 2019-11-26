const DroneActions = require("../models/DroneActions");

const { parseInstructions, splitInstructions, validateInstructions } = require("./instructions");

const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = DroneActions;

const ValidationError = require('../errors/ValidationError');

describe('Instructions Utils', () => {
    it('should validate instructions with good input', () => {
        const validInstructions = "x^^x>>xvvx<<x";

        const result = validateInstructions(validInstructions);
        expect(result).toEqual(true);
    });

    it('should validate instructions with good input #2', () => {
        const validInstructions = "<><><><><";

        const result = validateInstructions(validInstructions);
        expect(result).toEqual(true);
    });

    it('should validate instructions with bad input', () => {
        const invalidInstructions = "x^^3,>xVvx<<x";

        const result = validateInstructions(invalidInstructions);
        expect(result).toEqual(false);
    });
    
    it('should parse instructions successfully', () => {
        const instructions = 'x^^x>><v';

        const instructionsArr = parseInstructions(instructions);

        expect(instructionsArr).toEqual([SNAPSHOT, UP, UP, SNAPSHOT, RIGHT, RIGHT, LEFT, DOWN]);
    });

    it('should parse instructions with error', () => {
        const invalidInstructions = 'x^^xVXTCf>>';

        expect(() => parseInstructions(invalidInstructions)).toThrow(ValidationError);
    });

    it('should split instructions with 0 drones', () => {
        const instructions = 'x^xv';

        const result = splitInstructions(instructions, 0);

        expect(result).toEqual([]);
    });

    it('should split instructions with 1 drone', () => {
        const instructions = 'x^xv';

        const result = splitInstructions(instructions, 1);

        expect(result).toEqual([[SNAPSHOT, UP, SNAPSHOT, DOWN]]);
    });

    it('should split instructions with 2 drones', () => {
        const instructions = 'x^xv';

        const result = splitInstructions(instructions, 2);

        expect(result).toEqual([[SNAPSHOT, SNAPSHOT], [UP, DOWN]]);
    });

    it('should split instructions with 2 drones', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const result = splitInstructions(instructions, 2);

        expect(result).toEqual([[SNAPSHOT, UP, RIGHT, SNAPSHOT, DOWN, LEFT, SNAPSHOT], [UP, SNAPSHOT, RIGHT, DOWN, SNAPSHOT, LEFT]]);
    });

    it('should split instructions with 9 drones', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const result = splitInstructions(instructions, 9);

        expect(result).toEqual([[SNAPSHOT, SNAPSHOT], [UP, LEFT], [UP, LEFT], [SNAPSHOT, SNAPSHOT], [RIGHT], [RIGHT], [SNAPSHOT], [DOWN], [DOWN]]);
    });
})