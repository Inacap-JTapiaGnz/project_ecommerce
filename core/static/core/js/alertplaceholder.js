document.addEventListener("DOMContentLoaded", () => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

    const appendAlert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="close"></button>
            </div>`;
        alertPlaceholder.innerHTML = ''; // Limpia alertas previas
        alertPlaceholder.append(wrapper); // Inserta la alerta
    };

    const alertTrigger = document.getElementById('liveAlertBtn');
    if (alertTrigger) {
        alertTrigger.addEventListener('click', () => {
            appendAlert('¡Bienvenido! Te has registrado exitosamente en nuestro E-Commerce.', 'success');
        });
    }
});
