// Cargar noticias automáticamente
document.addEventListener('DOMContentLoaded', function() {
    fetch('js/noticias.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('noticia1').innerHTML = `<h4>${data[0].titulo}</h4><p>${data[0].descripcion}</p><small>${data[0].fecha}</small>`;
            document.getElementById('noticia2').innerHTML = `<h4>${data[1].titulo}</h4><p>${data[1].descripcion}</p><small>${data[1].fecha}</small>`;
        })
        .catch(error => console.error('Error:', error));
});

