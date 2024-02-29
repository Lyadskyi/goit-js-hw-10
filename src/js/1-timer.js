import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";
// Додатковий імпорт стилів для помилки
import iconError from '../img/x-octagon.svg';

const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

const datetimePicker = document.querySelector('#datetime-picker');

let userSelectedDate;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < options.defaultDate) {
      btnStart.disabled = true;
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
        iconUrl: iconError,
        position: 'topRight',
      });
    } else {
      btnStart.disabled = false;
      userSelectedDate = selectedDates.getTime();
    }
  },
};

flatpickr(datetimePicker, options);

btnStart.addEventListener('click', handleStartButtonClick);

function handleStartButtonClick() {
  if (userSelectedDate > Date.now()) {
    const timerCalc = () => {
      outputsUpdate(
        [dataDays, dataHours, dataMinutes, dataSeconds],
        convertMs(userSelectedDate - Date.now())
      );
      if (
        userSelectedDate - 1000 < Date.now() &&
        dataSeconds.textContent === '00'
      )
        clearInterval(interval);
    };
    timerCalc();
    const interval = setInterval(timerCalc, 1000);
    btnStart.disabled = true;
    datetimePicker.disabled = true;
    btnStart.dataset.start = 'started';
  } else {
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
        iconUrl: iconError,
        position: 'topRight',
    });
    btnStart.disabled = true;
  }
};

const outputUpdate = (output, time) => {
  output.textContent = time.toString().padStart(2, '0');
};
const outputsUpdate = (
  [dataDays, dataHours, dataMinutes, dataSeconds],
  { days, hours, minutes, seconds }
) => {
  outputUpdate(dataDays, days);
  outputUpdate(dataHours, hours);
  outputUpdate(dataMinutes, minutes);
  outputUpdate(dataSeconds, seconds);
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
console.log(convertMs(24140000)); // {days: 0, hours

// ---------- REMARKS OF THE MENTOR ---------- //

// ✅ 1. Завдання вирішено правильно

// Завдання #1 вирішено неправильно

// Well executed moments/Добре виконані моменти //

// Гарна назва змінних: назви змінних, як-от btnStart, dataDays, dataHours тощо, чітко описують, що вони представляють,
// що робить код читабельним.

// Добре форматований код: код гарно відформатований, що робить його легшим для читання та розуміння.
// Відступи та проміжки є послідовними і правильно застосованими.

// Використання padStart у функції outputUpdate для форматування чисел: це гарантує, що всі числа відображаються з двома цифрами,
// що є вимогою завдання.

// Improvement/Поліпшення //

// Змінна userSelectedDate повинна зберігати об'єкт дати, а не час у мілісекундах з часу UNIX епохи.
// Це відповідає очікуванням від обробника onClose, де selectedDates - є об'єктом дати.

// У функції onClose всередині об'єкту опцій неправильно використовується [selectedDates]. Оскільки selectedDates є масивом,
// вибрану дату слід отримати за допомогою selectedDates[0].

// При вимкненні вибору дати та часу використовуйте datetimePicker.flatpickr().close();, щоб закрити будь-які відкриті календарі
// flatpickr та негайно запобігти подальшому вибору дати після старту таймера.

// Critical errors/Критичні помилки //

// Використання selectedDates.getTime() є неправильним. Оскільки selectedDates - це масив, у нього відсутній метод getTime.
// Слід використовувати userSelectedDate = selectedDates[0].getTime();. Це критична логічна помилка, яка спричинить збій скрипта.

// Використання if (userSelectedDate - 1000 < Date.now() && dataSeconds.textContent === '00') для спроби очищення інтервалу може
// не завжди працювати та може призводити до помилки, якщо є затримка або затримка. Його можна безпечно замінити на
// if (userSelectedDate <= Date.now()).

// На основі виявлених критичних помилок, завдання не було прийняте та потребує виправлень. Після виправлення проблем, зокрема,
// поводження з userSelectedDate і логіки очищення інтервалу, завдання буде краще відповідати вимогам, що викладені в інструкціях.
