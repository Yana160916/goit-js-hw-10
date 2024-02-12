import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const targetDate = new Date('2024-12-31T23:59:59');
let userSelectedDate;
let timerInterval;
let startDate; 

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

function updateTimer() {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference > 0) {
        const timeElapsed = currentDate - startDate;
        const { days, hours, minutes, seconds } = convertMs(timeElapsed); 
        const formattedHours = addLeadingZero(hours);
        const formattedMinutes = addLeadingZero(minutes);
        const formattedSeconds = addLeadingZero(seconds);

        const timerDisplay = `${days}д ${formattedHours}г ${formattedMinutes}хв ${formattedSeconds}с`;
        daysDisplay.textContent = days;
        hoursDisplay.textContent = formattedHours;
        minutesDisplay.textContent = formattedMinutes;
        secondsDisplay.textContent = formattedSeconds;

        if (timeElapsed >= timeDifference) {
            clearInterval(timerInterval);
            iziToast.success({
                title: 'Countdown Completed',
                message: 'The countdown has reached the target date.',
                position: 'topRight',
            });
        }
    } else {

    }
}


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function validateDate(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });

        document.getElementById('startButton').disabled = true;
    } else {
        document.getElementById('startButton').disabled = false;
        startDate = new Date();
    }
}

function startCountdown() {
    validateDate([userSelectedDate]);

    if (!document.getElementById('startButton').disabled) {
        console.log("Countdown started!");
        startDate = new Date();
        timerInterval = setInterval(updateTimer, 1000);
        document.getElementById('startButton').disabled = true;
        document.getElementById('datetime-picker').disabled = true;
    }
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
console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose: validateDate,
};

flatpickr("#datetime-picker", options);



