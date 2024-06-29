import { createProducer } from "./createTheProducer";

export const produceMessage = async (message: string, topic: string) => {
  const producer = createProducer();

  try {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ key: `message-${Date.now()}`, value: message }],
    });

    console.log("Successfully produced message to Kafka");
  } catch (error) {
    console.error("Failed to produce message to Kafka:", error);

    throw new Error("Failed to produce message to Kafka");
  } finally {
    await producer.disconnect();
  }
};
