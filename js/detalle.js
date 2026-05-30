// =========================
// OBTENER ID DE LA URL
// =========================

const parametros = new URLSearchParams(window.location.search);
const id = parseInt(parametros.get("id"));

// =========================
// BUSCAR MANGA
// =========================

const manga = mangas.find(item => item.id === id);

// =========================
// CONTENEDOR
// =========================

const detalleContenedor = document.getElementById("detalle-contenedor");

// =========================
// MOSTRAR INFORMACIÓN
// =========================

if(manga){

    detalleContenedor.innerHTML = `
    
        <div class="detalle-card">

            <div class="detalle-imagen">
                <img src="../${manga.imagen}" alt="${manga.nombre}">
            </div>

            <div class="detalle-info">

                <h2>${manga.nombre}</h2>

                <p>
                    <strong>Categoría:</strong>
                    ${manga.categoria}
                </p>

                <p class="precio">
                    S/ ${manga.precio.toFixed(2)}
                </p>

                <p>
                    ${manga.descripcion}
                </p>

                <button  id="agregar-carrito" class="btn">
                    Agregar al carrito
                </button>

            </div>

        </div>

    `;

}else{

    detalleContenedor.innerHTML = `
        <h2>Manga no encontrado</h2>
    `;
}