import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeBlock from "./pages/CodeBlock";
import Lobby from "./pages/Lobby";
import { SocketProvider } from "./contexts/SocketProvider";
/*
The main component of the site.
Switching between the pages is done using the library react-router-dom
In addition, the SocketProvider component is for the socket to pass between all components
*/
function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Lobby />} />
          <Route exact path="/:codeBlockId" element={<CodeBlock />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
}

export default App;
