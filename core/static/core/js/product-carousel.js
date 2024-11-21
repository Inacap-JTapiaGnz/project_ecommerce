document.addEventListener("DOMContentLoaded", function () {
    const carouselElement = document.getElementById("product-carousel");
    const productDetails = document.querySelectorAll("#product-info .product-detail");

    if (carouselElement) {
        carouselElement.addEventListener("slid.bs.carousel", function () {
            const activeItem = carouselElement.querySelector(".carousel-item.active");

            if (activeItem) {
                const productId = activeItem.getAttribute("data-product-id");

                // Oculta todas las descripciones
                productDetails.forEach((detail) => {
                    detail.classList.add("d-none");
                });

                // Muestra la descripción del producto activo
                const activeDetail = document.querySelector(`#product-info .product-detail[data-product-id="${productId}"]`);
                if (activeDetail) {
                    activeDetail.classList.remove("d-none");
                } else {
                    console.warn(`No se encontró el detalle para el producto con ID ${productId}`);
                }
            } else {
                console.error("No se encontró el elemento activo en el carrusel");
            }
        });
    } else {
        console.error("El carrusel no fue encontrado en el DOM");
    }
});
