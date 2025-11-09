const { consumer, producer } = require("./fakeKafka");

async function start() {
  console.log("✅ Orchestrator simulado iniciado");

  await consumer.subscribe({ topic: "transactions" });
  await consumer.run({
    topic: "transactions",
    eachMessage: async ({ message }) => {
      const data = message;
      console.log("📥 Recibido TransactionCreated:", data.payload);

      const steps = [
        "FundsReserved",
        "TransactionCommitted",
        "TransactionCompleted",
      ];

      for (const step of steps) {
        const event = {
          type: step,
          transactionId: data.transactionId,
          timestamp: Date.now(),
          payload: data.payload,
        };
        await producer.send({
          topic: "transactions",
          messages: [event],
        });
        console.log("📤 Evento simulado:", step);
      }
    },
  });
}

start();
