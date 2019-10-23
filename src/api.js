const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json())

app.post('/', (req, res) => {
    let instructions = req.body.instructions;
    let uniqueBillboards = 0;
    let x_axis_Drone1 = 0;
    let y_axis_Drone1 = 0;
    let x_axis_Drone2 = 0;
    let y_axis_Drone2 = 0;
    let coordsOfDrone1 = new Map();
    let coordsOfDrone2 = new Map();

    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        let coords = {};

        if (i % 2 === 0)
            coords = JSON.stringify({x: x_axis_Drone1, y: y_axis_Drone1});
        else
            coords = JSON.stringify({x: x_axis_Drone2, y: y_axis_Drone2});

        if (!coordsOfDrone1.get(coords))
            coordsOfDrone1.set(coords, 0);

        if (!coordsOfDrone2.get(coords))
            coordsOfDrone2.set(coords, 0);

        if (instruction === 'x' && coordsOfDrone1.get(coords) + coordsOfDrone2.get(coords) < 1) {
            uniqueBillboards++;
            if (i % 2 === 0)
                coordsOfDrone1.set(coords, coordsOfDrone1.get(coords) + 1);
            else
                coordsOfDrone2.set(coords, coordsOfDrone2.get(coords) + 1);
            continue;
        }

        if (i % 2 === 0) {
            switch (instruction) {
                case '<':
                    x_axis_Drone1 -= 1;
                    break;
                case '>':
                    x_axis_Drone1 += 1;
                    break;
                case '^':
                    y_axis_Drone1 += 1;
                    break;
                case 'v':
                    y_axis_Drone1 -= 1;
                    break;
            }
        }
        else {
            switch (instruction) {
                case '<':
                    x_axis_Drone2 -= 1;
                    break;
                case '>':
                    x_axis_Drone2 += 1;
                    break;
                case '^':
                    y_axis_Drone2 += 1;
                    break;
                case 'v':
                    y_axis_Drone2 -= 1;
                    break;
            }
        }
    }

    res.send(instructions + ` takes photos of ${uniqueBillboards} billboards` +
        ((x_axis_Drone1 === 0 && y_axis_Drone1 === 0) ? " and drone 1 ends up back at the starting location" : "") +
        ((x_axis_Drone2 === 0 && y_axis_Drone2 === 0) ? " and drone 2 ends up back at the starting location" : ""));
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

