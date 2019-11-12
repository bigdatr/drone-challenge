const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const _ = require('lodash');

const Drone = require('./models/Drone');
const Billboard = require('./models/Billboard');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

//starting now. 
app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

//process drone instruction requests
app.post('/drone', function(req, res) {
    console.log(req.body);
    var count = req.body.droneCount;
    var instructions = req.body.droneInstructions;
    drones = [];
    billboards = [];
    for (let i = 0; i < count; i++) {
        drones.push(new Drone(instructions.match(new RegExp('.{1,'+count+'}','g')).map(x=>x[i]).filter(x=>x!=null)));
    }
    drones.forEach(drone=>{
        billboards.push(...drone.getBillboards());
    });
    console.log(billboards);
    res.json({no_of_billboards: _.uniqWith(billboards,_.isEqual).length});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

