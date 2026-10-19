import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'

import Home from './features/home/Home.jsx'
import Busqueda from './features/busqueda/Busqueda.jsx'
import DetalleProducto from './features/detalle/DetalleProducto.jsx'
import Carrito from './features/carrito/Carrito.jsx'
import MisProductos from './features/productos/MisProductos.jsx'
import Categorias from './features/categorias/Categorias.jsx'
import Login from './features/auth/Login.jsx'
import Registro from './features/auth/Registro.jsx'
import NoEncontrado from './components/NoEncontrado.jsx'

/**
 * Mapa de rutas de la maqueta. Cada ruta es el modulo de una persona distinta.
 * El dueño de cada modulo edita solo su carpeta en src/features/.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buscar" element={<Busqueda />} />
        <Route path="productos/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="mis-productos" element={<MisProductos />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  )
}
