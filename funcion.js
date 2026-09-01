function validarFormulario(formId) {
    // Paso 1: Obtener Formulario
    var formulario = document.getElementById(formId);

    // Paso 2: Obtener todos los campos (input, select, textarea)
    var campos = formulario.querySelectorAll('input, select, textarea');

    // Paso 3: Contadores y arreglos para consolidar errores
    var vacios = 0;
    var erroresNegocio = [];

    // Paso 4: Revisar cada campo con el bucle del docente
    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i];

        // Ignorar los botones
        if (campo.type === 'button' || campo.type === 'submit') {
            continue;
        }

        // Si el campo está vacío (Lógica original del Profesor)
        if (campo.value.trim() === '') {
            vacios++;
            campo.style.borderColor = 'red'; // Resaltamos en rojo
        } else {
            campo.style.borderColor = ''; // Quitamos el rojo si tiene texto
            
            // =======================================================
            // REGLAS DE NEGOCIO OBLIGATORIAS (EVALUACIÓN 1 - DUOCUC)
            // =======================================================
            
            // A. Validación estricta del Correo Electrónico
            if (campo.type === 'email' || campo.id === 'email') {
                var correo = campo.value.trim().toLowerCase();
                if (!correo.endsWith('@duoc.cl') && !correo.endsWith('@profesor.duoc.cl') && !correo.endsWith('@gmail.com')) {
                    erroresNegocio.push('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.');
                    campo.style.borderColor = 'red';
                }
            }

            // B. Validación de largo máximo del Comentario/Mensaje (Max 500 caracteres)
            if (campo.id === 'mensaje' || campo.tagName.toLowerCase() === 'textarea') {
                if (campo.value.length > 500) {
                    erroresNegocio.push('El mensaje no puede superar los 500 caracteres.');
                    campo.style.borderColor = 'red';
                }
            }
        }
    } // Fin del bucle for

    // Paso 5: Mostrar resultado utilizando los contenedores y alertas de tu CSS
    var resultado = document.getElementById('resultado-validacion');

    if (vacios > 0 || erroresNegocio.length > 0) {
        // Creamos el mensaje acumulativo de errores
        var mensajeFinal = '';
        
        if (vacios > 0) {
            mensajeFinal += '<strong>Faltan ' + vacios + ' campo(s) obligatorio(s) por rellenar.</strong><br>';
        }
        
        if (erroresNegocio.length > 0) {
            mensajeFinal += '<strong>Errores de validación de negocio:</strong><br>';
            for (var j = 0; j < erroresNegocio.length; j++) {
                mensajeFinal += '- ' + erroresNegocio[j] + '<br>';
            }
        }

        // Aplicamos la clase de error del archivo style.css
        resultado.className = 'alert-error';
        resultado.innerHTML = mensajeFinal;
        resultado.style.display = 'block';
    } else {
        // Formulario completamente válido
        resultado.className = 'alert-success';
        resultado.innerHTML = '<i class="bi bi-check-circle"></i> ¡Formulario validado con éxito! Mensaje listo para enviar.';
        resultado.style.display = 'block';
    }
} // Fin function validarFormulario


function resetearFormulario(formId) {
    // Paso 1: Obtener Formulario
    var formulario = document.getElementById(formId);

    // Paso 2: Obtener todos los campos
    var campos = formulario.querySelectorAll('input, select, textarea');

    // Paso 3: Limpiar cada campo (Lógica original del Profesor)
    for (var i = 0; i < campos.length; i++) {
        var campo = campos[i];

        // Ignorar los botones
        if (campo.type !== 'button' && campo.type !== 'submit') {
            campo.value = "";
            campo.style.borderColor = ''; // Quitar los bordes rojos de error
        }
    }

    // Paso 4: Ocultar y limpiar el cuadro de resultados
    var resultado = document.getElementById('resultado-validacion');
    resultado.innerHTML = '';
    resultado.className = '';
    resultado.style.display = 'none';
} // Fin function resetearFormulario
