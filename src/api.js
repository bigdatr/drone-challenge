const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const drones = require('./routes/drones.js')


app.use(cors());
app.use(express.json()); // Allow json request

// drone controller
app.use('/api/drones', drones);

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

