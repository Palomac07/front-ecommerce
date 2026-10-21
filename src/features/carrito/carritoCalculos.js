/**
 * Calculos del carrito, replicando lo que hace CarritoService en el back.
 * Devuelven siempre objetos con la forma de CarritoDTO / ItemCarritoDTO.
 */

/** Evita arrastrar errores de coma flotante en los importes (BigDecimal en el back). */
const redondear = (valor) => Math.round(valor * 100) / 100

/** ItemCarritoDTO con la cantidad nueva y su subtotal recalculado. */
export function conCantidad(item, cantidad) {
  return {
    ...item,
    cantidad,
    subtotal: redondear(cantidad * item.precioUnitario),
  }
}

/** ItemCarritoDTO nuevo a partir de un ProductoResumenResponse. */
export function crearItem(producto, cantidad) {
  return conCantidad(
    {
      productoId: producto.id,
      nombre: producto.nombre,
      cantidad,
      precioUnitario: producto.precio,
      subtotal: 0,
    },
    cantidad
  )
}

/**
 * CarritoDTO con los items dados. cantidadProductos es la SUMA de cantidades,
 * no la cantidad de lineas, igual que en el back.
 */
export function recalcularCarrito(carrito, items) {
  return {
    ...carrito,
    items,
    cantidadProductos: items.reduce((suma, item) => suma + item.cantidad, 0),
    total: redondear(items.reduce((suma, item) => suma + item.subtotal, 0)),
  }
}

/** El mismo carrito sin items: es lo que queda tras DELETE /api/carrito/items. */
export function vaciarCarrito(carrito) {
  return recalcularCarrito(carrito, [])
}
