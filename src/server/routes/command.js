const express = require('express');
const bodyParser = require('body-parser');
const fileHelper = require('../helper/file.helper');
const commandHelper = require('../helper/command.helper');
const responseHelper = require('../helper/response.helper');
const router = express.Router();


router.post('/string', bodyParser.json(), (req, res) => {
    try {
        const {quantity, command} = req.body;
        const droneStatus = commandHelper.getBillboardPhotos(Number(quantity), command);
        responseHelper.success(res, commandHelper.getBillboardsStats(droneStatus))
    } catch (e) {
        responseHelper.failed(res, responseHelper.CODE_SYSTEM_ERROR, null, e.toString());
    }


});

router.post('/file',  (req, res) => {
    fileHelper.getSingleFileHandler('file')(req,  res, function (err) {
        if (err) {
            responseHelper.failed(res, responseHelper.CODE_SYSTEM_ERROR, null, err.message);
        } else {
            try {
                const {quantity} = req.body;
                const {file} = req;
                 fileHelper.readFile(file.originalname).then((command) => {
                     const droneStatus = commandHelper.getBillboardPhotos(Number(quantity), command);
                     responseHelper.success(res, commandHelper.getBillboardsStats(droneStatus));
                 }).catch(err => {
                     responseHelper.failed(res, responseHelper.CODE_SYSTEM_ERROR, null, err.message);
                 });
            } catch (e) {
                responseHelper.failed(res, responseHelper.CODE_SYSTEM_ERROR, null, e.message);
            }
        }
    })
});


module.exports = router;
