// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const datatimePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let userInputDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < options.defaultDate) {
      btnStart.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: 'rgb(100, 149, 237)',
        position: 'center',
        messageColor: '#FFD700',
      });
    } else {
      btnStart.disabled = false;
      userInputDate = selectedDates.getTime();
    }
  },
};

flatpickr(datatimePicker, options);

btnStart.addEventListener('click', handlerBtnStart);

function handlerBtnStart() {
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
    datatimePicker.disabled = true;
    btnStart.dataset.start = 'started';
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
  [daysData, hoursData, minutesData, secondsData],
  { days, hours, minutes, seconds }
) => {
  addLeadingZero(daysData, days);
  addLeadingZero(hoursData, hours);
  addLeadingZero(minutesData, minutes);
  addLeadingZero(secondsData, seconds);
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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
