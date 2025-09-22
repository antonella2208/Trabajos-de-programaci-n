// Ejercicio 1: Objeto Router
const router = {
  modelo: "AX1800",
  marca: "TP-Link",
  puertos: 4,
  velocidad: 1800,
  soportaWifi: true
};

let tableHTML = "<tr><th>Propiedad</th><th>Valor</th></tr>";
for (const key in router) {
  tableHTML += `<tr><td>${key}</td><td>${router[key]}</td></tr>`;
}

document.getElementById("ej1-table").innerHTML = tableHTML;

