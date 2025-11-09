 // startAll.js
const { spawn } = require("child_process");

const services = [
  { name: "API", command: "node", args: ["api.js"] },
  { name: "Gateway", command: "node", args: ["gateway.js"] },
  { name: "Orchestrator", command: "node", args: ["orchestrator.js"] },
];

services.forEach(({ name, command, args }) => {
  const process = spawn(command, args, { stdio: "pipe" });

  process.stdout.on("data", (data) => {
    console.log(`🟢 [${name}] ${data.toString().trim()}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`🔴 [${name} ERROR] ${data.toString().trim()}`);
  });

  process.on("close", (code) => {
    console.log(`⚪ [${name}] terminó con código ${code}`);
  });
});

console.log("🚀 Todos los servicios se están iniciando...");

