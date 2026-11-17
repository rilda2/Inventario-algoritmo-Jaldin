import { performance } from "node:perf_hooks";

// SOLUCION ORIGINAL
function HayRepetidosPorPares(carnets) {
    for (let i = 0; i < carnets.length; i++) {
        for (let j = i + 1; j < carnets.length; j++) {
            if (carnets[i] === carnets[j]) {
                return true;
            }
        }
    }
    return false;
}

// SOLUCION CURADA
function HayRepetidosCurado(carnets) {
    const vistos = new Set();

    for (const carnet of carnets) {
        if (vistos.has(carnet)) {
            return true;
        }
        vistos.add(carnet);
    }
    return false;
}

function GenerarSinRepetidos(n, semilla = 42) {
    const datos = [];

    for (let i = 0; i < n; i++) {
        datos.push(i);
    }

    let estado = semilla;

    function aleatorio(maximo) {
        estado = (estado * 16807) % 2147483647;
        return estado % maximo;
    }

    for (let i = datos.length - 1; i > 0; i--) {
        const k = aleatorio(i + 1);
        [datos[i], datos[k]] = [datos[k], datos[i]];
    }

    return datos;
}

function ProbarCasos() {
    const casos = [
        { datos: [7, 3, 9, 3, 5], esperado: true, nombre: "repetido en el medio" },
        { datos: [7, 3, 9, 4, 5], esperado: false, nombre: "sin repetidos" },
        { datos: [], esperado: false, nombre: "lista vacía" },
        { datos: [8], esperado: false, nombre: "un solo elemento" },
        { datos: [4, 1, 2, 6, 4], esperado: true, nombre: "repetido en los extremos" }
    ];

    console.log("\n--- CINCO CASOS DE PRUEBA ---");

    for (const caso of casos) {
        const lenta = HayRepetidosPorPares(caso.datos);
        const curada = HayRepetidosCurado(caso.datos);

        console.log(
            `${caso.nombre}: esperado=${caso.esperado}, ` +
            `por pares=${lenta}, curada=${curada}`
        );

        if (lenta !== caso.esperado || curada !== caso.esperado) {
            throw new Error("Una solución no pasó un caso de prueba.");
        }
    }

    console.log("Todas las pruebas fueron correctas.\n");
}

function MedirPromedio(funcion, datos) {
    const tiempos = [];

    for (let i = 0; i < 3; i++) {
        const inicio = performance.now();
        const resultado = funcion(datos);
        const fin = performance.now();

        if (resultado !== false) {
            throw new Error("Resultado inesperado en la medición.");
        }

        tiempos.push(fin - inicio);
    }

    const promedio =
        tiempos.reduce((suma, tiempo) => suma + tiempo, 0) / 3;

    return promedio;
}

function Main() {
    ProbarCasos();

    const N_BASE = 5000;

    const tamanos = [
        N_BASE,
        N_BASE * 2,
        N_BASE * 4,
        N_BASE * 8
    ];

    const resultados = [];

    console.log("--- MEDICION DE RENDIMIENTO ---");
    console.log("Una corrida de calentamiento y tres corridas medidas.\n");

    for (const n of tamanos) {
        console.log(`Midiendo con ${n} carnets...`);

        const datos = GenerarSinRepetidos(n);

        HayRepetidosPorPares(datos);
        HayRepetidosCurado(datos);

        const tiempoLento = MedirPromedio(
            HayRepetidosPorPares, datos
        );

        const tiempoCurado = MedirPromedio(
            HayRepetidosCurado, datos
        );

        resultados.push({
            n,
            tiempoLento,
            tiempoCurado
        });
    }

    console.log("\n--- TABLA DE RESULTADOS ---");
    console.log(
        "n | Por pares (ms) | Veces más | Curada (ms) | Veces más"
    );

    let anteriorLento = null;
    let anteriorCurado = null;

    for (const r of resultados) {
        const vecesLento = anteriorLento === null
            ? "-"
            : (r.tiempoLento / anteriorLento).toFixed(2) + "x";

        const vecesCurado = anteriorCurado === null
            ? "-"
            : (r.tiempoCurado / anteriorCurado).toFixed(2) + "x";

        console.log(
            `${r.n} | ${r.tiempoLento.toFixed(3)} | ${vecesLento} | ` +
            `${r.tiempoCurado.toFixed(3)} | ${vecesCurado}`
        );

        anteriorLento = r.tiempoLento;
        anteriorCurado = r.tiempoCurado;
    }

    const peor = resultados[resultados.length - 1];

    console.log("\nPeor tiempo de la solución lenta:");
    console.log(
        `${peor.tiempoLento.toFixed(3)} ms con ${peor.n} carnets.`
    );

    console.log("\nLa lista utilizada no contiene elementos repetidos.");
}

Main();