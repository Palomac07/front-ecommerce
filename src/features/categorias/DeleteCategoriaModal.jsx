
export default function DeleteCategoriaModal({
  categoria,
  onConfirmar,
  onCancelar
}) {
  if (!categoria) return null

  return (
    <div className="categorias-modal-fondo">
      <div
        className="categorias-modal-contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-eliminar-categoria"
      >
        <h2 id="titulo-eliminar-categoria">Eliminar categoría</h2>

        <p>
          ¿Estás segura de que querés eliminar la categoría
          <strong> {categoria.nombre}</strong>?
        </p>

        <p className="categorias-modal-advertencia">
          Los productos asociados quedarán sin categoría. Esta acción no se
          puede deshacer.
        </p>

        <div className="categorias-modal-acciones">
          <button
            type="button"
            className="btn btn-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="categorias-btn-accion categorias-btn-eliminar"
            onClick={onConfirmar}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
