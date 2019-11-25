const DronesService = require("./drones");
const DroneActions = require("../models/DroneActions");

const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = DroneActions;

describe('Drones Service', () => {
    it('should parse instructions successfully', () => {
        const instructions = 'x^^x>><v';

        const instructionsArr = DronesService.parseInstructions(instructions);

        expect(instructionsArr).toEqual([SNAPSHOT, UP, UP, SNAPSHOT, RIGHT, RIGHT, LEFT, DOWN]);
    });

    it('should parse instructions with error', () => {
        const invalidInstructions = 'x^^xVXTCf>>';

        expect(() => DronesService.parseInstructions(invalidInstructions)).toThrow(Error);
    });

    it('should split instructions with 1 drone', () => {
        const instructions = 'x^xv';

        const result = DronesService.splitInstructions(instructions, 1);

        expect(result).toEqual([[SNAPSHOT, UP, SNAPSHOT, DOWN]]);
    });
    
    it('should split instructions with 2 drones', () => {
        const instructions = 'x^xv';

        const result = DronesService.splitInstructions(instructions, 2);

        expect(result).toEqual([[SNAPSHOT, SNAPSHOT], [UP, DOWN]]);
    });

    it('should split instructions with 2 drones', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const result = DronesService.splitInstructions(instructions, 2);

        expect(result).toEqual([[SNAPSHOT, UP, RIGHT, SNAPSHOT, DOWN, LEFT, SNAPSHOT], [UP, SNAPSHOT, RIGHT, DOWN, SNAPSHOT, LEFT]]);
    });
})