const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const InstructionManager = require("./models/InstructionManager");

var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 25 * 1024 * 1024 }
});

app.use(cors());

app.put("/instructions", upload.single("instructions"), function(req, res) {
  console.log(req.body);
  fs.readFile(req.file.buffer, "utf8", file => {
    const instructionManager = new InstructionManager(
      file.toString(),
      Number(req.body.numberOfDrones)
    );
    res.json(instructionManager.report());
  });
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));
