// Rilda Jaldin Lopez
//  Receptor ingenuo, lista simple 
class ReceptorIngenuo {
  constructor() { this.lista = []; this.llegadas = 0; }
  registrar(nombre, plazo) { this.lista.push({ nombre, plazo, llegada: this.llegadas++ }); }
  prepararSiguiente() {
    if (this.lista.length === 0) return null;
    let mejor = 0;
    for (let i = 1; i < this.lista.length; i++) {
      const p = this.lista[i], m = this.lista[mejor];
      if (p.plazo < m.plazo || (p.plazo === m.plazo && p.llegada < m.llegada)) mejor = i;
    }
    return this.lista.splice(mejor, 1)[0].nombre;
  }
  estaPendiente(nombre) { return this.lista.some(p => p.nombre === nombre); }
  get pendientes() { return this.lista.length; }
}

//Heap minimo
class HeapMin {
  constructor() { this.a = []; }
  get tamano() { return this.a.length; }
  antes(x, y) { return x.plazo < y.plazo || (x.plazo === y.plazo && x.llegada < y.llegada); }
  insertar(x) {                      
    const a = this.a; a.push(x);
    let i = a.length - 1;
    while (i > 0) {
      const padre = (i - 1) >> 1;
      if (!this.antes(a[i], a[padre])) break;
      [a[i], a[padre]] = [a[padre], a[i]];
      i = padre;
    }
  }
  extraer() {
    const a = this.a;
    if (a.length === 0) return null;
    const menor = a[0];
    const ultimo = a.pop();
    if (a.length > 0) {
      a[0] = ultimo;
      let i = 0;
      while (true) {
        const izq = 2 * i + 1, der = 2 * i + 2;
        let m = i;
        if (izq < a.length && this.antes(a[izq], a[m])) m = izq;
        if (der < a.length && this.antes(a[der], a[m])) m = der;
        if (m === i) break;
        [a[i], a[m]] = [a[m], a[i]];
        i = m;
      }
    }
    return menor;
  }
}

// Receptor mejorado: heap mas Set 
class ReceptorMejorado {
  constructor() { this.heap = new HeapMin(); this.pendientesSet = new Set(); this.llegadas = 0; }
  registrar(nombre, plazo) {
    this.heap.insertar({ nombre, plazo, llegada: this.llegadas++ });
    this.pendientesSet.add(nombre);
  }
  prepararSiguiente() {
    if (this.heap.tamano === 0) return null;
    const p = this.heap.extraer();
    this.pendientesSet.delete(p.nombre);
    return p.nombre;
  }
  estaPendiente(nombre) { return this.pendientesSet.has(nombre); }
  get pendientes() { return this.pendientesSet.size; }
}

// pruebas y medicio
const guion = [
  ['registrar','Torta',120,''],['registrar','Galletas',30,''],['registrar','Pan',120,''],['registrar','Brazo',60,''],
  ['pendientes','',0,'4'],
  ['esta','Galletas',0,'true'],['esta','Flan',0,'false'],
  ['preparar','',0,'Galletas'],['esta','Galletas',0,'false'],
  ['preparar','',0,'Brazo'],
  ['registrar','Alfajor',30,''],
  ['preparar','',0,'Alfajor'],['preparar','',0,'Torta'],['preparar','',0,'Pan'],
  ['preparar','',0,'(ninguno)'],['pendientes','',0,'0'],
];

function ejecutar(g, op, arg, plazo) {
  if (op === 'registrar') { g.registrar(arg, plazo); return ''; }
  if (op === 'preparar') return g.prepararSiguiente() ?? '(ninguno)';
  if (op === 'esta') return String(g.estaPendiente(arg));
  return String(g.pendientes);
}

function probar(titulo, g) {
  let bien = 0, total = 0;
  for (const [op, arg, plazo, esperado] of guion) {
    const obtenido = ejecutar(g, op, arg, plazo);
    if (op === 'registrar') continue;
    total++;
    if (obtenido === esperado) bien++;
    else console.log(`   MAL en «${op} ${arg}»: esperado ${esperado}, obtuvo ${obtenido}`);
  }
  console.log(`${titulo}: ${bien} de ${total} pasos correctos`);
}

function ejecutarCarga(g, n) {
  for (let i = 0; i < n; i++) g.registrar('Q' + i, (((i * 6007) % 6) + 1) * 15);
  let control = 0;
  for (let i = 0; i < n; i++) control += g.prepararSiguiente().length;
  return control;
}

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

probar('ReceptorIngenuo ', new ReceptorIngenuo());
probar('ReceptorMejorado', new ReceptorMejorado());

const a = new ReceptorIngenuo(), b = new ReceptorMejorado();
for (let i = 0; i < 3000; i++) { const p = (((i * 6007) % 6) + 1) * 15; a.registrar('Q'+i, p); b.registrar('Q'+i, p); }
let igual = true;
for (let i = 0; i < 3000; i++) if (a.prepararSiguiente() !== b.prepararSiguiente()) { igual = false; break; }
console.log('Mismo orden en ambos con 3.000 pedidos:', igual);

const N = parseInt(process.argv[2] || '10000', 10);   
console.log(`\nMedición (1 calentamiento + 3 corridas, promedio en ms)`);
console.log('n'.padStart(8), 'ingenuo'.padStart(12), 'x'.padStart(6), 'mejorado'.padStart(12), 'x'.padStart(6));
let prevI = null, prevM = null;
for (const n of [N, 2 * N, 4 * N]) {
  const ti = medir(ReceptorIngenuo, n), tm = medir(ReceptorMejorado, n);
  console.log(String(n).padStart(8), ti.toFixed(1).padStart(12),
    (prevI ? 'x' + (ti / prevI).toFixed(1) : '—').padStart(6),
    tm.toFixed(1).padStart(12), (prevM ? 'x' + (tm / prevM).toFixed(1) : '—').padStart(6));
  prevI = ti; prevM = tm;
}
// pnpm dev