/* eslint no-magic-numbers: 0 */
/* globals it describe */

import chai from 'chai';
import twoDronePhotos from '../src/two_drone_photos.js';

const {expect} = chai;

describe('Test two drone photos', () => {
	it('Takes correct number of photos', () => {
		const firstPhotos = twoDronePhotos('x^xv');
		expect(firstPhotos.length).to.equal(2);
		expect(firstPhotos[0].length).to.equal(2);
		expect(firstPhotos[1].length).to.equal(0);

		const secondPhotos = twoDronePhotos('x^^x>>xvvx<<x');
		expect(secondPhotos.length).to.equal(2);
		expect(secondPhotos[0].length).to.equal(3);
		expect(secondPhotos[1].length).to.equal(2);
	});
	it('has correct photo locations', () => {
		const firstPhotos = twoDronePhotos('x^xv');
		expect(firstPhotos).to.have.deep.members([[[0, 0], [0, 0]], []]);

		const secondPhotos = twoDronePhotos('x^^x>>xvvx<<x');
		expect(secondPhotos).to.have.deep.members([
			[[0, 0], [1, 1], [0, 0]],
			[[0, 1], [1, 0]]
		]);
	});
});
