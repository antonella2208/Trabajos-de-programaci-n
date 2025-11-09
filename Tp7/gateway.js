const WebSocket = require("ws");
const { consumer } = require("./fakeKafka");

const wss = new WebSocket.Server({ port: 5000 });
console.log("🌐 Gateway WebSocket escuchando en ws://localhost:5000");

let clients = [];
wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => (clients = clients.filter((c) => c !== ws)));
  console.log("👥 Nuevo cliente conectado");
});

async function start() {
  await consumer.subscribe({ topic: "transactions" });
  await consumer.run({
    topic: "transactions",
    eachMessage: async ({ message }) => {
      for (const ws of clients) {
        ws.send(JSON.stringify(message));
      }
    },
  });
  console.log("✅ Gateway simulado conectado");
}

start();
