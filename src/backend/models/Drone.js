const nanoid = require("nanoid");

class Drone {
  constructor(x, y) {
    this.id = nanoid();
    this.x = x;
    this.y = y;
  }

  processCommand(command) {
    if (command === "x") {
      return {
        type: "TAKE_PHOTO",
        coordinates: {
          x: this.x,
          y: this.y
        },
        droneId: this.id
      };
    } else {
      if (command === "^") {
        this.y += 1;
      } else if (command === "v") {
        this.y -= 1;
      } else if (command === "<") {
        this.x -= 1;
      } else if (command === ">") {
        this.x += 1;
      } else {
        return {
          type: "UNKNOWN_COMMAND",
          error: `Ignored received command: "${command}"`
        };
      }
      return {
        type: "MOVE",
        currentPosition: {
          x: this.x,
          y: this.y
        },
        droneId: this.id
      };
    }
  }
}

module.exports = Drone;
