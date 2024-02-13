import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const delayInput = document.querySelector('input[name="delay"]');
        const stateInputs = document.querySelectorAll('input[name="state"]');
        
        const delay = parseInt(delayInput.value);

        const selectedStateInput = Array.from(stateInputs).find(input => input.checked);

        if (selectedStateInput) {
            const state = selectedStateInput.value;

            const promise = new Promise((resolve, reject) => {
                if (state === 'fulfilled') {
                    setTimeout(() => resolve(delay), delay);
                } else {
                    setTimeout(() => reject(delay), delay);
                }
            });

            promise.then((result) => {
                iziToast.success({
                    title: 'Success',
                    message: `✅ Fulfilled promise in ${result}ms`
                });
            }).catch((result) => {
                iziToast.error({
                    title: 'Error',
                    message: `❌ Rejected promise in ${result}ms`
                });
            });
        }
    });
});