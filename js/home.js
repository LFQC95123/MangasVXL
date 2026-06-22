
const contenedorDestacados = document.getElementById("productos-destacados");
// Tomar los primeros 3 mangas como destacados
const destacados = mangas.slice(0, 3);

destacados.forEach(manga => {
  const col = document.createElement("div");
  col.className = "col";

  col.innerHTML = `
    <article class="card h-100 shadow-sm producto">
      <img src="${manga.imagen}"alt="${manga.nombre}" class="card-img-top" style="height:350px; object-fit:cover;">
      <div class="card-body producto-info d-flex flex-column">
        <h3 class="card-title fs-6">${manga.nombre}</h3>
        <p class="precio text-danger fw-bold">S/ ${manga.precio.toFixed(2)}</p>
        <p class="card-text text-muted small">${manga.categoria}</p>

        <a href="pages/detalle.html?id=${manga.id}" class="btn btn-primary mt-auto" aria-label="Ver detalle de ${manga.nombre}"><i class="bi bi-eye me-1"></i> Ver detalle </a>
      </div>
    </article>`;

  contenedorDestacados.appendChild(col);
});
