/**
 * Función encargada de inicializar la gráfica lineal del número de intentos y el tiempo de la partida.
 */
function drawCurveInicio() {
  var data = new google.visualization.DataTable();
  data.addColumn("number", "X");
  data.addColumn("number", "Tiempos");

  var options = {
    hAxis: {
      title: "Intentos",
    },
    vAxis: {
      title: "Tiempo",
    },
    series: {
      1: { curveType: "function" },
    },
    title: "Tiempos por partida.",
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

var NumIntentos = 0;
var arrayGrafica = [];

/**
 * Función que introduce a la gráfica los valores de número de intentos y el tiempo de la partida.
 */
function drawCurveTiempo() {
  NumIntentos++;
  var data = new google.visualization.DataTable();
  data.addColumn("number", "X");
  data.addColumn("number", "Tiempos");
  var tiempo = parseInt(document.getElementById("tiempo").innerHTML);
  arrayGrafica.push([NumIntentos, tiempo]);

  data.addRows(arrayGrafica);

  var options = {
    hAxis: {
      title: "Intentos",
    },
    vAxis: {
      title: "Tiempo",
    },
    series: {
      1: { curveType: "function" },
    },
    curveType: "function",
    title: "Tiempos por partida.",
  };

  var chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

var arrayPaises = [
  ["Paises", "Porcentaje"],
  ["", 0],
];

/**
 * Función encargada de inicializar la gráfica circular de los países.
 */
function drawChartInicio() {
  var arrayPaises = [
    ["Paises", "Porcentaje"],
    ["", 0],
  ];
  var data = google.visualization.arrayToDataTable(arrayPaises);

  var options = {
    title: "Ocurrencias de paises.",
    width: 490,
    height: 320,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

/**
 * Función que introduce o actualiza los valores del gráfico ciruclar, siendo estos el nombre del país y el número de ocurrencia de esta.
 * @param {*} objeto Parámetro de entrada de la función dónde recogeremos los datos a insertar a la gráfica circular.
 */
function drawChartPaises(objeto) {
  var exist = false;
  var indice = null;

  arrayPaises.forEach(function (element, index) {
    if (element.includes(objeto.name)) {
      exist = true;
      indice = index;
    }
  });

  if (!exist) {
    arrayPaises.push([objeto.name, 1]);
  } else {
    arrayPaises[indice][1] += 1;
  }

  var data = google.visualization.arrayToDataTable(arrayPaises);

  var options = {
    title: "Ocurrencias de paises.",
    width: 490,
    height: 320,
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(data, options);
}

export { drawCurveInicio, drawChartInicio, drawChartPaises, drawCurveTiempo };
