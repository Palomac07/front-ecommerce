import { NavLink } from 'react-router-dom'

export default function CartIcon({ cantidad = 0 }) {
    return (
        <NavLink
            to="/carrito"
            className="btn-carrito"
            aria-label={'Carrito, ' + cantidad + (cantidad === 1 ? ' producto' : ' productos')}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
                focusable="false"
                style={{ verticalAlign: 'middle', marginRight: 6 }}
            >
                <path d="M3 3h2l3 12h10l3-9H6" />
                <circle cx="9" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
            </svg>
            Carrito
            {cantidad > 0 && (
                <span className="badge" aria-hidden="true">{cantidad}</span>
            )}
        </NavLink>
    )
}