// Accediendo a los elementos HTML
const inputNombre = document.getElementById('idTxtNombre');
const inputApellido = document.getElementById('idTxtApellido');
const inputFechaNacimiento = document.getElementById('idTxtFechaNacimiento');
const inputRdMasculino = document.getElementById('idRdMasculino');
const inputRdFemenino = document.getElementById('idRdFemenino');
const cmbPais = document.getElementById('idCmbPais');
const inputDireccion = document.getElementById('idTxtDireccion');
const inputNombrePais = document.getElementById('idNombrePais');
const buttonAgregarPaciente = document.getElementById('idBtnAgregar');
const buttonLimpiarPaciente = document.getElementById('idBtnLimpiar');
const buttonMostrarPaciente = document.getElementById('idBtnListar');
const buttonAgregarPais = document.getElementById('idBtnAgregarPais');
const notificacion = document.getElementById('idNotificacion');
const mensaje = document.getElementById('idMensaje');
const idTablaPacientes = document.getElementById('idTablaPacientes');
const idPacientesRegistrados = document.getElementById('idPacientesRegistrados');

// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);

// Componente modal
const idModal = document.getElementById('idModal');

// Arreglo global de pacientes
let arrayPaciente = [];

// Función para limpiar el formulario
const limpiarFormulario = () => {
    inputNombre.value = '';
    inputApellido.value = '';
    inputFechaNacimiento.value = '';
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = '';
    inputNombre.focus();
};

// Función para agregar un paciente
const addPaciente = () => {
    const nombre = inputNombre.value.trim();
    const apellido = inputApellido.value.trim();
    const fechaNacimiento = inputFechaNacimiento.value;
    const sexo = inputRdMasculino.checked ? "Hombre" : inputRdFemenino.checked ? "Mujer" : "";
    const pais = cmbPais.value;
    const labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    const direccion = inputDireccion.value.trim();

    if (nombre && apellido && fechaNacimiento && sexo && pais !== "0" && direccion) {
        // Agregando información al arreglo paciente
        arrayPaciente.push({ nombre, apellido, fechaNacimiento, sexo, labelPais, direccion });

        // Notificación de éxito
        mostrarNotificacion("Se ha registrado un nuevo paciente");

        // Limpiando formulario
        limpiarFormulario();

        // Actualizando la tabla de pacientes
        imprimirPacientes();
    } else {
        // Notificación de error
        mostrarNotificacion("Faltan campos por completar");
    }
};

// Función para mostrar notificaciones
const mostrarNotificacion = (mensajeTexto) => {
    mensaje.innerHTML = mensajeTexto;
    toast.show();
};

// Función para imprimir filas de pacientes
const imprimirFilas = () => {
    return arrayPaciente.map((paciente, index) => `
        <tr>
            <td class="text-center fw-bold">${index + 1}</td>
            <td>${paciente.nombre}</td>
            <td>${paciente.apellido}</td>
            <td>${paciente.fechaNacimiento}</td>
            <td>${paciente.sexo}</td>
            <td>${paciente.labelPais}</td>
            <td>${paciente.direccion}</td>
            <td>
                <button onclick="editarPaciente(${index})" type="button" class="btn btn-primary" alt="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger" alt="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>
    `).join('');
};

// Función para imprimir la tabla de pacientes
const imprimirPacientes = () => {
    const table = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col" class="text-center" style="width: 5%">#</th>
                        <th scope="col" class="text-center" style="width: 15%">Nombre</th>
                        <th scope="col" class="text-center" style="width: 15%">Apellido</th>
                        <th scope="col" class="text-center" style="width: 10%">Fecha nacimiento</th>
                        <th scope="col" class="text-center" style="width: 10%">Sexo</th>
                        <th scope="col" class="text-center" style="width: 10%">Pais</th>
                        <th scope="col" class="text-center" style="width: 25%">Dirección</th>
                        <th scope="col" class="text-center" style="width: 10%">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${imprimirFilas()}
                </tbody>
            </table>
        </div>
    `;

    idTablaPacientes.innerHTML = table;
    idPacientesRegistrados.textContent = arrayPaciente.length;
};

// Función para eliminar un paciente
const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1);
    imprimirPacientes();
};

// Función para editar un paciente
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    inputNombre.value = paciente.nombre;
    inputApellido.value = paciente.apellido;
    inputFechaNacimiento.value = paciente.fechaNacimiento;
    inputRdMasculino.checked = paciente.sexo === "Hombre";
    inputRdFemenino.checked = paciente.sexo === "Mujer";
    cmbPais.value = paciente.labelPais; // Asegúrate de que el valor del país esté correcto
    inputDireccion.value = paciente.direccion;

    // Cambiamos el evento del botón de agregar a uno de actualizar
    buttonAgregarPaciente.onclick = () => {
        // Actualizar el paciente
        arrayPaciente[index] = {
            nombre: inputNombre.value,
            apellido: inputApellido.value,
            fechaNacimiento: inputFechaNacimiento.value,
            sexo: inputRdMasculino.checked ? "Hombre" : "Mujer",
            labelPais: cmbPais.options[cmbPais.selectedIndex].text,
            direccion: inputDireccion.value
        };
        mostrarNotificacion("Paciente actualizado correctamente");
        limpiarFormulario();
        imprimirPacientes();
    };
};

// Función para agregar un nuevo país
const addPais = () => {
    const nombrePais = inputNombrePais.value.trim();
    if (nombrePais) {
        // Agregando el país al select
        const option = document.createElement("option");
        option.value = cmbPais.options.length + 1;
        option.text = nombrePais;
        cmbPais.add(option);

        // Notificación de éxito
        mostrarNotificacion("País agregado correctamente");

        // Limpiando el campo de texto
        inputNombrePais.value = "";
    } else {
        // Notificación de error
        mostrarNotificacion("Ingrese un nombre de país válido");
    }
};

// Agregando eventos a los botones
buttonLimpiarPaciente.onclick = limpiarFormulario;
buttonAgregarPaciente.onclick = addPaciente;
buttonMostrarPaciente.onclick = imprimirPacientes;
buttonAgregarPais.onclick = addPais;

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

// Ejecutar función al momento de cargar la página HTML
limpiarFormulario();