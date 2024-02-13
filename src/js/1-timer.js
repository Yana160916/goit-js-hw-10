import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Функція для підрахунку часу в об'єкті {days, hours, minutes, seconds}
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
}

// Функція для додавання ведучого нуля
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

document.addEventListener("DOMContentLoaded", function () {
  let userSelectedDate;

  const datetimePicker = document.getElementById('datetime-picker');
  const startButton = document.querySelector('[data-start]');

  // Конфігурація flatpickr
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];

      if (userSelectedDate < new Date()) {
        iziToast.warning({
          title: 'Warning',
          message: 'Please choose a date in the future'
        });

        startButton.disabled = true;
      } else {
        startButton.disabled = false;
      }
    },
  };

  flatpickr(datetimePicker, options);

  startButton.addEventListener('click', function () {
    if (userSelectedDate) {
      startButton.disabled = true;
      
      const interval = setInterval(function () {
        const currentDate = new Date();
        const timeDifference = userSelectedDate - currentDate;

        if (timeDifference <= 0) {
          clearInterval(interval);
          iziToast.success({
            title: 'Success',
            message: 'Countdown has ended!'
          });
        } else {
          const { days, hours, minutes, seconds } = convertMs(timeDifference);

          document.querySelector('[data-days]').textContent = addLeadingZero(days);
          document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
          document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
          document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
        }
      }, 1000);
    }
  });
});
