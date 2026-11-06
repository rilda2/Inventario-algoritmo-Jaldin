// Función de búsqueda lineal 
function busquedaLineal(arr, objetivo) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === objetivo) {
            return i;
        }
    }
    return -1;
}

function ejecutarPrueba(n) {

    const arr = Array.from({ length: n }, (_, index) => index);
    const objetivo = -1; 
    //CALENTAMIENTO 
    for (let c = 0; c < 2000; c++) {
        busquedaLineal(arr, objetivo);
    }

    let tiempos = [];

  
    for (let i = 0; i < 5; i++) {
        const inicio = performance.now(); // Alta precisión en milisegundos
        busquedaLineal(arr, objetivo);
        const fin = performance.now();
        tiempos.push(fin - inicio);
    }


    const suma = tiempos.reduce((a, b) => a + b, 0);
    return suma / tiempos.length;
}


const n = 500_000;

console.log("Calculando tiempos de ejecución...");
const tiempoN = ejecutarPrueba(n);
const tiempo4N = ejecutarPrueba(n * 4);
const tiempo16N = ejecutarPrueba(n * 16);

console.log(`\n--- RESULTADOS ---`);
console.log(`n (${n}): ${tiempoN.toFixed(2)} ms`);
console.log(`4n (${n * 4}): ${tiempo4N.toFixed(2)} ms | Ratio (4n / n): ${(tiempo4N / tiempoN).toFixed(2)}x`);
console.log(`16n (${n * 16}): ${tiempo16N.toFixed(2)} ms | Ratio (16n / 4n): ${(tiempo16N / tiempo4N).toFixed(2)}x`);
// para correr el ejercicio usa el comando: node Medicion.js