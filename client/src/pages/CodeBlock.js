import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSocket } from "../contexts/SocketProvider";
import Code from "../components/Code";

/*This React component fetches code data based on a dynamic codeBlockId parameter from the server using Axios. 
 It also establishes a WebSocket connection through useSocket hook to allow real-time collaboration, 
 distinguishing between mentor and student roles, and updating code changes accordingly. 
 */
const CodeBlock = () => {
  const { codeBlockId } = useParams();
  const { socket } = useSocket();
  const [code, setCode] = useState("");
  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://onlinecodingappp230698-a6f964b69b49.herokuapp.com/code/${codeBlockId}`
      )
      .then((response) => {
        console.log("Data fetched: ", response.data);
        setCode(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Get data code by id from the server using Axios
    if (!socket) return;
    socket.emit("join", { id: codeBlockId });

    socket.on("role", ({ isMentor }) => setIsStudent(!isMentor));

    return () => {
      socket?.emit("leave", { id: codeBlockId });
      console.log("leave");
    };
  }, [socket]);

  const onCodeChange = (newCode) => {
    console.log("New code from student: ", newCode);
    if (socket) {
      socket.emit("newCode", { id: codeBlockId, code: newCode });
    }
  };

  return (
    <div className="code-block-page">
      {code !== "" && (
        <Code code={code} onCodeChange={onCodeChange} isStudent={isStudent} />
      )}
    </div>
  );
};

export default CodeBlock;
