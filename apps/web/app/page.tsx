"use client";

import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Home() {
  const { sendMessage, incomingMessages } = useSocket();

  const [message, setMessage] = useState<string>("");

  console.log("incomingMessages");
  console.log(incomingMessages);

  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1600x900')",
      }}
    >
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <h1 className="text-2xl font-bold">Chat App</h1>
        <button className="py-2 px-4 bg-red-600 rounded hover:bg-red-700 transition duration-300">
          Logout
        </button>
      </header>

      <main className="flex-1 p-4 overflow-y-auto bg-white bg-opacity-70 rounded-t-3xl shadow-inner">
        <div className="flex flex-col space-y-4">
          {incomingMessages.map((msg) => {
            return (
              <div className="self-end p-4 bg-blue-500 text-white rounded-lg shadow-md animate-fade-in-up">
                <p className="text-sm">{msg}</p>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg rounded-b-3xl">
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="py-2 px-4 bg-green-500 text-white rounded-r-lg hover:bg-green-600 transition duration-300"
            onClick={() => {
              sendMessage(message);
            }}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
