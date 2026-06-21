const formulario = document.getElementById("formulario-contacto");

function mostrarErrorContacto(campo, errorId, mensaje) {
  campo.classList.add("is-invalid");
  campo.classList.remove("is-valid");
  const div = document.getElementById(errorId);
  if (div) div.textContent = mensaje;
}

function marcarValidoContacto(campo, errorId) {
  campo.classList.remove("is-invalid");
  campo.classList.add("is-valid");
  const div = document.getElementById(errorId);
  if (div) div.textContent = "";
}

if (formulario) {

  const campoNombre  = document.getElementById("nombre");
  const campoCorreo  = document.getElementById("correo");
  const campoAsunto  = document.getElementById("asunto");
  const campoMensaje = document.getElementById("mensaje");

  campoNombre.addEventListener("input", () => {
    if (campoNombre.value.trim() === "") {
      mostrarErrorContacto(campoNombre, "error-nombre", "El nombre no puede estar vacío.");
    } else {
      marcarValidoContacto(campoNombre, "error-nombre");
    }
  });

  campoCorreo.addEventListener("input", () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(campoCorreo.value.trim())) {
      mostrarErrorContacto(campoCorreo, "error-correo", "Ingresa un correo electrónico válido.");
    } else {
      marcarValidoContacto(campoCorreo, "error-correo");
    }
  });

  campoAsunto.addEventListener("input", () => {
    if (campoAsunto.value.trim() === "") {
      mostrarErrorContacto(campoAsunto, "error-asunto", "El asunto no puede estar vacío.");
    } else {
      marcarValidoContacto(campoAsunto, "error-asunto");
    }
  });

  campoMensaje.addEventListener("input", () => {
    if (campoMensaje.value.trim().length < 10) {
      mostrarErrorContacto(campoMensaje, "error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
    } else {
      marcarValidoContacto(campoMensaje, "error-mensaje");
    }
  });


  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre  = campoNombre.value.trim();
    const correo  = campoCorreo.value.trim();
    const asunto  = campoAsunto.value.trim();
    const mensaje = campoMensaje.value.trim();
    const regex   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valido = true;

    if (nombre === "") {
      mostrarErrorContacto(campoNombre, "error-nombre", "El nombre es obligatorio.");
      valido = false;
    }
    if (!regex.test(correo)) {
      mostrarErrorContacto(campoCorreo, "error-correo", "Ingresa un correo válido.");
      valido = false;
    }
    if (asunto === "") {
      mostrarErrorContacto(campoAsunto, "error-asunto", "El asunto es obligatorio.");
      valido = false;
    }
    if (mensaje.length < 10) {
      mostrarErrorContacto(campoMensaje, "error-mensaje", "El mensaje debe tener al menos 10 caracteres.");
      valido = false;
    }

    if (!valido) return;

    const exito = document.getElementById("mensaje-exito-contacto");
    if (exito) exito.classList.remove("d-none");
    formulario.reset();

    [campoNombre, campoCorreo, campoAsunto, campoMensaje].forEach(c => {
      c.classList.remove("is-valid", "is-invalid");
    });
  });
}
