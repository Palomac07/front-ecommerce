export default function SearchBar({ valor, onChange }) {
  return (
    <div className="busqueda-campo">
      <label htmlFor="buscar-producto">Buscar por nombre</label>
      <input id="buscar-producto" type="search" placeholder="Ej.: Samsung, notebook, auriculares"
        value={valor} onChange={(event) => onChange(event.target.value)} />
    </div>
  )
}
