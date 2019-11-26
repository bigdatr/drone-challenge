
const DroneLauncher = require('./DroneLauncher');

describe('Drone Launcher Model', () => {
    it('should launch with 1 drone', () => {
        const instructions = 'x^xv';
        
        const launcher = new DroneLauncher(instructions);

        launcher.launch(1);

        const { drones } = launcher;
        
        expect(drones.length).toEqual(1);
        expect(drones[0].hasLaunched).toEqual(true);
        expect(launcher.totalSnapshots).toEqual(2);
    });

    it('should launch with 2 drones', () => {
        const instructions = 'x^^x>>xvvx<<x';
        
        const launcher = new DroneLauncher(instructions);

        launcher.launch(2);

        const { drones } = launcher;
        
        expect(drones.length).toEqual(2);
        expect(drones[0].hasLaunched).toEqual(true);
        expect(drones[1].hasLaunched).toEqual(true);

        // should take photos of 4 unique billboards
        expect(launcher.uniqueSnapshots).toEqual(4);

        // both drones end up at starting position
        expect(drones[0].atStartPos()).toEqual(true);
        expect(drones[1].atStartPos()).toEqual(true);
    });
})