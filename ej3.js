// Ejercicio 3: Filtrar dispositivos por marca
const dispositivosRed = [
  { tipo: "Router", marca: "Cisco", modelo: "1941", precio: 1200 },
  { tipo: "Switch", marca: "TP-Link", modelo: "TL-SG108", precio: 150 },
  { tipo: "Firewall", marca: "Cisco", modelo: "ASA 5506-X", precio: 2500 },
  { tipo: "Access Point", marca: "Ubiquiti", modelo: "UniFi AP AC Pro", precio: 320 },
  { tipo: "Router", marca: "Netgear", modelo: "Nighthawk AX12", precio: 350 }
];

const marcaBuscada = "Cisco"; 
const filtrados = dispositivosRed.filter(d => d.marca === marcaBuscada);

document.getElementById("ej3").textContent =
  `Dispositivos de la marca ${marcaBuscada}:\n\n` +
  JSON.stringify(filtrados, null, 2);
