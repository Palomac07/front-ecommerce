/**
 * Reglas de los formularios de login y registro.
 *
 * Son las mismas que valida el back con Bean Validation (LoginRequest y
 * UsuarioRequest): campos obligatorios, formato de email, largo maximo de cada
 * columna y contrasenia de 6 caracteres o mas. Validar aca solo mejora la
 * experiencia, porque avisa antes de mandar el request: el back vuelve a
 * validar todo, ya que el codigo del front lo controla el usuario.
 *
 * Cada funcion devuelve un objeto { campo: mensaje } con los campos que
 * fallaron. Si esta vacio, el formulario es valido.
 */

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validarEmail(email) {
  const valor = email.trim()

  if (!valor) return 'El email es obligatorio'
  if (!FORMATO_EMAIL.test(valor)) return 'El email no tiene un formato válido'
  if (valor.length > 100) return 'El email no puede superar los 100 caracteres'
  return null
}

function validarTexto(valor, nombreCampo, maximo) {
  const limpio = valor.trim()

  if (!limpio) return `${nombreCampo} es obligatorio`
  if (limpio.length > maximo) {
    return `${nombreCampo} no puede superar los ${maximo} caracteres`
  }
  return null
}

/** Arma el objeto de errores descartando los campos que pasaron. */
function soloErrores(resultados) {
  return Object.fromEntries(
    Object.entries(resultados).filter(([, mensaje]) => mensaje),
  )
}

export function hayErrores(errores) {
  return Object.keys(errores).length > 0
}

/** LoginRequest: email con formato valido y contrasenia no vacia. */
export function validarLogin({ email, password }) {
  return soloErrores({
    email: validarEmail(email),
    password: password.trim() ? null : 'La contraseña es obligatoria',
  })
}

/**
 * UsuarioRequest, mas la confirmacion de la contrasenia, que no viaja al back:
 * solo existe para que el usuario no se registre con un error de tipeo.
 */
export function validarRegistro(datos) {
  let password = null
  if (!datos.password.trim()) password = 'La contraseña es obligatoria'
  else if (datos.password.length < 6) {
    password = 'La contraseña debe tener al menos 6 caracteres'
  }

  let confirmarPassword = null
  if (!datos.confirmarPassword) confirmarPassword = 'Repetí la contraseña'
  else if (datos.confirmarPassword !== datos.password) {
    confirmarPassword = 'Las contraseñas no coinciden'
  }

  return soloErrores({
    username: validarTexto(datos.username, 'El nombre de usuario', 50),
    email: validarEmail(datos.email),
    password,
    confirmarPassword,
    nombre: validarTexto(datos.nombre, 'El nombre', 50),
    apellido: validarTexto(datos.apellido, 'El apellido', 50),
  })
}
