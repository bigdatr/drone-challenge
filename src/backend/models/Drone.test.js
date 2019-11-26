const Drone = require('./Drone');

describe('Drone Model', () => {
    it('should create', () => {
        const instructions = 'x^^x>><v';

        const drone = new Drone(instructions);

        expect(drone.hasLaunched).toEqual(false);
    });

    it('should launch and take 2 snapshots', () => {
        const instructions = 'x^xv';

        const drone = new Drone(instructions);

        drone.launch();

        // should take photos of 2 billboards
        expect(drone.getUniqueSnapshots()).toEqual(2);

        // should end up at starting location
        expect(drone.atStartPos()).toEqual(true);

        expect(drone.hasLaunched).toEqual(true);
    });

    it('should launch and take 4 snapshots', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const drone = new Drone(instructions);

        drone.launch();

        // should take photos of 4 unique billboards
        expect(drone.getUniqueSnapshots()).toEqual(4);

        // should include 2 photos of the same billboard at the starting location
        expect(drone.getSnapshotCount(drone.xPosStart, drone.yPosStart)).toEqual(2);

        expect(drone.hasLaunched).toEqual(true); 
    });
})