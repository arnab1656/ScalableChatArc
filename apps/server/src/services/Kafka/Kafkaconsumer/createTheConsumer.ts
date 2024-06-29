import { Consumer } from "kafkajs";
import kafka from "../kafka";

export const createConsumer = (() => {
  let consumerInstance: Consumer | null = null;

  return () => {
    if (!consumerInstance) {
      consumerInstance = kafka.consumer({ groupId: "group-One" });
    }

    return consumerInstance;
  };
})();
