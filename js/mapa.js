var map = new L.Map("mapid", {
  zoomControl: false,
  center: [28.45573, -16.28282],
  zoom: 17,
});

var myLayer = null;

/**
 * Función establecedora de la inicialización del mapa en las coordenadas correspondientes al CIFP César Manrique.
 */
function establecerMapa() {
  var indicacion = [28.45573, -16.28282];
  myLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "Datos del mapa de <a href=https://www.openstreetmap.org/?mlat=" +
      indicacion[0] +
      "&mlon=" +
      indicacion[1] +
      "#map=17/" +
      indicacion[0] +
      "/" +
      indicacion[1] +
      '&layers=N>OpenStreetMap</a> Contribuidores: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imágenes de © <a href="http://cloudmade.com">CloudMade</a>',
  }).addTo(map);

  var marker = L.marker(indicacion, 17).addTo(map);

  marker.bindPopup("CIFP César Manrique");
}

/**
 * Función que simula una animación de vuelo entre países según los datos introducidos.
 * @param {*} indicacion Parámetro de entrada donde se introducen las coordenadas correspondientes.
 * @param {*} nombreCiudad Parámetro de entrada donde se introduce el nombre de la ciudad para mostrarlo en el tooltip.
 */
function volarMapa(indicacion, nombreCiudad) {
  map.flyTo(indicacion, 17, {
    animate: true,
    duration: 5,
    center: indicacion,
    zoom: 17,
  });

  map.eachLayer((layer) => {
    layer.remove();
  });

  myLayer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      "Datos del mapa de <a href=https://www.openstreetmap.org/?mlat=" +
      indicacion[0] +
      "&mlon=" +
      indicacion[1] +
      "#map=17/" +
      indicacion[0] +
      "/" +
      indicacion[1] +
      '&layers=N>OpenStreetMap</a> Contribuidores: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imágenes de © <a href="http://cloudmade.com">CloudMade</a>',
  }).addTo(map);

  var marker = L.marker(indicacion, 17, {
    title: nombreCiudad,
  }).addTo(map);

  marker.bindPopup(nombreCiudad);
}

export { establecerMapa, volarMapa };
