Rilda Jaldin Lopez

Se midieron las funciones HayRepetidosPorPares y HayRepetidosCurado utilizando listas sin elementos repetidos, generadas mediante GenerarSinRepetidos, para evaluar el peor caso de la solución por pares.

Se utilizaron cuatro tamaños: 5.000, 10.000, 20.000 y 40.000 carnets. Para cada tamaño se realizó una corrida de calentamiento, tres corridas medidas y se calculó el promedio de los tiempos obtenidos.

Tabla de resultados

| n | Por pares (ms) | Factor | Curada (ms) | Factor |
|---:|---:|---:|---:|---:|
| 5.000 | 11.728 | - | 1.003 | - |
| 10.000 | 42.340 | 3.61x | 0.983 | 0.98x |
| 20.000 | 180.595 | 4.27x | 2.974 | 3.03x |
| 40.000 | 739.528 | 4.09x | 4.851 | 1.63x |