# Estrategia Tienda-Salteñas Panchos

## Mi proceso
Control de ventas, ingresos y stock disponible de una tienda de salteñas, pizzas y empanadas.
Datos: producto, precio, cantidad ingresada, cantidad vendida, total de ventas y stock restante. 

## ¿Admite una estrategia voraz? NO
Un voraz necesita una propiedad de eleccion voraz y subestructura es decir, una decision que elegir.

En mi proceso no hay nada que elegir. Para saber los ingresos del dia o el stock restante hay que leer todos los registros y sumar o restar. El control de ventas no es un problema de optimizacion. No hay que elegir entre alternativas

## ¿Admite programacion dinámica? NO
Una dinamica necesita dos propiedades subproblemas que se repiten, el mismo calculo se necesita muchas veces. Soluciones optimas de pedazos mos chicos.

Por que las operaciones que se realizan como buscar un producto o una fecha, registrar, anular o corregir, reporte del dia,
productos vendidos, stock restante y ventas entre dos fechas son busquedas, actualizaciones y sumas. Aunque a veces se consulta el historial de ventas, eso es una busqueda no un subproblema que se arme con otros. No hay un resultado que maximizar o minimizar asi que no existe una mejor solucion que armar con mejores soluciones de pedazos. 

## Conclusion
Mi caso real no admite ninguna de las dos. Lo que mejora mi proceso es la estructura de datos que elegi anteriormente, no como tal una estrategia de optimizacion.

## Problema analogo para comparacion
# cuanto preparar con un capital limitado ?

Si la tienda quisiera decidir cuantas salteñas, pizzas y empanadas preparar segun el dinero disponible para comprar los insumos, tendria un problema de optimizacion conocido como problema de la mochila.

En este caso el capital disponible representa la capacidad de la mochila, el costo de los insumos representa el peso y la ganancia que genera cada producto representa su valor. El objetivo es aprovechar el dinero disponible para obtener la mayor ganancia.

| Producto | Precio de venta | Costo de insumos | Ganancia por unidad | Relación ganancia/costo |
|:---------|----------------:|-----------------:|--------------------:|------------------------:|
| Salteña  | 11 Bs           | 6 Bs             | 5 Bs                | 0.83                    |
| Pizza    | 50 Bs           | 30 Bs            | 20 Bs               | 0.67                    |
| Empanada | 7 Bs            | 4 Bs             | 3 Bs                | 0.75                    |
| Refresco | 12 Bs           | 10 Bs            | 2 Bs                | 0.20                    |

ejemplo se tienen un capital de 100 Bs y demanda esperada de 10 salteñas, 3 pizzas y 5 empanadas.

-Voraz falla, si se eligen primero los productos que generan mayor ganancia por cada boliviano invertido, se prepara primero lo que mas ganancia deja, hace 10 salteñas (60 Bs), luego 5 empanadas (20 Bs). Le quedan 20 Bs, que no alcanzan para los otros productos. Obteniendo una ganancia baja y dejando parte del capital sin utilizar. Sin embargo al combinar diferentes productos es posible obtener una ganancia mayor.


-La programacion dinamica permite encontrar una mejor combinacion, en lugar de elegir unicamente el producto mas rentable, evalua las diferentes cantidades que se pueden preparar, teniendo en cuenta el costo de los insumos, el capital disponible y la demanda esperada. De esta manera, puede encontrar una combinacion que aproveche mejor el presupuesto y genere la mayor ganancia posible.

