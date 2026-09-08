// ============================================================
//  CARRITO DE COMPRAS
// ============================================================
var carrito = [];

// ============================================================
//  FUNCIÓN PARA COMPRAR/ELIMINAR PRODUCTO
// ============================================================
function comprarProducto(boton) {
    var productoCard = boton.closest('.producto-card');
    if (!productoCard) return;
    
    var nombre = productoCard.querySelector('.card-title').textContent;
    var precioTexto = productoCard.querySelector('.precio').textContent;
    var precio = parseInt(precioTexto.replace(/[^0-9]/g, ''));

    var index = carrito.findIndex(function(item) {
        return item.nombre === nombre;
    });

    if (index !== -1) {
        carrito.splice(index, 1);
        boton.textContent = 'Comprar';
        boton.style.backgroundColor = '#EF6C00';
        boton.style.color = 'white';
        alert('Producto removido del carrito 🗑️');
    } else {
        carrito.push({ nombre: nombre, precio: precio });
        boton.textContent = 'Comprado ✓';
        boton.style.backgroundColor = '#28a745';
        boton.style.color = 'white';
        alert('¡Producto agregado al carrito! 🛒');
    }

    actualizarContador();
}

// ============================================================
//  FUNCIÓN PARA ACTUALIZAR CONTADOR DEL CARRITO
// ============================================================
function actualizarContador() {
    var contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

// ============================================================
//  FUNCIÓN PARA VER EL CARRITO
// ============================================================
function verCarrito() {
    var lista = document.getElementById('lista-carrito');
    var totalSpan = document.getElementById('total-carrito');

    if (carrito.length === 0) {
        lista.innerHTML = '<p class="text-center text-muted">No hay productos en el carrito.</p>';
        totalSpan.textContent = '$0';
    } else {
        var html = '<ul class="list-group">';
        var total = 0;

        for (var i = 0; i < carrito.length; i++) {
            var item = carrito[i];
            total += item.precio;
            html += '<li class="list-group-item d-flex justify-content-between align-items-center">';
            html += item.nombre + ' - <strong>$' + item.precio.toLocaleString() + '</strong>';
            html += '<button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito(' + i + ')">';
            html += '<i class="bi bi-trash"></i> Eliminar</button>';
            html += '</li>';
        }

        html += '</ul>';
        lista.innerHTML = html;
        totalSpan.textContent = '$' + total.toLocaleString();
    }

    var modalElement = document.getElementById('modalCarrito');
    var modal = bootstrap.Modal.getInstance(modalElement);
    
    if (modal) {
        modal.show();
    } else {
        var newModal = new bootstrap.Modal(modalElement);
        newModal.show();
    }
}

// ============================================================
//  FUNCIÓN PARA ELIMINAR PRODUCTO DEL CARRITO
// ============================================================
function eliminarDelCarrito(index) {
    var productoEliminado = carrito[index];
    carrito.splice(index, 1);

    var botones = document.querySelectorAll('.btn-comprar');
    for (var i = 0; i < botones.length; i++) {
        var card = botones[i].closest('.producto-card');
        if (card) {
            var nombre = card.querySelector('.card-title').textContent;
            if (nombre === productoEliminado.nombre) {
                botones[i].textContent = 'Comprar';
                botones[i].style.backgroundColor = '#EF6C00';
                botones[i].style.color = 'white';
                break;
            }
        }
    }

    actualizarContador();

    var modal = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    if (modal) {
        modal.hide();
    }

    setTimeout(function() {
        verCarrito();
    }, 200);
}

// ============================================================
//  FUNCIÓN PARA FINALIZAR COMPRA
// ============================================================
function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }

    alert('¡Compra finalizada! 🎉\nTotal: $' + total.toLocaleString() + '\nGracias por tu compra.');

    carrito = [];

    var botones = document.querySelectorAll('.btn-comprar');
    for (var j = 0; j < botones.length; j++) {
        botones[j].textContent = 'Comprar';
        botones[j].style.backgroundColor = '#EF6C00';
        botones[j].style.color = 'white';
    }

    actualizarContador();

    var modal = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    if (modal) {
        modal.hide();
    }
}

// ============================================================
//  FUNCIÓN PARA LIMPIAR FORMULARIO
// ============================================================
function resetearFormulario(formId) {
    var formulario = document.getElementById(formId);
    if (!formulario) return;
    
    var campos = formulario.querySelectorAll('input, select, textarea');

    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i];
        if (campo.type !== 'button' && campo.type !== 'submit') {
            campo.value = "";
            campo.style.borderColor = '';
        }
    }

    var resultado = document.getElementById('resultado-validacion');
    if (resultado) {
        resultado.innerHTML = '';
        resultado.className = '';
        resultado.style.display = 'none';
    }
}

