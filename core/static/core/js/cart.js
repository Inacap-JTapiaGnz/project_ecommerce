document.addEventListener("DOMContentLoaded", function () {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const totalElement = document.getElementById("total");
    const cartIconCount = document.getElementById("cart-count");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Renderiza los productos en el carrito
    function renderCart() {
        //cartItemsContainer.innerHTML = "";

        //if (cart.length === 0) {
        //    cartItemsContainer.innerHTML = `
        //        <tr>
        //            <td colspan="5" class="text-center">El carrito está vacío.</td>
        //        </tr>
        //    `;
        //    subtotalElement.textContent = "$0";
        //    totalElement.textContent = "$10"; // Costo fijo de envío
        //    updateCartIcon(); // Actualiza el ícono del carrito
        //    return;
        //}

        let subtotal = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.quantity; // Total por producto
            subtotal += itemTotal;

            // Añade cada producto al carrito
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="align-middle">
                    <img src="${item.img}" alt="${item.name}" style="width: 50px;"> ${item.name}
                </td>
                <td class="align-middle">$${item.price}</td>
                <td class="align-middle">
                    <div class="input-group quantity mx-auto" style="width: 100px;">
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-minus" data-product-id="${item.id}">
                                <i class="fa fa-minus"></i>
                            </button>
                        </div>
                        <input type="text" class="form-control form-control-sm bg-secondary text-center" value="${item.quantity}" readonly>
                        <div class="input-group-btn">
                            <button class="btn btn-sm btn-primary btn-plus" data-product-id="${item.id}">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </td>
                <td class="align-middle">$${itemTotal}</td>
                <td class="align-middle">
                    <button class="btn btn-sm btn-primary btn-remove" data-product-id="${item.id}">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        // Actualiza los totales
        subtotalElement.textContent = `$${subtotal}`;
        totalElement.textContent = `$${subtotal + 10}`; // $10 de envío
        updateCartIcon(); // Actualiza el ícono del carrito
    }

    // Actualiza el carrito en el localStorage y vuelve a renderizar
    function updateCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    // Actualiza el número en el ícono del carrito
    function updateCartIcon() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIconCount.textContent = totalItems;
    }

    // Maneja los eventos de la tabla del carrito
    cartItemsContainer.addEventListener("click", function (e) {
        if (e.target.closest(".btn-minus")) {
            const productId = e.target.closest(".btn-minus").getAttribute("data-product-id");
            const product = cart.find((item) => item.id === productId);
            if (product && product.quantity > 1) {
                product.quantity -= 1; // Reduce la cantidad en 1
                updateCart();
            } else if (product && product.quantity === 1) {
                // Elimina el producto si la cantidad llega a 1 y se presiona el botón "-"
                const updatedCart = cart.filter((item) => item.id !== productId);
                cart = [...updatedCart];
                updateCart();
            }
        }

        if (e.target.closest(".btn-plus")) {
            const productId = e.target.closest(".btn-plus").getAttribute("data-product-id");
            const product = cart.find((item) => item.id === productId);
            if (product) {
                product.quantity += 1; // Incrementa la cantidad en 1
                updateCart();
            }
        }

        if (e.target.closest(".btn-remove")) {
            const productId = e.target.closest(".btn-remove").getAttribute("data-product-id");

            // Filtra los productos para eliminar el seleccionado
            const updatedCart = cart.filter((item) => item.id !== productId);
            cart = [...updatedCart];

            updateCart();
        }
    });

    // Renderiza el carrito al cargar la página
    renderCart();
});
