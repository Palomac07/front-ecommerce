# front-ecommerce

Maqueta en React del e-commerce del Grupo 6, con datos estaticos que imitan
exactamente las respuestas del back en Spring Boot. Cuando conectemos la API
real, lo unico que cambia es la URL del fetch: la forma de los datos ya es la
misma, asi que los componentes quedan intactos.

TPO 3 - Aplicaciones Interactivas - UADE 2C 2026
Back del proyecto: https://github.com/MG180698/G6-Tp0-Ecommerce

## Como levantarlo

Hace falta Node 18 o superior.

```bash
npm install
npm run dev
```

Abre en http://localhost:5173

## Estructura

```
public/
  data/           JSON que imitan las respuestas del back (el contrato)
  img/            Imagenes de prueba
src/
  components/     Compartido: Layout, Navbar, Footer, NoEncontrado
  hooks/          useMockFetch + formatearPrecio
  styles/         base.css: variables, reset y responsive
  features/       Un modulo por persona. Cada uno edita SOLO su carpeta.
    home/         Tomas
    busqueda/     Juli
    detalle/      Manuel
    carrito/      Lucia
    productos/    Luz
    categorias/   Maria Sol
    auth/         Dario
```

## Contrato de datos

Los archivos de `public/data/` tienen los **mismos campos** que devuelven los
DTOs del back. No cambiarlos sin avisar al grupo.

| Archivo | DTO del back |
|---|---|
| `productos.json` | `ProductoResumenResponse[]` |
| `producto-{id}.json` | `ProductoDetalleResponse` |
| `categorias.json` | `CategoriaResponse[]` |
| `carrito.json`, `carrito-vacio.json` | `CarritoDTO` |
| `checkout.json` | `CheckoutResponse` |
| `login.json` | `LoginResponse` |

Tres reglas que rompen la integracion si se pasan por alto:

- Los importes son `BigDecimal` en Java: numero, **sin comillas**.
- Las fechas son `LocalDateTime`: `"2026-09-01T12:00:00"`, **sin zona ni Z**.
- `rol` solo acepta `"CLIENTE"` o `"VENDEDOR"`.

Casos borde que ya estan en los datos, a proposito:

- Producto 8: `stock: 0`, `imagenes: []` y `imagenPrincipalUrl: null`.
- `carrito-vacio.json`: lo que devuelve `DELETE /api/carrito/items`.
- `cantidadProductos` es la **suma de cantidades** (3 en el mock), no la
  cantidad de lineas.

## Como trabajamos

1. Rama propia por modulo: `feature/<modulo>`.
2. Cada uno toca solo `src/features/<su-modulo>/`. Lo compartido se avisa antes.
3. Commits chicos y seguidos, no uno solo al final.
4. PR a `main` cuando la pantalla anda. Mergear seguido.
5. Probar en escritorio y en movil: se evalua que sea responsive.

## Nota para quien escriba su pantalla

El proyecto usa `<StrictMode>`, asi que **en desarrollo React monta cada
componente dos veces** y el fetch sale duplicado. Por eso `useMockFetch` tiene
la bandera `cancelado` y devuelve una funcion de limpieza. Si escribis tu
propio fetch, copiá ese patron o vas a ver parpadeos que parecen un bug.
