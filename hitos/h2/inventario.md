# Inventario — Salteñas Panchos

## 1. Datos que guarda mi proceso

Que guarda: cantidad vendida,  producto o stock restante, tipos de producto, precio de producto, cantidad ingresada de producto, total ventas de cada producto.
Hoy: 4 productos, 4 registros por día de atención.
Peor mes: 4 registros × 26 días = 104 registros por mes 

## 2. Operaciones que hago
Buscar un producto por nombre o los registros de una fecha 
Insertar  o registrar la venta o la entrada del día 
Anular o corregir un registro mal anotado 
Reporte del día o historial por fecha 
mostrar los producto vendidos y el stock restante 
mostrar ventas entre dos fechas semana o mes

## 3. Cuáles hago más veces

Muchas veces, registrar cada venta y el ingreso de cada producto para su venta.
Buscar un producto para cada venta cuando necesita precio y stock disponible.
Varias por dia es el reporte del día y el total vendido.
Pocas veces, consultar las ventas de varios días como de toda una semana o de todo un mes.
Muy pocas borrar solo para corregir errores.

## 4. Que estructura resuelve barato cada una y cuál sufre

-Proceso que voy a solucionar:
El control diario de ventas y stock disponible de cada producto. 

-Qué sufre hoy sin este proceso: 
Perdida de tiempo, puede equivocarse al contar, puede perder información y no conoce con exactitud sus ingresos diarios.

-Punto de partida:
Los registros se anotan por producto, día, fecha y año, en el orden en que ocurren las ventas. Es decir ya están ordenados. Por eso puedo usar una búsqueda binaria sin pagar el costo de ordenar primero.

-Necesito orden o rangos? 
Si, el reporte del día y las ventas de una semana o un mes son consultas por fecha y por rango, y para eso necesito los registros ordenados por fecha.

Buscar por clave? 
Para los productos precio, stock y vendido si es buscar por clave, y ahí conviene el hash.
Por eso es conveniente usar dos estructuras, una para cada necesidad.

1. Buscar un producto por nombre
Cómo se hace hoy: se busca producto por producto en el registro.
Recomendado: tabla hash (nombre → precio y stock disponible).
Por que la función hash convierte el nombre en una posición directa asi que no recorre nada: O(1) promedio, sin importar cuantos productos existan. 
Sufre: lista sin ordenar O(n), porque hay que mirar uno por uno.

2. Registrar la venta o la entrada del dia
Como se hace hoy: al inicio del día se anota la entrada de cada producto, y durante el día cada venta se anota en orden, una debajo de otra en el registro.
Recomendado: lista o arreglo, agregando cada registro al final O(1).
Por que las ventas ocurren en orden, así que agregar al final mantiene los registros ordenados por fecha sin mover nada ni volver a ordenar. 
Sufre: arreglo ordenado si inserto en el medio O(n), porque habría que correr todos los registros siguientes hasta 103 movimientos por cada inserción en el peor mes. En este caso eso no ocurre, porque no se inserta en medio.


3. Anular o corregir un registro mal anotado
Cómo se hace hoy: se tacha o se reescribe a mano.
Recomendado: corregir el valor del registro en su lugar sin borrarlo.
Por que si cambio el valor y no quito el registro, no hay que desplazar nada: O(1) si ya sé su posición, u O(log n) si lo ubico con binaria por fecha.
Sufre: borrar un registro de un arreglo O(n), por tener que correr los elementos.

4. Reporte del día 
Cómo se hace hoy: al cierre se cuenta y se suma todo a mano, unos 15 minutos al finalizar las ventas.
Recomendado: arreglo ordenado por fecha mas busqueda binaria.
Por que el historial está ordenado, entonces cada día tiene 4 registros, uno por producto y todos con la misma fecha. Con la binaria ubico el primer registro de esa fecha con unos pasos y leo los 4 registros seguidos, que están juntos por el orden: O(log n + 4) = O(log n).
Sufre: tabla hash. Va directo a una casilla no guarda orden, asi que para pedir los registros del día tendría que revisar todo O(n).



5. Mostrar los productos vendidos y el stock restante
Como se hace hoy: se cuenta fisicamente lo que queda y se revisan las ventas.
Recomendado: tabla hash (producto → vendido y stock), actualizada en cada venta.
Por que el dato ya está acumulado, así que no se recalcula. Consultarlo es O(1) por producto, y son solo 4.
Sufre: recalcular recorriendo todo el historial cada vez O(n). Es lo que hoy se hace a mano.


6. Consultar las ventas entre dos fechas (una semana o un mes completo)
Como se hace hoy: se suman a mano los registros de esos días.
Recomendado: arreglo ordenado por fecha mas búsqueda binaria.
Por que ubico la fecha de inicio con binaria y leo seguido hasta la fecha final: O(log n + k). Una semana son k = 24 registros (6 días × 4) y un mes son k = 104.
Sufre: tabla hash, O(n), porque un rango no es una clave: el hash solo va a una casilla y no sabe que valores hay entre dos fechas.


## Elección
tabla hash para los productos funciones como buscar y mostrar vendidos, stock disponible y para el historial de ventas un arreglo ordenado por fecha que permite utilizar la busqueda binaria para localizar rápidamente ventas de un día o periodo especifico.

-La peor estructura para mi caso: la lista sin ordenar para el historial, porque es lo que se hace hoy revisar registro por registro. 

-Solucion ingenua :
Mi primera solucion fue la busqueda lineal al recorrer todo el historial registro por registro y quedarme con los de la semana. Pense en este metodo porque es lo que se hace hoy a mano revisar uno por uno, y con 4 productos y 104 registros al mes funciona sin problema. Sin embargo al analizarlo mejor se observo que este metodo obliga a recorrer todo el historial incluso cuando solo se necesita consultar un periodo especifico.

-Solucion adecuada:
Al analizar el proceso con mas detalle vi que los registros ya se anotan por fecha, así que ya estan ordenados y no pago el costo de ordenar.
La consulta se repite todos los dias y el historial crece 1.248 registros al año, asi que recorrerlo todo cada vez mas.
Por eso la adecuada es el historial ordenado por fecha con busqueda binaria, ubica el inicio de la semana en O(log n) y lee seguido los 24 registros, O(log n + k).

-Por que se cambio la solucion?
Porque inicialmente se considero que recorrer todos los registros era suficiente para obtener las ventas de un periodo. Sin embargo al analizar la estructura de almacenamiento, se descubrio que al estar ordenada por fecha no era necesario revisar todo el historial.