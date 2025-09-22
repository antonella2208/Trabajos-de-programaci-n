
// Ejercicio 6: Calcular estadísticas de red
const traficoRed = {
  "08:00": 1250,
  "09:00": 1870,
  "10:00": 2100,
  "11:00": 1950,
  "12:00": 1600,
  "13:00": 1300,
  "14:00": 1700,
  "15:00": 2200,
  "16:00": 1800,
  "17:00": 1500
};

// Calcular total de datos transferidos
const totalDatos = Object.values(traficoRed).reduce((acum, val) => acum + val, 0);

// Encontrar la hora con mayor tráfico
let maxHora = "";
let maxValor = 0;
for (const [hora, valor] of Object.entries(traficoRed)) {
  if (valor > maxValor) {
    maxValor = valor;
    maxHora = hora;
  }
}

// Mostrar resultados
document.getElementById("ej6").textContent =
  `Total de datos transferidos: ${totalDatos} MB\n` +
  `Hora con mayor tráfico: ${maxHora} (${maxValor} MB)`;
