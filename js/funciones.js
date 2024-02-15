let inicioSesion = false;

// Configuración de los departamentos en el select
let departamentos = [
  "Artigas",
  "Canelones",
  "Cerro Largo",
  "Colonia",
  "Durazno",
  "Flores",
  "Florida",
  "Lavalleja",
  "Maldonado",
  "Montevideo",
  "Paysandú",
  "Río Negro",
  "Rivera",
  "Rocha",
  "Salto",
  "San José",
  "Soriano",
  "Tacuarembó",
  "Treinta y Tres",
];
let selectDepto = document.querySelector("#txtDeptoCensado");

// Generar las opciones del select utilizando innerHTML
let opcionesSelect ='<option value="" selected disabled>Seleccione...</option>';
for (let i = 0; i < departamentos.length; i++) {
  opcionesSelect += '<option value="' + departamentos[i] + '">' + departamentos[i] + "</option>";
}

// Asignar las opciones al select
selectDepto.innerHTML = opcionesSelect;

let selectDepto2 = document.querySelector("#txtDeptoCensado2");

let opcionesSelect2 = '<option value="" selected disabled>Seleccione...</option>';
for (let i = 0; i < departamentos.length; i++) {
  opcionesSelect2 += '<option value="' + departamentos[i] + '">' + departamentos[i] + "</option>";
}

selectDepto2.innerHTML = opcionesSelect2;

let selectDepto3 = document.querySelector("#txtDeptoCensado3");

let opcionesSelect3 =
  '<option value="" selected disabled>Seleccione...</option>';
for (let i = 0; i < departamentos.length; i++) {
  opcionesSelect3 += '<option value="' + departamentos[i] +'">' + departamentos[i] + "</option>";
}

selectDepto3.innerHTML = opcionesSelect3;

// Registra un nuevo censista
document.querySelector("#btnRegistrarCensista").addEventListener("click", agregarCensista);

function agregarCensista() {
  let nombreCampo = document.querySelector("#txtNombreCensista").value;
  let nombreUsuario = document.querySelector("#txtUsuario").value;
  let contrasena = document.querySelector("#txtContrasenaRegistro").value;

  // Validamos que todos los campos se hayan completado
  if (nombreCampo === "" || nombreUsuario === "" || contrasena === "") {
    document.querySelector("#mensajesRegistro").innerHTML =
      "Debe completar todos los campos.";
    return;
  }

  // Validamos que el nombre de usuario no este repetido en el array
  if (sistema.existeNombreUsuario(nombreUsuario)) {
    document.querySelector("#mensajesRegistro").innerHTML =
      "El nombre de usuario ya está en uso. Por favor, elija otro.";
    return;
  }

  // Validar que la contraseña cumpla con los requisitos
  if (!sistema.validarContrasena(contrasena)) {
    document.querySelector("#mensajesRegistro").innerHTML = "La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número.";
    return;
  }

  let objCensista = new Censista(sistema.obtenerIdCensista(), nombreCampo, nombreUsuario, contrasena);
  sistema.agregarNuevoCensista(objCensista);
  document.querySelector("#mensajesRegistro").innerHTML = `Su registro se completo con éxito. Su ID es: ${objCensista.id}`;
  document.querySelector("#txtNombreCensista").value = "";
  document.querySelector("#txtUsuario").value = "";
  document.querySelector("#txtContrasenaRegistro").value = "";
}


// Registra un nuevo censado
document.querySelector("#btnRegistrarCensado").addEventListener("click", agregarCensado);

