import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();
function useSocket() {
  return useContext(SocketContext);
}
function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io("https://onlinewebapp230698-9d5c4d4bfc71.herokuapp.com/");
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
