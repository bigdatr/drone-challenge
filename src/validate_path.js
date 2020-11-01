
/**
 * Validate a drone path.
 * Ensures that the path is comprised only of x, ^, <, > and v characters.
 * @param {string} path The drone path to validate
 * @return {boolean} Returns true if the path is valid, otherwise returns false
 **/
function validatePath(path) {
	const valid = /^[x^<>v]*$/;
	return valid.test(path);
}

export default validatePath;
