const form = document.querySelector('.form');
    
form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault(); // Evitamos el comportamiento por defecto

        const dni = document.querySelector('[name=dni]').value;
        const clave = document.querySelector('[name=clave]').value;

        const requestData = {
            dni,
            clave
        };

        const loginData = await cargarLogin("/inicioSesion", requestData);
        console.log(loginData);
        // Dentro de tu función de submit después de una autenticación exitosa
        if (loginData.length === 1) {
            const userData = loginData[0]; // Supongamos que los datos que deseas mostrar están en el primer elemento del array
            homePagina(userData);
        }

    } catch (error) {
        alert('Su usuario o clave son incorrectas. Por favor, ingrese nuevamente sus datos.');
    }
});

const cargarLogin = async (url, data) => {
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
const homePagina = (data) => {
    try {
        // Almacena los datos en localStorage
        sessionStorage.setItem('userData', JSON.stringify(data));

        // Redirige a la página de inicio
        window.location.href = '/html/home.html';
    } catch (error) {
        console.error('Error al redirigir a la página de inicio:', error);
    }
};
