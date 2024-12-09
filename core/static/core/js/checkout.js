document.addEventListener("DOMContentLoaded", function () {
    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productsContainer = document.querySelector("#products-container"); // Contenedor de productos
    const subtotalElement = document.querySelector("#subtotal");
    const totalElement = document.querySelector("#total");

    let subtotal = 0;

    // Validar si el carrito está vacío
    if (cart.length === 0) {
        // Opcional: Mostrar un mensaje en lugar de los datos de compra
        productsContainer.innerHTML = "<p>No hay productos en tu carrito.</p>";
        subtotalElement.textContent = "$0";
        totalElement.textContent = "$0";
        return; // Salir si no hay productos
    }

    // Mostrar los productos en la pantalla de pago
    cart.forEach((item) => {
        const productRow = document.createElement("div");
        productRow.classList.add("d-flex", "justify-content-between");
        productRow.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>$${item.price * item.quantity}</p>
        `;
        productsContainer.appendChild(productRow);
        subtotal += item.price * item.quantity;
    });

    // Actualizar el subtotal y total
    subtotalElement.textContent = `$${subtotal}`;
    totalElement.textContent = `$${subtotal + 10}`; // Sumar envío ($10)
});


// Acción al presionar el botón "Pagar"
document.querySelector("#btn-pagar").addEventListener("click", function () {
    alert("¡Compra exitosa! Gracias por tu compra.");
    localStorage.removeItem("cart"); // Vaciar el carrito después de la compra
    window.location.href = "/"; // Redirigir a la página principal
});
