import express from 'express';
import cors from 'cors';
import path from 'path';
import validatePath from './validate_path.js';
import singleDronePhotos from './single_drone_photos.js';

const app = express();
const httpStatus = {
	badRequest: 400
};

app.use(cors());

app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.get('/drone/single', (req, res) => {
	const {path} = req.query;
	if(!validatePath(path)) {
		return res
			.status(httpStatus.badRequest)
			.json({error: 'Invalid path syntax'});
	}

	const photos = singleDronePhotos(path);

	return res.json({
		path,
		photos
	});
});

app.get('*', (req, res) => {
	res.status(404).json({error: 'Path not found'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

