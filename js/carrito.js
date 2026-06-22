let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

const botonAgregar = document.getElementById("agregar-carrito");

if (botonAgregar) {
  botonAgregar.addEventListener("click", () => {
    const parametros = new URLSearchParams(window.location.search);
    const id = parseInt(parametros.get("id"));
    const manga = mangas.find(item => item.id === id);
    if (!manga) return;

    const itemExistente = carrito.find(item => item.manga.id === id);
    if (itemExistente) {
      itemExistente.cantidad++;
    } else {
      carrito.push({ manga, cantidad: 1 });
    }

    guardarCarrito();

    
    botonAgregar.innerHTML = '<i class="bi bi-check-lg me-2"></i>¡Agregado!';
    botonAgregar.classList.add("btn-success");
    botonAgregar.classList.remove("btn-primary");
    setTimeout(() => {
      botonAgregar.innerHTML = '<i class="bi bi-cart-plus me-2"></i>Agregar al carrito';
      botonAgregar.classList.remove("btn-success");
      botonAgregar.classList.add("btn-primary");
    }, 2000);
  });
}

const contenedorCarrito = document.getElementById("contenedor-carrito");
const tablaBody          = document.getElementById("tabla-carrito-body");
const totalCarritoEl     = document.getElementById("total-carrito");
const subtotalEl         = document.getElementById("subtotal-carrito");
const cantidadItemsEl    = document.getElementById("cantidad-items");


if (contenedorCarrito || tablaBody) {
  mostrarCarrito();
}



function mostrarCarrito() {

  if (carrito.length === 0) {
    const msgVacio = `
      <div class="text-center py-5"><i class="bi bi-cart-x fs-1 text-muted"></i>
        <p class="mt-3 fs-5 text-muted">Tu carrito está vacío</p>
        <a href="catalogo.html" class="btn btn-primary mt-2"><i class="bi bi-grid me-2"></i>Ver catálogo</a>
      </div>`;

    if (contenedorCarrito) contenedorCarrito.innerHTML = msgVacio;
    if (tablaBody) tablaBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4"><i class="bi bi-cart-x me-2"></i>No hay productos en el carrito.</td>
      </tr>`;

    if (totalCarritoEl)   totalCarritoEl.textContent   = "S/ 0.00";
    if (subtotalEl)       subtotalEl.textContent       = "S/ 0.00";
    if (cantidadItemsEl)  cantidadItemsEl.textContent  = "0 productos";
    return;
  }

  let total      = 0;
  let totalItems = 0;
  let htmlCards  = "";   
  let htmlFilas  = "";   

  carrito.forEach((item, index) => {
    const subtotal = item.manga.precio * item.cantidad;
    total      += subtotal;
    totalItems += item.cantidad;


    htmlCards += `
      <article class="card mb-3 shadow-sm">
        <div class="row g-0 align-items-center p-3">
          <div class="col-3">
            <img src="../${item.manga.imagen}" alt="Portada de ${item.manga.nombre}" class="img-fluid rounded">
          </div>
          <div class="col-5 ps-3">
            <h5 class="mb-1 fs-6">${item.manga.nombre}</h5>
            <p class="text-muted mb-1 small">${item.manga.categoria}</p>
            <p class="text-danger fw-bold mb-0">S/ ${item.manga.precio.toFixed(2)}</p>
          </div>
          <div class="col-4 text-end">
            <div class="d-flex align-items-center justify-content-end gap-1 mb-2">
              <button class="btn btn-outline-secondary btn-sm btn-restar" data-index="${index}" aria-label="Reducir cantidad">−</button>
              <span class="fw-bold px-1">${item.cantidad}</span>
              <button class="btn btn-outline-secondary btn-sm btn-sumar" data-index="${index}" aria-label="Aumentar cantidad">+</button>
            </div>
            <p class="fw-bold text-success small mb-2">S/ ${subtotal.toFixed(2)}</p>
            <button class="btn btn-outline-danger btn-sm eliminar" data-index="${index}" aria-label="Eliminar ${item.manga.nombre}"><i class="bi bi-trash"></i></button>
          </div>
        </div>
      </article>`;


    htmlFilas += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3">
            <img src="../${item.manga.imagen}" alt="Portada de ${item.manga.nombre}">
            <div>
              <p class="fw-semibold mb-0 small">${item.manga.nombre}</p>
              <span class="badge bg-secondary">${item.manga.categoria}</span>
            </div>
          </div>
        </td>
        <td class="text-danger fw-bold">S/ ${item.manga.precio.toFixed(2)}</td>
        <td class="text-center">
          <!-- Controles de cantidad dentro de la tabla -->
          <div class="d-flex align-items-center justify-content-center gap-2">
            <button class="btn btn-outline-secondary btn-sm btn-restar" data-index="${index}" aria-label="Reducir cantidad">−</button>
            <span class="fw-bold">${item.cantidad}</span>
            <button class="btn btn-outline-secondary btn-sm btn-sumar" data-index="${index}" aria-label="Aumentar cantidad">+</button>
          </div>
        </td>
        <td class="text-end fw-bold text-success">S/ ${subtotal.toFixed(2)}</td>
        <td class="text-center">
          <button class="btn btn-outline-danger btn-sm eliminar" data-index="${index}" aria-label="Eliminar ${item.manga.nombre}"> <i class="bi bi-trash"></i> </button>
        </td>
      </tr>`;
  });

  if (contenedorCarrito) contenedorCarrito.innerHTML = htmlCards;
  if (tablaBody)          tablaBody.innerHTML          = htmlFilas;


  if (totalCarritoEl)   totalCarritoEl.textContent   = `S/ ${total.toFixed(2)}`;
  if (subtotalEl)       subtotalEl.textContent       = `S/ ${total.toFixed(2)}`;
  if (cantidadItemsEl)  cantidadItemsEl.textContent  =
    `${totalItems} producto${totalItems !== 1 ? "s" : ""}`;

  vincularEventosCarrito();
}


function vincularEventosCarrito() {

  document.querySelectorAll(".eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      carrito.splice(parseInt(btn.dataset.index), 1);
      guardarCarrito();
      mostrarCarrito();
    });
  });

  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", () => {
      carrito[parseInt(btn.dataset.index)].cantidad++;
      guardarCarrito();
      mostrarCarrito();
    });
  });

  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index);
      if (carrito[idx].cantidad > 1) {
        carrito[idx].cantidad--;
      } else {
        carrito.splice(idx, 1);
      }
      guardarCarrito();
      mostrarCarrito();
    });
  });
}


const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (carrito.length === 0) return;
    if (confirm("¿Seguro que deseas vaciar el carrito?")) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
    }
  });
}


const btnFinalizar = document.getElementById("btn-finalizar");
if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("Agrega productos al carrito antes de continuar.");
      return;
    }
    window.location.href = "checkout.html";
  });
}
