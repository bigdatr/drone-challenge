const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

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
    var instructions = req.body.droneinstructions;
    res.json({no_of_billboards: 3});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

