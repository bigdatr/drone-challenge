const BillboardManager = require("./BillboardManager");
const Drone = require("./Drone");

class InstructionManager {
  constructor(commandsString, numberOfDrones) {
    this.billboardManager = new BillboardManager();
    this.drones = [...Array(numberOfDrones)].map(() => new Drone(0, 0));

    this.issueCommandsToDrones(commandsString);
  }

  issueCommandsToDrones(commandsString) {
    let commandsArray = Array.from(commandsString);
    while (commandsArray.length > 0) {
      this.drones.forEach(drone => {
        this.handleDroneResponse(drone.processCommand(commandsArray[0]));
        commandsArray.shift();
      });
    }
  }

  handleDroneResponse(droneResponse) {
    if (droneResponse.type === "TAKE_PHOTO") {
      this.billboardManager.insertBillboard(
        droneResponse.coordinates.x,
        droneResponse.coordinates.y,
        droneResponse.droneId
      );
    }
  }

  report() {
    return this.billboardManager.getCurrentBillboards();
  }
}

module.exports = InstructionManager;
