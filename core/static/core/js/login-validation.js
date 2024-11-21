document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Previene el envío por defecto del formulario

            const emailInput = document.getElementById("exampleInputEmail1");
            const passwordInput = document.getElementById("exampleInputPassword1");

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validaciones básicas
            if (!email) {
                alert("Por favor, Ingresa un Usuario Valido.");
                return;
            }

            if (!password) {
                alert("Por favor, Ingresa una Contraseña.");
                return;
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            if (!passwordRegex.test(password)) {
                alert("La Contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.");
                return;
            }

            // Si pasa las validaciones
            alert("Inicio de Sesión Exitoso");

            // Redirigir a la página de inicio
            window.location.href = "/"; // Cambia la URL según la ruta de tu vista de index
        });
    }
});
