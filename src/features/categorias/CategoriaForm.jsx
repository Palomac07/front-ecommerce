
import { useState } from 'react'

const MAX_NOMBRE = 50
const MAX_DESCRIPCION = 255

export default function CategoriaForm({
  categoriaInicial = null,
  categoriasExistentes = [],
  onGuardar,
  onCancelar
}) {
  const [formulario, setFormulario] = useState({
    nombre: categoriaInicial?.nombre ?? '',
    descripcion: categoriaInicial?.descripcion ?? ''
  })

  const [errores, setErrores] = useState({})

  const esEdicion = Boolean(categoriaInicial)

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
    const nombre = formulario.nombre.trim()

    if (!nombre) {
      nuevosErrores.nombre = 'El nombre es obligatorio.'
    } else if (nombre.length > MAX_NOMBRE) {
      nuevosErrores.nombre = `El nombre no puede superar los ${MAX_NOMBRE} caracteres.`
    } else {
      const repetido = categoriasExistentes.some(
        (categoria) =>
          categoria.id !== categoriaInicial?.id &&
          categoria.nombre.trim().toLowerCase() === nombre.toLowerCase()
      )

      if (repetido) {
        nuevosErrores.nombre = 'Ya existe una categoría con ese nombre.'
      }
    }

    if (formulario.descripcion.trim().length > MAX_DESCRIPCION) {
      nuevosErrores.descripcion = `La descripción no puede superar los ${MAX_DESCRIPCION} caracteres.`
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validarFormulario()) return

    onGuardar({
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim()
    })
  }

  return (
    <form className="categoria-formulario" onSubmit={handleSubmit} noValidate>
      <h2>{esEdicion ? 'Editar categoría' : 'Nueva categoría'}</h2>

      <div className="categoria-form-field">
        <label htmlFor="categoria-nombre">
          Nombre
          <span className="categoria-campo-obligatorio"> *</span>
        </label>

        <input
          id="categoria-nombre"
          name="nombre"
          type="text"
          value={formulario.nombre}
          onChange={handleChange}
          maxLength={MAX_NOMBRE}
          placeholder="Ej: Celulares"
          required
          aria-invalid={Boolean(errores.nombre)}
          aria-describedby={errores.nombre ? 'categoria-nombre-error' : undefined}
        />

        {errores.nombre && (
          <small id="categoria-nombre-error" className="categoria-campo-error">
            {errores.nombre}
          </small>
        )}
      </div>

      <div className="categoria-form-field">
        <label htmlFor="categoria-descripcion">Descripción</label>

        <textarea
          id="categoria-descripcion"
          name="descripcion"
          value={formulario.descripcion}
          onChange={handleChange}
          rows={3}
          maxLength={MAX_DESCRIPCION}
          placeholder="Ej: Telefonía móvil y accesorios"
          aria-invalid={Boolean(errores.descripcion)}
          aria-describedby={
            errores.descripcion ? 'categoria-descripcion-error' : undefined
          }
        />

        <small className="categoria-contador">
          {formulario.descripcion.length}/{MAX_DESCRIPCION}
        </small>

        {errores.descripcion && (
          <small
            id="categoria-descripcion-error"
            className="categoria-campo-error"
          >
            {errores.descripcion}
          </small>
        )}
      </div>

      <div className="categoria-form-botones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={onCancelar}
        >
          Cancelar
        </button>

        <button type="submit" className="btn">
          {esEdicion ? 'Guardar cambios' : 'Crear categoría'}
        </button>
      </div>
    </form>
  )
}
