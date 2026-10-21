import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMockFetch } from '../../hooks/useMockFetch'
import { conCantidad, crearItem, recalcularCarrito, vaciarCarrito } from './carritoCalculos'
import CartItemList from './CartItemList'
import OrderSummary from './OrderSummary'
import SuggestedProducts from './SuggestedProducts'
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

  // GET /api/productos: stock e imagen de cada producto del carrito
  const { data: productos } = useMockFetch('productos')

  // POST /api/carrito responde 201 con un CarritoDTO vacio (carrito-vacio.json)
  const [crearSolicitado, setCrearSolicitado] = useState(false)
  const {
    data: carritoCreado,
    loading: cargandoCreado,
    error: errorCreado,
  } = useMockFetch(crearSolicitado ? 'carrito-vacio' : null)
  const creando = crearSolicitado && cargandoCreado

  // Resultado de la ultima operacion simulada (PUT, POST, DELETE)
  const [carritoLocal, setCarritoLocal] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const carrito = carritoLocal ?? carritoCreado ?? data

  const buscarProducto = (productoId) =>
    productos?.find((producto) => producto.id === productoId)

  const handleCrearCarrito = () => {
    // POST /api/carrito
    setCrearSolicitado(true)
  }

  const handleCambiarCantidad = (productoId, cantidad) => {
    // PUT /api/carrito/items/{productoId}  body { cantidad }
    const producto = buscarProducto(productoId)
    if (cantidad < 1) return
    if (!producto || cantidad > producto.stock) {
      setMensaje({
        tipo: 'error',
        texto: `No hay stock suficiente de ${producto?.nombre ?? 'este producto'}.`,
      })
      return
    }

    setCarritoLocal(
      recalcularCarrito(
        carrito,
        carrito.items.map((item) =>
          item.productoId === productoId ? conCantidad(item, cantidad) : item
        )
      )
    )
    setMensaje(null)
  }

  const handleEliminarItem = (productoId) => {
    // DELETE /api/carrito/items/{productoId}
    const eliminado = carrito.items.find((item) => item.productoId === productoId)
    setCarritoLocal(
      recalcularCarrito(
        carrito,
        carrito.items.filter((item) => item.productoId !== productoId)
      )
    )
    setMensaje({ tipo: 'ok', texto: `Se quitó "${eliminado.nombre}" del carrito.` })
  }

  const handleAgregarProducto = (productoId, cantidad) => {
    // POST /api/carrito/items  body { productoId, cantidad }
    // Si el producto ya esta en el carrito, el back suma la cantidad.
    const producto = buscarProducto(productoId)
    const existente = carrito.items.find((item) => item.productoId === productoId)
    const cantidadFinal = (existente?.cantidad ?? 0) + cantidad

    if (!producto || cantidadFinal > producto.stock) {
      setMensaje({
        tipo: 'error',
        texto: `No hay stock suficiente de ${producto?.nombre ?? 'este producto'}.`,
      })
      return
    }

    const items = existente
      ? carrito.items.map((item) =>
          item.productoId === productoId ? conCantidad(item, cantidadFinal) : item
        )
      : [...carrito.items, crearItem(producto, cantidad)]

    setCarritoLocal(recalcularCarrito(carrito, items))
    setMensaje({ tipo: 'ok', texto: `Agregaste "${producto.nombre}" al carrito.` })
  }

  const handleVaciarCarrito = () => {
    // DELETE /api/carrito/items → 204 sin cuerpo. El carrito queda igual que
    // carrito-vacio.json: mismo id y usuarioId, sin items y en cero.
    setCarritoLocal(vaciarCarrito(carrito))
    setMensaje({ tipo: 'ok', texto: 'Vaciaste el carrito.' })
  }

  // Si el usuario no tiene carrito, el back responde 404 al GET y se ofrece
  // crearlo. Con un carrito ya existente (aunque este vacio) el POST da 409.
  const sinCarrito = !loading && !carrito

  const sugeridos = carrito && productos
    ? productos.filter(
        (producto) => !carrito.items.some((item) => item.productoId === producto.id)
      )
    : []

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

      {mensaje && (
        <p
          className={`carrito-mensaje carrito-mensaje-${mensaje.tipo}`}
          role={mensaje.tipo === 'error' ? 'alert' : 'status'}
        >
          {mensaje.texto}
        </p>
      )}

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
        <div className="carrito-grilla">
          <div className="carrito-principal">
            {carrito.items.length > 0 ? (
              <CartItemList
                items={carrito.items}
                productos={productos}
                onCambiarCantidad={handleCambiarCantidad}
                onEliminar={handleEliminarItem}
                onVaciar={handleVaciarCarrito}
              />
            ) : (
              <div className="carrito-aviso card">
                <h2>Tu carrito está vacío</h2>
                <p>Agregá productos para verlos acá.</p>
                <Link to="/" className="btn btn-secundario">
                  Ver productos
                </Link>
              </div>
            )}
          </div>

          <aside className="carrito-lateral">
            <OrderSummary carrito={carrito} />
          </aside>
        </div>
      )}

      {carrito && (
        <SuggestedProducts productos={sugeridos} onAgregar={handleAgregarProducto} />
      )}
    </section>
  )
}
