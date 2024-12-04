document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#login-form");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            const email = form.querySelector("#exampleInputEmail1").value.trim();
            const password = form.querySelector("#exampleInputPassword1").value.trim();

            // Validación de campos requeridos
            if (!email) {
                alert("Por favor, ingresa tu correo electrónico.");
                return;
            }

            if (!password) {
                alert("Por favor, ingresa tu contraseña.");
                return;
            }

            try {
                // Verifica credenciales mediante el backend
                const response = await fetch("/validate-login/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCSRFToken(), // Asegura el token CSRF
                    },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (data.valid) {
                    // Redirige al index si el login es exitoso
                    alert("Inicio de sesión exitoso. Redirigiendo...");
                    window.location.href = "/checkout/";
                } else {
                    alert(data.error || "Correo o contraseña incorrectos.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar al servidor.");
            }
        });
    }

    // Obtiene el token CSRF de las cookies
    function getCSRFToken() {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name, value] = cookie.split("=");
            if (name === "csrftoken") {
                return value;
            }
        }
        return null;
    }
});