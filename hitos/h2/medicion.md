# Medicion — Salteñas Panchos

## La estructura ingenua

Mi primera solucion fue la busqueda lineal al recorrer todo el historial registro por registro y quedarme con los de la semana. Pense en este metodo porque es lo que se hace hoy a mano revisar uno por uno, y con 4 productos y 104 registros al mes funciona sin problema. Sin embargo al analizarlo mejor se observo que este metodo obliga a recorrer todo el historial incluso cuando solo se necesita consultar un periodo especifico.

## La estructura adecuada 

Al analizar el proceso con mas detalle vi que los registros ya se anotan por fecha, así que ya estan ordenados y no pago el costo de ordenar.
La consulta se repite todos los dias y el historial crece 1.248 registros al año, asi que recorrerlo todo cada vez mas.
Por eso la adecuada es el historial ordenado por fecha con busqueda binaria, ubica el inicio de la semana en O(log n) y lee seguido los 24 registros, O(log n + k).

## Protocolo que se siguio
Datos generados por el programa, ya ordenados por fecha, con 4 registros por dia. Cada consulta pide las ventas de una semana de 6 dias de atencion, 24 registros, 2.000 consultas por medicion.

Para cada tamaño y estructura se realizó una corrida de calentamiento y luego 3 corridas medidas. Se calculó el promedio de los tres tiempos para obtener el resultado final de la tabla.

## Resultados 
| n | Ingenua | × fila anterior | Ruido | Adecuada | × fila anterior | Ruido |
| 25.000 | 101,75 | — |             6%  | 1,292     | —             | 11% |
| 50.000 | 343,99 | ×3,38 |         70% | 0,861     | ×0,67         | 24% |
| 100.000 | 848,70 | ×2,47 |        29% | 0,981     | ×1,14         | 1% |
| 200.000 | 1494,95 | ×1,76 |       5%  | 2,121     | ×2,16         | 54% |

El ruido es cuanto vario una corrida respecto de las otras dos.

## Conclusion

-Ingenua: al pasar de 25.000 a 200.000 registros 8 veces mas datos el tiempo paso de 101,75 ms a 1494,95 ms unas 15 veces mas. Cada fila no se duplico de forma pareja (×3,38, ×2,47 y ×1,76), pero el tiempo crece con n, como predice O(n). Al dividir por la cantidad de registros revisados, el costo por registro subio de unos 2,0 ns a entre 3,4 y 4,2 ns y luego se estabilizo. 

-Adecuada: se mantuvo entre 0,86 y 2,12 ms. Con n multiplicado por 8, su tiempo se multiplico por 1,6, como predice O(log n + k): de 25.000 a 200.000 la binaria hace unos 3 pasos mas (de =15 a =18).  crece con n: a 25.000 la adecuada fue mas rapida.

-Ruido: fue grande, en la ingenua llego a 70% (con n = 50.000 una corrida tardo 502 ms contra unos 265 de las otras dos) y en la adecuada a 54%, porque sus tiempos son de aproximadamente 1 microsegundo por consulta. El ×2,16 de su ultima fila viene de ese ruido. 

