import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="contenido">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
