const Drone = require('./Drone');
const DroneService = require('../utils/instructions');

class DroneLauncher {
    constructor(instructions) {
        this.instructions = instructions;
        this.drones = [];
        this.totalSnapshots = 0;
        this.uniqueSnapshots = 0;
    }

    launch(count) {
        // parse/split instructions
        const splitInstructions = DroneService.splitInstructions(this.instructions, count);
        
        this.drones = Array(count).fill().map((_, i) => {
            const droneInstructions = splitInstructions[i];

            const drone = new Drone(droneInstructions, 0, 0);

            drone.launch();

            return drone;
        });
        
        this.totalSnapshots = this.drones.reduce((count, drone) => count + drone.getTotalSnapshots(), 0);

        // calculate unique snapshots from all drones together
        this.uniqueSnapshots = this.drones.reduce((snapshotCords, drone) => new Set([...snapshotCords, ...Object.keys(drone.billboards)]), []).size;
    }
}

module.exports = DroneLauncher;