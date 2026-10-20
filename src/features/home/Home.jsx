import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch.js'
import Banner from './Banner.jsx'
import CategoryStrip from './CategoryStrip.jsx'
import ProductGrid from './ProductGrid.jsx'
import './home.css'

export default function Home() {
    const productos = useMockFetch('productos')
    const categorias = useMockFetch('categorias')
    const [categoriaId, setCategoriaId] = useState(null)

    const categoriaActiva = categorias.data?.find(
        (categoria) => categoria.id === categoriaId,
    )

    // El resumen del back tiene categoriaNombre, no categoriaId.
    const filtrados = (productos.data ?? []).filter(
        (producto) =>
            !categoriaActiva ||
            producto.categoriaNombre === categoriaActiva.nombre,
    )

    // El contrato no tiene un campo destacado: mostramos hasta ocho productos.
    const destacados = filtrados.slice(0, 8)

    return (
        <div className="home">
            <Banner />

            <CategoryStrip
                categorias={categorias.data ?? []}
                loading={categorias.loading}
                error={categorias.error}
                seleccionada={categoriaId}
                onSeleccionar={setCategoriaId}
            />

            <ProductGrid
                productos={destacados}
                loading={productos.loading}
                error={productos.error}
                titulo={categoriaActiva?.nombre ?? 'Productos destacados'}
            />
        </div>
    )
}