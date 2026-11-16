# Control diario de ventas — Salteñas Panchos

## 1. Proceso y datos
Proceso: al cerrar el día el dueño cuenta los productos que quedan, revisa las ventas y calcula el total ( rondando los 15 minutos, pudiendo cometer errores).

Datos hoy: 4 productos, es decir 4 registros por día de atención(martes a domingo, 6 días a la semana).
Peor mes: 4 registros × 26 días = 104 registros por mes
(1.248 por año).
Orden: los registros se anotan por fecha, en el orden en que ocurren
las ventas.

## 2. Operación que más pesa
Obtener el reporte de ventas: total vendido del día y unidades
sobrantes por producto. Se repite cada día de atención y cada vez que el dueño consulta "¿cuánto llevo vendido?".

## 3. Dos candidatos
Candidato A: recorrer toda la lista de ventas, filtrar por fecha y sumar. → O(n) por consulta.

Candidato B: ordenar por fecha una vez y luego usar búsqueda binaria para ubicar el inicio del día y sumar ese bloque.
Ordenar cuesta O(n log n), pero se paga una sola vez y los
registros ya entran ordenados por fecha.
Cada consulta cuesta O(log n) para encontrar el día, más 4 sumas, los 4 productos de ese día. Como 4 es fijo, queda en O(log n) por consulta.

## 4. Elección y porqué

Elijo B, porque la consulta se repite todos los días y A se vuelve más lenta a medida que se acumulan las ventas. B solo necesita los registros ordenados por fecha, y en el proceso ya lo están, así que no pago el costo de ordenar.

Descarto A porque, aunque es más simple y con pocos datos, su costo crece con cada venta que se acumula y la consulta se repite todos los días.


## 5. Cómo lo voy a medir
Para comprobar lo que dice el punto 4:
Comparo A y B con n = 104, 1.000, 10.000 y 100.000 registros
(1.000 consultas, 5 repeticiones, mediana, mismo equipo).
Mido cuánto cuesta ordenar una vez, por si los registros llegaran desordenados.
Veo la diferencia con mi tamaño real (n = 104) para confirmar la limitación.
