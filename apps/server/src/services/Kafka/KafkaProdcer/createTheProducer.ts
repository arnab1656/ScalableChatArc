import { Producer } from "kafkajs";
import kafka from "../kafka";

export const createProducer = (() => {
  let producerInstance: Producer | null = null;

  return () => {
    if (!producerInstance) producerInstance = kafka.producer();
    return producerInstance;
  };
})();
