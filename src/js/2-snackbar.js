// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const delay = document.getElementById('delayInput').value;
    const option = document.querySelector('input[name="option"]:checked').value;

    const promise = new Promise((resolve, reject) => {
        if (option === 'fulfilled') {
            setTimeout(() => resolve(delay), delay);
        } else {
            setTimeout(() => reject(delay), delay);
        }
    });

    promise.then(
        (result) => {
            // Виводить повідомлення за допомогою iziToast
            iziToast.success({
                title: 'Fulfilled Promise',
                message: `✅ Fulfilled promise in ${result}ms`,
                position: 'topRight',
            });
        },
        (reason) => {
            // Виводить повідомлення за допомогою iziToast
            iziToast.error({
                title: 'Rejected Promise',
                message: `❌ Rejected promise in ${reason}ms`,
                position: 'topRight',
            });
        }
    );
});