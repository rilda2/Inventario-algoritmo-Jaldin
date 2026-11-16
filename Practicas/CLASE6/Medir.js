
const TAMANOS = [104, 1000, 10000, 100000]; 
const CONSULTAS = 1000;                     
const REPETICIONES = 5;                    

const PRODUCTOS = [
  { nombre: "Salteña", precio: 11, base: 40 },
  { nombre: "Pizza", precio: 50, base: 15 },
  { nombre: "Empanada", precio: 7, base: 25 },
  { nombre: "Refresco", precio: 10, base: 20 },
];

function generarRegistros(n) {
  const registros = [];
  const f = new Date(Date.UTC(2026, 10, 3)); 
  for (let i = 0; i < n; i++) {
    if (i > 0 && i % PRODUCTOS.length === 0) {
      f.setUTCDate(f.getUTCDate() + 1);
      if (f.getUTCDay() === 1) f.setUTCDate(f.getUTCDate() + 1); // lunes cerrado
    }
    const p = PRODUCTOS[i % PRODUCTOS.length];
    const vendida = p.base + ((i * 7) % 10);
    registros.push({
      fecha: f.toISOString().slice(0, 10),
      producto: p.nombre,
      precio_unitario: p.precio,
      cantidad_vendida: vendida,
      total_venta: p.precio * vendida,
    });
  }
  return registros;
}

//  Candidato A
function totalDiaA(registros, fecha) {
  let total = 0;
  for (let i = 0; i < registros.length; i++) {
    if (registros[i].fecha === fecha) total += registros[i].total_venta;
  }
  return total;
}

//  Candidato B
function primerIndice(registros, fecha) {
  let lo = 0, hi = registros.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (registros[mid].fecha < fecha) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}
function totalDiaB(registros, fecha) {
  let i = primerIndice(registros, fecha);
  let total = 0;
  while (i < registros.length && registros[i].fecha === fecha) {
    total += registros[i].total_venta;
    i++;
  }
  return total;
}


function mezclar(arr) {
  const copia = arr.slice();
  let semilla = 12345;
  for (let i = copia.length - 1; i > 0; i--) {
    semilla = (semilla * 1103515245 + 12345) % 2147483648;
    const j = semilla % (i + 1);
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
function ordenarPorFecha(arr) {
  return arr.sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
}


function mediana(arr) {
  const s = [...arr].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function medir(fn) {
  const tiempos = [];
  let guardia = 0; 
  for (let r = 0; r < REPETICIONES; r++) {
    const t0 = performance.now();
    guardia += fn();
    tiempos.push(performance.now() - t0);
  }
  return mediana(tiempos);
}

function medirOrdenar(registros) {
  const tiempos = [];
  for (let r = 0; r < REPETICIONES; r++) {
    const copia = mezclar(registros);
    const t0 = performance.now();
    ordenarPorFecha(copia);
    tiempos.push(performance.now() - t0);
  }
  return mediana(tiempos);
}


console.log(`Consultas por medición: ${CONSULTAS} | repeticiones: ${REPETICIONES} (mediana)\n`);
console.log(
  "n".padStart(8),
  "A (ms)".padStart(10),
  "B (ms)".padStart(10),
  "A / B".padStart(9),
  "ordenar (ms)".padStart(14),
  "equilibrio".padStart(12)
);

for (const n of TAMANOS) {
  const registros = generarRegistros(n); 

  const fechas = [];
  for (let q = 0; q < CONSULTAS; q++) {
    fechas.push(registros[Math.floor((q * 7919) % n)].fecha);
  }


  for (const f of fechas.slice(0, 50)) {
    const a = totalDiaA(registros, f);
    const b = totalDiaB(registros, f);
    if (a !== b) {
      console.error(`ERROR: resultados distintos para ${f}: A=${a} B=${b}`);
      process.exit(1);
    }
  }

  const tA = medir(() => { let s = 0; for (const f of fechas) s += totalDiaA(registros, f); return s; });
  const tB = medir(() => { let s = 0; for (const f of fechas) s += totalDiaB(registros, f); return s; });
  const tOrdenar = medirOrdenar(registros);

  
  const ahorroPorConsulta = (tA - tB) / CONSULTAS;
  const equilibrio = ahorroPorConsulta > 0 ? Math.ceil(tOrdenar / ahorroPorConsulta) : "nunca";

  console.log(
    String(n).padStart(8),
    tA.toFixed(3).padStart(10),
    tB.toFixed(3).padStart(10),
    (tA / Math.max(tB, 0.001)).toFixed(1).padStart(8) + "x",
    tOrdenar.toFixed(3).padStart(14),
    String(equilibrio).padStart(12)
  );
}
//pnpm dev