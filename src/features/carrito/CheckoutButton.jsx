/**
 * Boton para finalizar la compra. Se deshabilita con el carrito vacio porque
 * el back responde error si se hace checkout sin items.
 */
export default function CheckoutButton({ carritoVacio, procesando, onConfirmar }) {
  return (
    <div className="carrito-checkout">
      <button
        type="button"
        className="btn carrito-checkout-btn"
        onClick={onConfirmar}
        disabled={carritoVacio || procesando}
        aria-describedby={carritoVacio ? 'carrito-checkout-ayuda' : undefined}
      >
        {procesando ? 'Procesando compra...' : 'Finalizar compra'}
      </button>
      {carritoVacio && (
        <p id="carrito-checkout-ayuda" className="carrito-checkout-ayuda">
          Agregá productos para poder finalizar la compra.
        </p>
      )}
    </div>
  )
}
