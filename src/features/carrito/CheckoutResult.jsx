import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../hooks/useMockFetch'

/** fechaCheckout llega como LocalDateTime ("2026-10-19T21:00:00"), sin zona. */
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleString('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

/** Confirmacion de la compra a partir del CheckoutResponse. */
export default function CheckoutResult({ resultado, onCerrar }) {
  return (
    <section className="carrito-resultado card" role="status" aria-labelledby="carrito-resultado-titulo">
      <h2 id="carrito-resultado-titulo">{resultado.mensaje}</h2>

      <dl className="carrito-resultado-datos">
        <div>
          <dt>Productos comprados</dt>
          <dd>{resultado.cantidadItemsComprados}</dd>
        </div>
        <div>
          <dt>Monto total</dt>
          <dd>{formatearPrecio(resultado.montoTotal)}</dd>
        </div>
        <div>
          <dt>Fecha</dt>
          <dd>{formatearFecha(resultado.fechaCheckout)}</dd>
        </div>
      </dl>

      <div className="carrito-resultado-acciones">
        <Link to="/" className="btn">
          Seguir comprando
        </Link>
        <button type="button" className="btn btn-secundario" onClick={onCerrar}>
          Cerrar
        </button>
      </div>
    </section>
  )
}
