// Ejercicio 4: Mapear direcciones IP
const servidores = [
  { nombre: "Servidor Web", ip: "192.168.1.10", sistema: "Linux" },
  { nombre: "Servidor de Base de Datos", ip: "192.168.1.11", sistema: "Windows" },
  { nombre: "Servidor de Correo", ip: "192.168.1.12", sistema: "Linux" },
  { nombre: "Servidor DNS", ip: "192.168.1.13", sistema: "Linux" },
  { nombre: "Servidor de Respaldo", ip: "192.168.1.14", sistema: "Windows" }
];

const direccionesIP = servidores.map(s => s.ip);

document.getElementById("ej4").textContent =
  "Direcciones IP de los servidores:\n\n" + JSON.stringify(direccionesIP, null, 2);
