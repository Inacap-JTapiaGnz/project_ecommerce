document.addEventListener("DOMContentLoaded", function () {
    function updateCartIcon() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartIcon = document.getElementById("cart-count");
        cartIcon.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    document.querySelectorAll(".add-to-cart").forEach((button) => {
        button.addEventListener("click", function () {
            const productId = button.getAttribute("data-product-id");
            const productName = button.getAttribute("data-product-name");
            const productPrice = parseFloat(button.getAttribute("data-product-price"));
            const productImg = button.getAttribute("data-product-img");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find((item) => item.id === productId);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id: productId, name: productName, price: productPrice, img: productImg, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartIcon();
            alert(`¡Producto "${productName}" agregado al carrito!`);
        });
    });

    updateCartIcon();
});
