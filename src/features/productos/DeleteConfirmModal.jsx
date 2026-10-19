
export default function DeleteConfirmModal({
  producto,
  onConfirmar,
  onCancelar
}) {
  if (!producto) return null

  return (
    <div className="modal-fondo">
      <div
        className="modal-contenido"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-eliminar"
      >
        <h2 id="titulo-eliminar">Eliminar producto</h2>

        <p>
          ¿Estás segura de que querés eliminar
          <strong> {producto.nombre}</strong>?
        </p>

        <p className="modal-advertencia">
          Esta acción no se puede deshacer.
        </p>

        <div className="modal-acciones">
          <button
            type="button"
            className="btn btn-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>

          <button
            type="button"
            className="btn-accion btn-eliminar"
            onClick={onConfirmar}
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
