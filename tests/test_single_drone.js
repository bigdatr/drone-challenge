/* eslint no-magic-numbers: 0 */
/* globals it describe */

import chai from 'chai';
import singleDronePhotos from '../src/single_drone_photos.js'

const {expect} = chai;

describe('Test single drone photos', () => {
	it('Takes correct number of photos', () => {
		const firstPhotos = singleDronePhotos('x^xv');
		expect(firstPhotos.length).to.equal(2);

		const secondPhotos = singleDronePhotos('x^^x>>xvvx<<x');
		expect(secondPhotos.length).to.equal(5);
	});
	it('has correct photo locations', () => {
		const firstPhotos = singleDronePhotos('x^xv');
		expect(firstPhotos).to.have.deep.members([[0,0], [0,1]]);

		const secondPhotos = singleDronePhotos('x^^x>>xvvx<<x');
		expect(secondPhotos).to.have.deep.members([[0,0], [0,2], [2,2], [2,0], [0,0]]);
	});
});
