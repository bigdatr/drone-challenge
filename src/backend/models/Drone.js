const { UP, DOWN, LEFT, RIGHT, SNAPSHOT } = require('./DroneActions');

class Drone {
    constructor(instructions, xPosStart = 0, yPosStart = 0) {
        this.instructionArr = instructions;

        this.xPosStart = xPosStart;
        this.yPosStart = yPosStart;

        this.hasLaunched = false;

        this.xPos = xPosStart;
        this.yPos = yPosStart;
        this.billboards = {};
    }

    atStartPos() {
        return this.xPos === this.xPosStart && this.yPos === this.yPosStart;
    }

    currentPos() {
        return [this.xPos, this.yPos];
    }

    buildKey(xPos, yPos) {
        return `${this.xPos},${this.yPos}`;
    }

    snapshot() {
        const key = this.buildKey(this.xPos, this.yPos);
        this.billboards[key] ? this.billboards[key]++ : this.billboards[key] = 1;
    }

    getUniqueSnapshots() {
        return Object.keys(this.billboards).length;
    }

    getTotalSnapshots() {
        return Object.values(this.billboards).reduce((count, billboardCount) => count + billboardCount, 0);
    }

    getSnapshotCount(xPos, yPos) {
        const count = this.billboards[this.buildKey(xPos, yPos)];
        return count ? count : 0;
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
                console.error(`Invalid instruction '${instruction}'...`);
        }
    }

    launch() {
        for (let i = 0; i < this.instructionArr.length; i++) {
            this.action(this.instructionArr[i]);
        }

        this.hasLaunched = true;
    }
}

module.exports = Drone;