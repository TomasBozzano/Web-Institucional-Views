document.addEventListener('DOMContentLoaded', () => {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    cerrarSesionBtn.addEventListener('click', () => {
        // Eliminar datos de sessionStorage o localStorage
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('materiasData');
        sessionStorage.removeItem('finalesData');

        // Modificar el historial del navegador para que no pueda volver atrás
        const state = { page: 'index' };
        const title = 'Inicio';
        const url = '/index.html';

        // Reemplazar todas las entradas del historial con la página de inicio
        history.replaceState(state, title, url);

        // Redirigir a la página de inicio de sesión
        window.location.href = '/index.html';
    });

    // Bloquear el evento popstate para evitar que el usuario retroceda o avance
    window.addEventListener('popstate', (event) => {
        // Restaurar la entrada actual en el historial para evitar que retroceda
        history.pushState(null, document.title, location.href);

        // Verificar si la ubicación actual es una de las direcciones prohibidas
        const direccionesProhibidas = ['/html/home.html', '/html/materias.html', '/html/inscriptos_finales.html', '/html/datos.html'];
        if (direccionesProhibidas.includes(location.pathname)) {
            // Redirigir a la página de inicio de sesión si está en una dirección prohibida
            window.location.href = '/index.html';
        }
    });
});
