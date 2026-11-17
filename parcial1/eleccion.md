Rilda Jaldin Lopez

# P1.3 — Eleccion

# Comparacion de las opciones

Datos:
n = 300.000 numeros de historia clinica.
q = 5.000 consultas diarias.
log₂(300.000) = 18,23.

Opcion 1: busqueda lineal
En cada consulta se recorre el listado hasta encontrar el numero o llegar al final.

Costo aproximado: 5.000 × 300.000 = **1.500.000.000 operaciones.

Opcion 2: ordenar una vez y utilizar busqueda binaria

Se ordena el listado una sola vez con un algoritmo de costo O(n log n), y luego se realizan las consultas.

Costo aproximado
Ordenamiento 300.000 × 18,23 = 5.469.000 operaciones.
Consultas 5.000 × 18,23 = 91.150 operaciones.
Total = 5.560.150 operaciones aproximadamente.


Opcion 3: ordenar con un algoritmo cuadrático y utilizar búsqueda binaria

El ordenamiento tiene un costo aproximado de O(n²).
Ordenamiento 300.000 × 300.000 = 90.000.000.000 operaciones.
Consultas 5.000 × 18,23 = 91.150 operaciones.
Total = 90.000.091.150 operaciones aproximadamente.

## Eleccion

Elijo la opcion 2, porque realiza el ordenamiento una sola vez y despues permite encontrar los numeros mediante busqueda binaria. Su costo total es mucho menor que recorrer toda la lista en cada consulta.


# A partir de cuántas consultas cambiaría de opinión?

La busqueda lineal cuesta aproximadamente n operaciones por consulta, mientras que ordenar y buscar en binario cuesta aproximadamente n log₂(n) para ordenar y log₂(n) por consulta.

q × n = n log₂(n) + q × log₂(n)

Con n = 300.000:

q = 18,23 consultas.

Por lo tanto desde aproximadamente 19 consultas conviene ordenar primero y utilizar busqueda binaria. Como el hospital realiza 5.000 consultas.

# Relacion con la medicion

En P1.2 comparare una busqueda lenta con una version mejorada. Los resultados permitiran observar cuunto puede mejorar el tiempo de busqueda al utilizar en algoritmo binario.