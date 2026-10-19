import { useEffect, useState } from 'react'

/**
 * Lee un JSON de /public/data/ simulando una llamada al back.
 *
 * Cuando conectemos la API real de Spring Boot, lo unico que cambia es la
 * URL del fetch: la forma de los datos ya es la misma que devuelven los DTOs,
 * asi que los componentes no se tocan.
 *
 *   const { data, loading, error } = useMockFetch('productos')
 */
export function useMockFetch(nombreArchivo) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!nombreArchivo) return

    let cancelado = false
    setLoading(true)
    setError(null)

    fetch(`/data/${nombreArchivo}.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`No se encontro /data/${nombreArchivo}.json`)
        return res.json()
      })
      .then((json) => { if (!cancelado) setData(json) })
      .catch((err) => { if (!cancelado) setError(err.message) })
      .finally(() => { if (!cancelado) setLoading(false) })

    return () => { cancelado = true }
  }, [nombreArchivo])

  return { data, loading, error }
}

/** Formatea un importe (BigDecimal en el back) como precio en pesos. */
export function formatearPrecio(valor) {
  if (valor == null) return '-'
  return valor.toLocaleString('es-AR', {
    style: 'currency', currency: 'ARS', minimumFractionDigits: 2,
  })
}
