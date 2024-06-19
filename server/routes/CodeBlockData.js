const codeBlocks = [
  {
    id: "code-block-1",
    title: "logical-operator",
    testCode:
      "let x = 5;\nif (x > 0 || x < 10) {\nconsole.log('x is between 0 and 10');\n}\n else {\nconsole.log('x is not between 0 and 10');\n}",
    correctedCode:
      "let x = 5;\nif (x > 0 && x < 10) {\nconsole.log('x is between 0 and 10');\n}\n else {\nconsole.log('x is not between 0 and 10');\n}",
  },
  {
    id: "code-block-2",
    title: "while-loop",
    testCode:
      "/*print 1-10*/\nlet i = 0;\nwhile (i < 10)\n{console.log(i);i++;}",
    correctedCode:
      "/*print 1-10*/\nlet i = 1;\nwhile (i <= 10)\n{console.log(i);i++;}",
  },
  {
    id: "code-block-3",
    title: "function",
    testCode:
      "//Return the compute product of p1 and p2\nfunction myFunction(p1, p2) {}",
    correctedCode:
      "//Return the compute product of p1 and p2\nfunction myFunction(p1, p2) {return p1 * p2;}",
  },
  {
    id: "code-block-4",
    title: "Arrays",
    testCode:
      "//print the length of array\nlet arr = [1, 2, 3, 4, 5];\nlet length = arr.size;\nconsole.log(length);",
    correctedCode:
      "//print the length of array\nlet arr = [1, 2, 3, 4, 5];\nlet length = arr.length;\nconsole.log(length);",
  },
];

module.exports = codeBlocks;
