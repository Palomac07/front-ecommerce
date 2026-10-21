const normalizar = (valor) => valor.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')

export function validarPrecios(minimo, maximo) {
  const invalido = (valor) => valor !== '' && (!Number.isFinite(Number(valor)) || Number(valor) < 0)
  if (invalido(minimo) || invalido(maximo)) return 'Ingresá precios válidos mayores o iguales a cero.'
  if (minimo !== '' && maximo !== '' && Number(minimo) > Number(maximo)) {
    return 'El precio mínimo no puede superar al máximo.'
  }
  return ''
}

export function filtrarProductos(productos, categorias, { texto, categoriaId, minimo, maximo, orden }) {
  if (validarPrecios(minimo, maximo)) return []
  const categoria = categorias.find((item) => String(item.id) === categoriaId)
  // El resumen del back trae categoriaNombre, no categoriaId.
  const resultados = productos.filter((producto) =>
    normalizar(producto.nombre).includes(normalizar(texto.trim())) &&
    (!categoriaId || producto.categoriaNombre === categoria?.nombre) &&
    (minimo === '' || producto.precio >= Number(minimo)) &&
    (maximo === '' || producto.precio <= Number(maximo)))
  if (orden === 'precio-asc') resultados.sort((a, b) => a.precio - b.precio)
  if (orden === 'precio-desc') resultados.sort((a, b) => b.precio - a.precio)
  if (orden === 'nombre') resultados.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
  return resultados
}
