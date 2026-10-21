import { useState } from 'react'
import { useMockFetch } from '../../hooks/useMockFetch.js'
import SearchBar from './SearchBar.jsx'
import ProductList from './ProductList.jsx'
import EmptyState from './EmptyState.jsx'
import FilterSidebar from './FilterSidebar.jsx'
import SortDropdown from './SortDropdown.jsx'
import { filtrarProductos, validarPrecios } from './filtrarProductos.js'

export default function Busqueda() {
  const productosFetch = useMockFetch('productos')
  const categoriasFetch = useMockFetch('categorias')
  const [texto, setTexto] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [minimo, setMinimo] = useState('')
  const [maximo, setMaximo] = useState('')
  const [orden, setOrden] = useState('original')
  const categorias = categoriasFetch.data ?? []
  const loading = productosFetch.loading || categoriasFetch.loading
  const error = productosFetch.error || categoriasFetch.error
  const errorPrecio = validarPrecios(minimo, maximo)
  const resultados = filtrarProductos(productosFetch.data ?? [], categorias, { texto, categoriaId, minimo, maximo, orden })

  function limpiarFiltros() {
    setCategoriaId('')
    setMinimo('')
    setMaximo('')
    setOrden('original')
  }

  function limpiarTodo() {
    setTexto('')
    limpiarFiltros()
  }

  return (
    <section className="busqueda">
      <header><h1>Buscar productos</h1><p>Encontrá tu próximo producto en Grupo6Market.</p></header>
      <SearchBar valor={texto} onChange={setTexto} />
      {loading ? <p className="estado-carga" role="status">Cargando productos y categorías…</p>
        : error ? <p className="estado-error" role="alert">No pudimos cargar el catálogo: {error}</p>
          : <div className="busqueda-layout">
            <FilterSidebar categorias={categorias} categoriaId={categoriaId} onCategoria={setCategoriaId}
              minimo={minimo} maximo={maximo} onMinimo={setMinimo} onMaximo={setMaximo}
              error={errorPrecio} onLimpiar={limpiarFiltros} />
            <div className="busqueda-resultados">
              <div className="busqueda-toolbar">
                <p role="status">{errorPrecio ? 'Revisá el rango de precios' : `${resultados.length} ${resultados.length === 1 ? 'producto encontrado' : 'productos encontrados'}`}</p>
                <SortDropdown valor={orden} onChange={setOrden} />
              </div>
              {errorPrecio ? <p className="estado-vacio">Corregí los precios para ver los resultados.</p>
                : resultados.length ? <ProductList productos={resultados} /> : <EmptyState onLimpiar={limpiarTodo} />}
            </div>
          </div>}
    </section>
  )
}
import './busqueda.css'
