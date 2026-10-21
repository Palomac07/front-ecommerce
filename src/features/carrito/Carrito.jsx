import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMockFetch } from '../../hooks/useMockFetch'
import './carrito.css'

/**
 * Carrito y checkout — Dueña: Lucia
 *
 * Orquesta el estado del carrito. Las operaciones del back se simulan con
 * estado local y cada handler indica el endpoint que reemplaza. Los objetos
 * mantienen la forma de CarritoDTO / ItemCarritoDTO, asi que al conectar la
 * API real solo cambia el fetch.
 */
export default function Carrito() {
  // GET /api/carrito
  const { data, loading, error } = useMockFetch('carrito')

  // POST /api/carrito responde 201 con un CarritoDTO vacio (carrito-vacio.json)
  const [crearSolicitado, setCrearSolicitado] = useState(false)
  const {
    data: carritoCreado,
    loading: cargandoCreado,
    error: errorCreado,
  } = useMockFetch(crearSolicitado ? 'carrito-vacio' : null)
  const creando = crearSolicitado && cargandoCreado

  const carrito = carritoCreado ?? data

  const handleCrearCarrito = () => {
    // POST /api/carrito
    setCrearSolicitado(true)
  }

  // Si el usuario no tiene carrito, el back responde 404 al GET y se ofrece
  // crearlo. Con un carrito ya existente (aunque este vacio) el POST da 409.
  const sinCarrito = !loading && !carrito

  return (
    <section className="carrito">
      <header className="carrito-encabezado">
        <h1>Mi carrito</h1>
        {carrito && (
          <p>
            {carrito.cantidadProductos}{' '}
            {carrito.cantidadProductos === 1 ? 'producto' : 'productos'}
          </p>
        )}
      </header>

      {loading && <p className="estado-carga">Cargando carrito...</p>}

      {sinCarrito && (
        <div className="carrito-aviso card" role="alert">
          <h2>No encontramos tu carrito</h2>
          {error && <p className="carrito-texto-error">Error: {error}</p>}
          {errorCreado && (
            <p className="carrito-texto-error">
              No se pudo crear el carrito: {errorCreado}
            </p>
          )}
          <p>Si todavía no tenés uno, podés crearlo ahora.</p>
          <button
            type="button"
            className="btn"
            onClick={handleCrearCarrito}
            disabled={creando}
          >
            {creando ? 'Creando...' : 'Crear carrito'}
          </button>
        </div>
      )}

      {carrito && (
        carrito.items.length > 0 ? (
          <ul>
            {carrito.items.map((item) => (
              <li key={item.productoId}>
                {item.nombre} × {item.cantidad}
              </li>
            ))}
          </ul>
        ) : (
          <div className="carrito-aviso card">
            <h2>Tu carrito está vacío</h2>
            <p>Agregá productos para verlos acá.</p>
            <Link to="/" className="btn btn-secundario">
              Ver productos
            </Link>
          </div>
        )
      )}
    </section>
  )
}
