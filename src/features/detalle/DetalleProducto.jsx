import { useParams, Link } from 'react-router-dom'
import { useMockFetch } from '../../hooks/useMockFetch'
import ImageGallery from './ImageGallery'
import ProductInfo from './ProductInfo'
import BuyPanel from './BuyPanel'
import './detalle.css'

export default function DetalleProducto() {
  const { id } = useParams()
  const { data: producto, loading, error } = useMockFetch(id ? `producto-${id}` : null)

  if (loading) {
    return (
      <div className="detalle-producto detalle-producto--cargando">
        <div className="estado-carga" role="status" aria-live="polite">
          <div className="detalle-spinner" aria-hidden="true"></div>
          <p>Cargando detalle del producto...</p>
        </div>
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div className="detalle-producto detalle-producto--error">
        <div className="estado-error card">
          <h2>No se encontró el producto</h2>
          <p>El producto que buscas no existe, fue retirado o no se encuentra disponible.</p>
          <div className="detalle-error-acciones">
            <Link to="/" className="btn">
              Volver al inicio
            </Link>
            <Link to="/buscar" className="btn btn-secundario">
              Explorar otros productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="detalle-producto">
      <nav className="detalle-breadcrumb" aria-label="Navegación de migas de pan">
        <Link to="/" className="detalle-breadcrumb__link">Inicio</Link>
        <span className="detalle-breadcrumb__separador" aria-hidden="true">/</span>
        <Link to="/buscar" className="detalle-breadcrumb__link">Productos</Link>
        {producto.categoriaNombre && (
          <>
            <span className="detalle-breadcrumb__separador" aria-hidden="true">/</span>
            <span className="detalle-breadcrumb__actual">{producto.categoriaNombre}</span>
          </>
        )}
      </nav>

      <div className="detalle-grid">
        <section className="detalle-columna-visual" aria-label="Galería de imágenes">
          <ImageGallery
            imagenes={producto.imagenes}
            tituloProducto={producto.nombre}
          />
        </section>

        <section className="detalle-columna-info" aria-label="Información y compra del producto">
          <ProductInfo producto={producto} />
          <BuyPanel producto={producto} />
        </section>
      </div>
    </main>
  )
}
