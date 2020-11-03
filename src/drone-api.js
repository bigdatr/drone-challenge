import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import validatePath from './validate_path.js';
import singleDronePhotos from './single_drone_photos.js';
import twoDronePhotos from './two_drone_photos.js';
import countUniquePhotos from './count_unique_photos.js';

const app = express();
const httpStatus = {
	badRequest: 400
};

app.use(cors());
app.use(bodyParser.json());

/**
 * It is a bit hard to say if this should be a GET or POST request in a RESTful API
 * Strictly speaking this is getting information from the server which would be more appropriate in a GET request
 * however limits on the payload for get data may make it unreasonable. An alternative solution may be to pair a put reqest
 * to save the data and a get request to fetch the results.
 * However, if this request is pretending to send the data to a drone then a POST request is quite reasonble.
 **/
app.post('/', (req, res) => {
	const {path, drones = 1} = req.body;

	if(!validatePath(path)) {
		return res
			.status(httpStatus.badRequest)
			.json({error: 'Invalid path syntax'});
	}

	let photos = null;
	let unique = 0;

	if(drones === 1) {
		// We wrap the single photos in an array to match the two drone format
		photos = [singleDronePhotos(path)];
		unique = countUniquePhotos(photos[0]);
	} else if(drones === 2) {
		photos = twoDronePhotos(path);
		// Combine photos into a single array to count unique photos from both drones
		unique = countUniquePhotos([...photos[0], ...photos[1]]);
	} else {
		return res
			.status(httpStatus.badRequest)
			.json({error: `Invalid number of drones: ${drones}`});
	}

	const numPhotos = photos.flat().length;

	return res.json({
		drones,
		path,
		photos,
		numPhotos,
		unique
	});
});

export default app;
