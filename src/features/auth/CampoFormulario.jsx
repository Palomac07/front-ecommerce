/**
 * Input con su etiqueta, un texto de ayuda opcional y su mensaje de error.
 *
 * El error se conecta al input con aria-invalid y aria-describedby, asi un
 * lector de pantalla lo anuncia al entrar al campo. El resto de las props
 * (type, name, value, onChange, autoComplete...) pasan directo al input.
 */
export default function CampoFormulario({ id, etiqueta, error, ayuda, ...props }) {
  const idError = `${id}-error`
  const idAyuda = `${id}-ayuda`

  // Con error se muestra el error y no la ayuda: no tiene sentido anunciar las dos.
  const mostrarAyuda = ayuda && !error
  const describedBy = error ? idError : mostrarAyuda ? idAyuda : undefined

  return (
    <div className="auth-campo">
      <label htmlFor={id}>{etiqueta}</label>

      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        {...props}
      />

      {mostrarAyuda && <small id={idAyuda} className="auth-ayuda">{ayuda}</small>}
      {error && <small id={idError} className="auth-error-campo">{error}</small>}
    </div>
  )
}
