// ------------------------------------------------------------
// Interacciones de interfaz: menú móvil, cabecera y animaciones
// ------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Menú móvil ----------
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('navPrincipal');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            const abierto = menu.classList.toggle('abierto');
            toggle.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });

        // Cierra al pulsar un enlace
        menu.querySelectorAll('a').forEach(enlace => {
            enlace.addEventListener('click', () => {
                menu.classList.remove('abierto');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Cierra con Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && menu.classList.contains('abierto')) {
                menu.classList.remove('abierto');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    // ---------- Cabecera compacta al desplazar ----------
    const cabecera = document.querySelector('.cabecera');

    if (cabecera) {
        const actualizarCabecera = () => {
            cabecera.classList.toggle('compacta', window.scrollY > 24);
        };
        actualizarCabecera();
        window.addEventListener('scroll', actualizarCabecera, { passive: true });
    }

    // ---------- Animaciones de entrada ----------
    const elementos = document.querySelectorAll('.revelar');

    if (!elementos.length) return;

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (sinMovimiento || !('IntersectionObserver' in window)) {
        elementos.forEach(el => el.classList.add('visible'));
        return;
    }

    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            // Escalona los hermanos para un efecto en cascada
            const retraso = Number(entrada.target.dataset.retraso || 0);
            setTimeout(() => entrada.target.classList.add('visible'), retraso);
            obs.unobserve(entrada.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elementos.forEach(el => observador.observe(el));
});
