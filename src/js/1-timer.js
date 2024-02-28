// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
// Додатковий імпорт стилів для помилки
import iconError from '../img/x-octagon.svg';


const datetimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
const value = document.querySelectorAll('.value');

let userInputDate;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < options.defaultDate) {
      iziToast.error({
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: "Please choose a date in the future",
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#B51B1B',
        theme: 'dark',
        icon: icon,
        iconUrl: iconError,
        position: 'topRight',
      });
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      userInputDate = selectedDates.getTime();
    }
  },
};















// flatpickr(selector, options);

// function addLeadingZero(value) {
//   return value.padStart(2, '0');
// }

// btnStart.addEventListener('click', () => {
//   selector.disabled = true;
//   btnStart.disabled = true;
//   function timer() {
//     const time = Date.parse(userSelectedDate) - Date.parse(new Date());
//     const days = convertMs(time).days;
//     const hours = convertMs(time).hours;
//     const minutes = convertMs(time).minutes;
//     const seconds = convertMs(time).seconds;
//     if (time <= 0) {
//       clearInterval(intervalId);
//       selector.disabled = false;
//     }
//     value[0].textContent = addLeadingZero(days.toString());
//     value[1].textContent = addLeadingZero(hours.toString());
//     value[2].textContent = addLeadingZero(minutes.toString());
//     value[3].textContent = addLeadingZero(seconds.toString());
//   }
//   const intervalId = setInterval(timer, 1000);
// });













// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }


















flatpickr(datetimePicker, options);

btnStart.addEventListener('click', handleStartButtonClick);

function handleStartButtonClick() {
  if (userInputDate > Date.now()) {
    const timerCalc = () => {
      updateData(
        [dataDays, dataHours, dataMinutes, dataSeconds],
        convertMs(userInputDate - Date.now())
      );
      if (
        userInputDate - 1000 < Date.now() &&
        dataSeconds.textContent === '00'
      )
        clearInterval(interval);
    };
    timerCalc();
    const interval = setInterval(timerCalc, 1000);
    btnStart.disabled = true;
    datetimePicker.disabled = true;
    // btnStart.dataset.start = 'started';
  } else {
    iziToast.show({
      message: 'Please choose a date in the future',
      backgroundColor: 'rgb(236, 56, 56)',
      messageColor: '#FFF',
      position: 'topCenter',
    });
    btnStart.disabled = true;
  }
};

const addLeadingZero = (output, time) => {
  output.textContent = time.toString().padStart(2, '0');
};
const updateData = (
  [dataDays, dataHours, dataMinutes, dataSeconds],
  { days, hours, minutes, seconds }
) => {
  addLeadingZero(dataDays, days);
  addLeadingZero(dataHours, hours);
  addLeadingZero(dataMinutes, minutes);
  addLeadingZero(dataSeconds, seconds);
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



// 1. Завдання вирішено правильно

// Добре виконані моменти:

// Гарно організовані імпорти для flatpickr та izitoast, зокрема відповідних CSS-файлів, у відповідності з інструкціями завдання.
// Відповідне використання сучасних JavaScript-селекторів для вибору елементів DOM.
// Використання деструктуризації об'єкта для вилучення значень у функції updateData підтримує читабельність коду.
// Функція addLeadingZero є актураною реалізацією для форматування значень таймера, тут правильно застосовано padStart.
// Функція convertMs реалізована вірно, ідеально узгоджується з вимогами завдання.
// Покращення:

// У змінної datatimePicker опечатка; має бути datetimePicker.
// Додавання кольору фону безпосередньо в виклику iziToast.show() не є необхідним, оскільки бібліотека iziToast уже має стандартний
// стиль помилки, який може бути використаний, викликавши iziToast.error().
// Конвенцію іменування handlerBtnStart можна покращити для читабельності, можливо, на щось на зразок handleStartButtonClick.
// Використання властивості dataset (btnStart.dataset.start) є непотрібним і не вносить вклад у виконання завдання.
// Управління станом має бути внутрішнім для ваших JavaScript - функцій, а не використовувати data - атрибути.
// Конфігурація iziToast для вибору минулої дати має бути узгодженою з відображеною помилкою; або використовуйте iziToast.error(),
// або забезпечте узгоджену візуальну відповідь, використовуючи iziToast.show() зі стилем помилок для обох випадків,
// коли помилка передається користувачеві.
// Існує неузгодженість із використанням iziToast.show() у методах onClose та handlerBtnStart; буде краще, якщо конфігурація буде
// узгодженою по всьому коду.
// Слід розглянути можливість відключення обирача дати одразу після початку зворотного відліку, щоб уникнути плутанини або
// необхідності перезавантаження сторінки для вибору нової дати, як зазначено у вимогах завдання.
// Підсумки, як тільки критичні помилки будуть усунуті, особливо забезпечуючи правильне використання об'єктів Date та їх порівняння,
// функціональність стане більш точно узгодженою з вимогами завдання.Також важливо підтримувати узгодженість у зворотному зв'язку UI
// та чітких конвенціях іменування для кращої читабельності та користування скриптом.