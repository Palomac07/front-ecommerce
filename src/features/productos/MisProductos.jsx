
import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch'
import MyListingsTable from './MyListingsTable'
import DeleteConfirmModal from './DeleteConfirmModal'
import ProductForm from './ProductForm'
import './productos.css'

const categorias = {
  1: 'Celulares',
  2: 'Notebooks',
  3: 'Audio',
  4: 'Gaming'
}

const liberarImagenes = (imagenes = [], excepto = null) => {
  imagenes.forEach((imagen) => {
    const url = imagen.vistaPrevia

    if (url?.startsWith('blob:') && url !== excepto) {
      URL.revokeObjectURL(url)
    }
  })
}

export default function MisProductos() {
  const { data, loading, error } = useMockFetch('productos')

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [productoAEliminar, setProductoAEliminar] = useState(null)
  const [productosLocales, setProductosLocales] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const productosMostrados = productosLocales ?? data ?? []

  const handleNuevoProducto = () => {
    setProductoSeleccionado(null)
    setMostrarFormulario(true)
    setMensaje('')
  }

  const handleEditar = (producto) => {
    setProductoSeleccionado(producto)
    setMostrarFormulario(true)
    setMensaje('')
  }

  const handleEliminar = (producto) => {
    setProductoAEliminar(producto)
  }

  const handleCancelarEliminar = () => {
    setProductoAEliminar(null)
  }

  const handleConfirmarEliminar = () => {
    if (!productoAEliminar) return

    const productosActualizados = productosMostrados.filter(
      (producto) => producto.id !== productoAEliminar.id
    )

    const url = productoAEliminar.imagenPrincipalUrl

    if (url?.startsWith('blob:')) {
      URL.revokeObjectURL(url)
    }

    setProductosLocales(productosActualizados)

    setMensaje(
      `Producto "${productoAEliminar.nombre}" eliminado correctamente.`
    )

    setProductoAEliminar(null)
  }

  const handleGuardarProducto = (datos) => {
    const { imagenes = [], ...datosProducto } = datos

    const imagenPrincipal = imagenes[0]?.vistaPrevia
    const categoriaNombre =
      categorias[datosProducto.categoriaId] ?? 'Sin categoría'

    if (productoSeleccionado) {
      const productosActualizados = productosMostrados.map((producto) => {
        if (producto.id !== productoSeleccionado.id) {
          return producto
        }

        const imagenAnterior = producto.imagenPrincipalUrl

        if (
          imagenPrincipal &&
          imagenAnterior?.startsWith('blob:') &&
          imagenAnterior !== imagenPrincipal
        ) {
          URL.revokeObjectURL(imagenAnterior)
        }

        return {
          ...producto,
          ...datosProducto,
          categoriaNombre,
          imagenPrincipalUrl: imagenPrincipal ?? imagenAnterior
        }
      })

      setProductosLocales(productosActualizados)
      setMensaje('Producto actualizado correctamente.')
    } else {
      const nuevoId =
        Math.max(0, ...productosMostrados.map((p) => p.id)) + 1

      const nuevoProducto = {
        ...datosProducto,
        id: nuevoId,
        categoriaNombre,
        imagenPrincipalUrl: imagenPrincipal ?? null
      }

      setProductosLocales([...productosMostrados, nuevoProducto])
      setMensaje('Producto agregado correctamente.')
    }

    // Conservamos la imagen principal para mostrarla en la tabla.
    // Liberamos las vistas previas que ya no se utilizan.
    liberarImagenes(imagenes, imagenPrincipal)

    setMostrarFormulario(false)
    setProductoSeleccionado(null)
  }

  const handleCancelarFormulario = (imagenes = []) => {
    liberarImagenes(imagenes)
    setMostrarFormulario(false)
    setProductoSeleccionado(null)
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
          onClick={handleNuevoProducto}
        >
          + Agregar producto
        </button>
      </header>

      {mensaje && (
        <p className="mensaje-producto" role="status">
          {mensaje}
        </p>
      )}

      {loading && (
        <p className="estado-carga">
          Cargando productos...
        </p>
      )}

      {error && (
        <p className="estado-error">
          Error: {error}
        </p>
      )}

      {!loading && !error && Array.isArray(data) && (
        <div className="productos-contenido">
          <h2>Publicaciones disponibles</h2>

          <p>
            Hay {productosMostrados.length} productos
            cargados en el catálogo.
          </p>

          <MyListingsTable
            productos={productosMostrados}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </div>
      )}

      {mostrarFormulario && (
        <ProductForm
          key={productoSeleccionado?.id ?? 'nuevo'}
          productoInicial={productoSeleccionado}
          onGuardar={handleGuardarProducto}
          onCancelar={handleCancelarFormulario}
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
