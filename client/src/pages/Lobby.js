import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Lobby.css";

/*The function shows the development page of the site and the options available in it.
With link it takes the user to the selected page  */

const Lobby = () => {
  const [selectedChoice, setSelectedChoice] = useState("");

  const choices = {
    1: "Logical operator",
    2: "While loop",
    3: "Function ",
    4: "Arrays",
  };

  const handleChoiceClick = (key) => {
    setSelectedChoice(key);
  };

  return (
    <div className="choice-bar">
      <h1>Code Block Chooser</h1>
      <p>
        Hello everyone and welcome to my code lessons website, click on the
        lesson below you want and start coding 🧑🏻‍💻 enjoy!!
      </p>
      {Object.entries(choices).map(([key, value]) => (
        <div
          key={key}
          className={`choice-item ${selectedChoice === key ? "selected" : ""}`}
          onClick={() => handleChoiceClick(key)}
        >
          {value}
        </div>
      ))}
      <div className="code-block">
        <h2>{choices[selectedChoice]}</h2>
        <pre>
          {selectedChoice === "1" &&
            `// Code for logical operator\nif (some_conditian){\n return true;\n}`}
          {selectedChoice === "2" &&
            `// Code for Sync Case\nfunction process() {\nlet i = 0;\nwhile (i < 10) {\n  console.log("Iteration", i);\n  i++;\n }\n}`}
          {selectedChoice === "3" &&
            `// Code for funcation\nfunction name(parameter1, parameter2, parameter3) {
  // code to be executed
}`}
          {selectedChoice === "4" &&
            `// Code for Arrays\nlet arr = [1, 2, 3, 4, 5];\nlet firstElement = arr[0];\nconsole.log(firstElement);`}
        </pre>
      </div>
      <Link to={`/code-block-${selectedChoice}`}>
        <button>
          {selectedChoice
            ? `Practice on ${choices[selectedChoice]}`
            : "No code block is selected"}
        </button>
      </Link>
    </div>
  );
};

export default Lobby;
