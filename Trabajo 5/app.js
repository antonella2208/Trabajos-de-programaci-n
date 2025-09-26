 let confirmedTrips = [];

// Diccionario de aeropuertos
const airports = {
  "BRC": "Bariloche",
  "MDZ": "Mendoza",
  "AEP": "Buenos Aires (Aeroparque)",
  "IGR": "Iguazú",
  "COR": "Córdoba"
};

// Dataset de vuelos directamente en app.js
const flights = [
  { origin: "COR", destination: "BRC", date: "2025-10-01", price: 300, availability: 5 },
  { origin: "BRC", destination: "COR", date: "2025-10-10", price: 300, availability: 5 },

  { origin: "COR", destination: "MDZ", date: "2025-10-02", price: 250, availability: 8 },
  { origin: "MDZ", destination: "COR", date: "2025-10-12", price: 250, availability: 8 },

  { origin: "COR", destination: "AEP", date: "2025-10-03", price: 200, availability: 10 },
  { origin: "AEP", destination: "COR", date: "2025-10-15", price: 200, availability: 10 },

  { origin: "COR", destination: "IGR", date: "2025-10-05", price: 600, availability: 3 },
  { origin: "IGR", destination: "COR", date: "2025-10-18", price: 600, availability: 3 },
];

// Buscar viajes según presupuesto
function findTrips(budget) {
  const trips = [];

  // Filtrar por origen Córdoba y buscar ida + vuelta
  const flightsFrom = flights.filter(f => f.origin === "COR");

  flightsFrom.forEach(ida => {
    const regreso = flights.find(v =>
      v.origin === ida.destination &&
      v.destination === "COR" &&
      new Date(v.date) > new Date(ida.date)
    );
    if (regreso) {
      const total = ida.price + regreso.price;
      trips.push({
        destination: ida.destination,
        ida: ida.date,
        vuelta: regreso.date,
        total,
        availability: Math.min(ida.availability, regreso.availability),
      });
    }
  });

  // Filtrar solo los que entren en presupuesto
  return trips.filter(t => t.total <= budget);
}

// Renderizar viajes encontrados
function renderTrips(trips, budget) {
  const results = document.getElementById("results");
  const message = document.getElementById("message");
  results.innerHTML = "";

  if (trips.length === 0) {
    message.textContent = `❌ Tu presupuesto de $${budget} no es suficiente.`;
    return;
  }

  message.textContent = `Mostrando viajes dentro de tu presupuesto de $${budget}:`;

  trips.forEach((t, index) => {
    const destinoNombre = airports[t.destination] || t.destination; // nombre completo

    results.innerHTML += `
      <tr>
        <td>${destinoNombre}</td>
        <td>${new Date(t.ida).toLocaleDateString("es-AR")}</td>
        <td>${new Date(t.vuelta).toLocaleDateString("es-AR")}</td>
        <td>$${t.total}</td>
        <td>${t.availability}</td>
        <td>
          <button onclick="confirmTrip(${index})">Confirmar</button>
        </td>
      </tr>
    `;
  });
}

// Confirmar viaje
function confirmTrip(index) {
  const budget = parseFloat(document.getElementById("budget").value);
  const trips = findTrips(budget);
  const trip = trips[index];

  if (!trip) return;

  confirmedTrips.push(trip);
  renderConfirmedTrips();
}

// Mostrar viajes confirmados
function renderConfirmedTrips() {
  const list = document.getElementById("confirmedTrips");
  list.innerHTML = "";

  if (confirmedTrips.length === 0) {
    list.innerHTML = "<li>No confirmaste ningún viaje todavía.</li>";
    return;
  }

  confirmedTrips.forEach((t, i) => {
    const destinoNombre = airports[t.destination] || t.destination;
    list.innerHTML += `
      <li>
        ✈️ ${destinoNombre} — 📅 ${new Date(t.ida).toLocaleDateString("es-AR")}
        → ${new Date(t.vuelta).toLocaleDateString("es-AR")} — 💰 $${t.total}
      </li>`;
  });
}

// Evento botón principal
document.getElementById("findTrips").addEventListener("click", () => {
  const budget = parseFloat(document.getElementById("budget").value);
  if (isNaN(budget) || budget <= 0) {
    alert("Por favor ingresá un presupuesto válido.");
    return;
  }

  const trips = findTrips(budget);
  renderTrips(trips, budget);
});
