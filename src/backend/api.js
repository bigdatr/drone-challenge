const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const drones = require('./routes/drones');


app.use(cors());

app.route('/drones', drones);

// Root endpoint
app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

