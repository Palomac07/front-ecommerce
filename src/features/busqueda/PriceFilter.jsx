export default function PriceFilter({ minimo, maximo, onMinimo, onMaximo, error }) {
  return (
    <fieldset className="busqueda-precios">
      <legend>Precio en pesos</legend>
      <div className="busqueda-campo">
        <label htmlFor="busqueda-minimo">Desde</label>
        <input id="busqueda-minimo" type="number" min="0" step="0.01" placeholder="Sin mínimo"
          value={minimo} onChange={(event) => onMinimo(event.target.value)}
          aria-invalid={Boolean(error)} aria-describedby={error ? 'busqueda-precio-error' : undefined} />
      </div>
      <div className="busqueda-campo">
        <label htmlFor="busqueda-maximo">Hasta</label>
        <input id="busqueda-maximo" type="number" min="0" step="0.01" placeholder="Sin máximo"
          value={maximo} onChange={(event) => onMaximo(event.target.value)}
          aria-invalid={Boolean(error)} aria-describedby={error ? 'busqueda-precio-error' : undefined} />
      </div>
      {error && <p id="busqueda-precio-error" className="busqueda-error" role="alert">{error}</p>}
    </fieldset>
  )
}
