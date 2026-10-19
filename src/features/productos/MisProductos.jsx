
import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch'
import './productos.css'
import MyListingsTable from './MyListingsTable'
import DeleteConfirmModal from './DeleteConfirmModal'
import ProductForm from './ProductForm'

export default function MisProductos() {
  const { data, loading, error } = useMockFetch('productos')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [productoAEliminar, setProductoAEliminar] = useState(null)

const handleEditar = (producto) => {
  setProductoSeleccionado(producto)
  setMostrarFormulario(true)
}

const handleEliminar = (producto) => {
  setProductoAEliminar(producto)
}

const handleCancelarEliminar = () => {
  setProductoAEliminar(null)
}

const handleConfirmarEliminar = () => {
  console.log('Confirmada eliminación:', productoAEliminar)
  setProductoAEliminar(null)
}

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
          onClick={() => {
  setProductoSeleccionado(null)
  setMostrarFormulario(true)
}}
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

      {!loading && !error && Array.isArray(data) && (
  <div className="productos-contenido">
    <h2>Publicaciones disponibles</h2>
    <p>
      Hay {data.length} productos cargados en el catálogo.
    </p>

    <MyListingsTable
  productos={data}
  onEditar={handleEditar}
  onEliminar={handleEliminar}
/>
  </div>
)}

      {mostrarFormulario && (
  <ProductForm
    key={productoSeleccionado?.id ?? 'nuevo'}
    productoInicial={productoSeleccionado}
    onGuardar={(datos) => {
      console.log('Datos del formulario:', datos)
    }}
    onCancelar={() => {
      setMostrarFormulario(false)
      setProductoSeleccionado(null)
    }}
  />
)}
      <DeleteConfirmModal
  producto={productoAEliminar}
  onConfirmar={handleConfirmarEliminar}
  onCancelar={handleCancelarEliminar}
/>
    </section>
  )
}
