import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../hooks/useMockFetch.js'

export default function ProductList({ productos }) {
  return (
    <div className="grid-productos busqueda-lista">
      {productos.map((producto) => (
        <article key={producto.id} className="card busqueda-producto">
          <Link to={`/productos/${producto.id}`} className="busqueda-enlace">
            <div className="busqueda-imagen">
              {producto.imagenPrincipalUrl
                ? <img src={producto.imagenPrincipalUrl} alt={producto.nombre} />
                : <span>Sin imagen</span>}
            </div>
            <div className="busqueda-producto-info">
              <p className="busqueda-categoria">{producto.categoriaNombre}</p>
              <h3>{producto.nombre}</h3>
              <p className="busqueda-precio">{formatearPrecio(producto.precio)}</p>
              <p className={producto.stock > 0 ? 'busqueda-stock' : 'busqueda-agotado'}>
                {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
              </p>
              <span className="busqueda-ver">Ver producto →</span>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}
