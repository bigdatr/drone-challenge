import isEqual from 'lodash.isequal';

/**
 * Count the number of unique photo coordinates from the coordinate list
 * @param {number[][]} An array of coordinate pairs in the format [[x, y]]
 * @return {number} The number of unique coordinates
 **/
function countUniquePhotos(photos) {
	// Validate the array - this is potentially costly but is required to pass the "invalid" unit tests
	if(!Array.isArray(photos)) {
		return -1;
	}
	for(const coord of photos) {
		// Only arrays are valid
		if(!Array.isArray(coord)) {
			return -1;
		}
		// Only two numbers are valid in a coordinate
		if(!coord.length === 2) {
			return -1;
		}
		// Only numbers are valid in a coordinate
		if(typeof coord[0] !== 'number' || typeof coord[1] !== 'number') {
			return -1;
		}
	}

	// Arrays are compared by reference so the set shortcut won't work here
	return photos
		.filter((coord, pos, arr) => arr.findIndex((matchCoord) => isEqual(matchCoord, coord)) === pos)
		.length;
}

export default countUniquePhotos;
