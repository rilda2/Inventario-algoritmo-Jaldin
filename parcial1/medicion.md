Rilda Jaldin Lopez

Se midieron las funciones HayRepetidosPorPares y HayRepetidosCurado utilizando listas sin elementos repetidos, generadas mediante GenerarSinRepetidos, para evaluar el peor caso de la solución por pares.

Se utilizaron cuatro tamaños: 5.000, 10.000, 20.000 y 40.000 carnets. Para cada tamaño se realizó una corrida de calentamiento, tres corridas medidas y se calculó el promedio de los tiempos obtenidos.

La funcion HayRepetidosCurado utiliza un conjunto (Set) para almacenar los carnets visitados y comprobar si alguno ya existe, su costo es O(n) en promedio.

Tabla de resultados

| n | Por pares (ms) | Factor | Curada (ms) | Factor |
|---:|---:|---:|---:|---:|
| 5.000 | 11.728 | - | 1.003 | - |
| 10.000 | 42.340 | 3.61x | 0.983 | 0.98x |
| 20.000 | 180.595 | 4.27x | 2.974 | 3.03x |
| 40.000 | 739.528 | 4.09x | 4.851 | 1.63x |

Conclusiones

La solucion por pares presento un crecimiento cercano a O(n²), porque al duplicar la cantidad de elementos sus tiempos aumentaron aproximadamente cuatro veces. La solucion curada presento un crecimiento mucho menor, correspondiente a O(n) en promedio, aunque sus factores no fueron exactamente dos.

Se observo ruido en los tiempos de la solucion curada, especialmente porque algunas mediciones fueron muy pequeñas y sensibles a las variaciones del sistema. Por eso sus factores no aumentaron de manera regular.

El peor promedio registrado fue de 739.528 ms aproximadamente 0,74 segundos correspondiente a la solucion por pares con 40.000 carnets.
