import CategoryFilter from './CategoryFilter.jsx'
import PriceFilter from './PriceFilter.jsx'

export default function FilterSidebar({ categorias, categoriaId, onCategoria, minimo, maximo, onMinimo, onMaximo, error, onLimpiar }) {
  return (
    <aside className="card busqueda-filtros" aria-labelledby="busqueda-filtros-titulo">
      <h2 id="busqueda-filtros-titulo">Filtros</h2>
      <CategoryFilter categorias={categorias} valor={categoriaId} onChange={onCategoria} />
      <PriceFilter minimo={minimo} maximo={maximo} onMinimo={onMinimo} onMaximo={onMaximo} error={error} />
      <button type="button" className="btn btn-secundario" onClick={onLimpiar}>Limpiar filtros</button>
    </aside>
  )
}