function agregarCensado() {
  let nombreCensado = document.querySelector("#txtNombreCensado").value;
  let edadCensado = Number(document.querySelector("#txtEdadCensado").value);
  let cedulaCensado = document.querySelector("#txtCedulaCensado").value;
  let deptoCensado = document.querySelector("#txtDeptoCensado").value;
  let ocupCensado = document.querySelector("#txtOcupaCensado").value;

  if (nombreCensado === "") {
    document.querySelector("#mensajesRegistroCensado1").innerHTML = "El campo nombre no puede ser vacío";
    return;
  }

  if ( isNaN(edadCensado) || edadCensado < 0 || edadCensado > 130) {
    document.querySelector("#mensajesRegistroCensado1").innerHTML =
      "Ingrese una edad válida entre 0 y 130 años.";
    return;
  }

  if (cedulaCensado === "") {
    document.querySelector("#mensajesRegistroCensado1").innerHTML = "El campo cedula no puede ser vacío";
    return;
  }

  if (deptoCensado === "") {
    document.querySelector("#mensajesRegistroCensado1").innerHTML = "Debe seleccionar un departamento";
    return;
  }

  if (ocupCensado === "") {
    document.querySelector("#mensajesRegistroCensado1").innerHTML ="Debe seleccionar una ocupación";
    return;
  }

  if (!sistema.validarDigitoVerificador(cedulaCensado)) {
    document.querySelector("#mensajesRegistroCensado1").innerHTML = "La cédula ingresada no es válida.";
    return;
  }

  if (sistema.existeCedulaCensado(cedulaCensado)) {
    document.querySelector("#mensajesRegistroCensado1").innerHTML = "El censo ya fue realizado para este ciudadano/a.";
    return;
  }

  let nombreUsuarioCensistaActual = document.querySelector(
    "#txtUsuarioIniciarSesion"
  ).value;
  let idCensista = sistema.obtenerIdCensistaActual(nombreUsuarioCensistaActual);

  let cedulaCensadoNumerica = "";
  for (let i = 0; i < cedulaCensado.length; i++) {
    let char = cedulaCensado[i];
    if (!isNaN(char)) {
      cedulaCensadoNumerica += char;
    }
  }
  cedulaCensado = cedulaCensadoNumerica;

  let objCensado = new Censado(
    nombreCensado,
    edadCensado,
    cedulaCensado,
    deptoCensado,
    ocupCensado,
    true, // Establecer como censado
    idCensista // ID del censista responsable
  );
  sistema.agregarNuevoCensado(objCensado);
  document.querySelector(
    "#mensajesRegistroCensado1"
  ).innerHTML = `El censo para ${objCensado.nombreCen} se completo con exito`;
  document.querySelector("#txtNombreCensado").value = "";
  document.querySelector("#txtCedulaCensado").value = "";
  document.querySelector("#txtEdadCensado").value = "";
  document.querySelector("#txtDeptoCensado").value = "";
  document.querySelector("#txtOcupaCensado").value = "";
  mostrarTotalCensados();
  totalCensadosPorDepto();
  mostrarPorcentajeCensados();
  armarTablaEstadistica();
}

document.querySelector("#btnRegistrarPreCensado").addEventListener("click", cargarPreCensado);

