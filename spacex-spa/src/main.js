
const API_URL = "https://api.spacexdata.com/v5/launches";
const app = document.getElementById("app");
let launches = [];

// ----------------- ROUTER -----------------
function router() {
  const hash = location.hash || "#/home";
  if (hash === "#/home") {
    renderHome();
  } else if (hash.startsWith("#/launch/")) {
    const id = hash.split("/")[2];
    renderDetail(id);
  }
}

// ----------------- HOME -----------------
function renderHome() {
  if (!launches.length) {
    app.innerHTML = "<p>Cargando los cohetes... 🚀</p>";
    return;
  }

  app.innerHTML = `
    <div class="grid">
      ${launches.map(launch => {
        const imgSrc = launch.links?.patch?.small || null;
        return `
          <div class="card" onclick="location.hash = '#/launch/${launch.id}'">
            <h2>${launch.name}</h2>
            ${imgSrc ? `<img src="${imgSrc}" alt="${launch.name}">` : `<p>Sin imagen</p>`}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

// ----------------- DETAIL -----------------
function renderDetail(id) {
  const launch = launches.find(l => l.id === id);
  if (!launch) {
    app.innerHTML = "<p>🚨 Lanzamiento no encontrado</p>";
    return;
  }

  const imgSrc = launch.links?.patch?.small || null;

  app.innerHTML = `
    <div>
      <h2>${launch.name}</h2>
      ${imgSrc ? `<img src="${imgSrc}" alt="${launch.name}">` : `<p>Sin imagen</p>`}
      <p><b>Número de vuelo:</b> ${launch.flight_number}</p>
      <p><b>Fecha y hora:</b> ${new Date(launch.date_utc).toLocaleString()}</p>
      <p><b>Detalles:</b> ${launch.details || "No disponible"}</p>
      <p><b>Fallas:</b> ${
        launch.failures && launch.failures.length > 0
          ? launch.failures.map(f => f.reason).join(", ")
          : "Ninguna"
      }</p>
      <br>
      <a href="#/home">⬅️ Volver al Home</a>
    </div>
  `;
}

// ----------------- INIT -----------------
async function init() {
  app.innerHTML = "<p>Cargando los cohetes... 🚀</p>";
  try {
    const res = await fetch(API_URL);
    launches = await res.json();
    renderHome(); // renderizamos directamente después de obtener los datos
  } catch (error) {
    app.innerHTML = "<p>Error al cargar datos 🚨</p>";
    console.error(error);
  }
}

window.addEventListener("hashchange", router);
init();
