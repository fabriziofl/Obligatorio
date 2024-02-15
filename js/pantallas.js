//Funcion para ocultar secciones
function OcultarSecciones() {
    // Oculta todas las secciones con la clase "seccion"
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
      let seccion = secciones[i];
      seccion.style.display = "none";
    }
  }
  
  // Obtiene todos los botones con la clase "btn" y les agrega un evento de click
  let botones = document.querySelectorAll(".btn");
  for (let i = 0; i < botones.length; i++) {
    let boton = botones[i];
    boton.addEventListener("click", mostrarSeccion);
  }
  
  //Funcion para mostrar secciones
  function mostrarSeccion() {
    // Obtiene el ID del botón clickeado y lo convierte en el ID de la sección correspondiente
    let idBoton = this.getAttribute("id");
    if (idBoton === "btnCerrarSesion") {
      // Si el botón clickeado es el botón de cerrar sesión no hace nada
      return;
    }
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);
    cambiarSeccion(idSeccion);
  }
  cambiarSeccion("seccionPrincipal");
  
  // Muestra la sección indicada y realiza acciones adicionales según la sección
  function cambiarSeccion(nuevaSeccion) {
    OcultarSecciones();
    let seccion = document.querySelector("#" + nuevaSeccion);
    if (seccion) {
      seccion.style.display = "block";
      if (nuevaSeccion === "seccionListarCensados") {
        armarTablaEstadistica();
      }
    }
  }