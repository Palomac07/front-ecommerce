
export default function ImageOrderList({
  imagenes = [],
  onImagenesChange
}) {
  const moverImagen = (indice, direccion) => {
    const nuevoIndice = indice + direccion

    if (nuevoIndice < 0 || nuevoIndice >= imagenes.length) {
      return
    }

    const nuevasImagenes = [...imagenes]

    const [imagenMovida] = nuevasImagenes.splice(indice, 1)
    nuevasImagenes.splice(nuevoIndice, 0, imagenMovida)

    onImagenesChange(nuevasImagenes)
  }

  const eliminarImagen = (id) => {
    const nuevasImagenes = imagenes.filter(
      (imagen) => imagen.id !== id
    )

    onImagenesChange(nuevasImagenes)
  }

  const establecerPrincipal = (id) => {
    const imagenPrincipal = imagenes.find(
      (imagen) => imagen.id === id
    )

    if (!imagenPrincipal) return

    const otrasImagenes = imagenes.filter(
      (imagen) => imagen.id !== id
    )

    onImagenesChange([imagenPrincipal, ...otrasImagenes])
  }

  if (imagenes.length === 0) {
    return null
  }

  return (
    <div className="image-order-list">
      <h3>Organizar imágenes</h3>

      <p>
        La primera imagen será la principal del producto.
      </p>

      <div className="image-order-grid">
        {imagenes.map((imagen, indice) => (
          <div className="image-order-item" key={imagen.id}>
            <img
              src={imagen.vistaPrevia}
              alt={`Imagen ${indice + 1} del producto`}
            />

            <div className="image-order-info">
              <span>
                {indice === 0
                  ? 'Imagen principal'
                  : `Imagen ${indice + 1}`}
              </span>
            </div>

            <div className="image-order-actions">
              <button
                type="button"
                onClick={() => moverImagen(indice, -1)}
                disabled={indice === 0}
                aria-label="Mover imagen a la izquierda"
              >
                ←
              </button>

              <button
                type="button"
                onClick={() => moverImagen(indice, 1)}
                disabled={indice === imagenes.length - 1}
                aria-label="Mover imagen a la derecha"
              >
                →
              </button>

              {indice !== 0 && (
                <button
                  type="button"
                  onClick={() => establecerPrincipal(imagen.id)}
                >
                  Principal
                </button>
              )}

              <button
                type="button"
                className="btn-quitar-imagen"
                onClick={() => eliminarImagen(imagen.id)}
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
