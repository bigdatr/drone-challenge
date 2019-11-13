const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');


function process(str){
  var ar = [];
  var current = {x: 0, y: 0};
  var length = str.length;
  for(let i = 0; i < str.length; i++){
    switch(str[i]){
      case 'x':
        ar.push('x'+current.x+'y'+current.y);
        // console.log('photo taken');
        break;
      case '^':
        current = {...current, y: current.y+1};
        break;
      case 'v':
        current = {...current, y: current.y-1};
        break;
      case '<':
        current = {...current, x: current.x-1};
        break;
      case '>':
        current = {...current, x: current.x+1};
        break;
      default:
        console.log('???');
    }
  }
  console.log(ar.length);
  console.log(Array.from(new Set(ar)).length);
}

function process2(str){
  var ar = [];
  var current1 = {x: 0, y: 0};
  var current2 = {x: 0, y: 0};
  var length = str.length;
  for(let i = 0; i < str.length; i++){
    if(i%2 === 0){
      switch(str[i]){
        case 'x':
          ar.push('x'+current1.x+'y'+current1.y);
          // console.log('photo taken');
          break;
        case '^':
          current1 = {...current1, y: current1.y+1};
          break;
        case 'v':
          current1 = {...current1, y: current1.y-1};
          break;
        case '<':
          current1 = {...current1, x: current1.x-1};
          break;
        case '>':
          current1 = {...current1, x: current1.x+1};
          break;
        default:
          console.log('???');
      }
    }
    else{
      switch(str[i]){
        case 'x':
          ar.push('x'+current2.x+'y'+current2.y);
          // console.log('photo taken');
          break;
        case '^':
          current2 = {...current2, y: current2.y+1};
          break;
        case 'v':
          current2 = {...current2, y: current2.y-1};
          break;
        case '<':
          current2 = {...current2, x: current2.x-1};
          break;
        case '>':
          current2 = {...current2, x: current2.x+1};
          break;
        default:
          console.log('???');
      }
    }
  }
  console.log(ar.length);
  return (Array.from(new Set(ar)).length);
}


app.use(cors());

app.get('/', (req, res) => {
    // console.log('Request: ', req.query);
    res.json({data: req.query.token});
});

app.get('/getBillBoards1/', (req, res) => {
  let str = req.query.token;
  var ar = [];
  var current = {x: 0, y: 0};
  var length = str.length;
  for(let i = 0; i < str.length; i++){
    switch(str[i]){
      case 'x':
        ar.push('x'+current.x+'y'+current.y);
        // console.log('photo taken');
        break;
      case '^':
        current = {...current, y: current.y+1};
        break;
      case 'v':
        current = {...current, y: current.y-1};
        break;
      case '<':
        current = {...current, x: current.x-1};
        break;
      case '>':
        current = {...current, x: current.x+1};
        break;
      default:
        console.log('???');
    }
  }
  res.json({data: Array.from(new Set(ar)).length});
});
//
app.get('/getBillBoards2/', (req, res) => {
  let str = req.query.token;
  var ar = [];
  var current1 = {x: 0, y: 0};
  var current2 = {x: 0, y: 0};
  var length = str.length;
  for(let i = 0; i < str.length; i++){
    if(i%2 === 0){
      switch(str[i]){
        case 'x':
          ar.push('x'+current1.x+'y'+current1.y);
          // console.log('photo taken');
          break;
        case '^':
          current1 = {...current1, y: current1.y+1};
          break;
        case 'v':
          current1 = {...current1, y: current1.y-1};
          break;
        case '<':
          current1 = {...current1, x: current1.x-1};
          break;
        case '>':
          current1 = {...current1, x: current1.x+1};
          break;
        default:
          console.log('???');
      }
    }
    else{
      switch(str[i]){
        case 'x':
          ar.push('x'+current2.x+'y'+current2.y);
          // console.log('photo taken');
          break;
        case '^':
          current2 = {...current2, y: current2.y+1};
          break;
        case 'v':
          current2 = {...current2, y: current2.y-1};
          break;
        case '<':
          current2 = {...current2, x: current2.x-1};
          break;
        case '>':
          current2 = {...current2, x: current2.x+1};
          break;
        default:
          console.log('???');
      }
    }
  }
  res.json({data: Array.from(new Set(ar)).length});
});


app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
