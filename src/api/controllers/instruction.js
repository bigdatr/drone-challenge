const { getDroneRoutes } = require('../droneRoute');

const handleInstruction = (req, res) => {
  const { file, body: { drone_number } } = req;
  if (file == null || file == undefined ) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  try {
    const { buffer } = file;
  
    const instructions = buffer.toString('utf8');
    const result = getDroneRoutes(instructions, drone_number);
  
    return res.json({ ...result });    
  } catch(error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = {
  handleInstruction
};
