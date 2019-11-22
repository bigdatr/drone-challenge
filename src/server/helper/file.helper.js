const multer = require('multer');
const fs = require('fs');

class FileHelper {

    getSingleFileHandler(name) {
        return this.getUploader().single(name);
    }

    getMultiFilesHandler(name) {
        return this.getUploader().array(name);
    }

    getUploader() {
        return multer({
            storage: multer.memoryStorage(),
            fileFilter: (req, file, cb) => {
                if (file.mimetype !== 'text/plain') {
                    return cb(new Error('Incorrect File'), false)
                }
                return cb(null, true);
            },
        });
    }

    /**
     * Read command file
     * @param file
     * @returns {Promise}
     */
    readFile(file) {
        return new Promise((resolve, reject) => {
            if (file) {
                fs.readFile(file, 'utf8', function (err, data) {
                    if (err) {
                        reject(new Error('Unable to read file'))
                    }
                    const rules = /^[x<^>v]*$/;
                    if (rules.test(data)) {
                        resolve(data);
                    } else {
                        reject(new Error('Invalid command'));
                    }

                })
            } else {
                reject(new Error('No file found'));
            }
        })

    }
}


module.exports = new FileHelper();
