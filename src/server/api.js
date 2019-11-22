const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const command = require('./routes/command');


app.use(cors());

app.use('/api/v1/command', command);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});


app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

