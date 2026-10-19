
import { useState } from 'react'

export default function ImageUploader({
  imagenes = [],
  onImagenesChange,
  maxImagenes = 5
}) {
  const [error, setError] = useState('')

  const handleSeleccionarImagenes = (event) => {
    const archivos = Array.from(event.target.files || [])

    setError('')

    if (imagenes.length + archivos.length > maxImagenes) {
      setError(`Podés seleccionar hasta ${maxImagenes} imágenes.`)
      event.target.value = ''
      return
    }

    const archivosInvalidos = archivos.some(
      (archivo) => !['image/jpeg', 'image/png', 'image/webp'].includes(archivo.type)
    )

    if (archivosInvalidos) {
      setError('Solo se permiten imágenes JPG, PNG o WebP.')
      event.target.value = ''
      return
    }

    const archivosGrandes = archivos.some(
      (archivo) => archivo.size > 5 * 1024 * 1024
    )

    if (archivosGrandes) {
      setError('Cada imagen debe pesar como máximo 5 MB.')
      event.target.value = ''
      return
    }

    const nuevasImagenes = archivos.map((archivo) => ({
      id: crypto.randomUUID(),
      archivo,
      vistaPrevia: URL.createObjectURL(archivo)
    }))

    onImagenesChange([...imagenes, ...nuevasImagenes])
    event.target.value = ''
  }

  

  return (
    <div className="image-uploader">
      <label htmlFor="producto-imagenes">
        Imágenes del producto
      </label>

      <p className="image-uploader-ayuda">
        Podés agregar hasta {maxImagenes} imágenes en formato JPG,
        PNG o WebP (máximo 5 MB cada una).
      </p>

      <input
        id="producto-imagenes"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        onChange={handleSeleccionarImagenes}
        disabled={imagenes.length >= maxImagenes}
      />

      {error && (
        <p className="campo-error" role="alert">
          {error}
        </p>
      )}
          </div>
  )
}
