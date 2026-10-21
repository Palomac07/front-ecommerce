export default function CategoryFilter({ categorias, valor, onChange }) {
  return (
    <div className="busqueda-campo">
      <label htmlFor="busqueda-categoria">Categoría</label>
      <select id="busqueda-categoria" value={valor} onChange={(event) => onChange(event.target.value)}>
        <option value="">Todas las categorías</option>
        {categorias.map((categoria) => <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>)}
      </select>
    </div>
  )
}