// ============================================================
//  FUNCIÓN PARA VALIDAR FORMULARIO
// ============================================================
function validarFormulario(formId) {
    var formulario = document.getElementById(formId);
    
    var nombre = document.getElementById('nombre').value.trim();
    var email = document.getElementById('email').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var asunto = document.getElementById('asunto').value;
    var mensaje = document.getElementById('mensaje').value.trim();
    
    var errores = [];
    
    if (nombre === '') {
        errores.push('El nombre completo es obligatorio.');
        document.getElementById('nombre').style.borderColor = '#dc3545';
    } else {
        document.getElementById('nombre').style.borderColor = '';
    }
    
    if (email === '') {
        errores.push('El correo electrónico es obligatorio.');
        document.getElementById('email').style.borderColor = '#dc3545';
    } else if (!email.includes('@') || !email.includes('.')) {
        errores.push('Ingresa un correo electrónico válido (ej: correo@dominio.com).');
        document.getElementById('email').style.borderColor = '#dc3545';
    } else {
        document.getElementById('email').style.borderColor = '';
    }
    
    if (telefono === '') {
        errores.push('El teléfono de contacto es obligatorio.');
        document.getElementById('telefono').style.borderColor = '#dc3545';
    } else {
        document.getElementById('telefono').style.borderColor = '';
    }
    
    if (asunto === '') {
        errores.push('Debes seleccionar un motivo.');
        document.getElementById('asunto').style.borderColor = '#dc3545';
    } else {
        document.getElementById('asunto').style.borderColor = '';
    }
    
    if (mensaje === '') {
        errores.push('El mensaje o comentario es obligatorio.');
        document.getElementById('mensaje').style.borderColor = '#dc3545';
    } else {
        document.getElementById('mensaje').style.borderColor = '';
    }
    
    var resultado = document.getElementById('resultado-validacion');
    
    if (errores.length > 0) {
        var html = '<div class="alert-error">';
        html += '<strong>⚠️ Por favor, corrige los siguientes errores:</strong><ul>';
        for (var i = 0; i < errores.length; i++) {
            html += '<li>' + errores[i] + '</li>';
        }
        html += '</ul></div>';
        resultado.innerHTML = html;
        resultado.style.display = 'block';
    } else {
        resultado.innerHTML = '<div class="alert-success">✅ ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>';
        resultado.style.display = 'block';
        
        setTimeout(function() {
            resetearFormulario(formId);
            resultado.innerHTML = '';
            resultado.style.display = 'none';
        }, 3000);
    }

    document.addEventListener('DOMContentLoaded', function() {
    var formRegistro = document.getElementById('registroForm');

    // Verificamos que el formulario exista en la página actual antes de aplicar la lógica
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(event) {
            var isValid = true;
            
            // 1. Validar Nombre (Max 50 caracteres)
            var nombre = document.getElementById('nombre').value;
            if (nombre.length > 50) {
                document.getElementById('error-nombre').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-nombre').style.display = 'none';
            }

            // 2. Validar Dominio de Correo
            var correo = document.getElementById('correo').value;
            var dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
            var correoValido = dominiosPermitidos.some(function(dominio) {
                return correo.endsWith(dominio);
            });
            
            if (!correoValido) {
                document.getElementById('error-correo').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-correo').style.display = 'none';
            }

            // 3. Validar coincidencia de correos
            var confirmarCorreo = document.getElementById('confirmar-correo').value;
            if (correo !== confirmarCorreo) {
                document.getElementById('error-correo-match').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-correo-match').style.display = 'none';
            }

            // 4. Validar coincidencia de contraseñas
            var password = document.getElementById('password').value;
            var confirmarPassword = document.getElementById('confirmar-password').value;
            if (password !== confirmarPassword) {
                document.getElementById('error-password-match').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-password-match').style.display = 'none';
            }

            // 5. Ejecutar acción final
            if (!isValid) {
                event.preventDefault(); // Detiene el envío si hay errores
            } else {
                event.preventDefault(); // Evita que la página se recargue para la demostración
                alert('Cuenta registrada exitosamente.');
                // formRegistro.submit(); // Descomenta esta línea cuando lo conectes a un backend real
            }
        });
    }
});

// ============================================================
//  VALIDACIÓN DE REGISTRO DE USUARIO (PANEL ADMINISTRADOR)
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    var adminRegistroForm = document.getElementById('adminRegistroForm');

    if (adminRegistroForm) {
        adminRegistroForm.addEventListener('submit', function(event) {
            var isValid = true;
            
            // 1. Validar Nombre (Max 50 caracteres)
            var nombre = document.getElementById('admin-nombre').value;
            if (nombre.length > 50) {
                document.getElementById('error-admin-nombre').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-admin-nombre').style.display = 'none';
            }

            // 2. Validar Dominio de Correo
            var correo = document.getElementById('admin-correo').value;
            var dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
            var correoValido = dominiosPermitidos.some(function(dominio) {
                return correo.endsWith(dominio);
            });
            
            if (!correoValido) {
                document.getElementById('error-admin-correo').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-admin-correo').style.display = 'none';
            }

            // 3. Ejecutar acción final
            if (!isValid) {
                event.preventDefault(); // Detiene el envío si hay errores
            } else {
                event.preventDefault(); // Evita recarga para la demostración
                alert('Usuario creado exitosamente desde el panel de administración.');
                // adminRegistroForm.submit(); // Descomentar al integrar base de datos
            }
        });
    }
});


}