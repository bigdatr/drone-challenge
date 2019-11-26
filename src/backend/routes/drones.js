const express = require('express');
const router = express.Router();
const DroneLauncher = require('../models/DroneLauncher');

router.post('/launch', async (req, res) => {
    // validate instructions
    const { instructions, count = 1 } = req.body;

    const launcher = new DroneLauncher(instructions);

    const drones = launcher.launch(count);

    res.send({
        ...launcher
    });
});

module.exports = router;