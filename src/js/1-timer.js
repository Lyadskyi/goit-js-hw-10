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
