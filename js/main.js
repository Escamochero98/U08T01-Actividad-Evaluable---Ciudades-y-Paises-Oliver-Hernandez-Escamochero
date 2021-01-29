import { establecerMapa } from "./mapa.js";
import { drawCurveInicio, drawChartInicio } from "./graficos.js";
import { empiezaJuego } from "./intervalo.js";

/**
 * Llamada a función para establecer la inicialización del mapa.
 */
establecerMapa();

/**
 * Llamada a funciones para establecer la inicialización de las dos gráficas.
 */
google.charts.load("current", { packages: ["corechart", "line"] });
google.charts.setOnLoadCallback(drawCurveInicio);

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChartInicio);

/**
 * Evento encargado de empezar la partida.
 */
$("#partida-boton").click(empiezaJuego);
