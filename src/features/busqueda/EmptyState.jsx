export default function EmptyState({ onLimpiar }) {
  return (
    <div className="estado-vacio">
      <h2>No encontramos productos</h2>
      <p>Probá con otro nombre o cambiá los filtros.</p>
      <button type="button" className="btn btn-secundario" onClick={onLimpiar}>Limpiar búsqueda y filtros</button>
    </div>
  )
}
