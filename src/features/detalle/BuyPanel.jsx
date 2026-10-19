import { useState } from 'react'
import StockBadge from './StockBadge'
import PriceBlock from './PriceBlock'

export default function BuyPanel({ producto }) {
  const stock = Number(producto?.stock ?? 0)
  const hayStock = stock > 0
  const [cantidad, setCantidad] = useState(1)
  const [mensajeAccion, setMensajeAccion] = useState(null)

  const [agregando, setAgregando] = useState(false)

  const decrementar = () => {
    setCantidad((prev) => Math.max(1, prev - 1))
    setMensajeAccion(null)
  }

  const incrementar = () => {
    setCantidad((prev) => Math.min(stock, prev + 1))
    setMensajeAccion(null)
  }

  const handleCambioManual = (e) => {
    const valor = parseInt(e.target.value, 10)
    if (isNaN(valor)) {
      setCantidad(1)
    } else {
      setCantidad(Math.max(1, Math.min(stock, valor)))
    }
    setMensajeAccion(null)
  }

  const handleAgregarAlCarrito = () => {
    if (!hayStock) return
    setAgregando(true)
    setMensajeAccion({
      tipo: 'exito',
      texto: `¡Se ${cantidad === 1 ? 'agregó 1 unidad' : `agregaron ${cantidad} unidades`} al carrito!`
    })
    setTimeout(() => {
      setAgregando(false)
    }, 400)
    setTimeout(() => {
      setMensajeAccion((actual) => (actual?.tipo === 'exito' ? null : actual))
    }, 2500)
  }

  const handleComprarAhora = () => {
    if (!hayStock) return
    setMensajeAccion({
      tipo: 'info',
      texto: 'Redirigiendo al proceso de compra...'
    })
  }

  return (
    <div className="buy-panel card">
      <div className="buy-panel__estado">
        <StockBadge stock={stock} />
      </div>

      <PriceBlock precio={producto?.precio} />

      {hayStock ? (
        <div className="buy-panel__cantidad-bloque">
          <label htmlFor="selector-cantidad" className="buy-panel__cantidad-label">
            Cantidad:
          </label>
          <div className="buy-panel__control-cantidad">
            <button
              type="button"
              className="buy-panel__btn-cant"
              onClick={decrementar}
              disabled={cantidad <= 1}
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <input
              id="selector-cantidad"
              type="number"
              className="buy-panel__input-cant"
              min="1"
              max={stock}
              value={cantidad}
              onChange={handleCambioManual}
            />
            <button
              type="button"
              className="buy-panel__btn-cant"
              onClick={incrementar}
              disabled={cantidad >= stock}
              aria-label="Aumentar cantidad"
            >
              +
            </button>
            <span className="buy-panel__disponibles-txt">
              ({stock} {stock === 1 ? 'disponible' : 'disponibles'})
            </span>
          </div>
        </div>
      ) : (
        <div className="buy-panel__sin-stock-aviso">
          <p>Este producto no cuenta con unidades disponibles en este momento.</p>
        </div>
      )}

      <div className="buy-panel__acciones">
        <button
          type="button"
          className="btn buy-panel__btn-comprar"
          disabled={!hayStock}
          onClick={handleComprarAhora}
        >
          {hayStock ? 'Comprar ahora' : 'No disponible'}
        </button>

        <button
          type="button"
          className={`btn btn-secundario buy-panel__btn-carrito ${agregando ? 'buy-panel__btn-carrito--pulsado' : ''}`}
          disabled={!hayStock}
          onClick={handleAgregarAlCarrito}
        >
          {agregando ? '¡Agregado!' : 'Agregar al carrito'}
        </button>
      </div>

      {mensajeAccion && (
        <div
          className={`buy-panel__mensaje buy-panel__mensaje--${mensajeAccion.tipo}`}
          role="status"
        >
          {mensajeAccion.texto}
        </div>
      )}

      <div className="buy-panel__garantias">
        <div className="buy-panel__garantia-item">
          <span className="buy-panel__icono-garantia" aria-hidden="true">🔒</span>
          <span>Compra protegida: recibí el producto que esperabas o te devolvemos el dinero.</span>
        </div>
        <div className="buy-panel__garantia-item">
          <span className="buy-panel__icono-garantia" aria-hidden="true">🚚</span>
          <span>Envíos a todo el país a través de Mercado Envíos.</span>
        </div>
      </div>
    </div>
  )
}
