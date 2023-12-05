const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe de manera convencional
  
  const dni = document.querySelector('[name="dni"]').value;
  const clave = document.querySelector('[name="clave"]').value;

  const data = {
    dni,
    clave
  };

  try {
    const response = await fetch('/inicioSesion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 200) {
      // Autenticación exitosa, obtener los datos devueltos por el servidor
      const userData = await response.json();

      // Trabaja con los datos del usuario, por ejemplo:
      console.log('Datos del usuario:', userData);

      // Redirigir al usuario a la página de inicio
      window.location.href = '../src/controllers/html/home.html';
    } else if (response.status === 401) {
      // Credenciales incorrectas
      const errorData = await response.json();
      console.error(errorData.error);
      // Puedes mostrar un mensaje de error al usuario
    } else {
      // Otro error, mostrar un mensaje genérico
      console.error('Error en la autenticación');
    }
  } catch (error) {
    console.error('Error de red o del servidor:', error);
    // Puedes mostrar un mensaje de error al usuario
  }
});


/*const materiasButton = document.getElementById("materias_profesor");
  
    materiasButton.addEventListener("click", () => {
      // Realizar una solicitud GET al servidor Node.js cuando se hace clic en "Materias"
      fetch('./materias', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    });
*/
  