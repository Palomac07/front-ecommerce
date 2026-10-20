
export default function CategoriaDetalle({ categoria, onEditar, onCerrar }) {
  if (!categoria) return null

  return (
    <article className="categoria-detalle" aria-labelledby="titulo-detalle-categoria">
      <header className="categoria-detalle-encabezado">
        <h2 id="titulo-detalle-categoria">{categoria.nombre}</h2>
        <span className="categoria-detalle-id">ID: {categoria.id}</span>
      </header>

      <p>
        {categoria.descripcion || (
          <span className="categorias-sin-dato">Sin descripción</span>
        )}
      </p>

      <div className="categoria-form-botones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onCerrar}
        >
          Cerrar
        </button>

        <button
          type="button"
          className="btn"
          onClick={() => onEditar(categoria.id)}
        >
          Editar
        </button>
      </div>
    </article>
  )
}
