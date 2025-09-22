
// Ejercicio 10: Analizar y optimizar topología de red

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

// 1. Inicializar el contador de conexiones
const conexionesPorNodo = {};
topologiaRed.nodos.forEach(nodo => {
  conexionesPorNodo[nodo.id] = 0;
});

// 2. Contar conexiones por nodo
topologiaRed.conexiones.forEach(conexion => {
  conexionesPorNodo[conexion.origen]++;
  conexionesPorNodo[conexion.destino]++;
});

// 3. Ordenar nodos de mayor a menor conexiones
const nodosOrdenados = Object.entries(conexionesPorNodo)
  .sort((a, b) => b[1] - a[1]);

// 4. Sugerir optimizaciones
const sugerencias = [];
nodosOrdenados.forEach(([nodo, conexiones]) => {
  if (conexiones > 2) {
    sugerencias.push(
      `El nodo ${nodo} tiene ${conexiones} conexiones. ⚠️ Considera aumentar su ancho de banda o balancear carga.`
    );
  }
});

// 5. Mostrar en HTML
const ej10Content = document.getElementById("ej10-content");

// Mostrar conexiones por nodo
const listaConexiones = document.createElement("ul");
for (let nodo in conexionesPorNodo) {
  const li = document.createElement("li");
  li.textContent = `Nodo ${nodo}: ${conexionesPorNodo[nodo]} conexiones`;
  listaConexiones.appendChild(li);
}
ej10Content.appendChild(listaConexiones);

// Mostrar sugerencias
const listaSugerencias = document.createElement("ul");
sugerencias.forEach(sug => {
  const li = document.createElement("li");
  li.textContent = sug;
  listaSugerencias.appendChild(li);
});
ej10Content.appendChild(listaSugerencias);

console.log("Conexiones por nodo:", conexionesPorNodo);
console.log("Nodos ordenados por número de conexiones:", nodosOrdenados);
console.log("Sugerencias de optimización:", sugerencias);
