import CartItemRow from './CartItemRow'

/** Lista de items del carrito, cruzando cada uno con su producto del catalogo. */
export default function CartItemList({ items, productos, onCambiarCantidad }) {
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
          />
        ))}
      </ul>
    </div>
  )
}
