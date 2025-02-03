const map = L.map('map').setView([0, 0], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
const kmlLayer = omnivore.kml('/olot-11/doc.kml').on('ready', function () {
    map.fitBounds(kmlLayer.getBounds()); // 🔹 Ajusta la vista al archivo KML
    // 🔹 Agregar enlaces de navegación a cada marcador
    kmlLayer.eachLayer(function(layer) {
        if (layer instanceof L.Marker) { // Verifica si es un marcador
            var lat = layer.getLatLng().lat;
            var lng = layer.getLatLng().lng;

            // 🔹 Crear enlaces dinámicos para Apple Maps (iOS) y Google Maps (Android)
            var googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
            var appleMapsUrl = `https://maps.apple.com/?daddr=${lat},${lng}`;

            // 🔹 Detectar si es iOS o Android
            var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
            var mapsUrl = isIOS ? appleMapsUrl : googleMapsUrl;

            // 🔹 Agregar el popup con enlace de navegación
            layer.bindPopup(`<b>Destino</b><br>
                            <a href="${mapsUrl}" target="_blank">📍 Ir aquí</a>`);
        }
    });
}).addTo(map);