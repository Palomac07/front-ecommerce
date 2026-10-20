import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../hooks/useMockFetch.js'

export default function ProductCard({ producto }) {
    const [imagenFallida, setImagenFallida] = useState(null)
    const imagen = producto.imagenPrincipalUrl
    const sinStock = producto.stock <= 0

    return (
        <article className="home-producto card">
            <Link to={'/productos/' + producto.id} className="home-producto-enlace">
                <div className="home-producto-imagen">
                    {imagen && imagen !== imagenFallida ? (
                        <img
                            src={imagen}
                            alt={producto.nombre}
                            loading="lazy"
                            onError={() => setImagenFallida(imagen)}
                        />
                    ) : (
                        <span className="home-sin-imagen">Sin imagen</span>
                    )}
                </div>

                <div className="home-producto-datos">
                    <p className="home-producto-categoria">{producto.categoriaNombre}</p>
                    <h3>{producto.nombre}</h3>
                    <p className="home-producto-precio">
                        {formatearPrecio(producto.precio)}
                    </p>
                    <span className={'home-stock' + (sinStock ? ' home-stock-agotado' : '')}>
            {sinStock ? 'Sin stock' : 'Disponible'}
          </span>
                    <span className="home-ver-producto">Ver producto →</span>
                </div>
            </Link>
        </article>
    )
}