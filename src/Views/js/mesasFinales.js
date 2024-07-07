document.addEventListener('DOMContentLoaded', () => {
    const spinner = document.getElementById('spinner');
    const mesasBtn = document.getElementById('finalUsuario');
    mesasBtn.addEventListener('click', async () => {
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
            const mesaData = await cargarFinales("/mesasFinales", { profesorCodigo: codigo });

            if (mesaData && mesaData.length > 0) {
                spinner.style.display = 'none';
                const finalData = mesaData;
                finalesPagina(finalData);
            } else {
                // Manejar el caso en el que no hay datos de finales
                alert('No se encontraron datos de finales.');
                spinner.style.display = 'none';
            }
        } catch (error) {
            spinner.style.display = 'none';
            window.location.href = '/html/error.html';
        }
    });
});
// funcion para enviar los datos al servidor
const cargarFinales = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al cargar la página: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};
// Guarda los datos en un sessionStorage y redirige a la página de finales
const finalesPagina = (data) => {
    try {
        sessionStorage.setItem('finalesData', JSON.stringify(data));
        window.location.href = '/html/inscriptos_finales.html';
    } catch (error) {
        console.error('Error al redirigir a la página de finales:', error);
    }
};
