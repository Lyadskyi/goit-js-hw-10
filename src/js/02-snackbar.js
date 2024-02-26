// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(".form");
const inputDelay = form.elements.delay;
const inputState = form.elements.state;

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  delayValuePromise(inputDelay.value);
  event.target.reset();
};

function delayValuePromise(delay) {
  if (delay > 0) {
    
    let promise;

  if (inputState.value === 'fulfilled') {
    promise = Promise.resolve(`✅ Fulfilled promise in ${delay}ms`);
  } else {
    promise = Promise.reject(`❌ Rejected promise in ${delay}ms`);
    };
    
  setTimeout(() => {
    promise;
  }, delay);

    promise
      .then(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(82, 223, 79, 0.3)',
          position: 'topRight',
          progressBarColor: 'rgb(60, 179, 113)',
        });
      })
      .catch(value => {
        iziToast.show({
          message: value,
          backgroundColor: 'rgba(223, 79, 79, 0.3)',
          position: 'bottomRight',
          progressBarColor: 'rgb(255, 0, 0)',
        });
      });
  } else {
    iziToast.show({
      message: 'Value must be more than 0',
      backgroundColor: 'light-grey',
      position: 'center',
      progressBarColor: 'rgb(128, 128, 128)',
    });
  };
};
