import { Kafka, KafkaConfig } from "kafkajs";

const kafkaConfig: KafkaConfig = {
  brokers: [`${process.env.PRIVATE_IP}:9092`],
};

let kafka: Kafka;

try {
  kafka = new Kafka(kafkaConfig);
} catch (error) {
  console.error("Error initializing Kafka:", error);
  process.exit(1);
}

export default kafka;
