import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoFormulario from './CampoFormulario.jsx'
import { registrar } from './authApi.js'
import { hayErrores, validarRegistro } from './validaciones.js'
import './auth.css'

/**
 * Crear cuenta — Dueño: Dario
 *
 * POST /api/usuarios con UsuarioRequest. Al terminar lleva al login con el
 * email ya cargado; la consulta GET /api/usuarios/{id} la usa la pantalla de
 * login para mostrar la cuenta de la sesion activa.
 *
 * No hay selector de rol a proposito: el back asigna CLIENTE cuando no se
 * manda. Si el formulario ofreciera VENDEDOR, cualquiera podria darse
 * permisos de vendedor solo con elegirlo.
 */

const VALORES_INICIALES = {
  username: '',
  email: '',
  password: '',
  confirmarPassword: '',
  nombre: '',
  apellido: '',
}

export default function Registro() {
  const navigate = useNavigate()

  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [errorServidor, setErrorServidor] = useState(null)
  const [enviando, setEnviando] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
    setErrores((anteriores) => ({ ...anteriores, [name]: undefined }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const nuevosErrores = validarRegistro(valores)
    setErrores(nuevosErrores)
    setErrorServidor(null)
    if (hayErrores(nuevosErrores)) return

    setEnviando(true)
    try {
      // Solo los campos de UsuarioRequest: la confirmacion no viaja y el rol tampoco.
      const usuario = await registrar({
        username: valores.username.trim(),
        email: valores.email.trim(),
        password: valores.password,
        nombre: valores.nombre.trim(),
        apellido: valores.apellido.trim(),
      })

      navigate('/login', { replace: true, state: { emailRegistrado: usuario.email } })
    } catch (error) {
      setErrorServidor(error.message)
      setEnviando(false)
    }
  }

  // Todos los campos comparten valor, onChange y error con el mismo nombre.
  const propsCampo = (name) => ({
    id: `registro-${name}`,
    name,
    value: valores[name],
    onChange: handleChange,
    error: errores[name],
  })

  return (
    <section className="auth">
      <div className="auth-tarjeta auth-tarjeta-ancha card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitulo">
          Registrate para armar tu carrito y comprar.
        </p>

        {errorServidor && (
          <p className="auth-alerta" role="alert">{errorServidor}</p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-fila">
            <CampoFormulario
              {...propsCampo('nombre')}
              etiqueta="Nombre"
              autoComplete="given-name"
            />
            <CampoFormulario
              {...propsCampo('apellido')}
              etiqueta="Apellido"
              autoComplete="family-name"
            />
          </div>

          <CampoFormulario
            {...propsCampo('username')}
            etiqueta="Nombre de usuario"
            autoComplete="username"
          />

          <CampoFormulario
            {...propsCampo('email')}
            etiqueta="Email"
            type="email"
            autoComplete="email"
            ayuda="Lo vas a usar para ingresar."
          />

          <div className="auth-fila">
            <CampoFormulario
              {...propsCampo('password')}
              etiqueta="Contraseña"
              type="password"
              autoComplete="new-password"
              ayuda="Mínimo 6 caracteres."
            />
            <CampoFormulario
              {...propsCampo('confirmarPassword')}
              etiqueta="Repetir contraseña"
              type="password"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn auth-boton" disabled={enviando}>
            {enviando ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="auth-pie">
          ¿Ya tenés cuenta? <Link to="/login">Ingresá</Link>
        </p>
      </div>
    </section>
  )
}
