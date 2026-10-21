import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../hooks/useMockFetch'

/**
 * "También te puede interesar": productos del catalogo que no estan en el
 * carrito. Los que no tienen stock se muestran pero no se pueden agregar.
 */
export default function SuggestedProducts({ productos, onAgregar }) {
  if (productos.length === 0) return null

  return (
    <section className="carrito-sugeridos" aria-labelledby="carrito-sugeridos-titulo">
      <h2 id="carrito-sugeridos-titulo">También te puede interesar</h2>

      <ul className="carrito-sugeridos-grilla">
        {productos.map((producto) => {
          const sinStock = producto.stock <= 0

          return (
            <li key={producto.id} className="carrito-sugerido card">
              <Link to={`/productos/${producto.id}`} className="carrito-sugerido-imagen">
                {producto.imagenPrincipalUrl ? (
                  <img src={producto.imagenPrincipalUrl} alt="" loading="lazy" />
                ) : (
                  <span className="carrito-sin-imagen">Sin imagen</span>
                )}
              </Link>

              <div className="carrito-sugerido-datos">
                <p className="carrito-sugerido-categoria">{producto.categoriaNombre}</p>
                <Link to={`/productos/${producto.id}`} className="carrito-sugerido-nombre">
                  {producto.nombre}
                </Link>
                <p className="carrito-sugerido-precio">{formatearPrecio(producto.precio)}</p>
                {sinStock && <p className="carrito-sin-stock">Sin stock</p>}
              </div>

              <button
                type="button"
                className="btn carrito-sugerido-btn"
                onClick={() => onAgregar(producto.id, 1)}
                disabled={sinStock}
                aria-label={
                  sinStock
                    ? `${producto.nombre} sin stock`
                    : `Agregar ${producto.nombre} al carrito`
                }
              >
                {sinStock ? 'Sin stock' : 'Agregar'}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
