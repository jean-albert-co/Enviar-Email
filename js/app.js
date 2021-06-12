// VARIABLES
const btnSend = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const form = document.querySelector('#enviar-mail');
// variables para los campos del formulario
const email = document.querySelector('#email');
const subject = document.querySelector('#asunto');
const messagge = document.querySelector('#mensaje');
// variable auxiliar para los errores de los campos del formulario
const errorMessage = document.createElement('p');
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



function eventListeners() {
     //cuando la app inicia o arranca
     document.addEventListener('DOMContentLoaded', initApp);
     //campos del formulario
     email.addEventListener('blur', validarFormulario);
     subject.addEventListener('blur', validarFormulario);
     messagge.addEventListener('blur', validarFormulario);
     //limpia el formulario
     btnReset.addEventListener('click', cleanForm);
     // envia email
     form.addEventListener('submit', sendEmail);
}
eventListeners();

// FUNCIONES
function initApp() {
     btnSend.disable = true;
     btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function validarFormulario(event) {

     validateEmptyFields(event);

     if (event.target.type === 'email') {
          validateEmailFields(event);
     }

     if (expresionRegular.test(email.value) && subject.value !== '' && messagge.value !== '') {
          activeSendBotton();
     }

}

function validateEmptyFields(event) {
     if (event.target.value.length > 0) {
          // elimina los errores
          hideErrorMessage();
          event.target.classList.remove('border', 'border-red-500');
          event.target.classList.add('border', 'border-green-500');
     }
     else {
          event.target.classList.remove('border', 'border-green-500');
          event.target.classList.add('border', 'border-red-500');
          createErrorMessage('¡¡¡ All fields are required !!!');
     }
}

function validateEmailFields(event) {
     if (expresionRegular.test(event.target.value)) {
          // elimina los errores
          hideErrorMessage();
          event.target.classList.remove('border', 'border-red-500');
          event.target.classList.add('border', 'border-green-500');
     } else {
          event.target.classList.remove('border', 'border-green-500');
          event.target.classList.add('border', 'border-red-500');
          createErrorMessage('¡¡¡ Email is not valid !!!');
     }
}

function createErrorMessage(text) {
     errorMessage.textContent = text;
     errorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'error');
     showErrorMessage();
}

function showErrorMessage() {
     const errorsClass = document.querySelectorAll('.error');
     if (errorsClass.length === 0) {
          form.insertBefore(errorMessage, document.querySelector('.mb-10'));
     }
}

function hideErrorMessage() {
     const error = document.querySelector('p.error');
     if (error) {
          error.remove();
     }
}

function activeSendBotton() {
     btnSend.disable = false;
     btnSend.classList.remove('cursor-not-allowed', 'opacity-50');
}

function sendEmail(event) {
     event.preventDefault();
     // muestra el spinner
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';
     // oculta el spinner
     setTimeout(() => {
          spinner.style.display = 'none';
          // crea parrafo diciendo que fue enviado exitosamente el mensaje 
          const paragraph = document.createElement('p');
          paragraph.textContent = 'The email was sent successfully';
          paragraph.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
          // inserta el parrafo antes del spinner
          form.insertBefore(paragraph, spinner);
          setTimeout(() => {
               // elimina parrafo diciendo que fue enviado exitosamente el mensaje
               paragraph.remove();
               cleanForm();
          }, 5000);
     }, 3000);
}

function cleanForm() {
     form.reset();
     initApp();
}
