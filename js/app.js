// :::::::::::::::::::::::::: VARIABLES ::::::::::::::::::::::::::
const btnSend = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const emailForm = document.querySelector('#emailForm');

// variables for btnSendEmail fields
const inputEmail = document.querySelector('#email');
const inputSubject = document.querySelector('#asunto');
const inputMessage = document.querySelector('#mensaje');


// auxiliary variables for the btnSendEmail field errors
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


function eventListeners() {
	const email ={
		email: '',
		subject: '',
		message: ''
	};
	//cuando la app inicia o arranca
	document.addEventListener('DOMContentLoaded', initApp);
	//btnSendEmail fields
	inputEmail.addEventListener('blur', validateForm);
	inputSubject.addEventListener('blur', validateForm);
	inputMessage.addEventListener('blur', validateForm);
	//clean the btnSendEmail
	// btnReset.addEventListener('click', cleanForm);
	// send inputEmail
	// btnSendEmail.addEventListener('submit', sendEmail);
}

eventListeners();

// :::::::::::::::::::::::::: FUNCTIONS ::::::::::::::::::::::::::
function initApp() {
	btnSend.disable = true;
	btnSend.classList.add('cursor-not-allowed', 'opacity-50');
}

function validateForm(event) {

	console.log('email', email);
	const field = event.target;
	console.log('field', field);
	const hasValue = field.value.trim().length > 0;
	/*field.classList.toggle('border-red-500', !hasValue);
	field.classList.toggle('border-green-500', hasValue);*/

	if (!hasValue) {
		const messageError = `${field.id} field is required`;
		showAlert(messageError, field.parentElement);
		return;
	}
	if ( field.id === 'email' && !validateEmail(field)) {
		const messageError = `email ${field.value} is not valid`;
		showAlert(messageError, field.parentElement);
		return;
	}
	cleanAlert(field.parentElement);
	email[ field.name ] = field.value.trim().toLocaleLowerCase();
	console.log('email', email);
}

function validateEmail(field) {
	const isFormValid =  emailRegex.test(field.value.trim());
	console.log('isFormValid', isFormValid);
	return isFormValid;
}

function showAlert(text, reference) {
	cleanAlert(reference);
	const error = createErrorElement(text);
	reference.appendChild(error);
}

function createErrorElement(message) {
	const error = document.createElement('p');
	error.textContent = message;
	error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
	return error;
}

function cleanAlert(reference) {
	const alert = reference.querySelector('.bg-red-600');
	if (alert) {
		alert.remove();
	}
}


function activeSendButton() {
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
