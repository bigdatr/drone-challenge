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

        expect(drone.snapshotCount()).toEqual(2);
    });

    it('should launch and take 4 snapshots', () => {
        const instructions = 'x^^x>>xvvx<<x';

        const drone = new Drone(instructions);

        drone.launch();

        expect(drone.snapshotCount()).toEqual(4);
    });
})