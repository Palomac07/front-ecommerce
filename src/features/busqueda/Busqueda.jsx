import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch.js'
import SearchBar from './SearchBar.jsx'
import ProductList from './ProductList.jsx'
import EmptyState from './EmptyState.jsx'

export default function Busqueda() {
  const { data: productos, loading, error } = useMockFetch('productos')
  const [texto, setTexto] = useState('')
  const normalizar = (valor) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
  const resultados = (productos ?? []).filter((producto) =>
    normalizar(producto.nombre).includes(normalizar(texto.trim())))

  return (
    <section className="busqueda">
      <header><h1>Buscar productos</h1><p>Encontrá tu próximo producto en Grupo6Market.</p></header>
      <SearchBar valor={texto} onChange={setTexto} />
      {loading ? <p className="estado-carga" role="status">Cargando productos…</p>
        : error ? <p className="estado-error" role="alert">No pudimos cargar los productos: {error}</p>
          : <>
            <p role="status">{resultados.length} {resultados.length === 1 ? 'producto encontrado' : 'productos encontrados'}</p>
            {resultados.length ? <ProductList productos={resultados} /> : <EmptyState onLimpiar={() => setTexto('')} />}
          </>}
    </section>
  )
}
