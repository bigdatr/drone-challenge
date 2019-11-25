const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone');

const DroneService = require('../services/drones');

router.post('/launch', async (req, res) => {
    // validate instructions
    const { instructions, drones = 1 } = req.body;

    const drone = new Drone(instructions);

    drone.launch();

    res.send({
        instructions,
        billboardsData: drone.billboards,
        billboardsCount: drone.snapshotCount()
    });
});

module.exports = router;