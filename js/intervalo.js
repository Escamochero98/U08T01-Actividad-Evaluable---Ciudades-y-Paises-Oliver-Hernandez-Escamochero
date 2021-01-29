import { aleatorioPais } from "./paises-aletorio.js";

var tiempo = null;

/**
 * Función que crea el intervalo que funciona como temporizador de la partida. Además borra los elementos de la partida si existen y desactiva el botón de partida.
 */
function empiezaJuego() {
  killIntervalFunction();

  var pais = document.getElementById("ciudad-nombre");
  var contenedor = document.getElementById("pais-contenedor");

  if (!pais.innerHTML == "") {
    while (pais.firstChild) {
      pais.removeChild(pais.firstChild);
    }
    while (contenedor.firstChild) {
      contenedor.removeChild(contenedor.firstChild);
    }
  }

  document.getElementById("partida-boton").disabled = true;
  aleatorioPais();

  var tiempoCreciente = 0;

  tiempo = setInterval(function () {
    tiempoCreciente++;
    document.getElementById("tiempo").textContent = tiempoCreciente;
  }, 1000);
}

/**
 * Función que elimina todo temporizador en caso de que este se solape con otros temporizadores.
 */
function killIntervalFunction() {
  var killInterval = setTimeout(function () {
    for (var i = killInterval; i > 0; i--) {
      clearInterval(i);
    }
  }, 1);
}

export { empiezaJuego, tiempo };
