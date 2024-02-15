class Censista {
  constructor(
    idCensista,
    nombreCensista,
    nombreUsuarioCensista,
    contrasenaCensista
  ) {
    this.id = idCensista; // ID del censista
    this.nombre = nombreCensista; // Nombre del censista
    this.nombreUsuario = nombreUsuarioCensista; // Nombre de usuario del censista
    this.contrasena = contrasenaCensista; // Contraseña del censista
  }
}

class Censado {
  constructor(
    nombreCensado,
    edadCensado,
    cedulaCensado,
    departamentoCensado,
    ocupacionCensado,
    booleanoCensado,
    censistaId
  ) {
    this.nombreCen = nombreCensado; // Nombre del censado
    this.edadCen = edadCensado; // Edad del censado
    this.cedulaCen = cedulaCensado; // Cédula del censado
    this.departamentoCen = departamentoCensado; // Departamento del censado
    this.ocupacionCen = ocupacionCensado; // Ocupación del censado
    this.censado = booleanoCensado; // Estado de censado (true: censado, false: no censado)
    this.idCensista = censistaId;
  }
}

class Sistema {
  constructor() {
    this.censistas = [
      // Lista de censistas predefinidos
      new Censista(1, "Mateo Rodriguez", "mrod1234", "Mateo123"),
      new Censista(2, "Hernan Rodriguez", "her1902", "Hernan123"),
      new Censista(3, "Carlos Rodríguez", "carlosrod", "Carlos123"),
    ];

    // SE CARGAN 30 PERSONAS AL ARRAY DE CENSADOS PERO ALGUNAS CON EL BOOL EN FALSE - POR ENDE NO SE CUENTAN COMO CENSADAS A EFECTOS DE ESTADISTICAS
    this.censados = [
      new Censado("Mateo Rodriguez", 25, "47489126", "Montevideo", "independiente", true, 1),
      new Censado("Pedro Gómez", 50, "852741964", "Canelones", "estudiante", false, 1),
      new Censado("Laura Ramírez", 7, "369852148", "Maldonado", "dependiente", false, 1),
      new Censado("Gabriel Suárez", 3, "741852963", "Colonia", "estudiante", true, 3),
      new Censado("Carolina González", 6, "258369147", "Rocha", "independiente", true, 3),
      new Censado("Martín Vargas", 31, "123987456", "Montevideo", "no trabaja", true, 3),
      new Censado("Florencia Pereira", 23, "654987321", "Durazno", "dependiente", true, 3),
      new Censado("Andrés Méndez", 57, "789654123", "Treina Y Tres", "Eestudiante", true, 3),
      new Censado("Valentina Acosta", 36, "321789654", "Tacuarembo", "independiente", true, 3),
      new Censado("Jorge Fernández", 41, "456321987", "Rio Negro", "no trabaja", true, 3),
      new Censado("Sofía Silva", 29, "987123654", "Rivera", "estudiante", true, 3),
      new Censado("Lorenzo Rodríguez", 52, "654789321", "Soriano", "dependiente", true, 3),
      new Censado("Carla Pereira", 24, "321456789", "Salto", "estudiante", true, 3),
      new Censado("Javier Méndez", 58, "987321456", "Colonia", "independiente", true, 3),
      new Censado("Camila Suárez", 34, "654123789", "Rocha", "no trabaja", true, 3),
      new Censado("Lucas González", 47, "321789653", "Montevideo", "independiente", true, 3),
      new Censado("Ana López", 32, "789654321", "Canelones", "dependiente", true, 3),
      new Censado("Diego Ramírez", 60, "456321789", "Maldonado", "estudiante", true, 3),
      new Censado("Marina Vargas", 26, "987654123", "Colonia", "no trabaja", true, 3),
      new Censado("Gustavo Acosta", 38, "12345902", "Rocha", "estudiante", false, 3),
      new Censado("Ana Fernández", 43, "789321654", "Montevideo", "independiente", true, 3),
      new Censado("Pablo Silva", 30, "123456789", "Canelones", "dependiente", true, 3),
      new Censado("Natalia González", 2, "987654321", "Maldonado", "estudiante", true, 3),
      new Censado("Fernando Rodríguez", 28, "456789123", "Colonia", "independiente", true, 3),
      new Censado("Carolina Silva", 42, "321654987", "Rocha", "no trabaja", true, 3),
      new Censado("Roberto Fernández", 31, "789123456", "Montevideo", "estudiante", true, 3),
      new Censado("Andrea López", 49, "159263487", "Canelones", "dependiente", true, 3),
      new Censado("Juan Gómez", 5, "852741963", "Maldonado", "estudiante", true, 3),
      new Censado("María Ramírez", 40, "369852147", "Colonia", "Iindependiente", true, 3),
      new Censado("Carlos Suárez", 53, "012345678", "Rocha", "no trabaja", true, 3),
    ];
    this.proximoId = 4; // Próximo ID a asignar a un nuevo censista
    this.idCensistaActual = null; // ID del censista actualmente iniciado sesión
  }

