const guardarDatosButton = document.getElementById('guardar-datos');
guardarDatosButton.addEventListener('click', async () => {
    const alumnos = datosAlumno();
    const modificadoData = await modificarDatosAlumno("/alumnoModificar", alumnos);

    if (modificadoData && modificadoData.length > 0) {
        const datoData = modificadoData;
    }
});

function datosAlumno() {
    const tabla = document.getElementById('tablaAlumnos');
    const alumnosObjeto = {};
    const modal = document.getElementById('modal');
    const codigoMateria = modal.getAttribute('data-codigo-materia');

    tabla.querySelectorAll('tr').forEach(fila => {
        const permisoSpan = fila.querySelector('.permiso-span');
        
        if (permisoSpan) {
            const permiso = permisoSpan.textContent.trim();

            alumnosObjeto[permiso] = { Datos: {} };

            fila.querySelectorAll('input').forEach(input => {
                const key = input.dataset.key;

                if (input.type !== 'checkbox') {
                    const value = parseFloat(input.value.trim());
                    // Asignar 0 si el valor es NaN o está vacío
                    alumnosObjeto[permiso].Datos[key] = isNaN(value) ? 0 : value;
                } else {
                    // Asignar 'activado' o 'desactivado' en lugar de true o false
                    alumnosObjeto[permiso].Datos[key] = input.checked
                }
            });
            alumnosObjeto[permiso].Datos['codigoMateria'] = codigoMateria;
        }
    });

    return alumnosObjeto;
}


const modificarDatosAlumno = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alumnosDatos: data }),
        });

        if (!response.ok) {
            throw new Error('Error al enviar los datos modificados al servidor');
        }

        alert('Datos modificados guardados exitosamente');
    } catch (error) {
        console.error('Error al enviar los datos modificados:', error);
        alert('Ocurrió un error al enviar los datos modificados al servidor');
    }
};