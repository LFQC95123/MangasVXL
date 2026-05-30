// =========================
// OBTENER CARRITO
// =========================

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];

// =========================
// AGREGAR DESDE DETALLE
// =========================

const botonAgregar = document.getElementById("agregar-carrito");

if(botonAgregar){

    botonAgregar.addEventListener("click", () => {

        const parametros = new URLSearchParams(window.location.search);

        const id = parseInt(parametros.get("id"));

        const manga = mangas.find(
            item => item.id === id
        );

        carrito.push(manga);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );
        actualizarContador();

        alert("Manga agregado al carrito");
    });

}

// =========================
// MOSTRAR CARRITO
// =========================

const contenedorCarrito =
document.getElementById("contenedor-carrito");

const totalCarrito =
document.getElementById("total-carrito");

if(contenedorCarrito){

    mostrarCarrito();

}

function mostrarCarrito(){

    contenedorCarrito.innerHTML = "";

    let total = 0;

    carrito.forEach((manga,index)=>{

        total += manga.precio;

        contenedorCarrito.innerHTML += `

            <article class="producto">

                <img
                src="../${manga.imagen}"
                alt="${manga.nombre}"
                >

                <div class="producto-info">

                    <h3>${manga.nombre}</h3>

                    <p class="precio">
                        S/ ${manga.precio.toFixed(2)}
                    </p>

                    <button
                    class="btn eliminar"
                    data-index="${index}"
                    >
                        Eliminar
                    </button>

                </div>

            </article>

        `;
    });

    totalCarrito.textContent =
    `S/ ${total.toFixed(2)}`;

    eliminarProducto();
}

// =========================
// ELIMINAR
// =========================

function eliminarProducto(){

    const botonesEliminar =
    document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton=>{

        boton.addEventListener("click",()=>{

            const indice =
            boton.dataset.index;

            carrito.splice(indice,1);

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );

            actualizarContador();

            mostrarCarrito();

        });

    });

}

// =========================
// VACIAR CARRITO
// =========================

const vaciarCarrito =
document.getElementById("vaciar-carrito");

if(vaciarCarrito){

    vaciarCarrito.addEventListener("click",()=>{

        carrito = [];

        localStorage.removeItem("carrito");
        
        actualizarContador();

        mostrarCarrito();

    });

}