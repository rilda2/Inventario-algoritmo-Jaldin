# Estructura — Salteñas Panchos

Productos 4: tabla hash (nombre → precio, vendido y stock).
Historial de ventas: arreglo ordenado por fecha, con cada registro agregado al final.

## Costo de cada operacion

### Buscar un producto por nombre
-Estructura: Tabla hash.
-Costo:O(1) promedio.
-Porque:Va directo a la casilla no recorre nada.

### Registrar la venta o la entrada del dia
-Estructura:Arreglo, al final.
-Costo:O(1).
-Porque:Las ventas llegan en orden de fecha, así que se agrega al final sin mover nada.

### Anular o corregir un registro
-Estructura: Arreglo.
-Costo:O(1) si se la posición, O(log n) si lo ubico por fecha.
-Porque:Se cambia el valor sin quitar el registro, no hay que desplazar.

### Reporte del dia 
-Estructura:Arreglo ordenado + binaria.
-Costo:O(log n + 4) = O(log n).
-Porque: Ubico el primer registro del dia y leo los 4 siguientes, que esten juntos.

### Mostrar vendidos y stock restante
-Estructura: Tabla hash.
-Costo: O(1) por producto.
-Porque: El dato se actualiza en cada venta, no se recalcula.

### Ventas entre dos fechas (semana o mes)
-Estructura: Arreglo ordenado mas binaria.
-Costo: O(log n + k).
-Porque:Ubico el inicio y leo seguido k registros (24 por semana, 104 por mes).


## Por que esta eleccion

Se elige por las operaciones que mas se realiza. Los productos se piden por su nombre, y para eso el hash es el mas barato. Las consultas por fecha y por rango necesitan orden, y el hash no lo guarda ni sabe de rangos, asi que el historial va en un arreglo ordenado. Como los registros ya se anotan por fecha, no pago el costo de ordenar. 

## Que costo pago por esta eleccion

-Con el hash: pierdo el orden y los rangos. Por eso no lo uso para el historial.
-Con el arreglo ordenado:buscar por nombre sería O(n), pero eso lo cubre el hash. 