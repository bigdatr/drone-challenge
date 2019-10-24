const { isObject } = require('./utils'); 
const action = (position, actionType) => { // position { x: 0, y: 0, p: 0}, 
  if ( isObject(position) == false || typeof actionType != 'string' ) {
    throw new Error('Input Type Error');
  }
  switch(actionType) {
    case 'x': 
      return { ...position, p: 1 };
    case '^':
      return { ...position, y: position.y + 1, p: 0 };
    case 'v':
      return { ...position, y: position.y - 1, p: 0 };
    case '>':
      return { ...position, x: position.x + 1, p: 0 };      
    case '<':
      return { ...position, x: position.x - 1, p: 0 };      
  }
  return { ...position };
};

const findStateWithPhotoTaken = (droneRoute=[]) => { // [{x:0, y:0, p, 0} ...]
  if (Array.isArray(droneRoute) === false) {
    throw new Error('Input Type Error');
  }

  let result = droneRoute.reduce(function(acc, curr) {
    if (curr.p > 0) {
      let key = `${curr.x},${curr.y}`;
      let fromMap = acc.map[key];
      if (!fromMap) {
        acc.map[key] = fromMap = {
          x: curr.x,
          y: curr.y,
          p: 0
        }
        acc.states.push(fromMap);
      }
      fromMap.p += parseInt(curr.p);
      acc.total += parseInt(curr.p);
    } 
    return acc;
  }, {
    map: {},
    states: [],
    total: 0
  });
  return result;  
};

const getDroneRoutes = (instructions='', numberOfDrones= 1) => {
  if (typeof instructions != 'string' || isNaN(numberOfDrones)) {
    throw new Error('Instructions or drone number has type error');
  }

  const droneNumber = parseInt(numberOfDrones);
  if (droneNumber < 1) {
    throw new Error('Drone number less than 1');
  } 

  // Initialise each drone instruction
  let droneInstructions = new Array(droneNumber).fill().map(()=> {
    return "";
  });

  for (let i=0; i < instructions.length; i++) {
    droneInstructions[i%droneNumber] = droneInstructions[i%droneNumber].concat(instructions[i]);
  }  
  
  const initialState = {x: 0, y: 0, p: 0};
  let droneRoutes= new Array(droneNumber).fill().map((e, i)=> {
    return [{...initialState}];
  });

  // Get the route based on Instructions
  let droneStateArrayWithPhoto = [];
  let totalPhotoTaken = 0;
  for (let j=0; j < droneNumber; j++) {
    let currentState = droneRoutes[j][0];
    for (let i=0; i < droneInstructions[j].length; i++) {
      let newState = action(currentState, droneInstructions[j][i]);
      droneRoutes[j].push({...newState});
      
      currentState = {...newState};
    }
    const { states, total } = findStateWithPhotoTaken(droneRoutes[j]);
    totalPhotoTaken += total;
    droneStateArrayWithPhoto.push([...states]) // [ [{}...], [{}...] ...]
  }

  return {
    droneRoutes,
    droneStateArrayWithPhoto,
    totalPhotoTaken
  };
};


module.exports = {
  getDroneRoutes
};






