import Throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
let formData = {};
const STORAGE_KEY = 'feedback-form-state';

const handleInputData = ({ target }) => {
  formData[target.name] = target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

if (localStorage.getItem(STORAGE_KEY)) {
  try {
    formData = JSON.parse(localStorage.getItem(STORAGE_KEY));
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
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
  formData = {};
};

form.addEventListener('input', Throttle(handleInputData, 500));
form.addEventListener('submit', handleFormSubmit);
