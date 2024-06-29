"use client";

import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

interface SockerProviderProps {
  children: ReactNode;
}

interface sockerContextProps {
  sendMessage: (message: string) => any;
  incomingMessages: string[];
}

const sockerContext = createContext<sockerContextProps | null>(null);

export const useSocket = () => {
  const state = useContext(sockerContext);
  if (!state) {
    throw new Error("Error : State is Null");
  }

  return state;
};

const SockerProvider: FC<SockerProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const [incomingMessages, setIncomingMessage] = useState<string[]>([]);

  const sendMessage: sockerContextProps["sendMessage"] = useCallback(
    (message: string) => {
      console.log(`The Message from the Client is ${message}`);

      if (socket) {
        socket.emit("event:message", { message });
      }
    },
    [socket]
  );

  const onMessageReceived = useCallback((parsedIncomingMessage: string) => {
    console.log(`The received Message from Server ${parsedIncomingMessage}`);
    const { message } = JSON.parse(parsedIncomingMessage) as {
      message: string;
    };
    setIncomingMessage((prev) => [...prev, message]);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8080");

    _socket.on("message", (message) => {
      onMessageReceived(message);

      console.log("The msg received from the Socket Server");
    });

    setSocket(_socket);

    return () => {
      _socket.off("message", onMessageReceived);
      _socket.disconnect();
      setSocket(null);
    };
  }, []);

  return (
    <sockerContext.Provider value={{ sendMessage, incomingMessages }}>
      {children}
    </sockerContext.Provider>
  );
};

export default SockerProvider;
