(function () {
    'use strict';

    var form = document.getElementById('contact-form');

    if (!form) {
        return;
    }

    var status = form.querySelector('.form-status');
    var submitButton = form.querySelector('button[type="submit"]');
    var defaultButtonText = submitButton ? submitButton.textContent : 'Send';

    function showStatus(message, type) {
        if (!status) {
            return;
        }

        status.textContent = message;
        status.className = 'form-status ' + (type || '');
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        if (form.action.indexOf('/YOUR_FORM_ID') !== -1) {
            showStatus('The contact form is not configured yet. Please add your Formspree form ID.', 'error');
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        showStatus('Sending your message...', 'pending');

        try {
            var response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    Accept: 'application/json'
                }
            });

            var result = {};
            try {
                result = await response.json();
            } catch (parseError) {
                result = {};
            }

            if (!response.ok) {
                var errorMessage = 'Sorry, your message could not be sent. Please try again later.';

                if (result.errors && result.errors.length) {
                    errorMessage = result.errors.map(function (error) {
                        return error.message;
                    }).join(' ');
                }

                throw new Error(errorMessage);
            }

            form.reset();
            showStatus('Thank you! Your message has been sent successfully.', 'success');
        } catch (error) {
            showStatus(
                error.message || 'A network error occurred. Please try again later.',
                'error'
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = defaultButtonText;
            }
        }
    });
}());
