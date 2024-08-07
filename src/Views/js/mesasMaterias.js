// Funcionalidades de la página de mesas de materias
document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const materiasBtn = document.getElementById('materiaUsuario');
    materiasBtn.addEventListener('click', async () => {
        spinner.style.display = 'block';
        try {
            const userDataString = sessionStorage.getItem('userData');
    
            if (!userDataString) {
                alert('No se encontraron datos de usuario.');
                return;
            }
            const userData = JSON.parse(userDataString);
            const codigo = userData.Codigo;
            if (codigo === undefined) {
                alert('El código es undefined. Verifica el valor antes de enviarlo.');
                return;
            }
            const loginData = await cargarMateria("/materias", { profesorCodigo: codigo });
    
            if (loginData && loginData.length > 0) {
                spinner.style.display = 'none';
                const materiasData = loginData;
                materiasPagina(materiasData);
            } else {
                spinner.style.display = 'none';
                alert('No se encontraron materias para el usuario.');
            }
        } catch (error) {
            spinner.style.display = 'none';
            window.location.href = '/html/error.html';
        }
    });
    
});
// Funcion para el envio al servidor con la respuesta
const cargarMateria = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud POST a ${url}: ${response.status}`);
        }

        const responseData = await response.json();

        return responseData || [];
    } catch (error) {
        throw error;
    }
};

// Guarda los datos en un sessionStorage y redirige a la página de materias
const materiasPagina = (data) => {
    try {
        // Almacena los datos en sessionStorage
        sessionStorage.setItem('materiasData', JSON.stringify(data));

        // Redirige a la página de materias
        window.location.href = '/html/materias.html';
    } catch (error) {
        console.error('Error al redirigir a la página de materias:', error);
    }
};
