import { formatearPrecio } from '../../hooks/useMockFetch'

/**
 * Resumen de la compra a partir del CarritoDTO. children es el lugar para la
 * accion principal (el boton de checkout).
 */
export default function OrderSummary({ carrito, children }) {
  const { cantidadProductos, total } = carrito

  return (
    <section className="carrito-resumen card" aria-labelledby="carrito-resumen-titulo">
      <h2 id="carrito-resumen-titulo">Resumen de compra</h2>

      <dl className="carrito-resumen-filas">
        <div className="carrito-resumen-fila">
          <dt>
            Productos ({cantidadProductos})
          </dt>
          <dd>{formatearPrecio(total)}</dd>
        </div>
        <div className="carrito-resumen-fila carrito-resumen-total">
          <dt>Total</dt>
          <dd>{formatearPrecio(total)}</dd>
        </div>
      </dl>

      {children}
    </section>
  )
}
