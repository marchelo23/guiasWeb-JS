document.addEventListener('DOMContentLoaded', function() {
    const validators = {
        carnet: {
            regex: /^[A-Z]{2}\d{3}$/,
            error: 'El carnet debe tener 2 letras mayúsculas seguidas de 3 números (ej: AB001)'
        },
        fullName: {
            regex: /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/,
            error: 'El nombre solo debe contener letras y espacios'
        },
        dui: {
            regex: /^\d{8}-\d{1}$/,
            error: 'El DUI debe seguir el formato: 12345678-9'
        },
        nit: {
            regex: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
            error: 'El NIT debe seguir el formato: 1234-123456-123-1'
        },
        birthDate: {
            regex: /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
            error: 'La fecha debe seguir el formato: DD/MM/YYYY'
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            error: 'Ingrese un correo electrónico válido'
        },
        age: {
            regex: /^\d{1,3}$/,
            error: 'La edad debe ser un número entre 1 y 999'
        }
    };

    function validateField(field, value) {
        const validator = validators[field];
        const errorElement = document.getElementById(`${field}Error`);

        if (!value) {
            errorElement.textContent = 'Este campo es requerido';
            return false;
        }

        if (!validator.regex.test(value)) {
            errorElement.textContent = validator.error;
            return false;
        }

        errorElement.textContent = '';
        return true;
    }

    const form = document.getElementById('studentForm');
    const successMessage = document.getElementById('successMessage');
    const fields = ['carnet', 'fullName', 'dui', 'nit', 'birthDate', 'email', 'age'];

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field);
            const fieldValid = validateField(field, input.value);
            if (!fieldValid) isValid = false;
        });

        if (isValid) {
            successMessage.textContent = '¡Formulario enviado exitosamente!';
            form.reset();
            setTimeout(() => {
                successMessage.textContent = '';
            }, 3000);
        }
    });

    // Validación en tiempo real
    fields.forEach(field => {
        const input = document.getElementById(field);
        input.addEventListener('input', () => {
            validateField(field, input.value);
        });
    });
});