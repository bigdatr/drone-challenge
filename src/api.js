const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const { handleInstruction } = require('./api/controllers/instruction');

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }  // 5MB
});

app.use(cors());

app.get('/', (req, res) => {
  res.json({foo: 'bar'});
});

// TO DO, may implement validation middleware for file, fields etc
app.post('/api/instructions/upload', upload.single('file'), handleInstruction);

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

