export default function CategoryStrip({
                                          categorias,
                                          loading,
                                          error,
                                          seleccionada,
                                          onSeleccionar,
                                      }) {
    return (
        <section className="home-seccion" aria-labelledby="home-categorias">
            <h2 id="home-categorias">Explorá por categoría</h2>

            {loading ? (
                <p role="status">Cargando categorías…</p>
            ) : error ? (
                <p className="estado-error" role="alert">
                    No pudimos cargar las categorías. {error}
                </p>
            ) : (
                <>
                    <div
                        className="home-categorias"
                        role="group"
                        aria-label="Filtrar productos por categoría"
                    >
                        <button
                            type="button"
                            className="home-categoria"
                            aria-pressed={seleccionada === null}
                            onClick={() => onSeleccionar(null)}
                        >
                            Todas
                        </button>

                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                type="button"
                                className="home-categoria"
                                aria-pressed={seleccionada === categoria.id}
                                onClick={() => onSeleccionar(categoria.id)}
                                title={categoria.descripcion || undefined}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>

                    {categorias.length === 0 && <p>Todavía no hay categorías.</p>}
                </>
            )}
        </section>
    )
}