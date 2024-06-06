// importamos los elementos del DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const usuarioLogin = sessionStorage.getItem('userData');
        const usuarioFinal = sessionStorage.getItem('finalesData');

        if (usuarioLogin && usuarioFinal) {
            const user = JSON.parse(usuarioLogin);
            const finales = JSON.parse(usuarioFinal);

            // Actualiza el contenido del elemento con el ID 'nombreUsuario'
            document.getElementById('nombreUsuario').textContent = user.Nombre || 'Nombre de Usuario';

            // Obtén una referencia al contenedor de materias
            const materiasContainer = document.getElementById('materiasContainer');
            // Limpia el contenido actual del contenedor de materias
            materiasContainer.innerHTML = '';

            finales.forEach(final => {
                const finalElement = document.createElement('div');
                finalElement.classList.add('materia');

                const mostrarValor = valor => {
                    return valor === 0 ? '0' : valor || 'Valor no disponible';
                };

                finalElement.innerHTML = `
                <div class="materiaCard">
                    <div class="materiaHeader">
                        <p class="pCurso">${final.Fecha || 'Fecha'}</p>
                        <p class="pCurso">${final.Hora || 'Hora'}</p>
                        <div class="estudianteHeader">
                            <span class="estudianteIcon">
                                <img src="../images/estudiante.png" alt="estudiante">
                                <p class="pCantidadInscriptos">${mostrarValor(final.Inscriptos) || 'Numero de inscriptos'}</p>
                            </span>
                        </div>
                    </div>
                    <div class="materiaMain">
                        <p class="pMateria" name="${final.Numero}">${final.Materia || 'Nombre de Materia'} <img src="../images/down.png" class="imagenBoton"></p>
                    </div>
                </div>`;
                materiasContainer.appendChild(finalElement);
            });

            // Agregar evento clic para abrir el modal
            const modalButtons = document.querySelectorAll('.pMateria');
            modalButtons.forEach(button => {
                button.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const codigoMesa = button.getAttribute('name');

                    const alumnoData = await cargarAlumnoFinal("/finalesAlumno", { mesa: codigoMesa });

                    if (alumnoData && alumnoData.length > 0) {
                        const modal = document.getElementById('modal');
                        const tablaFinal = document.getElementById('tablaFinal');

                        tablaFinal.innerHTML = '';

                        alumnoData.forEach(alumno => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                            <td>${alumno.Permiso || 'Permiso'}</td>
                            <td>${alumno.Dni || 'DNI'}</td>
                            <td>${alumno.Nombre || 'NOMBRE'}</td>
                            <td>${alumno.Cursada || 'AÑO'}</td>
                            `;
                            tablaFinal.appendChild(row);
                        });
                        modal.style.display = "block";
                    } else {
                        alert('No se encontraron datos de Alumnos.');
                    }
                });
            });

            const closeModal = document.querySelector('.close');
            closeModal.addEventListener('click', () => {
                const modal = document.getElementById('modal');
                modal.style.display = "none";
            });

        } else {
            console.error('No se encontraron datos de usuario o materias.');
        }
    } catch (error) {
        console.error('Error al cargar la página:', error);
    }
});
// Funcion de envio de datos al servidor
const cargarAlumnoFinal = async (url, data) => {
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
