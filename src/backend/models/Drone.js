const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = require('./DroneActions');

class Drone {
    constructor(instructions, xPosStart = 0, yPosStart = 0) {
        this.instructionArr = instructions;

        this.xPosStart = xPosStart;
        this.yPosStart = yPosStart;

        this.xPos = xPosStart;
        this.yPos = yPosStart;
        this.billboards = {};
    }

    atStartPos() {
        return this.xPos === this.xPosStart && this.yPos === this.yPosStart;
    }

    snapshot() {
        const key = `${this.xPos}-${this.yPos}`;
        if (this.billboards[key]) {
            this.billboards[key]++;
        } else {
            this.billboards[key] = 1;
        }
    }

    snapshotCount() {
        return Object.keys(this.billboards).length;
    }

    moveUp() {
        this.yPos++;
    }

    moveDown() {
        this.yPos--;
    }

    moveLeft() {
        this.xPos--;
    }

    moveRight() {
        this.xPos++;
    }

    action(instruction) {
        switch (instruction) {
            case UP:
                this.moveUp();
                break;
            case DOWN:
                this.moveDown();
                break;
            case LEFT:
                this.moveLeft();
                break;
            case RIGHT:
                this.moveRight();
                break;
            case SNAPSHOT:
                this.snapshot();
                break;
            default:
                console.error("Unknown instruction...");
        }
    }

    launch() {
        for (let i = 0; i < this.instructionArr.length; i++) {
            this.action(this.instructionArr[i]);
        }
    }
}

module.exports = Drone;