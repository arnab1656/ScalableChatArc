import { Server } from "socket.io";

import Redis from "ioredis";
import { produceMessage } from "./Kafka/KafkaProdcer/produceMessage";

const redisConfig = {
  host: "127.0.0.1",
  port: 6379,
};

const pub = new Redis(redisConfig);
const sub = new Redis(redisConfig);

class SocketService {
  private _io: Server;
  constructor() {
    this._io = new Server({ cors: { allowedHeaders: ["*"], origin: "*" } });

    sub.subscribe("MESSAGE");

    console.log("Initialize socket Server");
  }

  public intiializeListeners() {
    const io = this.io;

    console.log("Initialize Socket Listeners");

    io.on("connect", (socket) => {
      console.log(`A User is Connected to the Socket ${socket.id}`);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(
          `The Message from the User Id --> ${socket.id} messaged value --->${message}`
        );

        await pub.publish("MESSAGE", JSON.stringify({ message }));
      });

      socket.on("disconnect", () => {
        console.log(`User ${socket.id} disconnected`);
      });
    });

    sub.on("message", async (channel, message) => {
      if (channel === "MESSAGE") {
        console.log("Hey Message from the REDIS" + message);

        io.emit("message", message);

        await produceMessage(message, "Get_Redis_Message");
      }
    });
  }

  get io(): Server {
    return this._io;
  }
}

export default SocketService;
