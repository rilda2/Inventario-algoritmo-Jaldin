// Rilda Jaldin Lopez

// ingenua prueba todos los subconjuntos
class PlanificadorIngenuo {
  constructor() { this.elegidos = []; }
  elegir(paquetes, capacidad) {
    const n = paquetes.length;
    let mejor = 0, mejorMascara = 0;
    for (let mascara = 0; mascara < 2 ** n; mascara++) {
      let kg = 0, ganancia = 0;
      for (let i = 0; i < n; i++)
        if (mascara & (1 << i)) { kg += paquetes[i].kg; ganancia += paquetes[i].ganancia; }
      if (kg <= capacidad && ganancia > mejor) { mejor = ganancia; mejorMascara = mascara; }
    }
    this.elegidos = [];
    for (let i = 0; i < n; i++) if (mejorMascara & (1 << i)) this.elegidos.push(paquetes[i].codigo);
    return { ganancia: mejor, codigos: [...this.elegidos] };
  }
  estaEnElViaje(codigo) { return this.elegidos.includes(codigo); }   
}

// mejorada dinamica mochila Set 
class PlanificadorMejorado {
  constructor() { this.enViaje = new Set(); }
  elegir(paquetes, capacidad) {
    const n = paquetes.length;
    const tabla = [];
    for (let i = 0; i <= n; i++) tabla.push(new Int32Array(capacidad + 1));   
    for (let i = 1; i <= n; i++) {
      const { kg, ganancia } = paquetes[i - 1];
      for (let c = 0; c <= capacidad; c++) {
        tabla[i][c] = tabla[i - 1][c];                                   
        if (kg <= c) {                                                   
          const llevandolo = tabla[i - 1][c - kg] + ganancia;
          if (llevandolo > tabla[i][c]) tabla[i][c] = llevandolo;
        }
      }
    }

    this.enViaje = new Set();
    let c = capacidad;
    for (let i = n; i >= 1; i--) {
      if (tabla[i][c] !== tabla[i - 1][c]) {      
        this.enViaje.add(paquetes[i - 1].codigo);
        c -= paquetes[i - 1].kg;
      }
    }
    return { ganancia: tabla[n][capacidad], codigos: [...this.enViaje] };
  }
  estaEnElViaje(codigo) { return this.enViaje.has(codigo); }           
}

const lote = (...d) => d.map(([codigo, kg, ganancia]) => ({ codigo, kg, ganancia }));

const casos = [
  ['el voraz se equivoca', lote(['P1',10,60],['P2',20,100],['P3',30,120]), 50, 220, ['P2','P3']],
  ['cuatro paquetes',      lote(['P1',2,3],['P2',3,4],['P3',4,5],['P4',5,6]), 8, 10, ['P2','P4']],
  ['capacidad cero',       lote(['P1',5,10],['P2',7,12]), 0, 0, []],
  ['sin paquetes',         lote(), 30, 0, []],
  ['nada cabe',            lote(['P1',40,90],['P2',50,100]), 30, 0, []],
  ['entran todos',         lote(['P1',5,10],['P2',7,12],['P3',3,4]), 100, 26, ['P1','P2','P3']],
];

function probar(titulo, Clase) {
  let bien = 0, total = 0;
  for (const [que, paquetes, capacidad, esperada, codigos] of casos) {
    const { ganancia, codigos: elegidos } = new Clase().elegir(paquetes, capacidad);
    total++;
    const ok = ganancia === esperada && JSON.stringify([...elegidos].sort()) === JSON.stringify([...codigos].sort());
    if (ok) bien++;
    else console.log(`   MAL en «${que}»: esperado ${esperada} con [${codigos}], obtuvo ${ganancia} con [${elegidos}]`);
  }
  const p = new Clase();
  p.elegir(casos[0][1], casos[0][2]);
  total += 2;
  if (p.estaEnElViaje('P2')) bien++; else console.log('   MAL en «estaEnElViaje(P2)»: esperado true');
  if (!p.estaEnElViaje('P1')) bien++; else console.log('   MAL en «estaEnElViaje(P1)»: esperado false');
  console.log(`${titulo}: ${bien} de ${total} pruebas correctas`);
}

function crearAzar(semilla) {
  let s = semilla;
  return (min, max) => {           
    s = (s * 1664525 + 1013904223) % 4294967296;
    return min + Math.floor((s / 4294967296) * (max - min));
  };
}

function ejecutarCarga(plan, n) {
  const azar = crearAzar(n);
  const paquetes = [];
  for (let i = 0; i < n; i++) paquetes.push({ codigo: 'C' + i, kg: azar(5, 60), ganancia: azar(10, 100) });
  const capacidad = Math.floor(paquetes.reduce((s, p) => s + p.kg, 0) / 3);
  return plan.elegir(paquetes, capacidad).ganancia;
}

// 1 calentamiento mas 3 corridas medidas mas promedio 
function medir(Clase, n) {
  ejecutarCarga(new Clase(), n);                       
  let suma = 0;
  for (let k = 0; k < 3; k++) {
    const t0 = performance.now();
    ejecutarCarga(new Clase(), n);
    suma += performance.now() - t0;
  }
  return suma / 3;
}

probar('PlanificadorIngenuo ', PlanificadorIngenuo);
probar('PlanificadorMejorado', PlanificadorMejorado);

const N = parseInt(process.argv[2] || '16', 10);
console.log('\nMedición (1 calentamiento + 3 corridas, promedio en ms)');
console.log('n'.padStart(4), 'ingenuo'.padStart(11), 'x'.padStart(6), 'mejorado'.padStart(11), 'x'.padStart(6), 'misma ganancia'.padStart(16));
let prevI = null, prevM = null;
for (const n of [N, N + 2, N + 4, N + 6]) {
  const ti = medir(PlanificadorIngenuo, n), tm = medir(PlanificadorMejorado, n);
  const igual = ejecutarCarga(new PlanificadorIngenuo(), n) === ejecutarCarga(new PlanificadorMejorado(), n);
  console.log(String(n).padStart(4), ti.toFixed(2).padStart(11),
    (prevI ? 'x' + (ti / prevI).toFixed(1) : '—').padStart(6),
    tm.toFixed(3).padStart(11), (prevM ? 'x' + (tm / prevM).toFixed(1) : '—').padStart(6),
    String(igual).padStart(16));
  prevI = ti; prevM = tm;
}

{
  const azar = crearAzar(1000);
  const paquetes = [];
  for (let i = 0; i < 1000; i++) paquetes.push({ codigo: 'G' + i, kg: azar(5, 60), ganancia: azar(10, 100) });
  new PlanificadorMejorado().elegir(paquetes, 10000);          // calentamiento
  let suma = 0;
  for (let k = 0; k < 3; k++) {
    const t0 = performance.now();
    new PlanificadorMejorado().elegir(paquetes, 10000);
    suma += performance.now() - t0;
  }
}