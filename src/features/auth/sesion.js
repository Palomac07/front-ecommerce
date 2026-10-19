/**
 * Sesion del usuario logueado: el token JWT y sus datos publicos.
 *
 * Se guarda en sessionStorage: sobrevive a la navegacion entre pantallas y a
 * un F5, y se borra al cerrar la pestaña. El trade-off (UVA 2) es que
 * cualquier script de la pagina puede leerlo, asi que un XSS podria robar el
 * token. Lo mas seguro seria tenerlo solo en memoria, en el estado de React,
 * pero eso necesita un contexto compartido en src/ que hay que acordar con el
 * grupo.
 *
 * Nunca se guarda la contraseña: el back ni siquiera la devuelve.
 *
 * Los accesos a sessionStorage van en try/catch porque el navegador puede
 * bloquearlo (modo privado estricto, almacenamiento deshabilitado). En ese
 * caso la app sigue andando, solo que sin recordar la sesion.
 */

const CLAVE = 'grupo6.sesion'

export function guardarSesion({ token, tipo, usuario }) {
  try {
    sessionStorage.setItem(CLAVE, JSON.stringify({ token, tipo, usuario }))
  } catch {
    // Sin almacenamiento disponible: la sesion dura hasta cambiar de pantalla.
  }
}

/** Devuelve { token, tipo, usuario } o null si no hay nadie logueado. */
export function obtenerSesion() {
  try {
    const guardada = sessionStorage.getItem(CLAVE)
    return guardada ? JSON.parse(guardada) : null
  } catch {
    return null
  }
}

export function cerrarSesion() {
  try {
    sessionStorage.removeItem(CLAVE)
  } catch {
    // Si no se pudo leer, tampoco hay nada que borrar.
  }
}

/**
 * Header para los endpoints protegidos: { Authorization: 'Bearer <token>' }.
 * Devuelve un objeto vacio si no hay sesion, para poder hacer
 * fetch(url, { headers: { ...encabezadoAutorizacion() } }) sin chequear antes.
 */
export function encabezadoAutorizacion() {
  const sesion = obtenerSesion()
  return sesion ? { Authorization: `${sesion.tipo} ${sesion.token}` } : {}
}
