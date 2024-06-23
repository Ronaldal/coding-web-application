const mongoose = require("mongoose");

const Scheme = mongoose.Schema;

// Define the schema
const codeBlockSchema = new mongoose.Schema({
  id: String,
  title: String,
  testCode: String,
  correctedCode: String,
});

const CodeBlocks = mongoose.model("code-blocks", codeBlockSchema);
module.exports = CodeBlocks;
