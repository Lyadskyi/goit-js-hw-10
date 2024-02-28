import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconCheck from '../img/check-circle.svg';
import iconError from '../img/x-octagon.svg';

const form = document.querySelector(".form");
const inputState = form.state;

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = form.delay.value;
  
  const createPromise = (needResolve, delay) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (needResolve) {
          res(
            iziToast.error({
              title: 'OK',
              titleColor: '#fff',
              titleSize: '16px',
              titleLineHeight: '1.5',
              message: `Fulfilled promise in ${delay}ms`,
              messageColor: '#fff',
              messageSize: '16px',
              messageLineHeight: '1.5',
              backgroundColor: '#59a10d',
              theme: 'dark',
              iconColor: 'color: #fff',
              iconUrl: iconCheck,
              position: 'topRight',
            })
          );
        } else {
          rej(
            iziToast.error({
              title: 'Error',
              titleColor: '#fff',
              titleSize: '16px',
              titleLineHeight: '1.5',
              message: `Rejected promise in ${delay}ms`,
              messageColor: '#fff',
              messageSize: '16px',
              messageLineHeight: '1.5',
              backgroundColor: '#B51B1B',
              theme: 'dark',
              iconColor: 'color: #fff',
              iconUrl: iconError,
              position: 'topRight',
            })
          );
        }
      }, delay);
      event.target.reset();
    });
  };

  createPromise(inputState[0].checked, delay)
    .then(value => value)
    .catch(error => error)
});
