import { gameData } from "./questions.js";
import { volarMapa } from "./mapa.js";
import { drawChartPaises, drawCurveTiempo } from "./graficos.js";
import { tiempo } from "./intervalo.js";

/**
 * Clase constructora para crear objetos de los países con los valores adecuados, con el fin de simplificar la manipulación de estos.
 */
class Pais {
  constructor(objeto, numCiudad) {
    this.name = objeto.name;
    this.code = objeto.code;
    this.cityName = objeto.cities[numCiudad].name;
    this.cityCode = objeto.cities[numCiudad].cityCode;
    this.location = objeto.cities[numCiudad].location;
  }
}

/**
 * Función encargada de introducir en un array 5 objetos de tipo Pais de forma aleatoria. Evitando que estos se repitan.
 */
function aleatorioPais() {
  var arrayPaises = [];
  while (arrayPaises.length < 5) {
    var aleatorioPais = Math.round(
      Math.random() * (gameData.countries.length - 1)
    );
    var aleatorioCiudad = Math.round(Math.random() * 2);
    var pais = gameData.countries[aleatorioPais];
    if (
      arrayPaises.filter((element) => element.name === pais.name).length == 0 ||
      arrayPaises.length == 0
    ) {
      var nuevoPais = new Pais(pais, aleatorioCiudad);
      arrayPaises.push(nuevoPais);
    }
  }
  IntroduccionPaises(arrayPaises);
}

var NumAciertos = 0;
/**
 * Función que crea los elementos que establece de forma aleatoria y evitando la repitición de los elementos de la partida
 * mediante el relleno de valores de los templates clonados del documento html.
 * @param {*} arrayPaises Parámetro de entrada donde se introduce el array de Paises.
 */
function IntroduccionPaises(arrayPaises) {
  var divCiudad = document.getElementById("ciudad-nombre");
  var divContenedor = document.getElementById("pais-contenedor");

  var tempCiudad = document.getElementById("templateCiudades");
  var clonCiudad = tempCiudad.content.cloneNode(true);

  var tempContenedor = document.getElementById("templateContenedores");
  var clonContenedor = tempContenedor.content.cloneNode(true);

  var arrayNum = [];

  arrayPaises.forEach((element) => {
    var contenedorCiudad = document.createElement("div");
    var textoPais = document.createTextNode(element.cityName);
    contenedorCiudad.appendChild(textoPais);
    contenedorCiudad.setAttribute("class", "draggable");
    contenedorCiudad.setAttribute("data-code", element.code);
    clonCiudad.firstElementChild.appendChild(contenedorCiudad);
  });

  while (arrayNum.length < 5) {
    var aleatorioPais = Math.round(Math.random() * 4);
    if (!arrayNum.includes(aleatorioPais)) {
      var contenedorPais = document.createElement("div");
      var pPais = document.createElement("p");
      var respuestaPais = document.createElement("div");

      var textoPais = document.createTextNode(arrayPaises[aleatorioPais].name);
      pPais.appendChild(textoPais);
      contenedorPais.setAttribute("class", "respuesta");
      contenedorPais.appendChild(pPais);

      contenedorPais.appendChild(respuestaPais);
      respuestaPais.setAttribute("class", "droppable");
      respuestaPais.setAttribute("data-code", arrayPaises[aleatorioPais].code);

      clonContenedor.firstElementChild.appendChild(contenedorPais);
      arrayNum.push(aleatorioPais);
    }
  }

  divCiudad.appendChild(clonCiudad);
  divContenedor.appendChild(clonContenedor);
  dragNdrop(arrayPaises);
}

/**
 * Función que establece las capacidades de arrastrar los elementos adecuados y que los contenedores correspondientes sean capaces de contenerlos.
 * @param {*} arrayPaises Parámetro de entrada donde se introduce el array de Paises.
 */
function dragNdrop(arrayPaises) {
  $(function () {
    $(".draggable").draggable({ revert: true });
  });

  arrayPaises.forEach((element) => {
    $(".droppable").droppable({
      drop: function (event, ui) {
        if (event.target.dataset.code == ui.draggable[0].dataset.code) {
          ui.draggable.draggable({ revert: false });
          ui.draggable.draggable({ disabled: true });
          $(this).css("background-color", "palegreen");
          $(this).addClass("Correcto");
          var nombreCiudad = ui.draggable[0].innerHTML;
          var ObjetoCiudad = arrayPaises.filter(
            (element) => element.cityName === nombreCiudad
          );
          NumAciertos++;
          insercionValores(ObjetoCiudad[0]);
        }
      },
    });
  });
}

/**
 * Parámetro de entrada donde se llaman a las distintas funciones para insertar los valores en las gráficas y
 * realizar la animación del vuelo en el mapa. Además, se verifica si la partida ha acabado, realizando las acciones necesarias tras esto.
 * @param {*} objeto Parámetro de entrada del objeto tipo País.
 */
function insercionValores(objeto) {
  if (NumAciertos == 5) {
    document.getElementById("partida-boton").disabled = false;
    clearInterval(tiempo);
    drawCurveTiempo();
    NumAciertos = 0;
  }
  drawChartPaises(objeto);
  volarMapa(objeto.location, objeto.cityName);
}

export { aleatorioPais };
