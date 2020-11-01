/* eslint no-magic-numbers: 0 */
/* globals it describe */

import chai from 'chai';
import validatePath from '../src/validate_path.js';

const {expect} = chai;

describe('Validate drone path', () => {
	it('Accepts valid path', () => {
		expect(validatePath('x^xv')).to.equal(true);

		expect(validatePath('x^^x>>xvvx<<x')).to.equal(true);
	});
	it('Rejects path with invalid characters', () => {
		expect(validatePath('test')).to.equal(false);

		// We will assume whitespace is invalid at this point
		expect(validatePath(' x^xv')).to.equal(false);

		// The specification indicates that only lower case characters are accepted
		expect(validatePath('x^Xv')).to.equal(false);
	});
	it('Rejects a non-string value', () => {
		expect(validatePath(undefined)).to.equal(false);
		expect(validatePath(null)).to.equal(false);
		// These last two are probably not much concern
		expect(validatePath(10)).to.equal(false);
		expect(validatePath({path: 'x^xv'})).to.equal(false);
	});
	it('Accepts an empty string', () => {
		// I expect an empty string is just telling the drone to do nothing and so is valid
		expect(validatePath('')).to.equal(true);
	});
});
