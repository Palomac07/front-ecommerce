/**
 * Carrito y checkout — Dueña: Lucia
 *
 * Endpoints a cubrir:
 *   - GET    /api/carrito
 *   - POST   /api/carrito
 *   - POST   /api/carrito/items
 *   - PUT    /api/carrito/items/{productoId}
 *   - DELETE /api/carrito/items/{productoId}
 *   - DELETE /api/carrito/items
 *   - POST   /api/carrito/checkout
 *
 * Datos de prueba: public/data/carrito.json, carrito-vacio.json, checkout.json
 *   const { data, loading, error } = useMockFetch('carrito')
 *
 * carrito-vacio.json es el mismo carrito despues de DELETE /api/carrito/items,
 * para maquetar el estado vacio. cantidadProductos es la SUMA de cantidades
 * (3 en el mock), no la cantidad de lineas.
 *
 * Reemplazar todo este archivo por la pantalla real.
 */
export default function Carrito() {
  return (
    <div className="pendiente">
      <h2>Carrito y checkout</h2>
      <p>Pantalla pendiente de implementar.</p>
      <span className="duenio">Lucia</span>
    </div>
  )
}
