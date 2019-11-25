const validations = require("./validations");

describe('Validations', () => {
    it('should validate instructions with good input', () => {
      const validInstructions = "x^^x>>xvvx<<x";

      const result = validations.validateInstructions(validInstructions);
      expect(result).toEqual(true);
    });

    it('should validate instructions with bad input', () => {
        const invalidInstructions = "x^^3,>xVvx<<x";
  
        const result = validations.validateInstructions(invalidInstructions);
        expect(result).toEqual(false);
    });
})