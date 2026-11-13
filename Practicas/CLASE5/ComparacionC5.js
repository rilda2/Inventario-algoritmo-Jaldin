import { performance } from "node:perf_hooks";

const cantidades = [10000, 20000, 40000, 80000];
const numeroCorridas = 3;

function generarDatos(cantidad) {
    return Array.from({ length: cantidad }, () => Math.floor(Math.random() * 1000000));
}
// insercion 
function insercion(arreglo) {
    for (let i = 1; i < arreglo.length; i++) {
        const actual = arreglo[i];
        let j = i - 1;
        while (j >= 0 && arreglo[j] > actual) {
            arreglo[j + 1] = arreglo[j];
            j--;
        }
        arreglo[j + 1] = actual;
    }
    return arreglo;
}
// mergesort
function mergeSort(arreglo) {
    const auxiliar = new Array(arreglo.length);

    function ordenar(inicio, fin) {
        if (inicio >= fin) return;
        const medio = Math.floor((inicio + fin) / 2);
        ordenar(inicio, medio);
        ordenar(medio + 1, fin);

        let i = inicio, j = medio + 1, k = inicio;
        while (i <= medio && j <= fin) {
            auxiliar[k++] = arreglo[i] <= arreglo[j] ? arreglo[i++] : arreglo[j++];
        }
        while (i <= medio) auxiliar[k++] = arreglo[i++];
        while (j <= fin) auxiliar[k++] = arreglo[j++];
        for (let x = inicio; x <= fin; x++) arreglo[x] = auxiliar[x];
    }

    ordenar(0, arreglo.length - 1);
    return arreglo;
}

function estaOrdenado(arreglo) {
    for (let i = 1; i < arreglo.length; i++) {
        if (arreglo[i - 1] > arreglo[i]) return false;
    }
    return true;
}

const algoritmos = [
    { nombre: "Inserción", fn: insercion },
    { nombre: "MergeSort", fn: mergeSort },
];

// Calentamiento y verificación 
const datosPrueba = generarDatos(1000);
for (const { nombre, fn } of algoritmos) {
    if (!estaOrdenado(fn([...datosPrueba]))) {
        throw new Error(`${nombre} no ordenó correctamente.`);
    }
}

function medir({ nombre, fn }, datos) {
    const tiempos = [];
    for (let i = 0; i < numeroCorridas; i++) {
        const copia = [...datos];
        const inicio = performance.now();
        fn(copia);
        const fin = performance.now();
        if (!estaOrdenado(copia)) throw new Error(`${nombre} no ordenó correctamente.`);
        tiempos.push(fin - inicio);
    }
    const promedio = tiempos.reduce((a, b) => a + b, 0) / numeroCorridas;
    return { tiempos, promedio };
}

const filas = [];
for (const cantidad of cantidades) {
    const datos = generarDatos(cantidad);
    for (const alg of algoritmos) {
        const { tiempos, promedio } = medir(alg, datos);
        filas.push({
            Elementos: cantidad.toLocaleString("es-ES"),
            Algoritmo: alg.nombre,
            "Corrida 1 (ms)": tiempos[0].toFixed(3),
            "Corrida 2 (ms)": tiempos[1].toFixed(3),
            "Corrida 3 (ms)": tiempos[2].toFixed(3),
            "Promedio (ms)": promedio.toFixed(3),
        });
    }
}

console.table(filas);
// ejecutar con: pnpm dev