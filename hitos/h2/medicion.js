
const PRODUCTOS = ["saltenia", "pizza", "empanada", "refrescos"]; 
const DIAS_POR_SEMANA = 6;
const K = DIAS_POR_SEMANA * PRODUCTOS.length;

const TAMANOS = [25000, 50000, 100000, 200000]; 
const CONSULTAS = 2000; 
const CORRIDAS = 3;
const CALENTAMIENTO = 200;

// historial ya ordenado por fecha 
function generarHistorial(n) {
  const historial = new Array(n);
  for (let i = 0; i < n; i++) {
    historial[i] = {
      fecha: Math.floor(i / PRODUCTOS.length), // 4 registros por dia
      producto: PRODUCTOS[i % PRODUCTOS.length],
      total: 10 + (i % 7) * 5,  
    };
  }
  return historial;
}

// Version anterior ingenua
function ventasSemanaIngenua(historial, desde, hasta) {
  let suma = 0;
  for (let i = 0; i < historial.length; i++) {
    const r = historial[i];
    if (r.fecha >= desde && r.fecha <= hasta) suma += r.total;
  }
  return suma;
}

// Version adecuada
function primerIndice(historial, desde) {
  let lo = 0;
  let hi = historial.length; 
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (historial[mid].fecha < desde) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function ventasSemanaAdecuada(historial, desde, hasta) {
  let suma = 0;
  let i = primerIndice(historial, desde);
  while (i < historial.length && historial[i].fecha <= hasta) {
    suma += historial[i].total;
    i++;
  }
  return suma;
}

function generarConsultasSemanales(n, cantidad) {
  const totalDias = Math.floor(n / PRODUCTOS.length);
  const cantidadSemanas = Math.floor(totalDias / DIAS_POR_SEMANA);
  const consultas = [];
  for (let q = 0; q < cantidad; q++) {
    const semana = Math.floor(Math.random() * cantidadSemanas);
    consultas.push([
      semana * DIAS_POR_SEMANA,
      semana * DIAS_POR_SEMANA + DIAS_POR_SEMANA - 1
    ]);
  }
  return consultas;
}

let resumidero = 0; 

function medirMs(funcion, historial, consultas) {
  const t0 = process.hrtime.bigint();
  let acum = 0;
  for (const [desde, hasta] of consultas) acum += funcion(historial, desde, hasta);
  const t1 = process.hrtime.bigint();
  resumidero += acum;
  return Number(t1 - t0) / 1e6; 
}

function medirConProtocolo(funcion, historial, consultas) {
  medirMs(funcion, historial, consultas.slice(0, CALENTAMIENTO));
  const tiempos = [];
  for (let c = 0; c < CORRIDAS; c++) tiempos.push(medirMs(funcion, historial, consultas));
  const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
  const ruido = ((Math.max(...tiempos) - Math.min(...tiempos)) / promedio) * 100;
  return { promedio, ruido, tiempos };
}

function verificar() {
  const historial = generarHistorial(5000);
  for (const [desde, hasta] of generarConsultasSemanales(5000, 500)) {
    const a = ventasSemanaIngenua(historial, desde, hasta);
    const b = ventasSemanaAdecuada(historial, desde, hasta);
    if (a !== b) throw new Error(`Resultados distintos en [${desde}, ${hasta}]: ${a} vs ${b}`);
  }
  console.log("Verificación: las dos versiones dan el mismo resultado en 500 consultas.\n");
}

function main() {
  verificar();
  const filas = [];
  for (const n of TAMANOS) {
    const historial = generarHistorial(n);
    const consultas = generarConsultasSemanales(n, CONSULTAS);
    const ing = medirConProtocolo(ventasSemanaIngenua, historial, consultas);
    const ade = medirConProtocolo(ventasSemanaAdecuada, historial, consultas);
    filas.push({ n, ing, ade });
  }

  console.log("n".padStart(9) + " | " + "ingenua ms".padStart(11) + " | " + "x anterior".padStart(10) +
    " | " + "ruido".padStart(6) + " | " + "adecuada ms".padStart(12) + " | " + "x anterior".padStart(10) +
    " | " + "ruido".padStart(6));
  console.log("-".repeat(82));
  filas.forEach((f, i) => {
    const xIng = i === 0 ? "—" : "x" + (f.ing.promedio / filas[i - 1].ing.promedio).toFixed(2);
    const xAde = i === 0 ? "—" : "x" + (f.ade.promedio / filas[i - 1].ade.promedio).toFixed(2);
    console.log(
      String(f.n).padStart(9) + " | " + f.ing.promedio.toFixed(2).padStart(11) + " | " + xIng.padStart(10) +
      " | " + (f.ing.ruido.toFixed(0) + "%").padStart(6) + " | " + f.ade.promedio.toFixed(3).padStart(12) +
      " | " + xAde.padStart(10) + " | " + (f.ade.ruido.toFixed(0) + "%").padStart(6)
    );
  });

  console.log("\nTiempos de cada corrida (ms), para ver el ruido:");
  for (const f of filas) {
    console.log(`n=${f.n}: ingenua [${f.ing.tiempos.map((t) => t.toFixed(2)).join(", ")}]  adecuada [${f.ade.tiempos.map((t) => t.toFixed(3)).join(", ")}]`);
  }
  console.log("\n(control interno: " + resumidero + ")");
}

main();
// ejecutar con pnpm dev