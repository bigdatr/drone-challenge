const express = require('express');
const router = express.Router();

const DroneService = require('../services/drones');

router.post('/drones', async (req, res) => {
    // validate instructions

    const { instructions } = req.body;

    console.log(instructions);
});

module.exports = router;