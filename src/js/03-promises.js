import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;

  if (!isNaN(delay.value) && !isNaN(step.value) && !isNaN(amount.value)) {
    for (let i = 0; i < amount.value; i++) {
      let position = i + 1;
      const delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          iziToast.show({
            title: 'Success',
            message: `✅ Fulfilled promise ${position} in ${delay}ms`,
            position: 'topCenter',
            color: 'green',
          });
        })
        .catch(({ position, delay }) => {
          iziToast.show({
            title: 'Error',
            message: `❌ Rejected promise ${position} in ${delay}ms`,
            position: 'topCenter',
            color: 'red',
          });
        });
    }

    evt.currentTarget.reset(); 
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
