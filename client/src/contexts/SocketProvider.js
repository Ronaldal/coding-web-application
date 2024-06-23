import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();
function useSocket() {
  return useContext(SocketContext);
}
function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(
      "https://onlinecodingappp230698-a6f964b69b49.herokuapp.com/"
    );
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
