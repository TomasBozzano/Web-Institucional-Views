document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuarioLogin = sessionStorage.getItem('userData');
        const usuarioMateria = sessionStorage.getItem('materiasData');

        if (usuarioLogin && usuarioMateria) {
            const user = JSON.parse(usuarioLogin);
            const materias = JSON.parse(usuarioMateria);

            // Actualiza el contenido del elemento con el ID 'nombreUsuario'
            const nombreUsuarioElement = document.getElementById('nombreUsuario');
            if (nombreUsuarioElement) {
                nombreUsuarioElement.textContent = user.Nombre || 'Nombre de Usuario';
            } else {
                console.error('Elemento con ID "nombreUsuario" no encontrado');
            }

            // Obtén una referencia al contenedor de materias
            const materiasContainer = document.getElementById('materiasContainer');
            if (materiasContainer) {
                // Limpia el contenido actual del contenedor de materias
                materiasContainer.innerHTML = '';

                // Itera sobre cada materia y crea un elemento para mostrarla
                materias.forEach(materia => {
                    const materiaElement = document.createElement('div');
                    materiaElement.classList.add('materia');

                    materiaElement.innerHTML = `
                        <div class="materiaCard">
                            <div class="materiaHeader">
                                <p class="pCurso">CURSO: ${materia.Curso || 'Curso'}</p>
                                <p class="pCurso">AÑO: ${materia.Año || 'Año'}</p>
                                <div class="estudianteHeader">
                                    <span class="estudianteIcon">
                                        <img src="../images/estudiante.png" alt="estudiante">
                                        <p class="pCantidadInscriptos">${materia.Inscriptos || 'Numero de inscriptos'}</p>
                                    </span>
                                </div>
                            </div>
                            <div class="materiaMain">
                                <p class="pMateria" name="${materia.Materia_codigo}">${materia.Materia || 'Nombre de Materia'} <img src="../images/down.png" class="imagenBoton"></p>
                            </div>
                        </div>
                    `;
                    materiasContainer.appendChild(materiaElement);
                });

                // Agregar evento clic para abrir el modal
                const modalButtons = document.querySelectorAll('.pMateria');
                modalButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const alumnos = [];
                        const codigoMateria = button.getAttribute('name');
                        const alumnoMateriasData = await cargarAlumnoMateria("/alumnoMateria", { materia: codigoMateria });

                        if (alumnoMateriasData && alumnoMateriasData.length > 0) {
                            // Crear un objeto que contenga el código de la materia y los datos de los alumnos
                            const datosMateriaAlumnos = {
                                codigoMateria: codigoMateria,
                                alumnos: alumnoMateriasData
                            };
                            // Llamar a la función mostrarAlumnosEnModal con el objeto creado
                            alumnos.push(datosMateriaAlumnos);
                             mostrarAlumnosEnModal(datosMateriaAlumnos);
                        } else {
                            alert('No se encontraron datos de Alumnos.');
                        }
                            const guardarDatosButton = document.getElementById('guardar-datos');
                            guardarDatosButton.addEventListener('click', async () => {
                                const modificadoData = await modificarDatosAlumno("/alumnoModificar", alumnos)
                                window.location.reload();
                            });
                    });
                });


                const closeModal = document.querySelector('.close');
                if (closeModal) {
                    closeModal.addEventListener('click', () => {
                        const modal = document.getElementById('modal');
                        if (modal) {
                            modal.style.display = "none";
                        } else {
                            console.error('Elemento con ID "modal" no encontrado');
                        }
                    });
                } else {
                    console.error('Elemento con clase "close" no encontrado');
                }
            } else {
                console.error('Elemento con ID "materiasContainer" no encontrado');
            }
        } else {
            console.error('No se encontraron datos de usuario o materias.');
        }
    } catch (error) {
        console.error('Error al cargar la página:', error);
    }
});

const cargarAlumnoMateria = async (url, data) => {
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

function mostrarAlumnosEnModal(datosMateriaAlumnos) {
    const modal = document.getElementById('modal');
    const tablaAlumnos = document.getElementById('tablaAlumnos');
    if (modal && tablaAlumnos) {
        tablaAlumnos.innerHTML = '';

        // Extraer el código de la materia y los datos de los alumnos del objeto recibido
        const codigoMateria = datosMateriaAlumnos.codigoMateria;
        modal.dataset.codigoMateria = codigoMateria;
        const alumnos = datosMateriaAlumnos.alumnos;

        // Crear una fila para cada alumno
        alumnos.forEach(datosAlumno => {
            const filaPermisoNombre = document.createElement('tr');
            const filaDetalles = document.createElement('tr');

            // Crea las celdas para Permiso y Nombre
            const permisoCell = document.createElement('td');
            permisoCell.textContent = datosAlumno['Permiso'];
            permisoCell.classList.add('permiso-span');
            filaPermisoNombre.appendChild(permisoCell);

            const nombreCell = document.createElement('td');
            nombreCell.textContent = datosAlumno['Nombre'];
            filaPermisoNombre.appendChild(nombreCell);

            // Crea la fila de detalles con las celdas adicionales
            const detallesCell = document.createElement('td');
            detallesCell.setAttribute('colspan', '15'); // Colspan para ocupar todas las columnas
            const detallesDiv = document.createElement('div');
            detallesDiv.classList.add('detallesAlumno');

            // Itera sobre las claves del objeto datosAlumno, excepto Permiso y Nombre
            for (const key in datosAlumno) {
                if (Object.hasOwnProperty.call(datosAlumno, key) && key !== 'Permiso' && key !== 'Nombre') {
                    const input = document.createElement('input');
                    input.dataset.key = key; // Para identificar la clave de los datos
                    input.classList.add('datos'); // Agrega la clase para estilos de inputs

                    if (key === 'Cursada' || key === 'Asistencia') {
                        input.type = 'checkbox';
                        input.checked = datosAlumno[key];
                    } else {
                        input.type = 'text';
                        input.value = datosAlumno[key];
                    }

                    // Agrega un evento para guardar los cambios al editar el input
                    input.addEventListener('change', function () {
                        if (key === 'Cursada' || key === 'Asistencia') {
                            datosAlumno[key] = input.checked;
                        } else {
                            datosAlumno[key] = input.value;
                        }
                    });

                    const label = document.createElement('label');
                    label.textContent = `${key}: `;
                    label.classList.add('label');
                    detallesDiv.appendChild(label);
                    detallesDiv.appendChild(input);
                    detallesDiv.appendChild(document.createElement('br'));
                }
            }

            // Oculta la fila de detalles por defecto
            filaDetalles.style.display = 'none';
            filaDetalles.appendChild(detallesCell);
            detallesCell.appendChild(detallesDiv);

            // Agrega los eventos de clic para expandir y contraer la fila de detalles
            filaPermisoNombre.addEventListener('click', function () {
                if (filaDetalles.style.display === 'none') {
                    filaDetalles.style.display = 'table-row';
                } else {
                    filaDetalles.style.display = 'none';
                }
            });

            tablaAlumnos.appendChild(filaPermisoNombre);
            tablaAlumnos.appendChild(filaDetalles);
        });

        modal.style.display = "block";
    }
}

const modificarDatosAlumno = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alumnos: data }),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar los datos modificados al servidor: ${response.status}`);
        }
    } catch (error) {
        alert('Los datos fueron modificados exitosamente');
    }
};