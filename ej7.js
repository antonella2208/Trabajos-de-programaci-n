
// Ejercicio 7: Analizar conexiones de red
const conexiones = [
  { id: 1, origen: "192.168.1.5", destino: "192.168.1.10", protocolo: "HTTP" },
  { id: 2, origen: "192.168.1.7", destino: "192.168.1.12", protocolo: "FTP" },
  { id: 3, origen: "192.168.1.3", destino: "192.168.1.11", protocolo: "SSH" },
  { id: 4, origen: "192.168.1.8", destino: "192.168.1.14", protocolo: "HTTP" },
  { id: 5, origen: "192.168.1.2", destino: "192.168.1.13", protocolo: "HTTPS" },
  { id: 6, origen: "192.168.1.6", destino: "192.168.1.10", protocolo: "FTP" },
  { id: 7, origen: "192.168.1.9", destino: "192.168.1.15", protocolo: "SSH" },
  { id: 8, origen: "192.168.1.4", destino: "192.168.1.11", protocolo: "HTTP" }
];

// Contar conexiones por protocolo
const conexionesPorProtocolo = {};
conexiones.forEach(c => {
  if (conexionesPorProtocolo[c.protocolo]) {
    conexionesPorProtocolo[c.protocolo]++;
  } else {
    conexionesPorProtocolo[c.protocolo] = 1;
  }
});

// Mostrar en HTML
const ej7Content = document.getElementById("ej7-content");
for (const [protocolo, cantidad] of Object.entries(conexionesPorProtocolo)) {
  const li = document.createElement("li");
  li.textContent = `${protocolo}: ${cantidad} conexiones`;
  ej7Content.appendChild(li);
}

// También en consola
console.log("Conexiones por protocolo:", conexionesPorProtocolo);