  agregarNuevoCensista(objetoCensista) {
    this.censistas.push(objetoCensista); // Agrega un nuevo censista a la lista de censistas
  } 

  agregarNuevoCensado(objetoCensado) {
    this.censados.push(objetoCensado); // Agrega un nuevo censado a la lista de censados
    armarTablaCensados(); // Llama a la funcion para armar la tabla modificada
  }

  existeNombreUsuario(nombreUsuario) {
    // Verifica si existe un censista con el nombre de usuario que quiero agregar
    for (let i = 0; i < this.censistas.length; i++) {
      if (this.censistas[i].nombreUsuario === nombreUsuario) {
        return true;
      }
    }
    return false;
  }

  existeCedulaCensado(cedulaCen) {
    // Verifica si existe un censado con la cédula dada
    for (let i = 0; i < this.censados.length; i++) {
      if (this.censados[i].cedulaCen === cedulaCen) {
        return true;
      }
    }
    return false;
  }

  // Crea un array aux para los censados con censado en false
  noEstaCensado() {
    let censadosNoCensados = [];
    for (let i = 0; i < this.censados.length; i++) {
      if (!this.censados[i].censado) {
        censadosNoCensados.push(this.censados[i]);
      }
    }
    return censadosNoCensados;
  }

  validarContrasena(contrasena) {
    // Valida el largo de la contraseña
    if (contrasena.length < 5) {
      return false;
    }
    let tieneMayuscula = false;
    let tieneMinuscula = false;
    let tieneNumero = false;

    for (let i = 0; i < contrasena.length; i++) {
      let codigoCaracter = contrasena.charCodeAt(i);

      if (codigoCaracter >= 65 && codigoCaracter <= 90) {
        tieneMayuscula = true; // La contraseña tiene al menos una mayúscula
      } else if (codigoCaracter >= 97 && codigoCaracter <= 122) {
        tieneMinuscula = true; // La contraseña tiene al menos una minúscula
      } else if (codigoCaracter >= 48 && codigoCaracter <= 57) {
        tieneNumero = true; // La contraseña tiene al menos un número
      }
    }
    return tieneMayuscula && tieneMinuscula && tieneNumero; // La contraseña cumple con los requisitos
  }

  // Elimina un censado de la lista de censados
  eliminarCensado(cedulaCensado) {
    for (let i = 0; i < this.censados.length; i++) {
      let cens = this.censados[i];
      if (cens.cedulaCen === cedulaCensado) {
        let confirmado = confirm(`Seguro que desea eliminar los datos?`);
        if (confirmado) {
          this.censados.splice(i, 1);
        }
        break;
      }
    }
  }

  // Obtenemos el ID del censista y le sumamos uno para asignarselo al proximo
  obtenerIdCensista() {
    let id = this.proximoId;
    this.proximoId++;
    return id; // Obtiene un nuevo ID para un censista y actualiza el próximo ID
  }