function cargarPreCensado() {
  let nombreCensado = document.querySelector("#txtNombrePreCensado").value;
  let edadCensado = Number(document.querySelector("#txtEdadPreCensado").value);
  let cedulaCensado = document.querySelector("#txtCedulaPreCensado").value;
  let deptoCensado = document.querySelector("#txtDeptoCensado2").value;
  let ocupCensado = document.querySelector("#txtOcupaPreCensado").value;

  if (nombreCensado === "") {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML =
      "El campo nombre y apellido debe ser completado.";
    return;
  }

  if ( isNaN(edadCensado) || edadCensado < 0 || edadCensado > 130) {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML =
      "Ingrese una edad válida entre 0 y 130 años.";
    return;
  }

  if (cedulaCensado === "") {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML = "El campo cedula no puede ser vacío";
    return;
  }

  if (deptoCensado === "") {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML = "Debe seleccionar un departamento";
    return;
  }

  if (ocupCensado === "") {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML ="Debe seleccionar una ocupación";
    return;
  }

  if (!sistema.validarDigitoVerificador(cedulaCensado)) {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML = "La cédula ingresada no es válida.";
    return;
  }

  if (isNaN(edadCensado) || edadCensado < 0 || edadCensado > 130) {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML =
      "Ingrese una edad válida entre 0 y 130 años.";
    return;
  }

  if (sistema.existeCedulaCensado(cedulaCensado)) {
    document.querySelector("#mensajesRegistroPreCensado").innerHTML =
      "Ya existe un censo precargado para este usuario";
    return;
  }

  // Obtener un censista aleatorio
  let censistaAleatorio = sistema.obtenerCensistaAleatorio();
  let idCensista = censistaAleatorio.id;

  let cedulaCensadoNumerica = "";
  for (let i = 0; i < cedulaCensado.length; i++) {
    let char = cedulaCensado[i];
    if (!isNaN(char)) {
      cedulaCensadoNumerica += char;
    }
  }
  cedulaCensado = cedulaCensadoNumerica;

  let objCensado = new Censado(
    nombreCensado,
    edadCensado,
    cedulaCensado,
    deptoCensado,
    ocupCensado,
    false, // Establecer como no censado
    idCensista // ID del censista responsable
  );
  sistema.agregarNuevoCensado(objCensado);
  document.querySelector("#txtNombrePreCensado").value = "";
  document.querySelector("#txtCedulaPreCensado").value = "";
  document.querySelector("#txtEdadPreCensado").value = "";
  document.querySelector("#txtDeptoCensado2").value = "";
  document.querySelector("#txtOcupaPreCensado").value = "";

  document.querySelector(
    "#mensajesRegistroPreCensado"
  ).innerHTML = `Los datos de ${objCensado.nombreCen} han sido precargados exitosamente. Censista asignado: ${censistaAleatorio.nombre}`;
}


// Modifica los datos del booleano de un censado
function modificarDatos() {
  let cedulaCensado = this.getAttribute("data-censado");

  for (let i = 0; i < sistema.censados.length; i++) {
    let censado = sistema.censados[i];

    if (censado.cedulaCen === cedulaCensado) {
      censado.censado = true;
      document.querySelector(
        "#mensajeConfirmacion"
      ).innerHTML = `${censado.nombreCen} fue censado con éxito! `;
      break;
    }
  }
}

// Modificar Datos Pre Censados
document.querySelector("#btModificarPreCensado").addEventListener("click", modificarDatosPreCensado);

function modificarDatosPreCensado() {
  let cedula = document.querySelector("#txtCedulaPreCensado").value;
  let nombre = document.querySelector("#txtNombrePreCensado").value;
  let edad = parseInt(document.querySelector("#txtEdadPreCensado").value);
  let departamento = document.querySelector("#txtDeptoCensado2").value;
  let ocupacion = document.querySelector("#txtOcupaPreCensado").value;

  let censadoNoCensado = null;

  for (let i = 0; i < sistema.noEstaCensado().length; i++) {
    if (sistema.noEstaCensado()[i].cedulaCen === cedula) {
      censadoNoCensado = sistema.noEstaCensado()[i];
      break;
    }
  }

  if (censadoNoCensado) {
    censadoNoCensado.nombreCen = nombre;
    censadoNoCensado.edadCen = edad;
    censadoNoCensado.departamentoCen = departamento;
    censadoNoCensado.ocupacionCen = ocupacion;
    censadoNoCensado.cedulaCen = cedula;

    document.querySelector("#mensajesRegistroCensado").innerHTML =" Se modifico con exito! ";
    document.querySelector("#seccionDatosPreCenso").style.display = "block";
    document.querySelector("#txtCedulaCensado3").value = "";
    document.querySelector("#txtNombrePreCensado").value = censadoNoCensado.nombreCen;
    document.querySelector("#txtEdadPreCensado").value = censadoNoCensado.edadCen;
    document.querySelector("#txtCedulaPreCensado").value = censadoNoCensado.cedulaCen;
    document.querySelector("#txtDeptoCensado2").value = censadoNoCensado.departamentoCen;
    document.querySelector("#txtOcupaPreCensado").value = censadoNoCensado.ocupacionCen;
  } else {
    document.querySelector("#mensajesRegistroCensado").innerHTML = " No se encontró ningún registro con la cédula especificada.";
  }
}

