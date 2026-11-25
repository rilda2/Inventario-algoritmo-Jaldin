## Problema

Mi proceso control de ventas no es viable para voraz ni dinamica, asi que uso un problema analogo de la tienda mostrando un capital limitado para comprar insumos, decidir cuantas salteñas, pizzas, empanadas y refrescos preparar sin pasar la demanda esperada de cada uno, para obtener la mayor ganancia caso de una mochila. 

## Estrategias

-fuerza bruta prueba todas las combinaciones de cantidades de los cuatro productos y se queda con la de mayor ganancia.
-programacion dinamica: utiliza una tabla de capital en la que cada valor se construye a partir de resultados ya calculados, evitando repetir trabajo.

## Verificacion

Las dos estrategias obtuvieron la misma ganancia en los cuatro tamaños evaluados: 112, 225, 452 y 905 Bs. 

## Datos de entrada

Se utilizaron cuatro tamaños que se duplican: demandas de 10, 20, 40 y 80 unidades por producto. El capital corresponde a 15 veces la demanda, dando como resultado 150, 300, 600 y 1200 Bs.


## Tabla de tiempos y resultados

| Demanda | Capital (Bs) | Ganancia fuerza bruta (Bs) | Ganancia dinámica (Bs) | Fuerza bruta (ms) | Factor | Dinámica (ms) | Factor |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 10 | 150 | 112 | 112 | 0.33 | — | 0.412 | — |
| 20 | 300 | 225 | 225 | 0.72 | x2.2 | 0.076 | x0.2 |
| 40 | 600 | 452 | 452 | 6.59 | x9.1 | 0.299 | x3.9 |
| 80 | 1200 | 905 | 905 | 110.05 | x16.7 | 1.306 | x4.4 |

## Protocolo

Para cada tamaño y cada estrategia se realizo una corrida de calentamiento que no se cuenta en los resultados. Después se hicieron tres corridas medidas y se calculo el promedio.

## Conclusion

-Al duplicar la demanda, el tiempo de la fuerza bruta aumento progresivamente: llego a multiplicarse por 16.7 entre los dos últimos tamaños. Esto muestra que probar todas las combinaciones requiere cada vez mas tiempo. La programacion dinamica tambien presento variaciones, pero sus tiempos se mantuvieron mucho menores llegando a 1.306 ms en el tamaño mas grande.

-Se observa ruido en las mediciones  en la programacion dinamica bajo de 0.412 ms a 0.076 ms al pasar de una demanda de 10 a 20. Esto puede ocurrir porque son tiempos muy pequeños y varian entre corridas. 

-Con cuatro productos y demandas pequeñas, ambas estrategias pueden resolver el problema, aunque la diferencia de tiempo aumenta al crecer los datos. 

-La fuerza bruta y la programacion dinamica obtuvieron la misma ganancia maxima en los cuatro casos. Sin embargo la programacion dinamica necesito menos tiempo para encontrarla. 

