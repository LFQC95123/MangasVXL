const parametros = new URLSearchParams(window.location.search);
const id = parseInt(parametros.get("id"));
const manga = mangas.find(item => item.id === id);
const detalleContenedor = document.getElementById("detalle-contenedor");

if (manga) {

  detalleContenedor.innerHTML = `

    <!-- Columna de imagen — Bootstrap col responsive -->
    <div class="col-md-5">
      <div class="detalle-imagen">
        <img src="../${manga.imagen}" alt="Portada de ${manga.nombre}"  class="img-fluid rounded shadow">
      </div>
    </div>

    <!-- Columna de información -->
    <div class="col-md-7">
      <div class="card shadow-sm p-4 detalle-info">
        <h2 class="mb-3">${manga.nombre}</h2>
        <p><strong>Categoría:</strong> <span class="badge bg-secondary ms-1">${manga.categoria}</span></p>
        <p class="precio fs-3">S/ ${manga.precio.toFixed(2)}</p>
        <p class="text-muted">${manga.descripcion}</p>

        <hr>

        <button id="agregar-carrito" class="btn btn-primary btn-lg w-100"><i class="bi bi-cart-plus me-2"></i>Agregar al carrito</button>
        <a href="catalogo.html" class="btn btn-outline-secondary mt-3"><i class="bi bi-arrow-left me-2"></i>Volver al catálogo</a>
      </div>
    </div>`;

} else {

  detalleContenedor.innerHTML = `
    <div class="col-12 text-center py-5">
      <h2 class="text-danger">Manga no encontrado</h2>
      <p class="text-muted">El manga que buscas no existe en nuestro catálogo.</p>
      <a href="catalogo.html" class="btn btn-primary mt-3">Ver catálogo</a>
    </div>`;
}
