 console.log("✅ Simulador de sistema bancario iniciado (modo simplificado)");

async function main() {
  const transaction = {
    fromAccount: "A1",
    toAccount: "B2",
    amount: 250,
    userId: "u1",
  };

  console.log("📤 Enviando evento TransactionCreated:", transaction);

  await new Promise((r) => setTimeout(r, 500));
  console.log("📥 Recibido TransactionCreated");

  const steps = ["FundsReserved", "TransactionCommitted", "TransactionCompleted"];
  for (const step of steps) {
    await new Promise((r) => setTimeout(r, 700));
    console.log("📤 Evento:", step);
  }

  console.log("✅ Transacción finalizada correctamente 🎉");
}

main();
