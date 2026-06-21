const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const resumenContenedor = document.getElementById("resumen-pedido");
const resumenTotal      = document.getElementById("resumen-total");

function renderizarResumen() {
  if (!resumenContenedor) return;

  if (carrito.length === 0) {
    resumenContenedor.innerHTML = `
      <p class="text-muted text-center">No hay productos en el carrito.</p>
      <a href="catalogo.html" class="btn btn-outline-primary w-100 mt-2">Ir al catálogo</a>`;
    return;
  }

  let total = 0;
  let html = "";

  carrito.forEach(item => {
    const subtotal = item.manga.precio * item.cantidad;
    total += subtotal;
    html += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-2">
        <div>
          <p class="mb-0 fw-semibold small">${item.manga.nombre}</p>
          <p class="mb-0 text-muted small">x${item.cantidad} unidad${item.cantidad > 1 ? "es" : ""}</p>
        </div>
        <span class="fw-bold text-danger">S/ ${subtotal.toFixed(2)}</span>
      </div>`;
  });

  resumenContenedor.innerHTML = html;
  if (resumenTotal) resumenTotal.textContent = `S/ ${total.toFixed(2)}`;
}

renderizarResumen();


const form = document.getElementById("formulario-checkout");
const campoNombre = document.getElementById("co-nombre");
const campoEmail = document.getElementById("co-email");
const campoTelefono = document.getElementById("co-telefono");
const campoDireccion = document.getElementById("co-direccion");
const campoCiudad = document.getElementById("co-ciudad");
const campoPago = document.getElementById("co-pago");


function mostrarError(campo, mensaje) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  const errorDiv = document.getElementById(`error-${campo.id}`);
  if (errorDiv) errorDiv.textContent = mensaje;
}

function marcarValido(campo) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  const errorDiv = document.getElementById(`error-${campo.id}`);
  if (errorDiv) errorDiv.textContent = "";
}


function validarNombre() {
  const val = campoNombre.value.trim();
  if (val === "") {
    mostrarError(campoNombre, "El nombre completo es obligatorio.");
    return false;
  }
  if (val.length < 2) {
    mostrarError(campoNombre, "El nombre debe tener al menos 2 caracteres.");
    return false;
  }
  marcarValido(campoNombre);
  return true;
}

function validarEmail() {
  const val = campoEmail.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (val === "") {
    mostrarError(campoEmail, "El correo es obligatorio.");
    return false;
  }
  if (!regex.test(val)) {
    mostrarError(campoEmail, "Ingresa un correo electrónico válido.");
    return false;
  }
  marcarValido(campoEmail);
  return true;
}

function validarTelefono() {
  const val = campoTelefono.value.trim();
  
  if (!/^9\d{8}$/.test(val)) {
    mostrarError(campoTelefono, "Ingresa un celular válido (9 dígitos, empieza en 9).");
    return false;
  }
  marcarValido(campoTelefono);
  return true;
}

function validarDireccion() {
  const val = campoDireccion.value.trim();
  if (val === "") {
    mostrarError(campoDireccion, "La dirección de envío es obligatoria.");
    return false;
  }
  if (val.length < 5) {
    mostrarError(campoDireccion, "Ingresa una dirección más completa.");
    return false;
  }
  marcarValido(campoDireccion);
  return true;
}

function validarCiudad() {
  const val = campoCiudad.value.trim();
  if (val === "") {
    mostrarError(campoCiudad, "La ciudad es obligatoria.");
    return false;
  }
  marcarValido(campoCiudad);
  return true;
}

function validarPago() {
  const val = campoPago.value;
  if (val === "") {
    mostrarError(campoPago, "Selecciona un método de pago.");
    return false;
  }
  marcarValido(campoPago);
  return true;
}

campoNombre.addEventListener("input", validarNombre);
campoEmail.addEventListener("input", validarEmail);
campoTelefono.addEventListener("input", validarTelefono);
campoDireccion.addEventListener("input", validarDireccion);
campoCiudad.addEventListener("input", validarCiudad);
campoPago.addEventListener("change", validarPago);  


if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ok =
      validarNombre()    &
      validarEmail()     &
      validarTelefono()  &
      validarDireccion() &
      validarCiudad()    &
      validarPago();

    if (!ok) {

      const primerError = form.querySelector(".is-invalid");
      if (primerError) primerError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    localStorage.removeItem("carrito");
    actualizarContador();

    form.classList.add("d-none");
    document.getElementById("mensaje-exito").classList.remove("d-none");
  });
}
