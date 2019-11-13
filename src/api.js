const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
    let input = `${req.body.input}`

    let x = 0
    let y = 0
    let photos = []

    input.split('').map(function(coord) {
        switch(coord) {
            case '^'://north
            x++
            break
            case 'v'://south
            x--
            break
            case '>'://east
            y++
            break
            case '<'://west
            y--
            break
            case 'x'://take a photograph
            photos.push(`${x};${y}`)
            break
            default:
        }
    })
    res.json({'locationX':`${x}`,'locationY':`${y}`,photos: photos})
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

