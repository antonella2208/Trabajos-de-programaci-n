// Ejercicio 9: Combinar datos de dispositivos y conexiones

const topologiaRed = {
  nodos: [
    { id: "A", tipo: "Router", ubicacion: "Planta 1" },
    { id: "B", tipo: "Switch", ubicacion: "Planta 1" },
    { id: "C", tipo: "Switch", ubicacion: "Planta 2" },
    { id: "D", tipo: "Switch", ubicacion: "Planta 3" },
    { id: "E", tipo: "Router", ubicacion: "Planta 3" }
  ],
  conexiones: [
    { origen: "A", destino: "B", ancho_banda: 1000 },
    { origen: "A", destino: "C", ancho_banda: 1000 },
    { origen: "B", destino: "C", ancho_banda: 100 },
    { origen: "B", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "D", ancho_banda: 100 },
    { origen: "C", destino: "E", ancho_banda: 1000 },
    { origen: "D", destino: "E", ancho_banda: 1000 }
  ]
};

// 1. Inicializar conexiones por nodo
const conexionesPorNodo = {};
topologiaRed.nodos.forEach(nodo => {
  conexionesPorNodo[nodo.id] = 0;
});

// 2. Contar conexiones
topologiaRed.conexiones.forEach(conexion => {
  conexionesPorNodo[conexion.origen]++;
  conexionesPorNodo[conexion.destino]++;
});

// 3. Ordenar nodos de mayor a menor número de conexiones
const nodosOrdenados = Object.entries(conexionesPorNodo)
  .sort((a, b) => b[1] - a[1]); // [ ["C", 4], ["D", 3], ... ]

// 4. Sugerencias de optimización
const sugerencias = nodosOrdenados
  .filter(([_, cantidad]) => cantidad > 2)
  .map(([nodo, cantidad]) => {
    const infoNodo = topologiaRed.nodos.find(n => n.id === nodo);
    return `⚡ El nodo ${nodo} (${infoNodo.tipo}, ${infoNodo.ubicacion}) tiene ${cantidad} conexiones. Se recomienda aumentar el ancho de banda.`;
  });

// 5. Mostrar resultados en HTML
const ej9Content = document.getElementById("ej9-content");

const listaConexiones = document.createElement("ul");
for (const [nodo, cantidad] of Object.entries(conexionesPorNodo)) {
  const li = document.createElement("li");
  li.textContent = `Nodo ${nodo}: ${cantidad} conexiones`;
  listaConexiones.appendChild(li);
}
ej9Content.appendChild(listaConexiones);

const listaOrdenados = document.createElement("ol");
nodosOrdenados.forEach(([nodo, cantidad]) => {
  const li = document.createElement("li");
  li.textContent = `Nodo ${nodo}: ${cantidad} conexiones`;
  listaOrdenados.appendChild(li);
});
ej9Content.appendChild(document.createElement("h3")).textContent = "Nodos ordenados:";
ej9Content.appendChild(listaOrdenados);

const listaSugerencias = document.createElement("ul");
sugerencias.forEach(msg => {
  const li = document.createElement("li");
  li.textContent = msg;
  listaSugerencias.appendChild(li);
});
ej9Content.appendChild(document.createElement("h3")).textContent = "Sugerencias:";
ej9Content.appendChild(listaSugerencias);

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por número de conexiones:", nodosOrdenados);
console.log("Sugerencias de optimización:", sugerencias);
