import { Link, NavLink } from 'react-router-dom'
import { useMockFetch } from '../hooks/useMockFetch.js'
import CartIcon from './CartIcon.jsx'

export default function Navbar() {
  const { data: carrito } = useMockFetch('carrito')

  return (
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="logo">
            Grupo6<span>Market</span>
          </Link>

          <nav className="nav-links" aria-label="Navegación principal">
            <NavLink to="/buscar">Buscar</NavLink>
            <NavLink to="/categorias">Categorías</NavLink>
            <NavLink to="/mis-productos">Mis productos</NavLink>
          </nav>

          <div className="nav-acciones">
            <NavLink to="/login" className="btn-texto">
              Ingresar
            </NavLink>
            <CartIcon cantidad={carrito?.cantidadProductos ?? 0} />
          </div>
        </div>
      </header>
  )
}