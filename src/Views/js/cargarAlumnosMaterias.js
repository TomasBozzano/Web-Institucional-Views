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
                            <div class="materiaHeader">
                                <p class="pMateria">${materia.Materia || 'Nombre de Materia'}</p>
                                <div class="estudianteHeader">
                                    <button class="botonMateria" name="${materia.Materia_codigo}"><img src="../images/down.png" class="imagenBoton"></button>
                                </div>
                            </div>
                        </div>
                    `;
                    materiasContainer.appendChild(materiaElement);
                });

                // Agregar evento clic para abrir el modal
                const modalButtons = document.querySelectorAll('.botonMateria');
                modalButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        e.preventDefault();
                        const codigoMateria = button.getAttribute('name');
                        const alumnoMateriasData = await cargarAlumnoMateria("/alumnoMateria", { materia: codigoMateria });

                        if (alumnoMateriasData && alumnoMateriasData.length > 0) {
                            // Crear un objeto que contenga el código de la materia y los datos de los alumnos
                            const datosMateriaAlumnos = {
                                codigoMateria: codigoMateria,
                                alumnos: alumnoMateriasData
                            };

                            // Llamar a la función mostrarAlumnosEnModal con el objeto creado
                            mostrarAlumnosEnModal(datosMateriaAlumnos);
                        } else {
                            alert('No se encontraron datos de Alumnos.');
                        }
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
            const row = document.createElement('tr');

            // Iterar sobre las claves del objeto datosAlumno
            for (const key in datosAlumno) {
                if (Object.hasOwnProperty.call(datosAlumno, key)) {
                    const cell = document.createElement('td');

                    if (key === 'Nombre') {
                        cell.textContent = datosAlumno[key];
                    } else if (key === 'Permiso') {
                        const span = document.createElement('span');
                        span.textContent = datosAlumno[key];
                        span.classList.add('permiso-span');
                        cell.appendChild(span);
                    } else if (key.includes('Parcial') || key.includes('Totalizador') || key.includes('Recuperatorio') || key.includes('Practico')) {
                        const input = document.createElement('input');
                        input.classList.add('datos');
                        input.type = 'text';
                        input.value = datosAlumno[key];
                        input.dataset.key = key;
                        cell.appendChild(input);
                    } else if (key === 'Cursada' || key === 'Asistencia') {
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.checked = datosAlumno[key];
                        checkbox.dataset.key = key;
                        cell.appendChild(checkbox);
                    } else {
                        cell.textContent = datosAlumno[key];
                    }

                    row.appendChild(cell);
                }
            }

            tablaAlumnos.appendChild(row);
        });

        modal.style.display = "block";
    }
}