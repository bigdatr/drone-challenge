const Drone = require('./Drone');

describe('Drone Model', () => {
    it('should create', () => {
        const instructions = 'x^^x>><v';

        const drone = new Drone(instructions);
    });

    it('should launch and take 2 snapshots', () => {
        const instructions = 'x^xv';

        const drone = new Drone(instructions);

        drone.launch();

        // should take photos of 2 billboards
        expect(drone.snapshotCount()).toEqual(2);

        // should end up at starting location
        expect(drone.atStartPos()).toEqual(true);
    });

    it('should launch and take 4 snapshots', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const drone = new Drone(instructions);

        drone.launch();

        // should take photos of 2 billboards
        expect(drone.snapshotCount()).toEqual(4);

        // should include 2 photos of the same billboard at the starting location
        expect(drone.billboards['0-0']).toEqual(2);
    });
})