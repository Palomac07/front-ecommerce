/**
 * Detalle de producto — Dueño: Manuel
 *
 * Endpoints a cubrir:
 *   - GET /api/productos/{id}
 *
 * Datos de prueba: public/data/producto-1.json, producto-3.json,
 *                  producto-6.json, producto-8.json
 *   const { id } = useParams()
 *   const { data, loading, error } = useMockFetch(`producto-${id}`)
 *
 * Los cuatro mocks tienen 2, 2, 1 y 0 imagenes a proposito, para que la
 * galeria contemple los tres casos. El producto 8 ademas tiene stock 0.
 *
 * Reemplazar todo este archivo por la pantalla real.
 */
export default function DetalleProducto() {
  return (
    <div className="pendiente">
      <h2>Detalle de producto</h2>
      <p>Pantalla pendiente de implementar.</p>
      <span className="duenio">Manuel</span>
    </div>
  )
}

