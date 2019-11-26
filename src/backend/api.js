const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const drones = require('./routes/drones');

const ValidationError = require('./errors/ValidationError');

app.use(cors());
app.use(express.json());

app.use('/drones', drones);

app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Something very bad happened :-(" })
    }
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