// Crea la tabla de censados en la sección "seccionListarCensados"
document.querySelector("#btnBuscarPreCensado").addEventListener("click", armarTablaCensados);

function armarTablaCensados() {
  let nombreCensistaLogueado = document.querySelector(
    "#txtUsuarioIniciarSesion"
  ).value;
  let arrayAux = [];

  for (let i = 0; i < sistema.censistas.length; i++) {
    let censista = sistema.censistas[i];
    if (censista.nombreUsuario == nombreCensistaLogueado) {
      arrayAux.push(censista);
    }
  }

  let cedulaBuscada = document.querySelector("#txtCedulaCensado2").value; // Obtener el valor de la cédula ingresada

  document.querySelector("#tblPreCensados").innerHTML = "";
  let encontrada = false;
  for (let i = 0; i < sistema.censados.length; i++) {
    let pCensada = sistema.censados[i];
    let idCensadoEncontrado = false;

    if (!pCensada.censado && pCensada.cedulaCen === cedulaBuscada) {
      for (let j = 0; j < arrayAux.length; j++) {
        if (
          pCensada.idCensado === arrayAux[j].idCensado &&
          pCensada.idCensista === arrayAux[j].id
        ) {
          idCensadoEncontrado = true;
          break;
        }
      }

      if (idCensadoEncontrado) {
        // Realiza las acciones correspondientes si el idCensado y el idCensista coinciden con algún elemento de arrayAux
        document.querySelector(
          "#mensajeChequeo"
        ).innerHTML = `El nro de cedula corresponde a la prevalidación de: ${pCensada.nombreCen}`;
        document.querySelector("#tblPreCensados").innerHTML += `<tr>
          <td>${pCensada.nombreCen}</td>
          <td>${pCensada.edadCen}</td>
          <td>${pCensada.cedulaCen}</td>
          <td>${pCensada.departamentoCen}</td>
          <td>${pCensada.ocupacionCen}</td>
          <td><input type="button" value="Validar Censo" class="modificar" data-censado=${pCensada.cedulaCen}></td>
          </tr>`;

        encontrada = true; // Se encontró una coincidencia
      }
    }
  }

  if (!encontrada) {
    document.querySelector("#mensajeChequeo").innerHTML =
      "La cedula ingresada no corresponde a un pre censo";
  }

  // Asignar eventos de clic a los botones de modificar
  let btnModif = document.querySelectorAll(".modificar");
  for (let i = 0; i < btnModif.length; i++) {
    let btnModificar = btnModif[i];
    btnModificar.addEventListener("click", modificarDatos);
  }
}

// Crea la tabla de estadísticas en la sección "seccionListarCensados"
function armarTablaEstadistica() {
  let estadisticasDepartamentos = {};
  let totalCensados = 0;

  for (let i = 0; i < sistema.censados.length; i++) {
    let censado = sistema.censados[i];

    if (censado.censado === true) {
      if (!estadisticasDepartamentos[censado.departamentoCen]) {
        estadisticasDepartamentos[censado.departamentoCen] = {
          total: 0,
          estudian: 0,
          noTrabajan: 0,
          trabajan: 0,
        };
      }
      estadisticasDepartamentos[censado.departamentoCen].total++;
      if (censado.ocupacionCen == "estudiante") {
        estadisticasDepartamentos[censado.departamentoCen].estudian++;
      }
      if (censado.ocupacionCen == "no trabaja") {
        estadisticasDepartamentos[censado.departamentoCen].noTrabajan++;
      }
      if (
        censado.ocupacionCen == "independiente" ||
        censado.ocupacionCen == "dependiente"
      ) {
        estadisticasDepartamentos[censado.departamentoCen].trabajan++;
      }
      totalCensados++;
    }
  }

  let tablaEstadisticas = document.querySelector("#tblCensados2");
  tablaEstadisticas.innerHTML = `
    <tr>
      <th>Departamento</th>
      <th>Estudian</th>
      <th>No Trabajan</th>
      <th>Trabajan (Dependientes o Independientes)</th>
      <th>% Total de Censados</th>
    </tr>
  `;

  for (let departamento in estadisticasDepartamentos) {
    let estadisticas = estadisticasDepartamentos[departamento];
    let porcentajeTotal = ((estadisticas.total / totalCensados) * 100).toFixed(
      2
    );

    tablaEstadisticas.innerHTML += `
      <tr>
        <td>${departamento}</td>
        <td>${estadisticas.estudian}</td>
        <td>${estadisticas.noTrabajan}</td>
        <td>${estadisticas.trabajan}</td>
        <td>${porcentajeTotal}%</td>
      </tr>
    `;
  }
}

