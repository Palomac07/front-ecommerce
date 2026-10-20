export default function Banner() {
    return (
        <section className="home-banner" aria-labelledby="home-titulo">
            <span className="home-etiqueta">Grupo6 Market</span>
            <h1 id="home-titulo">Encontrá tu próximo favorito.</h1>
            <p>
                Explorá celulares, notebooks, audio y mucho más en un solo lugar.
            </p>
            <a href="#home-destacados" className="btn home-banner-boton">
                Explorar productos →
            </a>
        </section>
    )
}