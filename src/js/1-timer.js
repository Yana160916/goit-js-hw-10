let userSelectedDate;

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


function updateTimerDisplay(time) {
  const timerElement = document.getElementById('timer');
  timerElement.textContent = `${addLeadingZero(time.days)}:${addLeadingZero(time.hours)}:${addLeadingZero(time.minutes)}:${addLeadingZero(time.seconds)}`;
}

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function startTimer() {
  const startBtn = document.getElementById('startBtn');
  const datepicker = document.getElementById('datepicker');
  const selectedDate = new Date(userSelectedDate).getTime();
  const currentDate = new Date().getTime();

  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startBtn.disabled = true;
    return;
  }

  startBtn.disabled = true;
  datepicker.disabled = true;

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const remainingTime = selectedDate - now;

    if (remainingTime <= 0) {
      clearInterval(interval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startBtn.disabled = false;
      datepicker.disabled = false;
    } else {
      const timeObject = convertMs(remainingTime);
      updateTimerDisplay(timeObject);
    }
  }, 1000);
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);
