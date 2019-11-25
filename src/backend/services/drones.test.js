const DronesService = require("./drones");
const DroneActions = require("../models/DroneActions");

describe('Drones Service', () => {
    it('should parse instructions successfully', () => {
        const instructions = 'x^^x>><v';

        const instructionsArr = DronesService.parseInstructions(instructions);

        const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = DroneActions;
        
        expect(instructionsArr).toEqual([SNAPSHOT, UP, UP, SNAPSHOT, RIGHT, RIGHT, LEFT, DOWN]);
    });

    it('should parse instructions with error', () => {
        const invalidInstructions = 'x^^xVXTCf>>';

        expect(() => DronesService.parseInstructions(invalidInstructions)).toThrow(Error);
    });
})