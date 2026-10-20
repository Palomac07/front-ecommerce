
export default function CategoriasTable({
  categorias,
  onVer,
  onEditar,
  onEliminar
}) {
  if (categorias.length === 0) {
    return (
      <div className="categorias-vacias">
        <h3>No hay categorías cargadas</h3>
        <p>Agregá la primera categoría para organizar el catálogo.</p>
      </div>
    )
  }

  return (
    <div className="categorias-tabla-contenedor">
      <table className="categorias-tabla">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td className="categorias-id">{categoria.id}</td>

              <td>
                <strong>{categoria.nombre}</strong>
              </td>

              <td className="categorias-descripcion">
                {categoria.descripcion || (
                  <span className="categorias-sin-dato">Sin descripción</span>
                )}
              </td>

              <td>
                <div className="categorias-acciones">
                  <button
                    type="button"
                    className="categorias-btn-accion categorias-btn-ver"
                    onClick={() => onVer(categoria.id)}
                  >
                    Ver
                  </button>

                  <button
                    type="button"
                    className="categorias-btn-accion categorias-btn-editar"
                    onClick={() => onEditar(categoria.id)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="categorias-btn-accion categorias-btn-eliminar"
                    onClick={() => onEliminar(categoria)}
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
