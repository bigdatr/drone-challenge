/**
 * Get an array of the photo locations taken by a single drone
 * @param {string} instructions The instruction string for the drone to follow
 * @return {number[][]} An array of coordinates where photos are taken
 **/
function getSingleDronePhotos(instructions) {
	let x = 0;
	let y = 0;
	const photos = [];
	[...instructions].forEach((instruction) => {
		switch(instruction) {
			case '^':
				y++;
				break;
			case 'v':
				y--;
				break;
			case '>':
				x++;
				break;
			case '<':
				x--;
				break;
			case 'x':
				photos.push([x, y]);
				break;
			default:
				console.error(`Unknown instruction ${instruction}`);
		}
	});
	return photos;
}

export default getSingleDronePhotos;
