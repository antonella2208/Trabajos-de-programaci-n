
// Ejercicio 2: Array de Dispositivos de Red
const dispositivos = [
  { tipo: "Router", marca: "Cisco", modelo: "1941", precio: 1200 },
  { tipo: "Switch", marca: "TP-Link", modelo: "TL-SG108", precio: 150 },
  { tipo: "Firewall", marca: "Fortinet", modelo: "FG-60E", precio: 500 },
  { tipo: "Access Point", marca: "Ubiquiti", modelo: "UniFi AP AC Pro", precio: 320 },
  { tipo: "Router", marca: "Netgear", modelo: "Nighthawk X6", precio: 350 }
];

let tableHTML = "<tr><th>Tipo</th><th>Marca</th><th>Modelo</th><th>Precio</th></tr>";
dispositivos.forEach(d => {
  tableHTML += `<tr><td>${d.tipo}</td><td>${d.marca}</td><td>${d.modelo}</td><td>${d.precio}</td></tr>`;
});

document.getElementById("ej2-table").innerHTML = tableHTML;
