function showMap(startLatitude, startLongitude, endLatitude, endLongitude) {
        var startCoords = [startLatitude, startLongitude];
        var endCoords = [endLatitude, endLongitude];
        console.log(endCoords)
        div_el=document.getElementById("map")
        div_el.style.display="block"
        document.getElementById("close-btn").style.display="block"
        // Clear existing layers
        map.eachLayer(function (layer) {
            if (layer instanceof L.Marker || layer === routingControl) {
                map.removeLayer(layer);
            }
        });
        var midPoint = [
            (startCoords[0] + endCoords[0]) / 2,
            (startCoords[1] + endCoords[1]) / 2
        ];
        // Add start and end markers
        L.marker(startCoords).addTo(map).bindPopup('Start Location');
        L.marker(endCoords).addTo(map).bindPopup('End Location');

        // Update or create routing control
        if (routingControl) {
            routingControl.setWaypoints([L.latLng(startCoords), L.latLng(endCoords)]);
        } else {
            // Create a new routing control
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startCoords),
                    L.latLng(endCoords)
                ],
                routeWhileDragging: true
 }).addTo(map);
        }
        map.setView(startCoords, 9);
    }
