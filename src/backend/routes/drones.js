const express = require('express');
const router = express.Router();
const DroneLauncher = require('../models/DroneLauncher');

function wrapAsync(fn) {
    // wraps async/await functions, catches any errors 
    // inside the promise and passes to express next function to handle error.
    return function(req, res, next) {
      fn(req, res, next).catch(next);
    };
}

router.post('/launch', wrapAsync(async (req, res) => {
    // validate instructions
    const { instructions, count = 1 } = req.body;

    const launcher = new DroneLauncher(instructions);

    const drones = launcher.launch(count);

    res.send({
        ...launcher
    });
}));

module.exports = router;