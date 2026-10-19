import { useState, useEffect } from 'react'
import Thumbnails from './Thumbnails'

export default function ImageGallery({ imagenes = [], tituloProducto = '' }) {
  const [indiceActivo, setIndiceActivo] = useState(0)

  // Si cambian las imágenes (ej. cambia de producto), reiniciar al primer elemento
  useEffect(() => {
    setIndiceActivo(0)
  }, [imagenes])

  const listaImagenes = Array.isArray(imagenes) ? imagenes : []
  const tieneImagenes = listaImagenes.length > 0
  const imagenActual = tieneImagenes ? listaImagenes[indiceActivo] || listaImagenes[0] : null

  return (
    <div className="image-gallery">
      <div className="image-gallery__principal">
        {tieneImagenes && imagenActual ? (
          <img
            src={imagenActual.url}
            alt={`${tituloProducto} - Imagen ${indiceActivo + 1}`}
            className="image-gallery__img-activa"
          />
        ) : (
          <div className="image-gallery__placeholder" role="img" aria-label="Sin imagen disponible">
            <svg
              className="image-gallery__placeholder-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="image-gallery__placeholder-texto">Sin imagen disponible</span>
          </div>
        )}
      </div>

      <Thumbnails
        imagenes={listaImagenes}
        indiceActivo={indiceActivo}
        onSeleccionar={setIndiceActivo}
        tituloProducto={tituloProducto}
      />
    </div>
  )
}
