import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ productos, loading, error, titulo }) {
    return (
        <section
            id="home-destacados"
            className="home-seccion"
            aria-labelledby="home-productos"
        >
            <div className="home-encabezado">
                <h2 id="home-productos">{titulo}</h2>
                {!loading && !error && (
                    <p className="home-contador" role="status">
                        {productos.length} {productos.length === 1 ? 'producto' : 'productos'}
                    </p>
                )}
            </div>

            {loading ? (
                <p className="estado-carga" role="status">Cargando productos…</p>
            ) : error ? (
                <p className="estado-error" role="alert">
                    No pudimos cargar los productos. {error}
                </p>
            ) : productos.length === 0 ? (
                <p className="estado-vacio" role="status">
                    No hay productos para mostrar.
                </p>
            ) : (
                <div className="grid-productos">
                    {productos.map((producto) => (
                        <ProductCard key={producto.id} producto={producto} />
                    ))}
                </div>
            )}
        </section>
    )
}