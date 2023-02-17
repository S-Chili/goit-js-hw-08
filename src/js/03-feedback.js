import Throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
let formData = {};
const STORAGE_KEY = 'feedback-form-state';
const STORAGE = localStorage;

const handleInputData = ({ target }) => {
  formData[target.name] = target.value;
  STORAGE.setItem(STORAGE_KEY, JSON.stringify(formData));
};

if (STORAGE.getItem(STORAGE_KEY)) {
  try {
    formData = JSON.parse(STORAGE.getItem(STORAGE_KEY));
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
  for (let data in formData) {
    form.elements[data].value = formData[data];
  }
}
const handleFormSubmit = evt => {
  evt.preventDefault();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  form.reset();
  formData = {};
};

form.addEventListener('input', Throttle(handleInputData, 500));
form.addEventListener('submit', handleFormSubmit);
