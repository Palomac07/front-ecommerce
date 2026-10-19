
import { useState } from 'react'
import FormField from './FormField'
import ImageUploader from './ImageUploader'
import ImageOrderList from './ImageOrderList'

const categoriaIds = {
  Celulares: 1,
  Notebooks: 2,
  Audio: 3,
  Gaming: 4
}

export default function ProductForm({
  productoInicial = null,
  onGuardar,
  onCancelar
}) {
  const [formulario, setFormulario] = useState({
    nombre: productoInicial?.nombre ?? '',
    descripcion: productoInicial?.descripcion ?? '',
    precio: productoInicial?.precio ?? '',
    stock: productoInicial?.stock ?? '',
    categoriaId:
      productoInicial?.categoriaId ??
      categoriaIds[productoInicial?.categoriaNombre] ??
      ''
  })

  const [errores, setErrores] = useState({})
  const [imagenes, setImagenes] = useState([])

  const esEdicion = Boolean(productoInicial)

  const handleImagenesChange = (nuevasImagenes) => {
    // Liberamos las vistas previas que se quitaron.
    imagenes.forEach((imagen) => {
      const sigueSeleccionada = nuevasImagenes.some(
        (nueva) => nueva.id === imagen.id
      )

      if (!sigueSeleccionada && imagen.vistaPrevia?.startsWith('blob:')) {
        URL.revokeObjectURL(imagen.vistaPrevia)
      }
    })

    setImagenes(nuevasImagenes)
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))

    setErrores((anterior) => ({
      ...anterior,
      [name]: ''
    }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formulario.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    }

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es obligatoria.'
    }

    if (
      formulario.precio === '' ||
      !Number.isFinite(Number(formulario.precio)) ||
      Number(formulario.precio) <= 0
    ) {
      nuevosErrores.precio = 'Ingresá un precio mayor a cero.'
    }

    if (
      formulario.stock === '' ||
      !Number.isInteger(Number(formulario.stock)) ||
      Number(formulario.stock) < 0
    ) {
      nuevosErrores.stock =
        'El stock debe ser un número entero positivo o cero.'
    }

    if (!formulario.categoriaId) {
      nuevosErrores.categoriaId = 'Seleccioná una categoría.'
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validarFormulario()) return

    onGuardar({
      ...formulario,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoriaId: Number(formulario.categoriaId),
      imagenes
    })
  }

  return (
    <form className="producto-formulario" onSubmit={handleSubmit}>
      <h2>{esEdicion ? 'Editar producto' : 'Nuevo producto'}</h2>

      <FormField
        label="Nombre"
        name="nombre"
        value={formulario.nombre}
        onChange={handleChange}
        error={errores.nombre}
        required
        placeholder="Ej: Samsung Galaxy A34"
      />

      <FormField
        label="Descripción"
        name="descripcion"
        error={errores.descripcion}
        required
      >
        <textarea
          id="producto-descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          rows={4}
          placeholder="Describí las características del producto"
          required
          aria-invalid={Boolean(errores.descripcion)}
        />
      </FormField>

      <div className="producto-form-fila">
        <FormField
          label="Precio"
          name="precio"
          type="number"
          value={formulario.precio}
          onChange={handleChange}
          error={errores.precio}
          min="0.01"
          step="0.01"
          required
        />

        <FormField
          label="Stock"
          name="stock"
          type="number"
          value={formulario.stock}
          onChange={handleChange}
          error={errores.stock}
          min="0"
          step="1"
          required
        />
      </div>

      <FormField
        label="Categoría"
        name="categoriaId"
        error={errores.categoriaId}
        required
      >
        <select
          id="producto-categoriaId"
          name="categoriaId"
          value={formulario.categoriaId}
          onChange={handleChange}
          required
          aria-invalid={Boolean(errores.categoriaId)}
        >
          <option value="">Seleccionar categoría</option>
          <option value="1">Celulares</option>
          <option value="2">Notebooks</option>
          <option value="3">Audio</option>
          <option value="4">Gaming</option>
        </select>
      </FormField>

      <div className="producto-form-imagenes">
        <ImageUploader
          imagenes={imagenes}
          onImagenesChange={handleImagenesChange}
        />

        <ImageOrderList
          imagenes={imagenes}
          onImagenesChange={handleImagenesChange}
        />
      </div>

      <div className="producto-form-botones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => onCancelar(imagenes)}
        >
          Cancelar
        </button>

        <button type="submit" className="btn">
          {esEdicion ? 'Guardar cambios' : 'Publicar producto'}
        </button>
      </div>
    </form>
  )
}
