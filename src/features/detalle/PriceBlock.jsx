import { formatearPrecio } from '../../hooks/useMockFetch'

export default function PriceBlock({ precio }) {
  const cuotas = precio != null ? Math.round((Number(precio) / 6) * 100) / 100 : null

  return (
    <div className="price-block">
      <div className="price-block__principal">
        <span className="price-block__valor">{formatearPrecio(precio)}</span>
      </div>
      {precio != null && precio > 0 && (
        <div className="price-block__financiacion">
          <span className="price-block__cuotas">
            En <strong>6 cuotas</strong> de <strong>{formatearPrecio(cuotas)}</strong> sin interés
          </span>
          <span className="price-block__metodos">Mismo precio en 1 pago con débito o crédito</span>
        </div>
      )}
    </div>
  )
}
