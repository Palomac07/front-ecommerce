import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <div className="estado-vacio">
      <h2>404</h2>
      <p>La pagina que buscas no existe.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  )
}
