Rilda Jaldin Lopez

# I3 Medicion ingenuo - Mejorado

Protocolo
1 corrida de calentamiento mas 3 corridas medidas mas promedio.


| n (paquetes) | Ingenuo (ms) | Ingenuo: veces más que la fila anterior | Mejorado (ms) | Mejorado: veces más que la fila anterior | Misma ganancia? |
|---|---|---|---|---|---|
| 16 | 10,23 | — | 0,359 | — | Si |
| 18 | 26,30 | x2,6 | 0,437 | x1,2 | Si |
| 20 | 124,85 | x4,7 | 0,421 | x1,0 | Si |
| 22 | 517,41 | x4,1 | 0,053 | x0,1 | Si |

## Conclusion

La ingenua se comporta como el O declarado O(n x 2n), cada +2 en n multiplica el tiempo por cerca de 4 (x4,7 y x4,1 en las dos úutimas filas). La primera x2,6, queda mas baja porque con tiempos tan chicos el ruido pesa mas. 

La mejorada tarda muho menos 0,053 ms contra 517,41 ms con n = 22. Su costo declarado es O(n x W), y como aqui W es un tercio del peso total, W crece con n asi que el costo crece como n2. 

Sobre el ruido la mejorada tarda menos de 0,5 ms en los cuatro tamaños y a esa escala el calentamiento del motor y el sistema operativo pesan mas que el trabajo medido. Por eso sus veces mas (x1,2, x1,0 y x0,1) saltan sin un patron . 

Mejorada con 1.000 paquetes y capacidad 10.000

Tardo 77,4 ms (promedio de 3 corridas, con calentamiento).

