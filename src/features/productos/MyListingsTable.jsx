
import { formatearPrecio } from '../../hooks/useMockFetch'

export default function MyListingsTable({
  productos,
  onEditar,
  onEliminar
}) {
  if (productos.length === 0) {
    return (
      <div className="productos-vacios">
        <h3>No hay productos disponibles</h3>
        <p>Todavía no hay publicaciones para mostrar.</p>
      </div>
    )
  }

  return (
    <div className="tabla-contenedor">
      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>
                <div className="producto-info">
                  {producto.imagenPrincipalUrl ? (
                    <img
                      src={producto.imagenPrincipalUrl}
                      alt={producto.nombre}
                      className="producto-imagen"
                    />
                  ) : (
                    <div className="producto-sin-imagen">
                      Sin imagen
                    </div>
                  )}

                  <div>
                    <strong>{producto.nombre}</strong>
                    <small>ID: {producto.id}</small>
                  </div>
                </div>
              </td>

              <td>{producto.categoriaNombre}</td>

              <td>{formatearPrecio(producto.precio)}</td>

              <td>{producto.stock}</td>

              <td>
                <span
                  className={
                    producto.stock > 0
                      ? 'stock-disponible'
                      : 'stock-agotado'
                  }
                >
                  {producto.stock > 0
                    ? 'Disponible'
                    : 'Sin stock'}
                </span>
              </td>
              <td>
  <div className="productos-acciones">
    <button
      type="button"
      className="btn-accion btn-editar"
      onClick={() => onEditar(producto)}
    >
      Editar
    </button>

    <button
      type="button"
      className="btn-accion btn-eliminar"
      onClick={() => onEliminar(producto)}
    >
      Eliminar
    </button>
  </div>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
