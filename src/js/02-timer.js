import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const dateTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      handleDateSelection(selectedDates);
    },
  };

let timerId = null;

startBtn.disabled = true;

flatpickr(dateTime, options);

function handleDateSelection(selectedDates) {
    if(selectedDates[0] < new Date()) {
        startBtn.disabled = true;
        iziToast.show({
            title: 'Error',
            message: 'Please choose a date in the future',
            color: 'red',
            position: 'topRight'
        })
    } else {
        startBtn.disabled = false;
    }
}

startBtn.addEventListener('click', handleStartClick);

function handleStartClick() {
    startBtn.disabled = true;
    dateTime.disabled = true;

    timerId = setInterval(() => {
        const currentDate = new Date(dateTime.value);
        const timeDifference = currentDate - Date.now();
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);

        if (timeDifference < 1000) {
            clearInterval(timerId);
            dateTime.disabled = false;
            startBtn.disabled = true;
        }


    }, 1000);

};

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };

  function addLeadingZero(value) {
    return `${value}`.toString().padStart(2, '0');
  };
  


