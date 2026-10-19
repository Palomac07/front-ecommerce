import { Link, NavLink } from 'react-router-dom'
import { useMockFetch } from '../hooks/useMockFetch.js'

export default function Navbar() {
  const { data: carrito } = useMockFetch('carrito')

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">Grupo6<span>Market</span></Link>

        <nav className="nav-links">
          <NavLink to="/buscar">Buscar</NavLink>
          <NavLink to="/categorias">Categorias</NavLink>
          <NavLink to="/mis-productos">Mis productos</NavLink>
        </nav>

        <div className="nav-acciones">
          <NavLink to="/login" className="btn-texto">Ingresar</NavLink>
          <NavLink to="/carrito" className="btn-carrito">
            Carrito
            {carrito?.cantidadProductos > 0 && (
              <span className="badge">{carrito.cantidadProductos}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  )
}
