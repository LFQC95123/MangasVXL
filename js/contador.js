// =========================
// CONTADOR DEL CARRITO
// =========================

function actualizarContador(){

    const contador =
    document.getElementById("contador-carrito");

    if(!contador) return;

    const carrito =
    JSON.parse(localStorage.getItem("carrito"))
    || [];

    contador.textContent = carrito.length;

}

// Ejecutar al cargar
actualizarContador();