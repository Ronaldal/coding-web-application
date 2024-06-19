const express = require("express");
const codeBlocks = require("./CodeBlockData");
const router = express.Router();

function findCodeBlockById(id) {
  return codeBlocks.find((codeBlock) => codeBlock.id === id);
}

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;
  console.log("GET request", id);
  try {
    const result = findCodeBlockById(id);
    console.log("GET request for code block ", id);
    console.log("code ", result);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "Code block not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
