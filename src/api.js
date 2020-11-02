import express from 'express';
import cors from 'cors';
import path from 'path';
import validatePath from './validate_path.js';
import singleDronePhotos from './single_drone_photos.js';
import twoDronePhotos from './two_drone_photos.js';
import countUniquePhotos from './count_unique_photos.js';

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
	const unique = countUniquePhotos(photos);

	return res.json({
		path,
		photos,
		unique,
		drones: 1
	});
});

// The number of drones could very well be passed as a parameter
// This would be preferable if there are plans to add more
// Currently as there are so few drones it would likely make the API more confusing
app.get('/drone/double', (req, res) => {
	const {path} = req.query;
	if(!validatePath(path)) {
		return res
			.status(httpStatus.badRequest)
			.json({error: 'Invalid path syntax'});
	}

	const photos = twoDronePhotos(path);
	const unique = countUniquePhotos([...photos[0], ...photos[1]]);

	return res.json({
		path,
		photos,
		unique,
		drones: 2
	});
});

// Expose static files
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
	res.status(404).json({error: 'Path not found'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

