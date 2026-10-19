/**
 * Acceso al back para autenticacion y usuarios.
 *
 * Hoy lee los JSON de /public/data/ y simula lo que responderia Spring Boot:
 * los mismos DTOs y los mismos mensajes de error. Cuando conectemos la API
 * real se reemplaza el cuerpo de cada funcion por el fetch que indica su
 * comentario. Las pantallas no cambian, porque solo conocen estas funciones y
 * no saben de URLs.
 *
 * Todas devuelven una promesa: se cumple con el DTO del back o se rechaza con
 * un Error cuyo mensaje es el que mandaria el back.
 */

async function leerMock(nombreArchivo) {
  const respuesta = await fetch(`/data/${nombreArchivo}.json`)

  // fetch solo rechaza si no hubo respuesta: un 404 hay que detectarlo a mano.
  if (!respuesta.ok) throw new Error('No se pudo conectar con el servidor')
  return respuesta.json()
}

/** Fecha con el formato de LocalDateTime: "2026-10-19T21:00:00", sin zona ni Z. */
function fechaLocal(fecha) {
  const local = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 19)
}

/**
 * POST /api/auth/login con { email, password } -> LoginResponse
 *
 * Si las credenciales no coinciden, el back responde 401 con el mismo mensaje
 * tanto si el email no existe como si la contrasenia esta mal, para no revelar
 * que emails estan registrados.
 *
 * La maqueta no tiene contrasenias: entra el email de login.json con cualquier
 * contrasenia.
 */
export async function login({ email, password }) {
  const respuesta = await leerMock('login')

  if (email !== respuesta.usuario.email || !password) {
    throw new Error('Email o contraseña incorrectos')
  }
  return respuesta
}

/**
 * POST /api/usuarios con UsuarioRequest -> 201 UsuarioResponse
 *
 * No se manda rol: el back asigna CLIENTE por defecto. Si el email o el
 * username ya existen, responde el mensaje de DatoDuplicadoException. En la
 * maqueta, el unico usuario existente es el de login.json.
 */
export async function registrar(datos) {
  const { usuario: existente } = await leerMock('login')

  if (datos.email === existente.email) {
    throw new Error(`Ya existe un usuario con el email '${datos.email}'`)
  }
  if (datos.username === existente.username) {
    throw new Error(
      `Ya existe un usuario con el nombre de usuario '${datos.username}'`,
    )
  }

  return {
    id: existente.id + 1,
    username: datos.username,
    email: datos.email,
    nombre: datos.nombre,
    apellido: datos.apellido,
    fechaRegistro: fechaLocal(new Date()),
    rol: 'CLIENTE',
  }
}

/**
 * GET /api/usuarios/{id} -> UsuarioResponse (sin la password)
 *
 * Con la API real requiere el header Authorization: Bearer <token>, que arma
 * encabezadoAutorizacion() de sesion.js.
 */
export async function buscarUsuario(id) {
  const { usuario } = await leerMock('login')

  if (usuario.id !== id) throw new Error(`No existe usuario con ID: ${id}`)
  return usuario
}
