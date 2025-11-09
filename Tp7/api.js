const express = require("express");
const cors = require("cors");
const { producer } = require("./fakeKafka");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/transactions", async (req, res) => {
  const transaction = {
    type: "TransactionCreated",
    transactionId: "txn-" + Date.now(),
    timestamp: Date.now(),
    payload: req.body,
  };

  await producer.send({
    topic: "transactions",
    messages: [transaction],
  });

  console.log("📤 Enviando evento TransactionCreated (simulado)");
  res.json({ ok: true });
});

app.listen(4000, () =>
  console.log("✅ API escuchando en http://localhost:4000")
);
