import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

import iconCheck from '../img/check2-circle.svg';

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
            iziToast.success({
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
      // event.target.reset();
    });
  };

  createPromise(inputState[0].checked, delay)
    .then(value => value)
    .catch(error => error)
  event.target.reset();
});

// ---------- REMARKS OF THE MENTOR ---------- //

// ✅ 2. Завдання вирішено правильно

// Завдання #2 вирішено неправильно

// Critical errors/Критичні помилки //

// Некоректне використання iziToast у розгортанні Promise: ви помилково розмістили сповіщення iziToast у функціях resolve та reject
// промісу. Натомість, виклики iziToast слід розташовувати у методі
// .then() для обробки виконаного промісу та
// .catch () для обробки відхиленого промісу після обробки промісу.
// Це критично важливо, оскільки обробка виконання та відхилення промісу повинна бути відокремлена від створення сповіщень.

// Некоректна обробка відхилення: у поточній реалізації обидва випадки resolve та reject використовують iziToast.error.
// У випадку resolve має правильно застосовуватися iziToast.success для відображення виконаного промісу,
// тоді як iziToast.error має залишатися для випадків відхилення. Це критична логічна помилка, оскільки вона не дозволяє розрізнити
// успішні та невдалі результати промісів.

// Improvement/Поліпшення //

// Неконсистентний скид форми: метод event.target.reset() викликається всередині функції виконання промісу,
// що може створювати проблеми. Ідеально, ця дія має відбуватися після завершення роботи промісу, або у.then(), або у.catch(),
// або у блоку.finally(), який виконується незалежно від результату промісу, для кращого досвіду користувача та передбачуваної
// поведінки форми.

// Імпорт іконок: ви імпортуєте iconCheck та iconError, але властивості iconUrl у викликах iziToast не встановлені коректно.
// Оновіть властивості, щоб правильно використовувати імпортовані іконки.

// Завдання не прийняте. Будь ласка, виправте критичні помилки, перемістивши сповіщення iziToast до їх відповідних обробників
// .then() та.catch() та забезпечте правильне використання iziToast.success та iziToast.error для виконаних та відхилених промісів
// відповідно. Крім того, вдоскональте поведінку скиду форми, перемістивши її в більш підходяще місце в коді для покращення
// функціональності.
