export default function Thumbnails({ imagenes = [], indiceActivo, onSeleccionar, tituloProducto }) {
  if (!imagenes || imagenes.length <= 1) return null

  return (
    <div className="thumbnails" role="tablist" aria-label="Miniaturas del producto">
      {imagenes.map((img, index) => {
        const esActiva = index === indiceActivo

        return (
          <button
            key={img.id ?? index}
            type="button"
            role="tab"
            aria-selected={esActiva}
            aria-label={`Ver imagen ${index + 1} de ${imagenes.length}`}
            className={`thumbnails__item ${esActiva ? 'thumbnails__item--activo' : ''}`}
            onClick={() => onSeleccionar(index)}
          >
            <img
              src={img.url}
              alt={`${tituloProducto || 'Producto'} miniatura ${index + 1}`}
              className="thumbnails__img"
              loading="lazy"
            />
          </button>
        )
      })}
    </div>
  )
}
