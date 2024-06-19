import { useSocket } from "../contexts/SocketProvider";
import React, { useState, useEffect } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";

/*
This React component renders a code editor using CodeMirror library, 
enabling real-time collaboration between students and mentors.  */
function Code({ isStudent, code, onCodeChange }) {
  const { socket } = useSocket();
  const [newCode, setNewCode] = useState(code.testCode);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [displaySmiley, setDisplaySmiley] = useState(false);

  const [isMentorLeft, setIsMentorLeft] = useState(false);
  const [isStudentLeft, setIsStudentLeft] = useState(false);

  useEffect(() => {
    socket?.on("newCodeOfStudent", (code) => {
      console.log("new code from student: ", code);
      setNewCode(code);
    });

    socket?.on("mentorLeave", (data) => {
      console.log(data);
      setIsMentorLeft(true);
    });

    socket?.on("studentLeave", (data) => {
      console.log(data);
      setIsStudentLeft(true);
      setNewCode(code.testCode);
    });

    socket?.on("mentorJoin", (data) => {
      console.log(data);
      setIsMentorLeft(false);
    });

    socket?.on("studentJoin", (data) => {
      console.log(data);
      setIsStudentLeft(false);
    });

    return () => {
      socket?.off("newCodeOfStudent");
      socket?.off("mentorLeave");
      socket?.off("studentLeave");
      socket?.off("mentorJoin");
      socket?.off("studentJoin");
    };
  }, [socket]);

  function handleSubmit() {
    const trimmedString1 = code.correctedCode.replace(/\s/g, "");
    const trimmedString2 = newCode.replace(/\s/g, "");
    console.log("correc code: ", [trimmedString1]);
    console.log("correc newCode: ", [trimmedString2]);
    const isEqual = trimmedString1 === trimmedString2;
    console.log("Are the strings equal?", isEqual);
    setIsCodeCorrect(isEqual);
    console.log("-----\n", isCodeCorrect);
    setDisplaySmiley(true);
  }
  function handleChange(editor, data, value) {
    setNewCode(value);
    onCodeChange(value);
    setDisplaySmiley(false);
  }
  return (
    <div>
      <h1>The subject of the lesson is: {code.title}</h1>
      <h2>Hey I am the: {isStudent ? "Student" : "Mentor"}</h2>
      {/*The code is written twice because currently it is not possible 
      to perform in codemirrror2 the dynamic read-only option */}
      {isStudent ? (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={newCode}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            readOnly: false,
          }}
        />
      ) : (
        <ControlledEditor
          onBeforeChange={handleChange}
          value={newCode}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            mode: "javascript",
            theme: "material",
            lineNumbers: true,
            readOnly: true,
          }}
        />
      )}

      {isStudent && <button onClick={handleSubmit}>Save</button>}
      {isMentorLeft && <h3>The mentor left the room!</h3>}
      {isStudentLeft && <h3>The student left the room!</h3>}
      {/* Display the BigSmiley component if isCodeCorrect is true */}
      {displaySmiley && (
        <div style={{ fontSize: "6rem" }}>{isCodeCorrect ? "😊" : "😔"}</div>
      )}
    </div>
  );
}

export default Code;