  // Metodo para obtener el total de censados, recorre hasta el final del array
  obtenerTotalCensados() {
    let contador = 0;
    for (let i = 0; i < this.censados.length; i++) {
      if (this.censados[i].censado === true) {
        contador++;
      }
    }
    return contador;
  }

  // Metodo para oobtener la cantidad de censados por depto
  obtenerCantidadCensadosPorDepartamento() {
    const departamentos = {};
    for (let i = 0; i < this.censados.length; i++) {
      const censado = this.censados[i];
      if (censado.censado) {
        const departamento = censado.departamentoCen;

        if (departamentos[departamento]) {
          departamentos[departamento]++;
        } else {
          departamentos[departamento] = 1;
        }
      }
    }

    return departamentos;
  }

  //Metodo para calcular las personas pendientes de censar
  porcentajePersonasPendientes() {
    let totalPersonas = this.censados.length;
    let totalPendientes = 0;

    for (let i = 0; i < this.censados.length; i++) {
      const censado = this.censados[i];
      if (!censado.censado) {
        totalPendientes++;
      }
    }

    let porcentaje = (totalPendientes / totalPersonas) * 100;
    return porcentaje;
  }

  obtenerIdCensistaActual(nombreUsuarioCensista) {
    for (let i = 0; i < sistema.censistas.length; i++) {
      if (sistema.censistas[i].nombreUsuario === nombreUsuarioCensista) {
        return sistema.censistas[i].id;
      }
    }
  }

  obtenerCensistaAleatorio() {
    let cantidadCensistas = this.censistas.length;
    let indiceAleatorio = Math.floor(Math.random() * cantidadCensistas);
    let censistaAleatorio = this.censistas[indiceAleatorio];
    return censistaAleatorio;
  }

  calcularPorcentajeEdadesPorDepartamento(departamento) {
    let totalMenoresEdad = 0;
    let totalMayoresEdad = 0;
    // Obtenemos cantidad de mayores y menores censados por depto
    for (let i = 0; i < this.censados.length; i++) {
      let censado = this.censados[i];
      if (censado.departamentoCen === departamento && censado.censado) {
        if (censado.edadCen < 18) {
          totalMenoresEdad++;
        } else {
          totalMayoresEdad++;
        }
      }
    }
    // Calcular los porcentajes
    let porcentajeMenoresEdad =(totalMenoresEdad / (totalMenoresEdad + totalMayoresEdad)) * 100;
    let porcentajeMayoresEdad =(totalMayoresEdad / (totalMenoresEdad + totalMayoresEdad)) * 100;
    return {
      porcentajeMenoresEdad,
      porcentajeMayoresEdad,
    };
  }

  validarDigitoVerificador(cedula) {
    // Eliminar los símbolos de la cédula
    let cedulaSinSimbolos = '';
    for (let i = 0; i < cedula.length; i++) {
      const caracter = cedula.charCodeAt(i);
      if (caracter >= 48 && caracter <= 57) {
        cedulaSinSimbolos += cedula.charAt(i);
      }
    }
    // Obtener el dígito verificador de la cédula
    let digitoVerificador = parseInt(cedulaSinSimbolos.charAt(cedulaSinSimbolos.length - 1));
    // Sacamos el dígito verificador de la cédula para hacer el cálculo
    let cedulaSinDigito = cedulaSinSimbolos.slice(0, -1);
    // Definir el array según la longitud de la cédula
    let multip = [];
    if (cedulaSinDigito.length === 6) {
      multip = [1, 2, 3, 4, 7, 6];
    } else if (cedulaSinDigito.length === 7) {
      multip = [8, 1, 2, 3, 4, 7, 6];
    } else {
      // La longitud de la cédula no es válida
      return false;
    }
    // Realizar el cálculo del dígito verificador
    let suma = 0;
    for (let i = 0; i < cedulaSinDigito.length; i++) {
      suma += parseInt(cedulaSinDigito.charAt(i)) * multip[i];
    }
    // Calcula el dígito verificador y lo compara con el dígito verificador dado
    let digitoCalculado = suma % 10;
    return digitoCalculado === digitoVerificador;
  }
}

let sistema = new Sistema();