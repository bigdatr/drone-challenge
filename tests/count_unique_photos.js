/* eslint no-magic-numbers: 0 */
/* globals it describe */

import chai from 'chai';
import countUniquePhotos from '../src/count_unique_photos.js';

const {expect} = chai;

describe('Count unique photos', () => {
	it('Count without duplicates', () => {
		expect(countUniquePhotos([[0,0]])).to.equal(1);
		
		expect(countUniquePhotos([[0,0],[0,1],[1,0],[1,1]])).to.equal(4);
	});
	it('Count all duplicates', () => {
		expect(countUniquePhotos([[0,0],[0,0]])).to.equal(1);

		expect(countUniquePhotos(new Array(10).fill([0,0]))).to.equal(1);
		
		expect(countUniquePhotos([[0,0],[1,1],[0,0],[1,1]])).to.equal(2);
	});
	it('Count mixed list', () => {
		expect(countUniquePhotos([[0,0],[0,2],[2,2],[2,0],[0,0]])).to.equal(4);


		expect(countUniquePhotos([[0,0],[0,2],[2,2],[2,0],[0,0],[2,2]])).to.equal(4);
	});
	it('Handle invalid input', () => {
		expect(countUniquePhotos([0,0])).to.equal(-1);

		expect(countUniquePhotos(undefined)).to.equal(-1);
		expect(countUniquePhotos(null)).to.equal(-1);
	});
	it('Accept no photos', () => {
		expect(countUniquePhotos([])).to.equal(0);
	});
});