// Busca un censado según la cédula ingresada
document.querySelector("#btnBuscarCensado").addEventListener("click", buscarCensado);

function buscarCensado() {
  let cedula = document.querySelector("#txtCedulaCensado3").value;
  let censadoNoCensado = null;

  for (let i = 0; i < sistema.noEstaCensado().length; i++) {
    if (sistema.noEstaCensado()[i].cedulaCen === cedula) {
      censadoNoCensado = sistema.noEstaCensado()[i];
      break;
    }
  }

  // Si la cédula existe en la lista de censados, muestra un mensaje y oculta los campos de registro
  if (sistema.existeCedulaCensado(cedula) && censadoNoCensado == null) {
    document.querySelector("#seccionDatosPreCenso").style.display = "none";
    document.querySelector("#mensajesRegistroCensado").innerHTML =
      "El usuario ya ha sido censado.";
    document.querySelector("#txtCedulaCensado3").value = "";
    // Restablecer campos de texto y combos desplegables si es necesario
  } else if (sistema.existeCedulaCensado(cedula) && censadoNoCensado !== null) {
    document.querySelector("#mensajesRegistroCensado").innerHTML = "Tus datos precargados son: ";
    document.querySelector("#seccionDatosPreCenso").style.display = "block";
    document.querySelector("#txtCedulaCensado3").value = "";
    document.querySelector("#txtNombrePreCensado").value = censadoNoCensado.nombreCen;
    document.querySelector("#txtEdadPreCensado").value = censadoNoCensado.edadCen;
    document.querySelector("#txtCedulaPreCensado").value = censadoNoCensado.cedulaCen;
    document.querySelector("#txtDeptoCensado2").value = censadoNoCensado.departamentoCen;
    document.querySelector("#txtOcupaPreCensado").value = censadoNoCensado.ocupacionCen;
  } else {
    document.querySelector("#mensajesRegistroCensado").innerHTML = "Cedula habilitada para precargar datos";
    document.querySelector("#seccionDatosPreCenso").style.display = "block";
    document.querySelector("#txtCedulaCensado3").value = "";
  }
}

// Función para el inicio de sesión
document.querySelector("#btnIniciarSesion").addEventListener("click", iniciarSesion);

function iniciarSesion() {
  let usuario = document.querySelector("#txtUsuarioIniciarSesion").value.toLowerCase();
  let contrasena = document.querySelector("#txtContrasena").value;

  // Verificar si los campos de entrada están vacíos
  if (usuario.value === "" || contrasena.value === "") {
    document.querySelector("#mensajeIniciarSesion").innerHTML = "Por favor, completa todos los campos.";
    return; // Salir de la función si algún campo está vacío
  }

  // Verificar si las credenciales coinciden con algún censista registrado
  let credencialesCorrectas = false;
  let censistaEncontrado;

  for (let i = 0; i < sistema.censistas.length; i++) {
    let censista = sistema.censistas[i];
    if ( censista.nombreUsuario.toLowerCase() === usuario && censista.contrasena === contrasena) {
      credencialesCorrectas = true;
      censistaEncontrado = censista;
      break;
    }
  }

  if (credencialesCorrectas) {
    // Las credenciales son correctas
    inicioSesion = true;
    document.querySelector("#seccionIniciarSesion").style.display = "none";
    document.querySelector("#botonesPreInicio").style.display = "none";
    document.querySelector("#seccionCensistaRegistrado").style.display = "block";
    document.querySelector("#mensajeBienvenida").innerHTML = `Bienvenido, ${censistaEncontrado.nombre}!`;
    document.querySelector("#btnCerrarSesion").style.display = "block"; // Actualizar la visualización del botón
    document.querySelector("#btnSeccionCensistaRegistrado").style.display = "block"; // Actualizar la visualización del botón
    cargarComboCensistas();
  } else {
    // Las credenciales son incorrectas
    document.querySelector("#mensajeIniciarSesion").innerHTML = "Usuario o contraseña incorrectos. Por favor, inténtalo nuevamente.";
  }
  usuario.value = "";
  contrasena.value = "";
}

