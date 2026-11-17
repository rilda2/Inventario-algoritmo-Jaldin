Rilda Jaldin Lopez

# P1.1 Analizar el algoritmo

a) Análisis de los fragmentos

// F1: O(n)

El ciclo recorre los n elementos una sola vez y realiza una suma por cada elemento.

// F2: O(n²)

Tiene dos ciclos anidados que comparan los elementos entre sí.

// F3: O(log n)

La variable k comienza en n y se divide entre 2 en cada repeticion, reduciendo su valor hasta llegar a 1.

// F4: O(n log n)

El ciclo externo se ejecuta n veces y en cada repeticion el ciclo interno duplica k hasta alcanzar n, realizando log₂(n).

b) teorema maestro de bolsillo 

(i) T(n) = 3T(n/2) + n
a = 3
b = 2
d = 1


(ii) T(n) = T(n/2) + n²
a = 1
b = 2
d = 2
bᵈ = 2² = 4
a < bᵈ, porque 1 < 4.
T(n) = O(n²).