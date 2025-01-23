/**
 * Variables
 */
const emailForm = document.querySelector('#emailForm');
const btnSend = document.querySelector('#enviar');
const btnSubmit = document.querySelector('#emailForm button[type="submit"]');
const btnReset = document.querySelector('#resetBtn');
const inputEmail = document.querySelector('#email');
const inputSubject = document.querySelector('#asunto');
const inputMessage = document.querySelector('#mensaje');
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const spinner = document.querySelector('#spinner');

const email = { email: '', subject: '', message: '' };

/**
 * Adds event listeners to the form elements.
 */
function eventListeners() {
    // When the app starts
    document.addEventListener('DOMContentLoaded', initApp);
    // Input fields
    inputEmail.addEventListener('input', validateForm);
    inputSubject.addEventListener('input', validateForm);
    inputMessage.addEventListener('input', validateForm);
    // Reset button
    btnReset.addEventListener('click', resetForm);
    // Form submission
    emailForm.addEventListener('submit', handleEmailSubmission);
}

eventListeners();

/**
 * Initializes the app by disabling the send button.
 */
function initApp() {
    disableSendButton();
}

/**
 * Validates the form fields.
 * @param {Event} event - The input event.
 */
function validateForm(event) {
    const field = event.target;
    const hasValue = field.value.trim().length > 0;

    if (!hasValue) {
        showAlert(`${field.id} field is required`, field.parentElement);
        email[field.name] = '';
        updateSendButtonState();
        return;
    }
    if (field.id === 'email' && !isValidEmail(field)) {
        showAlert(`Email ${field.value} is not valid`, field.parentElement);
        email[field.name] = '';
        updateSendButtonState();
        return;
    }
    cleanAlert(field.parentElement);
    email[field.name] = field.value.trim().toLocaleLowerCase();
    updateSendButtonState();
}

/**
 * Checks if the email is valid.
 * @param {HTMLElement} field - The email input field.
 * @returns {boolean} - True if the email is valid, false otherwise.
 */
function isValidEmail(field) {
    return emailRegex.test(field.value.trim());
}

/**
 * Displays an alert message.
 * @param {string} message - The alert message.
 * @param {HTMLElement} reference - The reference element to append the alert to.
 */
function showAlert(message, reference) {
    cleanAlert(reference);
    const error = createErrorElement(message);
    reference.appendChild(error);
}

/**
 * Creates an error element.
 * @param {string} message - The error message.
 * @returns {HTMLElement} - The error element.
 */
function createErrorElement(message) {
    const error = document.createElement('p');
    error.textContent = message;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
    return error;
}

/**
 * Cleans the alert message.
 * @param {HTMLElement} reference - The reference element to clean the alert from.
 */
function cleanAlert(reference) {
    const alert = reference.querySelector('.bg-red-600');
    if (alert) alert.remove();
}

/**
 * Disables the send button.
 */
function disableSendButton() {
    btnSend.disabled = true;
    btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

/**
 * Handles the email submission.
 * @param {Event} event - The submit event.
 */
function handleEmailSubmission(event) {
    event.preventDefault();
    spinner.style.display = 'flex';
    setTimeout(() => {
        spinner.style.display = 'none';
        showSuccessMessage();
        setTimeout(() => {
            clearSuccessMessage();
            resetForm();
        }, 3500);
    }, 3000);
}

/**
 * Displays a success message.
 */
function showSuccessMessage() {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'The email was sent successfully';
    paragraph.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
    emailForm.insertBefore(paragraph, document.querySelector('#spinner'));
}

/**
 * Clears the success message.
 */
function clearSuccessMessage() {
    const paragraph = emailForm.querySelector('.bg-green-500');
    if (paragraph) paragraph.remove();
}

/**
 * Updates the state of the send button.
 */
function updateSendButtonState() {
    const isFormEmpty = Object.values(email).includes('');
    btnSubmit.classList.toggle('opacity-50', isFormEmpty);
    btnSubmit.disabled = isFormEmpty;
}

/**
 * Resets the form.
 * @param {Event} [event] - The reset event.
 */
function resetForm(event) {
    if (event) event.preventDefault();
    Object.keys(email).forEach(key => email[key] = '');
    emailForm.reset();
    updateSendButtonState();
}