function mostrarPorcentajeCensados() {
  let porcentajeCensados = sistema.porcentajePersonasPendientes();
  let porcentajePendientes = document.querySelector("#txtPorcentajePendientes");
  porcentajePendientes.innerHTML = `Porcentaje de personas pendientes: ${porcentajeCensados.toFixed(2)}%`;
}
mostrarPorcentajeCensados();

function totalCensadosPorDepto() {
  let totalCensadosPorDepto = sistema.obtenerCantidadCensadosPorDepartamento();
  let censadosPorDepto = document.querySelector("#txtCensadosPorDepto");
  censadosPorDepto.innerHTML = "Cantidad de censados por departamento:<br>";
  for (let departamento in totalCensadosPorDepto) {
    censadosPorDepto.innerHTML += `${departamento}: ${totalCensadosPorDepto[departamento]}<br>`;
  }
}
totalCensadosPorDepto();

function mostrarTotalCensados() {
  let totalCensados = sistema.obtenerTotalCensados();
  let estadisticasCensados = document.querySelector("#txtEstadisticasCensados");
  estadisticasCensados.innerHTML = `Total de censados: ${totalCensados}`;
}

mostrarTotalCensados();

if (inicioSesion) {
  document.querySelector("#btnCerrarSesion").style.display = "block";
  document.querySelector("#btnSeccionCensistaRegistrado").style.display = "block";
} else {
  document.querySelector("#btnCerrarSesion").style.display = "none";
  document.querySelector("#btnSeccionCensistaRegistrado").style.display = "none";
}

document.querySelector("#btnCerrarSesion").addEventListener("click", cerrarSesion);

function cerrarSesion() {
  inicioSesion = false;
  cambiarSeccion("seccionPrincipal");
  document.querySelector("#btnCerrarSesion").style.display = "none";
  document.querySelector("#btnSeccionCensistaRegistrado").style.display = "none";
  document.querySelector("#botonesPreInicio").style.display = "block";
  document.querySelector("#mensajeBienvenida").style.display = "none";
}

document.querySelector("#btnSeccionCensistaRegistrado").addEventListener("click", volverAtras);

function volverAtras() {
  cambiarSeccion("seccionCensistaRegistrado");
}

function cargarComboPreCensados() {
  let llenarComboUsuarios = '<option value="">Seleccione...</option>';
  for (let i = 0; i < sistema.censados.length; i++) {
    let censado = sistema.censados[i];
    if (!censado.censado) {
      llenarComboUsuarios +='<option value="' + censado.cedulaCen +'">' + censado.nombreCen + "</option>";
    }
  }

  let selectUsuariosParaCensar = document.querySelector("#txtUsuariosParaCensar");
  selectUsuariosParaCensar.innerHTML = llenarComboUsuarios;
}
cargarComboPreCensados();

//Carga el select de censista
function cargarComboCensistas() {
  let censistasAuxiliar = [];
  let nombreCensistaLogueado = document.querySelector("#txtUsuarioIniciarSesion").value;

  for (let i = 0; i < sistema.censistas.length; i++) {
    let censista = sistema.censistas[i];
    if (censista.nombreUsuario !== nombreCensistaLogueado) {
      censistasAuxiliar.push(censista);
    }
  }

  let selectCensistasDisponiblesHTML = '<option value="">Seleccione...</option>';
  for (let i = 0; i < censistasAuxiliar.length; i++) {
    let censista = censistasAuxiliar[i];
    selectCensistasDisponiblesHTML += '<option value="' + censista.id + '">' + censista.nombre + "</option>";
  }

  let selectCensistasDisponibles = document.querySelector("#txtCensistasDisponibles");
  selectCensistasDisponibles.innerHTML = selectCensistasDisponiblesHTML;
}

