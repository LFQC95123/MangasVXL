function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const totalUnidades = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);

  contador.textContent = totalUnidades;

}

actualizarContador();
