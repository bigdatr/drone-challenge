let expect = require('chai').expect;
const { getDroneRoutes } = require('../../src/api/droneRoute');

describe('First Test', function() {
  it('[1,2,3] should have 3 elements', function() {
    expect([1,2,3]).to.have.lengthOf(3);
  });
});

describe('#getDroneRoutes', function() {
  describe('with instruction x^xv', function() {
    const instructions = 'x^xv';
    context('with one drone to work' , function() {
      const numberOfDrones = 1;
      it('should have 5 routes as expected, 2 photos taken', function() {
        const expectedRoutes = [
          [
            {x: 0, y: 0, p: 0}, {x: 0, y: 0, p: 1}, {x: 0, y: 1, p: 0 }, {x: 0, y: 1, p: 1 }, { x: 0, y: 0, p: 0}
          ]
        ];
        const expectRouteWithPhoto = [ [{x: 0, y: 0, p: 1}, {x: 0, y: 1, p: 1}] ];
        const { droneRoutes, droneStateArrayWithPhoto, totalPhotoTaken } = getDroneRoutes(instructions, numberOfDrones);
        expect(droneRoutes).to.eql(expectedRoutes); // Deep equal
        expect(droneStateArrayWithPhoto).to.eql(expectRouteWithPhoto);
        expect(totalPhotoTaken).to.equal(2); 
      })
    });
  
    context('with two drone to work', function() {
      const numberOfDrones = 2;
      it('should have 6 routes as expected, 2 photos taken', function() {
        const expectedRoutes = [
          [
            {x: 0, y: 0, p: 0}, {x: 0, y: 0, p: 1}, {x: 0, y: 0, p: 1 }
          ], [
            {x: 0, y: 0, p: 0}, {x: 0, y: 1, p: 0}, {x: 0, y: 0, p: 0 }
          ]
  
        ];
        const expectRouteWithPhoto = [ [{x: 0, y: 0, p: 2}], [] ];
        const { droneRoutes, droneStateArrayWithPhoto, totalPhotoTaken } = getDroneRoutes(instructions, numberOfDrones);
        expect(droneRoutes).to.eql(expectedRoutes); 
        expect(droneStateArrayWithPhoto).to.eql(expectRouteWithPhoto);
        expect(totalPhotoTaken).to.equal(2); 
      })
    });    
  });

  describe('with instruction x^^x>>xvvx<<x', function() {
    const instructions = 'x^x^^x>>xvvx<<x';
    context('with one drone to work' , function() {
      const numberOfDrones = 1;
      it('should have 16 routes as expected, 6 photos taken', function() {
        const expectedRoutes = [
          [
            {x: 0, y: 0, p: 0}, {x: 0, y: 0, p: 1}, {x: 0, y: 1, p: 0 }, {x: 0, y: 1, p: 1 }, { x: 0, y: 2, p: 0},
            {x: 0, y: 3, p: 0}, {x: 0, y: 3, p: 1}, {x: 1, y: 3, p: 0 }, {x: 2, y: 3, p: 0 }, { x: 2, y: 3, p: 1},
            {x: 2, y: 2, p: 0}, {x: 2, y: 1, p: 0}, {x: 2, y: 1, p: 1 }, {x: 1, y: 1, p: 0 }, { x: 0, y: 1, p: 0},
            {x: 0, y: 1, p: 1}
          ]
        ];
        const expectRouteWithPhoto = [ 
          [
            {x: 0, y: 0, p: 1}, {x: 0, y: 1, p: 2}, {x: 0, y: 3, p: 1}, {x: 2, y: 3, p: 1}, {x: 2, y: 1, p: 1} 
          ] 
        ];
        const { droneRoutes, droneStateArrayWithPhoto, totalPhotoTaken } = getDroneRoutes(instructions, numberOfDrones);
        expect(droneRoutes).to.eql(expectedRoutes); // Deep equal
        expect(droneStateArrayWithPhoto).to.eql(expectRouteWithPhoto);
        expect(totalPhotoTaken).to.equal(6); 
    
      })
    });
  
    context('with two drone to work', function() {
      const numberOfDrones = 2;
      it('should have 6 routes as expected, 2 photos taken', function() {
        const expectedRoutes = [
          [
            {x: 0, y: 0, p: 0}, {x: 0, y: 0, p: 1}, {x: 0, y: 0, p: 1 }, {x: 0, y: 1, p: 0 }, { x: 1, y: 1, p: 0},
            {x: 1, y: 1, p: 1}, {x: 1, y: 0, p: 0}, {x: 0, y: 0, p: 0 }, {x: 0, y: 0, p: 1 }
          ], [
            {x: 0, y: 0, p: 0}, {x: 0, y: 1, p: 0}, {x: 0, y: 2, p: 0 }, {x: 0, y: 2, p: 1 }, { x: 1, y: 2, p: 0},
            {x: 1, y: 1, p: 0}, {x: 1, y: 1, p: 1}, {x: 0, y: 1, p: 0 }
          ]
        ];
        const expectRouteWithPhoto = [ [{x: 0, y: 0, p: 3}, {x: 1, y: 1, p: 1}], [{x: 0, y: 2, p: 1}, {x: 1, y: 1, p: 1}] ];
        const { droneRoutes, droneStateArrayWithPhoto, totalPhotoTaken } = getDroneRoutes(instructions, numberOfDrones);
        expect(droneRoutes).to.eql(expectedRoutes); 
        expect(droneStateArrayWithPhoto).to.eql(expectRouteWithPhoto);
        expect(totalPhotoTaken).to.equal(6); 
      })
    });    
  });  
});