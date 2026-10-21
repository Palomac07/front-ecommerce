import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../hooks/useMockFetch'
import QuantityStepper from './QuantityStepper'

/**
 * Una linea del carrito (ItemCarritoDTO). El producto del catalogo se usa
 * solo para mostrar la imagen y conocer el stock maximo.
 */
export default function CartItemRow({ item, producto, onCambiarCantidad }) {
  const stock = producto?.stock
  const imagen = producto?.imagenPrincipalUrl

  return (
    <li className="carrito-item">
      <div className="carrito-item-imagen">
        {imagen ? (
          <img src={imagen} alt="" />
        ) : (
          <span className="carrito-sin-imagen">Sin imagen</span>
        )}
      </div>

      <div className="carrito-item-datos">
        <Link to={`/productos/${item.productoId}`} className="carrito-item-nombre">
          {item.nombre}
        </Link>
        <p className="carrito-item-unitario">
          {formatearPrecio(item.precioUnitario)} c/u
        </p>
        {stock != null && (
          <p className="carrito-item-stock">
            {item.cantidad >= stock
              ? `Máximo disponible: ${stock}`
              : `Stock disponible: ${stock}`}
          </p>
        )}
      </div>

      <div className="carrito-item-acciones">
        <QuantityStepper
          cantidad={item.cantidad}
          maximo={stock}
          nombreProducto={item.nombre}
          onCambiar={(cantidad) => onCambiarCantidad(item.productoId, cantidad)}
        />
        <p className="carrito-item-subtotal">{formatearPrecio(item.subtotal)}</p>
      </div>
    </li>
  )
}
