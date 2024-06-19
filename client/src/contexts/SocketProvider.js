import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();
function useSocket() {
  return useContext(SocketContext);
}
function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);
  return (
    <div>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </div>
  );
}
export { SocketContext, SocketProvider, useSocket };
