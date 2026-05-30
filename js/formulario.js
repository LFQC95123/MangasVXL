// =========================
// FORMULARIO DE CONTACTO
// =========================

const formulario =
document.getElementById("formulario-contacto");

if(formulario){

    formulario.addEventListener("submit",(e)=>{

        e.preventDefault();

        const nombre =
        document.getElementById("nombre").value.trim();

        const correo =
        document.getElementById("correo").value.trim();

        const asunto =
        document.getElementById("asunto").value.trim();

        const mensaje =
        document.getElementById("mensaje").value.trim();

        // =========================
        // VALIDAR CAMPOS VACÍOS
        // =========================

        if(
            nombre === "" ||
            correo === "" ||
            asunto === "" ||
            mensaje === ""
        ){

            alert(
                "Por favor complete todos los campos."
            );

            return;

        }

        // =========================
        // VALIDAR CORREO
        // =========================

        const expresionCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(
            !expresionCorreo.test(correo)
        ){

            alert(
                "Ingrese un correo válido."
            );

            return;

        }

        // =========================
        // MENSAJE DE ÉXITO
        // =========================

        alert(
            "Mensaje enviado correctamente."
        );

        formulario.reset();

    });

}