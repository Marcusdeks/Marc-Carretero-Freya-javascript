// ------------------------------------------------------------
// Carga de noticias desde js/noticias.json
// ------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    const lista = document.getElementById('listaNoticias');
    if (!lista) return; // La sección solo existe en la portada

    const contenedores = [
        document.getElementById('noticia1'),
        document.getElementById('noticia2')
    ];

    fetch('js/noticias.json')
        .then(response => response.json())
        .then(data => {
            contenedores.forEach((contenedor, i) => {
                if (!contenedor || !data[i]) return;
                const noticia = data[i];
                contenedor.innerHTML =
                    `<small>${formatearFecha(noticia.fecha)}</small>
                     <h4>${noticia.titulo}</h4>
                     <p>${noticia.descripcion}</p>`;
            });
        })
        .catch(error => {
            console.error('No se han podido cargar las noticias:', error);
            lista.innerHTML = '<p>Las noticias no están disponibles en este momento.</p>';
        });
});

// Convierte "2025-10-13" en "13 de octubre de 2025"
function formatearFecha(fecha) {
    const d = new Date(fecha);
    if (isNaN(d)) return fecha;
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}
