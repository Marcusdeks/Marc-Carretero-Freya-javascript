let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, error, options);
} else {
    alert("Los datos para la geolocalización no están disponibles");
}

function success(position){
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;

    let map = L.map('map',{
        center: [latitud, longitud],
        zoom: 16
    })
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Freyas sanctuary</a> contributors'
    }).addTo(map);


//-----DEFINIR ICONOS----------------------------

    let iconInicio = L.icon({
    iconUrl: '../imagenes/leaf-green.png',
    shadowUrl: '../imagenes/leaf-shadow.png',
    iconSize:     [38, 95], // ancho y alto
    shadowSize:   [50, 64], // ancho y alto
    iconAnchor:   [22, 94], // punto del icono que corresponde a la ubicación del marcador
    shadowAnchor: [4, 62],  // el mismo para la sombra
    popupAnchor:  [-3, -76] // punto desde el cual se abrirá el popup relativo al icono 1-X y 2-Y (lados, arriba bajo)
    })

//---------ICONO 2 FINAL------------
    let iconFinal = L.icon({
    iconUrl: '../imagenes/leaf-red.png',
    shadowUrl: '../imagenes/leaf-shadow.png',
    iconSize:     [38, 95], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76] 
    })
//---------ICONO 2 FINAL------------
    let iconAlterna = L.icon({
    iconUrl: '../imagenes/leaf-orange.png',
    shadowUrl: '../imagenes/leaf-shadow.png',
    iconSize:     [38, 95], 
    shadowSize:   [50, 64], 
    iconAnchor:   [22, 94], 
    shadowAnchor: [4, 62],  
    popupAnchor:  [-3, -76] 
    })

//----POPUP--


    //CALCULAR RUTA
    let control = L.Routing.control({
        waypoints: [
            L.latLng(latitud, longitud),
            L.latLng(41.473361, 2.084071)
        ],
        language: 'es',
        createMarker: function(i, wp, nWps) {
            switch(i){
                case 0:
                    return L.marker(wp.latLng, {icon: iconInicio, draggable: true}).bindPopup("Usted esta aquí");
                case nWps -1:
                    return L.marker(wp.latLng, {icon: iconFinal, draggable: true}).bindPopup(`<b>Freya's Sanctuary</b><br>
                        📍 Dirección: Plaça d'Octavià, 7, Sant Cugat 08892, España.<br>
                        📧 Email: info@freyjasanctuary.com.<br>
                        📞 Teléfono: +34 123 456 789.`);
                default:
                    return L.marker(wp.latLng, {icon: iconAlterna, draggable: true}).bindPopup("Descanso");
            
            }
        }
    }).addTo(map);
}

function error(err){
    let map = L.map('map',{
        center: [41.473361, 2.084071],
        zoom: 16
    }) 
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Freyas sanctuary</a> contributors'
    }).addTo(map);
    
    // Crear iconos para función error también
    let iconFinal = L.icon({
        iconUrl: '../imagenes/leaf-red.png',
        shadowUrl: '../imagenes/leaf-shadow.png',
        iconSize: [38, 95], 
        shadowSize: [50, 64], 
        iconAnchor: [22, 94], 
        shadowAnchor: [4, 62],  
        popupAnchor: [-3, -76] 
    });
    
    // Marcador para cuando falla la geolocalización
    const popupContent = 
        `<b>Freya's Sanctuary</b><br>
        📍 Dirección: Plaça d'Octavià, 7, Sant Cugat 08892, España.<br>
        📧 Email: info@freyjasanctuary.com.<br>
        📞 Teléfono: +34 123 456 789.`;
        
    L.marker([41.473361, 2.084071], { icon: iconFinal })
        .addTo(map)
        .bindPopup(popupContent)
        .openPopup();
}
   