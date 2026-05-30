// =========================
// MANGAS DESTACADOS
// =========================

// Contenedor donde se mostrarán los mangas
const contenedorDestacados = document.getElementById("productos-destacados");

// Tomamos los primeros 3 mangas
const destacados = mangas.slice(0, 3);

// Generamos las tarjetas
destacados.forEach(manga => {

    const tarjeta = document.createElement("article");

    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
        <img src="${manga.imagen}" alt="${manga.nombre}">

        <div class="producto-info">
            <h3>${manga.nombre}</h3>

            <p class="precio">
                S/ ${manga.precio.toFixed(2)}
            </p>

            <a href="pages/catalogo.html" class="btn">
                Ver catálogo
            </a>
        </div>
    `;

    contenedorDestacados.appendChild(tarjeta);
});