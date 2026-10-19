function formatearFecha(fechaIso) {
  if (!fechaIso) return null
  try {
    const fecha = new Date(fechaIso)
    if (isNaN(fecha.getTime())) return null
    return fecha.toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  } catch {
    return null
  }
}

export default function ProductInfo({ producto }) {
  if (!producto) return null

  const {
    nombre,
    descripcion,
    categoriaNombre,
    vendedorNombre,
    fechaPublicacion
  } = producto

  const fechaFormateada = formatearFecha(fechaPublicacion)

  return (
    <div className="product-info">
      {categoriaNombre && (
        <div className="product-info__categoria">
          <span className="product-info__categoria-badge">{categoriaNombre}</span>
        </div>
      )}

      <h1 className="product-info__titulo">{nombre}</h1>

      <div className="product-info__metadatos">
        {vendedorNombre && (
          <span className="product-info__vendedor">
            Vendido por <strong>{vendedorNombre}</strong>
          </span>
        )}
        {fechaFormateada && (
          <>
            <span className="product-info__separador" aria-hidden="true">•</span>
            <span className="product-info__fecha">
              Publicado el {fechaFormateada}
            </span>
          </>
        )}
      </div>

      <div className="product-info__descripcion-seccion">
        <h2 className="product-info__subtitulo">Descripción</h2>
        <p className="product-info__descripcion">
          {descripcion || 'El vendedor no proporcionó una descripción para este producto.'}
        </p>
      </div>
    </div>
  )
}
