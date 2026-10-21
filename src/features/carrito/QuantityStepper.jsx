/**
 * Selector de cantidad con botones − y +. Limita entre minimo y maximo
 * (el stock del producto) y avisa cada cambio con onCambiar(nuevaCantidad).
 */
export default function QuantityStepper({
  cantidad,
  minimo = 1,
  maximo,
  nombreProducto,
  onCambiar,
}) {
  const puedeRestar = cantidad > minimo
  const puedeSumar = maximo != null && cantidad < maximo

  return (
    <div className="carrito-stepper" role="group" aria-label={`Cantidad de ${nombreProducto}`}>
      <button
        type="button"
        className="carrito-stepper-btn"
        onClick={() => onCambiar(cantidad - 1)}
        disabled={!puedeRestar}
        aria-label={`Restar una unidad de ${nombreProducto}`}
      >
        −
      </button>

      <output className="carrito-stepper-valor" aria-live="polite">
        {cantidad}
      </output>

      <button
        type="button"
        className="carrito-stepper-btn"
        onClick={() => onCambiar(cantidad + 1)}
        disabled={!puedeSumar}
        aria-label={`Sumar una unidad de ${nombreProducto}`}
      >
        +
      </button>
    </div>
  )
}
