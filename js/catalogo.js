// =========================
// ELEMENTOS DEL DOM
// =========================

const contenedorCatalogo = document.getElementById("catalogo-productos");
const inputBusqueda = document.getElementById("busqueda");
const botonesFiltro = document.querySelectorAll(".btn-filtro");

// =========================
// MOSTRAR PRODUCTOS
// =========================

function mostrarProductos(listaProductos){

    contenedorCatalogo.innerHTML = "";

    listaProductos.forEach(manga => {

        contenedorCatalogo.innerHTML += `
            <article class="producto">

                <img src="../${manga.imagen}" alt="${manga.nombre}">

                <div class="producto-info">

                    <h3>${manga.nombre}</h3>

                    <p class="precio">
                        S/ ${manga.precio.toFixed(2)}
                    </p>

                    <p>${manga.categoria}</p>

                    <a href="detalle.html?id=${manga.id}" class="btn">
                        Ver detalle
                    </a>

                </div>

            </article>
        `;
    });
}

// =========================
// CARGA INICIAL
// =========================

mostrarProductos(mangas);

// =========================
// BÚSQUEDA
// =========================

inputBusqueda.addEventListener("input", () => {

    const texto = inputBusqueda.value.toLowerCase();

    const resultados = mangas.filter(manga =>
        manga.nombre.toLowerCase().includes(texto)
    );

    mostrarProductos(resultados);
});

// =========================
// FILTROS
// =========================

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        const categoria = boton.dataset.categoria;

        if(categoria === "Todos"){
            mostrarProductos(mangas);
            return;
        }

        const filtrados = mangas.filter(
            manga => manga.categoria === categoria
        );

        mostrarProductos(filtrados);

    });

});