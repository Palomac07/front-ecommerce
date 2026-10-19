
import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch'
import './productos.css'

export default function MisProductos() {
  const { data, loading, error } = useMockFetch('productos')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  return (
    <section className="mis-productos">
      <header className="productos-encabezado">
        <div>
          <h1>Mis productos</h1>
          <p>Administrá las publicaciones de tu tienda.</p>
        </div>

        <button
          type="button"
          className="btn"
          onClick={() => setMostrarFormulario(true)}
        >
          + Agregar producto
        </button>
      </header>

      {loading && (
        <p className="estado-carga">Cargando productos...</p>
      )}

      {error && (
        <p className="estado-error">Error: {error}</p>
      )}

      {!loading && !error && data && (
        <div className="productos-contenido">
          <h2>Publicaciones disponibles</h2>
          <p>
            Hay {data.length} productos cargados en el catálogo.
          </p>
        </div>
      )}

      {mostrarFormulario && (
        <div className="productos-contenido">
          <h2>Nuevo producto</h2>
          <p>Acá vamos a incorporar el formulario de alta.</          p>
          <button
            type="button"
            className="btn btn-secundario"
            onClick={() => setMostrarFormulario(false)}
          >
            Cancelar
          </button>
        </div>
      )}
    </section>
  )
}
