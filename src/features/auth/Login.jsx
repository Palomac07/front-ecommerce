import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CampoFormulario from './CampoFormulario.jsx'
import { buscarUsuario, login } from './authApi.js'
import { cerrarSesion, guardarSesion, obtenerSesion } from './sesion.js'
import { hayErrores, validarLogin } from './validaciones.js'
import './auth.css'

/**
 * Ingresar — Dueño: Dario
 *
 * POST /api/auth/login con email y contraseña. El login es por email y no por
 * username, porque el back identifica al usuario por email. La respuesta
 * (LoginResponse) trae token, tipo ("Bearer") y el usuario sin la password.
 *
 * Si ya hay una sesion abierta, en vez del formulario muestra los datos de la
 * cuenta (GET /api/usuarios/{id}) y permite cerrar la sesion.
 */
export default function Login() {
  const [sesion, setSesion] = useState(() => obtenerSesion())

  function handleCerrarSesion() {
    cerrarSesion()
    setSesion(null)
  }

  if (sesion) {
    return <SesionActiva sesion={sesion} onCerrarSesion={handleCerrarSesion} />
  }
  return <FormularioLogin />
}

/** "2026-09-01T12:00:00" (LocalDateTime, sin zona) -> "1 de septiembre de 2026" */
function formatearFecha(fecha) {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-AR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function SesionActiva({ sesion, onCerrarSesion }) {
  // Arranca con los datos que vinieron en el login y los refresca con el GET.
  const [usuario, setUsuario] = useState(sesion.usuario)
  const [error, setError] = useState(null)
  const idUsuario = sesion.usuario.id

  useEffect(() => {
    // Bandera cancelado: con StrictMode el efecto corre dos veces en desarrollo.
    let cancelado = false

    buscarUsuario(idUsuario)
      .then((datos) => { if (!cancelado) setUsuario(datos) })
      .catch((err) => { if (!cancelado) setError(err.message) })

    return () => { cancelado = true }
  }, [idUsuario])

  return (
    <section className="auth">
      <div className="auth-tarjeta card">
        <h1>Ya ingresaste</h1>
        <p className="auth-subtitulo">Estos son los datos de tu cuenta.</p>

        <dl className="auth-datos">
          <dt>Nombre</dt>
          <dd>{usuario.nombre} {usuario.apellido}</dd>

          <dt>Usuario</dt>
          <dd>{usuario.username}</dd>

          <dt>Email</dt>
          <dd>{usuario.email}</dd>

          <dt>Rol</dt>
          <dd>{usuario.rol === 'VENDEDOR' ? 'Vendedor' : 'Cliente'}</dd>

          <dt>Miembro desde</dt>
          <dd>{formatearFecha(usuario.fechaRegistro)}</dd>
        </dl>

        {error && <p className="auth-alerta" role="alert">{error}</p>}

        <div className="auth-acciones">
          <Link to="/" className="btn">Ir al inicio</Link>
          <button type="button" className="btn btn-secundario" onClick={onCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  )
}

function FormularioLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  // Si llega desde el registro, viene con el email recien creado.
  const emailRegistrado = location.state?.emailRegistrado

  const [valores, setValores] = useState({ email: emailRegistrado ?? '', password: '' })
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

    const nuevosErrores = validarLogin(valores)
    setErrores(nuevosErrores)
    setErrorServidor(null)
    if (hayErrores(nuevosErrores)) return

    setEnviando(true)
    try {
      const respuesta = await login({
        email: valores.email.trim(),
        password: valores.password,
      })
      guardarSesion(respuesta)

      // replace: con "Atras" no se vuelve al formulario de login ya usado.
      navigate('/', { replace: true })
    } catch (error) {
      setErrorServidor(error.message)
      setEnviando(false)
    }
  }

  return (
    <section className="auth">
      <div className="auth-tarjeta card">
        <h1>Ingresar</h1>
        <p className="auth-subtitulo">
          Usá el email y la contraseña con los que te registraste.
        </p>

        {emailRegistrado && !errorServidor && (
          <p className="auth-aviso" role="status">
            Cuenta creada. Ingresá con tu email y contraseña.
          </p>
        )}

        {errorServidor && (
          <p className="auth-alerta" role="alert">{errorServidor}</p>
        )}

        {/* noValidate: los errores los muestra validarLogin, con los mensajes del back */}
        <form onSubmit={handleSubmit} noValidate>
          <CampoFormulario
            id="login-email"
            etiqueta="Email"
            type="email"
            name="email"
            autoComplete="email"
            value={valores.email}
            onChange={handleChange}
            error={errores.email}
          />

          <CampoFormulario
            id="login-password"
            etiqueta="Contraseña"
            type="password"
            name="password"
            autoComplete="current-password"
            value={valores.password}
            onChange={handleChange}
            error={errores.password}
          />

          <button type="submit" className="btn auth-boton" disabled={enviando}>
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-pie">
          ¿No tenés cuenta? <Link to="/registro">Creá una</Link>
        </p>

        <p className="auth-nota">
          Maqueta: ingresá con <strong>paloma@uade.edu.ar</strong> y cualquier contraseña.
        </p>
      </div>
    </section>
  )
}
