// ------------   PRESUPUESTO   ------------
function calcularTotal() {
    let total = 0;

    // PRODUCTO:
    const productoSelect = document.getElementById('producto');
    if (productoSelect && productoSelect.value) {
        total += parseFloat(productoSelect.value);
    } else {
        const productoRadio = document.querySelector('input[name="tamaños"]:checked');
        if (productoRadio) total += parseFloat(productoRadio.value);
    }

    // EXTRAS
    const extras = document.querySelectorAll('input[name="extras"]:checked');
    extras.forEach(ch => {
        total += parseFloat(ch.value);
    });

    // PLAZO
    const plazoNumeroEl = document.getElementById('plazoNumero');
    const unidadEl = document.getElementById('unidad');
    let descuento = 0;
    if (plazoNumeroEl) {
        const n = parseInt(plazoNumeroEl.value || '0', 10);
        const unidad = unidadEl ? unidadEl.value : 'meses';
        if (unidad === 'dias') {
            // Reglas de días
            if (n === 3) descuento = -5; // recargo
            else if (n >= 4 && n <= 7) descuento = 0;
            else if (n >= 8 && n <= 10) descuento = 5; // descuento
            else descuento = 0;
        } else {
            // Reglas de meses ( a más meses, más descuento)
            if (n <= 1) descuento = 0;
            else if (n <= 3) descuento = 5;
            else if (n <= 6) descuento = 10;
            else descuento = 15;
        }
    }

    // Aplicar descuento porcentual al total
    const totalConDescuento = total * (1 - descuento / 100);

    // Mostrar presupuesto final
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = totalConDescuento.toFixed(2) + '€';
    }
}

// Calcular total al cargar la página y configurar eventos
document.addEventListener('DOMContentLoaded', function () {
    window.calcularTotal = calcularTotal; // para eventos inline
    calcularTotal();

    document.addEventListener('change', function (e) {
        if (
            e.target.id === 'producto' ||
            e.target.name === 'tamaños' ||
            e.target.name === 'extras' ||
            e.target.id === 'plazoNumero' ||
            e.target.id === 'unidad'
        ) {
            calcularTotal();
        }
    });

    document.addEventListener('input', function (e) {
        if (e.target.id === 'plazoNumero') calcularTotal();
    });

    //RESET
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('reset', function () {
            // Espera a que el reset aplique valores iniciales
            setTimeout(calcularTotal, 0);
        });
    }
});

// FORMULARIO validacion
function validarFormulario(event) {
    const nombre = document.getElementById('nmbr').value;
    const apellidos = document.getElementById('ape').value;
    const telefono = document.getElementById('tlf').value;
    const email = document.getElementById('email').value;

    // Validar selección de producto (obligatorio)
    const productoSelectEl = document.getElementById('producto');
    const productoRadioEl = document.querySelector('input[name="tamaños"]:checked');
    const hayProducto = (productoSelectEl && productoSelectEl.value) || productoRadioEl;
    if (!hayProducto) {
        event.preventDefault();
        alert('debes elegir al menos un producto');
        return false;
    }

    // Validar nombre
    if (!validarNombre(nombre)) {
        event.preventDefault();
        alert('El nombre solo puede contener letras y máximo 15 caracteres');
        return false;
    }
    // Validar apellidos
    if (!validarApellidos(apellidos)) {
        event.preventDefault();
        alert('Los apellidos solo pueden contener letras y máximo 40 caracteres');
        return false;
    }
    // Validar teléfono
    if (!validarTelefono(telefono)) {
        event.preventDefault();
        alert('El teléfono ha de contener 9 dígitos');
        return false;
    }
    // Validar email
    if (!validarEmail(email)) {
        event.preventDefault();
        alert('El correo electrónico no tiene un formato válido');
        return false;
    }

    const condiciones = document.getElementById('condiciones');
    if (!condiciones || !condiciones.checked) {
        event.preventDefault();
        alert('Debes aceptar las condiciones de privacidad.');
        return false;
    }
    alert('Sus datos han sido procesados correctamente.');
}

//---------------VALIDACIONES------------------
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return nombre.length > 0 && nombre.length <= 15 && regex.test(nombre);
}

function validarApellidos(apellidos) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    return apellidos.length > 0 && apellidos.length <= 40 && regex.test(apellidos);
}

function validarTelefono(telefono) {
    const regex = /^[0-9]+$/;
    return telefono.length === 9 && regex.test(telefono);
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9_]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

//-----------------------------------