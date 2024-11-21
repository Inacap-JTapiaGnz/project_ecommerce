function confirmDelete(id){
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Mostrar mensaje de eliminación exitosa y redirigir
            Swal.fire({
                title: "¡Eliminado!",
                text: "El producto ha sido eliminado.",
                icon: "success"
            }).then(() => {
                // Redirige a la URL de eliminación
                window.location.href = "/deleteproductos/" + id + "/";
            });
        }
    });
}