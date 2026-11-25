const productos = [
  { nombre: 'Salteña',  costo: 6,  ganancia: 5  },  
  { nombre: 'Pizza',    costo: 30, ganancia: 20 },  
  { nombre: 'Empanada', costo: 4,  ganancia: 3  },  
  { nombre: 'Refresco', costo: 10, ganancia: 2  }, 
];

// fuerza bruta prueba todas las cantidades posibles de cada producto y se queda con la mejor.
function fuerzaBruta(demandas, capital) {
  let mejorGanancia = 0;
  function probar(i, gastado, ganado) {
    if (i === productos.length) {                 
      if (ganado > mejorGanancia) mejorGanancia = ganado;
      return;
    }
    for (let cantidad = 0; cantidad <= demandas[i]; cantidad++) {
      const nuevoGasto = gastado + cantidad * productos[i].costo;
      if (nuevoGasto > capital) break;             // no alcanza el dinero
      probar(i + 1, nuevoGasto, ganado + cantidad * productos[i].ganancia);
    }
  }

  probar(0, 0, 0);
  return mejorGanancia;
}

// programacion dinamica
function dinamica(demandas, capital) {
  let tabla = new Array(capital + 1).fill(0);      // sin productos: ganancia 0 con cualquier capital

  for (let i = 0; i < productos.length; i++) {
    const nueva = new Array(capital + 1).fill(0);
    for (let c = 0; c <= capital; c++) {
      nueva[c] = tabla[c];                         // opción: no preparar este producto
      for (let cantidad = 1; cantidad <= demandas[i]; cantidad++) {
        const gasto = cantidad * productos[i].costo;
        if (gasto > c) break;                      // con c Bs no alcanza para tantas
        const ganancia = tabla[c - gasto] + cantidad * productos[i].ganancia;
        if (ganancia > nueva[c]) nueva[c] = ganancia;
      }
    }
    tabla = nueva;
  }

  return tabla[capital];
}

// 1 corrida de calentamiento, 3 corridas medidas, promedio
function medir(funcion, demandas, capital) {
  funcion(demandas, capital);                      
  let total = 0;
  for (let i = 0; i < 3; i++) {
    const inicio = performance.now();
    funcion(demandas, capital);
    total += performance.now() - inicio;
  }
  return total / 3;                                
}

console.log('\ndemanda capital ganancia  bruta(ms) bruta(x)  dinamica(ms) dinamica(x)');
let bAnterior = null;
let dAnterior = null;

for (const demanda of [10, 20, 40, 80]) {
  const demandas = [demanda, demanda, demanda, demanda];
  const capital = 15 * demanda;

  const resultadoBruta = fuerzaBruta(demandas, capital);
  const resultadoDinamica = dinamica(demandas, capital);
  if (resultadoBruta !== resultadoDinamica) {
    throw new Error(`Resultados distintos con demanda ${demanda}: ${resultadoBruta} vs ${resultadoDinamica}`);
  }

  const msBruta = medir(fuerzaBruta, demandas, capital);
  const msDinamica = medir(dinamica, demandas, capital);
  const xBruta = bAnterior ? 'x' + (msBruta / bAnterior).toFixed(1) : '—';
  const xDinamica = dAnterior ? 'x' + (msDinamica / dAnterior).toFixed(1) : '—';

  console.log(
    String(demanda).padStart(7), String(capital).padStart(7), String(resultadoBruta).padStart(8),
    msBruta.toFixed(2).padStart(11), xBruta.padStart(9),
    msDinamica.toFixed(3).padStart(13), xDinamica.padStart(11)
  );
  bAnterior = msBruta;
  dAnterior = msDinamica;
}
