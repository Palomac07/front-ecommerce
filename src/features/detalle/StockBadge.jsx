export default function StockBadge({ stock }) {
  const stockNumero = Number(stock ?? 0)

  if (stockNumero <= 0) {
    return (
      <span className="stock-badge stock-badge--agotado" role="status">
        Sin stock disponible
      </span>
    )
  }

  if (stockNumero <= 5) {
    return (
      <span className="stock-badge stock-badge--alerta" role="status">
        ¡Últimas {stockNumero} {stockNumero === 1 ? 'unidad' : 'unidades'}!
      </span>
    )
  }

  return (
    <span className="stock-badge stock-badge--disponible" role="status">
      Stock disponible ({stockNumero} unidades)
    </span>
  )
}
