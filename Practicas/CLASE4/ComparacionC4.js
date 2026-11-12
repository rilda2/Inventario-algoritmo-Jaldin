
import fs from "node:fs";
import { performance } from "node:perf_hooks";

const cantidadDatos = 1_000_000;
const cantidadClaves = 1_000;

const arreglo = Array.from(
    { length: cantidadDatos },
    (_, i) => i
);

const claves = Array.from(
    { length: cantidadClaves },
    (_, i) => Math.floor(
        i * (cantidadDatos - 1) / (cantidadClaves - 1)
    )
);

//búsqueda lineal
function busquedaLineal(arreglo, clave) {
    for (let i = 0; i < arreglo.length; i++) {
        if (arreglo[i] === clave) {
            return i;
        }
    }
    return -1;
}

// búsqueda binaria
function busquedaBinaria(arreglo, clave) {
    let inicio = 0;
    let fin = arreglo.length - 1;

    while (inicio <= fin) {
        const medio = Math.floor((inicio + fin) / 2);

        if (arreglo[medio] === clave) {
            return medio;
        }

        if (arreglo[medio] < clave) {
            inicio = medio + 1;
        } else {
            fin = medio - 1;
        }
    }

    return -1;
}


function ejecutarBusqueda(algoritmo) {
    let encontrados = 0;
    let sumaPosiciones = 0;

    for (const clave of claves) {
        const posicion = algoritmo(arreglo, clave);

        if (posicion !== -1) {
            encontrados++;
            sumaPosiciones += posicion;
        }
    }

    return { encontrados, sumaPosiciones };
}

console.log("Calentando los algoritmos...");

ejecutarBusqueda(busquedaLineal);
ejecutarBusqueda(busquedaBinaria);

function medir(algoritmo, nombre) {
    const tiempos = [];

    for (let i = 0; i < 3; i++) {
        const inicio = performance.now();

        const resultado = ejecutarBusqueda(algoritmo);

        const fin = performance.now();

        if (resultado.encontrados !== cantidadClaves) {
            throw new Error("No se encontraron todas las claves");
        }

        tiempos.push(fin - inicio);

        console.log(
            `${nombre}, corrida ${i + 1}: ${tiempos[i].toFixed(3)} ms`
        );
    }

    const promedio = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;

    return { tiempos, promedio };
}


console.log("\nMidiendo búsqueda lineal...");
const lineal = medir(busquedaLineal, "Lineal");

console.log("\nMidiendo búsqueda binaria...");
const binaria = medir(busquedaBinaria, "Binaria");

const cociente = lineal.promedio / binaria.promedio;

// Resultados
console.log("\n===== RESULTADOS FINALES =====");

console.table([
    {
        Algoritmo: "Lineal",
        Corrida1: lineal.tiempos[0].toFixed(3),
        Corrida2: lineal.tiempos[1].toFixed(3),
        Corrida3: lineal.tiempos[2].toFixed(3),
        Promedio: lineal.promedio.toFixed(3) + " ms"
    },
    {
        Algoritmo: "Binaria",
        Corrida1: binaria.tiempos[0].toFixed(3),
        Corrida2: binaria.tiempos[1].toFixed(3),
        Corrida3: binaria.tiempos[2].toFixed(3),
        Promedio: binaria.promedio.toFixed(3) + " ms"
    }
]);

console.log(
    `Cociente lineal / binaria: ${cociente.toFixed(2)}`
);

console.log(
    `La búsqueda lineal tardó ${cociente.toFixed(2)} veces lo que tardó la binaria.`
);
// PARA EJECUTAR: pnpm dev