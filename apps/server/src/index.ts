import * as http from "http";
import SocketService from "./services/socket";
import { getMessageConsume } from "./services/Kafka/Kafkaconsumer/consumeMessage";

async function initial() {
  await getMessageConsume();

  const socketService = new SocketService();
  const httpServer = http.createServer();

  const PORT = process.env.PORT ? process.env.PORT : "8080";

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`The server is Running on the port ${PORT}`);
  });

  socketService.intiializeListeners();
}

initial();
