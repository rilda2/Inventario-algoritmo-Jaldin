Rilda Jaldin Lopez

# P2.3 medicion: ingenuo contra mejorado

Carga:ejecutarCarga n pedidos llegan y luego se preparan los n.
Protocolo: 1 corrida de calentamiento (se descarta) + 3 corridas medidas + promedio.

| n | Ingenuo ms | x respecto a la fila anterior | Mejorado (ms) | x respecto a la fila anterior |

| 10.000 | 150,9 | — | 12,9 | — |
| 20.000 | 948,8 | x6,3 | 26,2 | x2,0 |
| 40.000 | 4.263,1 | x4,5 | 45,4 | x1,7 |

## Conclusion

La solucion mejorada se comporta como el O declarado n log n. al duplicar n el tiempo sube cerca de x2 (x2,0 y x1,7) sin dispararse. Con n = 40.000 tarda 45 ms contra 4.263 ms de la ingenua unas 94 veces menos.

La ingenua se comporta como un costo cuadratico: al duplicar n deberia dar cerca de x4, y dio x6,3 y x4,5. La segunda fila coincide bastante con lo esperado. 

Sobre el ruido
los tiempos con pocos milisegundos como n = 10.000, son los menos confiables, porque el calentamiento del motor y el sistema operativo pesan mas. Por eso el x1,7 de la mejorada queda por debajo de x2: es variacion de medicion. Por eso se promedian 3 corridas y se mira la tendencia.