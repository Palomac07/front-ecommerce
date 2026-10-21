import { useState } from 'react'
import CartItemRow from './CartItemRow'

/**
 * Lista de items del carrito, cruzando cada uno con su producto del catalogo.
 * "Vaciar carrito" pide confirmacion antes de avisar con onVaciar.
 */
export default function CartItemList({
  items,
  productos,
  onCambiarCantidad,
  onEliminar,
  onVaciar,
}) {
  const [confirmandoVaciar, setConfirmandoVaciar] = useState(false)

  const buscarProducto = (productoId) =>
    productos?.find((producto) => producto.id === productoId)

  return (
    <div className="carrito-lista card">
      <ul className="carrito-items">
        {items.map((item) => (
          <CartItemRow
            key={item.productoId}
            item={item}
            producto={buscarProducto(item.productoId)}
            onCambiarCantidad={onCambiarCantidad}
            onEliminar={onEliminar}
          />
        ))}
      </ul>

      <div className="carrito-lista-pie">
        {confirmandoVaciar ? (
          <div className="carrito-confirmar" role="alertdialog" aria-labelledby="carrito-confirmar-texto">
            <p id="carrito-confirmar-texto">
              ¿Querés quitar todos los productos del carrito?
            </p>
            <div className="carrito-confirmar-acciones">
              <button
                type="button"
                className="btn btn-secundario"
                onClick={() => setConfirmandoVaciar(false)}
                autoFocus
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn carrito-btn-peligro"
                onClick={() => {
                  setConfirmandoVaciar(false)
                  onVaciar()
                }}
              >
                Sí, vaciar
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="carrito-btn-eliminar"
            onClick={() => setConfirmandoVaciar(true)}
          >
            Vaciar carrito
          </button>
        )}
      </div>
    </div>
  )
}
