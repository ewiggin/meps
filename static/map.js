const map = L.map('map').setView([42.182062, 2.488314], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

document.addEventListener('DOMContentLoaded', () => {

    const mapURL = document.getElementById('mapURL')?.value;
    if (!mapURL) {
        return;
    }

    const kmlLayer = omnivore.kml(mapURL).on('ready', function () {
        map.fitBounds(kmlLayer.getBounds()); // 🔹 Ajusta la vista al archivo KML
        // 🔹 Agregar enlaces de navegación a cada marcador
        kmlLayer.eachLayer(function (layer) {
            if (layer instanceof L.Marker) {
                const lat = layer.getLatLng().lat;
                const lng = layer.getLatLng().lng;

                // 🔹 Crear enlaces dinámicos para Apple Maps (iOS) y Google Maps (Android)
                const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                const appleMapsUrl = `https://maps.apple.com/?daddr=${lat},${lng}`;

                // 🔹 Detectar si es iOS o Android
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                const mapsUrl = isIOS ? appleMapsUrl : googleMapsUrl;

                // 🔹 Agregar el popup con enlace de navegación
                layer.bindPopup(`<a href="${mapsUrl}" target="_blank">📍 Indicaciones hasta el territorio</a>`);
            }
        });
    }).addTo(map);
});
