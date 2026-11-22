Rilda Jaldin Lopez

# P2.1 Eleccion de estructura: pedidos de la pasteleria

## Operaciones  y estructura elegida

-Registrar
Veces por jornada: 120.000
Estructura: Heap minimo
Costo: O(log n)

-PrepararSiguiente
Veces por jornada: 120.000
Estructura: Heap minimo
Costo: O(log n)

-EstaPendiente
Veces por jornada: 40.000
Estructura: Set (conjunto)
Costo: O(1) promedio

-Pendientes
Veces por jornada: No se cuenta
Estructura: Tamaño del Set
Costo: O(1)

Uso dos estructuras juntas. El heap mantiene siempre el pedido con el menor plazo que es el mas urgente en la raiz, con el desempate por llegada dentro de la comparacion menor plazo y si empatan menor numero de llegada. El Set guarda los nombres pendientes y responde "esta pendiente" en un solo paso sin recorrer nada.

## Por qué no sirve la lista simple (n = 120.000, peor caso)

-Lista simple:
PrepararSiguiente recorre toda la lista para hallar el menor plazo: 120.000 × 120.000 = 14.400 millones de pasos.
EstaPendiente tambien recorre la lista: 40.000 × 120.000 = 4.800 millones de pasos.
Registrar es O(1), unos 120.000 pasos, que no pesan.
Total aproximado: 19.200 millones de pasos.

Heap mas Set(log2 120.000 = 17)
Registrar: 120.000 × 17  = 2,04 millones.
PrepararSiguiente: 120.000 × 17 ≈ 2,04 millones.
EstaPendiente: 40.000 × 1 = 40.000.
Total aproximado: 4,1 millones de pasos.

La estructura elegida hace unas 4.700 veces menos trabajo que la lista simple.

## Cuando cambiaraa de opinion

-Si hubiera que cancelar un pedido por nombre o cambiarle el plazo, el heap no lo hace bien porque no sabe donde se encuentra cada pedido. Pasaria a un arbol balanceado.
-Si el sistema manejara muy pocos pedidos, la lista simple bastaria y seria mas facil de mantener.