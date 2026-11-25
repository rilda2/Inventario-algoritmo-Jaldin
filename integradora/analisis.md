Rilda Jaldin Lopez

## I1 Analizar y elegir - furgoneta de reparto

a) Costo  O de `PlanificadorIngenuo.Elegir`

El costo es O(n x 2n), prueba todos los subconjuntos de paquetes que son 2n cada paquete se lleva o no. Por cada subconjunto recorre los n paquetes para sumar kilos y ganancia. Como 2n crece mucho mas rapido que n, se dice que es exponencial. Cada paquete mas duplica el trabajo.

b) La versión recursiva T(n) = 2T(n-1) + 1

La version recursiva para cada paquete lo llevo o no lo llevo se llama dos veces con un paquete menos, y suma 1 de trabajo por llamada.

¿Por qué el teorema maestro de bolsillo NO se aplica aquí y cuánto cuesta?
El teorema es para T(n) = a x T(n/b) + nd, donde el problema se divide entre b en cada paso. El problema solo se achica restando 1 (n-1) no se divide. 

Cuanto cuesta: desarrollando T(n) = 2n·T(0) + (2n - 1) = 2ⁿ⁺¹ - 1 (con T(0) = 1) o sea O(2n). Se comprueba T(1) = 3, T(2) = 7, T(3) = 15.

c) ¿Sirve un algoritmo voraz?

No. El voraz toma los paquetes por mayor ganancia por kg hasta que no quepa otro. Contraejemplo con el primer caso de las pruebas, capacidad 50 kg:

| Paquete | Kg | Ganancia | Ganancia por kg |
|---|---|---|---|
| P1 | 10 | 60 | 6 |
| P2 | 20 | 100 | 5 |
| P3 | 30 | 120 | 4 |

-Voraz toma P1 10 kg, luego P2 30 kg en total. P3 ya no cabe 60 > 50. Ganancia 60 + 100 = 160 Bs.

-Optimo: P2 + P3 = 50 kg, ganancia 100 + 120 = 220 Bs.

El voraz queda 60 Bs por debajo, porque su primera elección (P1) deja espacio mal aprovechado y no se puede deshacer.


Estrategia elegida - programacion dinamica.

-se repite la recursion "lo llevo o no lo llevo" vuelve a resolver los mismos subproblemas, mejor ganancia con los primeros paquetes y capacidad. Hay solo n × capacidad + 1 subproblemas distintos, pero la recursion sin memoria los recalcula una y otra vez. La programacion dinamica guarda cada uno en una tabla y lo calcula una sola vez.

-funciona por que la tabla se llena de arriba hacia abajo y cada casilla tabla[i][c] la mejor ganancia con los primeros i paquetes y capacidad c se calcula con casillas que ya estan llenas. Para el paquete i hay solo dos opciones:
No llevarlo: la ganancia es la misma que sin ese paquete.
Llevarlo si cabe: sumo su ganancia a lo mejor que se puede hacer con el espacio que queda

Costo: O(n x W) donde n es el numero de paquetes y W la capacidad en kg. La tabla tiene n filas y W + 1 columnas, y cada casilla se llena con una sola comparacion. Por eso el trabajo es n × W y guardar toda la tabla ocupa esa misma cantidad de numeros.


d) Estructura 

Un Set conjunto con los codigos de los paquetes elegidos has(codigo) cuesta O(1)*en promedio. Recorrer la lista de elegidos cuesta O(k), con k paquetes en el viaje. Como se consulta varias veces, el Set ahorra recorrer la lista en cada consulta.