class ResponseHelper {
    constructor() {
        this.STATUS_SUCCESS = true;
        this.STATUS_FAILURE = false;
        this.CODE_REQUEST_SUCCESS = 2000;
        this.CODE_SYSTEM_ERROR = 5000;
    }

    success(res, data = null, message = 'success') {
        return res.status(200).json({
            status: this.STATUS_SUCCESS,
            code: this.CODE_REQUEST_SUCCESS,
            data: data,
            message: message
        })
    }

    failed(res, code, data = null, message = 'failed') {
        return res.status(200).json({
            status: this.STATUS_FAILURE,
            code: code,
            data: data,
            message: message
        })
    }
}

module.exports = new ResponseHelper();
