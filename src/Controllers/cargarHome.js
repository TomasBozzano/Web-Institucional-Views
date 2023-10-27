// Supongamos que tienes un formulario HTML con los campos "dni" y "clave" y un botón de envío.
const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const dni = document.querySelector('#dni').value;
  const clave = document.querySelector('#clave').value;

  // Construye la URL con los parámetros
  const url = `server/inicioSesion?dni=${encodeURIComponent(dni)}&clave=${encodeURIComponent(clave)}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.status === 200) {
        // Autenticación exitosa, redirigir al usuario a la página de inicio
        window.location.href = './html/home.html';
      } else if (response.status === 401) {
        // Credenciales incorrectas
        const data = await response.json();
        console.error(data.error);
        // Puedes mostrar un mensaje de error al usuario
      } else {
        // Otro error, mostrar un mensaje genérico
        console.error('Error en la autenticación');
      }
    // Resto del código para manejar la respuesta...
  } catch (error) {
    console.error('Error de red o del servidor:', error);
    // Puedes mostrar un mensaje de error al usuario
  }
});

  