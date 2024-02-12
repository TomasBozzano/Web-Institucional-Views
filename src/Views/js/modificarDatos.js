document.addEventListener('DOMContentLoaded', () => {
    const cambioDatos = document.getElementById('datosModificar');
    cambioDatos.addEventListener('submit', async () => {
        event.preventDefault();
        try {
            const userDataString = sessionStorage.getItem('userData');

            if (!userDataString) {
                throw new Error('No se encontraron datos de usuario.');
            }

            const userData = JSON.parse(userDataString);
            const codigo = userData.Codigo;

            const nombre = document.querySelector('[name=Nombre]').value;
            const documento = document.querySelector('[name=Documento]').value;
            const postal = document.querySelector('[name=Postal]').value;
            const domicilio = document.querySelector('[name=Domicilio]').value;
            const telefono = document.querySelector('[name=Telefono]').value;
            const localidad = document.querySelector('[name=Localidad]').value;

            const requestData = {
                codigo,
                nombre,
                documento,
                postal,
                domicilio,
                telefono,
                localidad
            }
            
            const loginData = await cargarDModificar("/profesorModificar", requestData);

            // Verificar si se actualizó correctamente
            if (loginData && loginData.length == 1) {
                recargarPagina(loginData[0]); // Pasa los nuevos datos a la función
                alert('Datos actualizados exitosamente.');
            } else {
                throw new Error('Error al actualizar los datos.');
            }
        } catch (error) {
            console.error(error.message);
            window.location.href = '/html/home.html';
        }
    });
});

const cargarDModificar = async (url, data) => {
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

const recargarPagina = (nuevosDatos) => {
    try {
        // Almacena los nuevos datos en sessionStorage
        sessionStorage.setItem('datosData', JSON.stringify(nuevosDatos));

        // Recarga la página actual
        location.reload();
    } catch (error) {
        console.error('Error al recargar la página:', error);
        // Agregar mensaje de error al usuario si es necesario
        alert('Error al recargar la página. Por favor, inténtelo nuevamente.');
    }
};