//Funcion para modificar el ID del censado
document.querySelector("#btnModificarIdCensista").addEventListener("click", modificarID);

function modificarID() {
  let censadoSelect = document.querySelector("#txtUsuariosParaCensar").value;
  let censistaSelect = document.querySelector("#txtCensistasDisponibles").value;
  let censistaAux;
  let censadoAux;

  for (let i = 0; i < sistema.censistas.length; i++) {
    let censista = sistema.censistas[i];
    if (censista.id == censistaSelect) {
      censistaAux = censista;
      break;
    }
  }

  for (let i = 0; i < sistema.censados.length; i++) {
    let censado = sistema.censados[i];
    if (censado.cedulaCen == censadoSelect) {
      censadoAux = censado;
      break;
    }
  }

  if (censadoAux && censistaAux) {
    censadoAux.idCensista = censistaAux.id;
    document.querySelector("#mensajeReasignarCensista").innerHTML = `Se reasigno con éxito. El nuevo ID para el censado es:, ${censadoAux.idCensista} y su censista es: ${censistaAux.nombre} `;
  } else {
    document.querySelector("#mensajeReasignarCensista").innerHTML = `ERROR`;
  }
}

// Función para obtener el departamento seleccionado del combo desplegable

document.querySelector("#txtChequeoDepto").addEventListener("click", seleccionarDepartamento);

function seleccionarDepartamento() {
  let departamentoSeleccionado = document.querySelector("#txtDeptoCensado3").value;

  // Calcular los porcentajes de personas censadas menores y mayores de edad para el departamento seleccionado
  let porcentajes = sistema.calcularPorcentajeEdadesPorDepartamento(departamentoSeleccionado);

  // Mostrar los resultados en el elemento HTML
  document.querySelector("#porcentajeEdadDepartamentoMenores").innerHTML = `Porcentaje de menores de edad censados: ${porcentajes.porcentajeMenoresEdad}%`;
  document.querySelector("#porcentajeEdadDepartamentoMayores").innerHTML = `Porcentaje de mayores de edad censados: ${porcentajes.porcentajeMayoresEdad}%`;
}

document.querySelector("#btnRegistrarPreCensado").addEventListener("click", obtenerCensista);

//Funcion para obtener censista aleatoriamente
function obtenerCensista() {
  sistema.obtenerCensistaAleatorio();
}

//Función para eliminar datos de precensados
document.querySelector("#btnEliminarDatosPreCensado").addEventListener("click", eliminarDatosPreCensado);

function eliminarDatosPreCensado() {
  let nombreCensado = document.querySelector("#txtNombrePreCensado").value;
  let cedulaCensado = document.querySelector("#txtCedulaPreCensado").value;
  for (let i = 0; i < sistema.censados.length; i++) {
    let censado = sistema.censados[i];

    // Verificar si coincide el nombre y la cédula del precenso
    if (censado.nombreCen === nombreCensado &&censado.cedulaCen === cedulaCensado) {
      let confirmado = confirm(`Seguro que desea eliminar los datos del precenso de ${nombreCensado}?`);

      if (confirmado) {
        // Eliminar el pre censado de la lista de censados
        sistema.censados.splice(i, 1);
        document.querySelector("#txtNombrePreCensado").value = "";
        document.querySelector("#txtCedulaPreCensado").value = "";
        document.querySelector("#txtEdadPreCensado").value = "";
        document.querySelector("#txtDeptoCensado2").value = "";
        document.querySelector("#txtOcupaPreCensado").value = "";
        document.querySelector("#mensajesRegistroPreCensado").innerHTML = "Los datos del precenso han sido eliminados exitosamente.";
        return;
      }
    }
  }

  document.querySelector("#mensajesRegistroPreCensado").innerHTML = "No se encontró ningún precenso con los datos ingresados.";
}
