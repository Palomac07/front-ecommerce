export default function SortDropdown({ valor, onChange }) {
  return (
    <div className="busqueda-campo busqueda-orden">
      <label htmlFor="busqueda-orden">Ordenar por</label>
      <select id="busqueda-orden" value={valor} onChange={(event) => onChange(event.target.value)}>
        <option value="original">Orden del catálogo</option>
        <option value="precio-asc">Menor precio</option>
        <option value="precio-desc">Mayor precio</option>
        <option value="nombre">Nombre: A a Z</option>
      </select>
    </div>
  )
}
