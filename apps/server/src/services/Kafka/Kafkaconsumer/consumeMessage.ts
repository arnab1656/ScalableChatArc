import prismaClient from "../../prisma";
import { createConsumer } from "./createTheConsumer";

const handleMessage = async (
  topic: string,
  message: any,
  pause: Function,
  consumer: any
) => {
  if (!message) {
    return;
  }
  try {
    await prismaClient.message.create({
      data: {
        text: message.value.toString(),
      },
    });
  } catch (error) {
    console.log(
      "Some error occurred while putting the data fetched from the broker to the database, so it is paused"
    );

    pause();

    setTimeout(() => {
      consumer.resume([{ topic }]);
    }, 60 * 1000);
  } finally {
    console.log({
      key: message.key.toString(),
      value: message.value.toString(),
      topic,
    });
  }
};

export const getMessageConsume = async () => {
  const consumer = createConsumer();

  console.log("The consumer is consuming the data fromt the broker");

  try {
    await consumer.connect();
    await consumer.subscribe({ topics: ["Get_Redis_Message"] });

    await consumer.run({
      autoCommit: true,
      eachMessage: async ({ topic, message, pause }) => {
        await handleMessage(topic, message, pause, consumer);
      },
    });
  } catch (error) {
    console.log("Error While Consuming the Message from the Broker");
    console.log(error);

    throw new Error("Erro While Consuming the Message from the Broker");
  }
};
