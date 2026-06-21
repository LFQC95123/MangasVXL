
const contenedorCatalogo = document.getElementById("catalogo-productos");
const inputBusqueda      = document.getElementById("busqueda");
const botonesFiltro      = document.querySelectorAll(".btn-filtro");


function mostrarProductos(lista) {
  contenedorCatalogo.innerHTML = "";

  if (lista.length === 0) {
    contenedorCatalogo.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted fs-5">No se encontraron mangas con ese criterio.</p>
      </div>`;
    return;
  }

  lista.forEach(manga => {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
      <article class="card h-100 shadow-sm producto">
        <img src="../${manga.imagen}" alt="Portada de ${manga.nombre}" class="card-img-top" loading="lazy">
        <div class="card-body producto-info d-flex flex-column">
          <h3 class="card-title fs-6 mb-2">${manga.nombre}</h3>
          <p class="precio mb-1">S/ ${manga.precio.toFixed(2)}</p>
          <span class="badge bg-secondary mb-3" style="width:fit-content;">${manga.categoria}</span>

          <a href="detalle.html?id=${manga.id}" class="btn btn-primary mt-auto" aria-label="Ver detalle de ${manga.nombre}"> <i class="bi bi-eye me-1"></i>Ver detalle </a>
        </div>

      </article>`;

    contenedorCatalogo.appendChild(col);
  });
}

mostrarProductos(mangas);

inputBusqueda.addEventListener("input", () => {
  const texto = inputBusqueda.value.toLowerCase().trim();
  const categoriaActiva = document.querySelector(".btn-filtro.activo")?.dataset.categoria || "Todos";

  let resultado = mangas.filter(manga =>
    manga.nombre.toLowerCase().includes(texto) ||
    manga.descripcion.toLowerCase().includes(texto)
  );

  if (categoriaActiva !== "Todos") {
    resultado = resultado.filter(m => m.categoria === categoriaActiva);
  }

  mostrarProductos(resultado);
});



botonesFiltro.forEach(boton => {
  boton.addEventListener("click", () => {

    botonesFiltro.forEach(b => {
      b.classList.remove("activo");
      b.setAttribute("aria-pressed", "false");
    });
    
    boton.classList.add("activo");
    boton.setAttribute("aria-pressed", "true");

    const categoria = boton.dataset.categoria;
    const texto     = inputBusqueda.value.toLowerCase().trim();

    let resultado = categoria === "Todos" ? mangas :
                    mangas.filter(m => m.categoria === categoria);

    if (texto) {
      resultado = resultado.filter(m =>
        m.nombre.toLowerCase().includes(texto)
      );
    }

    mostrarProductos(resultado);
  });
});
