const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = require('./DroneActions');

class Drone {
    constructor(instructions) {
        this.instructionArr = instructions;

        this.xPos = 0;
        this.yPos = 0;
        this.billboards = {};
    }

    snapshot = () => {
        const key = `${this.xPos}-${this.yPos}`;
        if (this.billboards[key]) {
            this.billboards[key]++;
        } else {
            this.billboards[key] = 1;
        }
    }

    launch = () => {
        this.instructionArr.forEach(instruction => {
            switch (instruction) {
                case UP:
                    this.yPos++;
                    break;
                case DOWN:
                    this.yPos--;
                    break;
                case LEFT:
                    this.xPos--;
                    break;
                case RIGHT:
                    this.xPos++;
                    break;
                case SNAPSHOT:
                    this.snapshot();
                    break;
            }
        });
    }
}

module.exports = Drone;