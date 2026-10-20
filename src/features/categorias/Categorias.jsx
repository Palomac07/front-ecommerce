import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useMockFetch } from '../../hooks/useMockFetch'
import CategoriasTable from './CategoriasTable'
import CategoriaForm from './CategoriaForm'
import CategoriaDetalle from './CategoriaDetalle'
import DeleteCategoriaModal from './DeleteCategoriaModal'
import './categorias.css'

export default function Categorias() {
  const { id } = useParams()
  const navigate = useNavigate()

  // GET /api/categorias
  const { data, loading, error } = useMockFetch('categorias')

  const [categoriasLocales, setCategoriasLocales] = useState(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null)
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const categoriasMostradas = categoriasLocales ?? data ?? []

  // GET /api/categorias/{id}
  const obtenerCategoria = (idCategoria) =>
    categoriasMostradas.find(
      (categoria) => categoria.id === Number(idCategoria)
    ) ?? null

  const categoriaDetalle = id ? obtenerCategoria(id) : null
  const detalleNoEncontrado =
    Boolean(id) && !loading && !error && !categoriaDetalle

  const handleNuevaCategoria = () => {
    setCategoriaSeleccionada(null)
    setMostrarFormulario(true)
    setMensaje('')
    if (id) navigate('/categorias')
  }

  const handleVer = (idCategoria) => {
    setMostrarFormulario(false)
    setCategoriaSeleccionada(null)
    setMensaje('')
    navigate(`/categorias/${idCategoria}`)
  }

  const handleEditar = (idCategoria) => {
    setCategoriaSeleccionada(obtenerCategoria(idCategoria))
    setMostrarFormulario(true)
    setMensaje('')
    if (id) navigate('/categorias')
  }

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false)
    setCategoriaSeleccionada(null)
  }

  const handleGuardarCategoria = (datos) => {
    if (categoriaSeleccionada) {
      // PUT /api/categorias/{id}
      setCategoriasLocales(
        categoriasMostradas.map((categoria) =>
          categoria.id === categoriaSeleccionada.id
            ? { ...categoria, ...datos }
            : categoria
        )
      )
      setMensaje(`Categoría "${datos.nombre}" actualizada correctamente.`)
    } else {
      // POST /api/categorias
      const nuevoId =
        Math.max(0, ...categoriasMostradas.map((c) => c.id)) + 1

      setCategoriasLocales([...categoriasMostradas, { id: nuevoId, ...datos }])
      setMensaje(`Categoría "${datos.nombre}" creada correctamente.`)
    }

    setMostrarFormulario(false)
    setCategoriaSeleccionada(null)
  }

  const handleConfirmarEliminar = () => {
    if (!categoriaAEliminar) return

    // DELETE /api/categorias/{id}
    setCategoriasLocales(
      categoriasMostradas.filter(
        (categoria) => categoria.id !== categoriaAEliminar.id
      )
    )

    if (categoriaDetalle?.id === categoriaAEliminar.id) {
      navigate('/categorias')
    }

    if (categoriaSeleccionada?.id === categoriaAEliminar.id) {
      handleCancelarFormulario()
    }

    setMensaje(
      `Categoría "${categoriaAEliminar.nombre}" eliminada correctamente.`
    )
    setCategoriaAEliminar(null)
  }

  return (
    <section className="categorias">
      <header className="categorias-encabezado">
        <div>
          <h1>Categorías</h1>
          <p>Administrá las categorías del catálogo.</p>
        </div>

        <button
          type="button"
          className="btn"
          onClick={handleNuevaCategoria}
        >
          + Agregar categoría
        </button>
      </header>

      {mensaje && (
        <p className="categorias-mensaje" role="status">
          {mensaje}
        </p>
      )}

      {mostrarFormulario && (
        <CategoriaForm
          key={categoriaSeleccionada?.id ?? 'nueva'}
          categoriaInicial={categoriaSeleccionada}
          categoriasExistentes={categoriasMostradas}
          onGuardar={handleGuardarCategoria}
          onCancelar={handleCancelarFormulario}
        />
      )}

      <CategoriaDetalle
        categoria={categoriaDetalle}
        onEditar={handleEditar}
        onCerrar={() => navigate('/categorias')}
      />

      {detalleNoEncontrado && (
        <div className="categoria-no-encontrada" role="alert">
          <h2>No se encontró la categoría</h2>
          <p>La categoría con ID {id} no existe o fue eliminada.</p>
          <Link to="/categorias" className="btn btn-secundario">
            Volver al listado
          </Link>
        </div>
      )}

      {loading && (
        <p className="estado-carga">Cargando categorías...</p>
      )}

      {error && (
        <p className="estado-error">Error: {error}</p>
      )}

      {!loading && !error && Array.isArray(data) && (
        <div className="categorias-contenido">
          <h2>Listado de categorías</h2>

          <p>
            Hay {categoriasMostradas.length}{' '}
            {categoriasMostradas.length === 1 ? 'categoría cargada' : 'categorías cargadas'}.
          </p>

          <CategoriasTable
            categorias={categoriasMostradas}
            onVer={handleVer}
            onEditar={handleEditar}
            onEliminar={setCategoriaAEliminar}
          />
        </div>
      )}

      <DeleteCategoriaModal
        categoria={categoriaAEliminar}
        onConfirmar={handleConfirmarEliminar}
        onCancelar={() => setCategoriaAEliminar(null)}
      />
    </section>
  )
}
