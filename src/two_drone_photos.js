/**
 * Get an array of the photo locations taken by two drones
 * @param {string} instructions The instruction string for the drones to follow
 * @return {number[][][]} two arrays of coordinates where photos are taken
 **/
function getTwoDronePhotos(instructions) {
	// Coordinate for both drones
	const coords = [
		{
			x: 0,
			y: 0
		},
		{
			x: 0,
			y: 0
		}
	];
	// Photos for both drones
	const photos = [[], []];
	[...instructions].forEach((instruction, index) => {
		const drone = index % 2;
		switch(instruction) {
			case '^':
				coords[drone].y++;
				break;
			case 'v':
				coords[drone].y--;
				break;
			case '>':
				coords[drone].x++;
				break;
			case '<':
				coords[drone].x--;
				break;
			case 'x':
				photos[drone].push([
					coords[drone].x,
					coords[drone].y
				]);
				break;
			default:
				console.error(`Unknown instruction ${instruction}`);
		}
	});
	return photos;
}

export default getTwoDronePhotos;
