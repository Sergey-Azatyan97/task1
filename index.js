const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

let timerId = null;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    if (timerId !== null) {
      clearInterval(timerId); // Сбрасываем таймер
    }
    timerEl.textContent = getTime(seconds);
    
    function interval() {
      if (seconds > 0) {
        seconds--; // Каждый вызов уменьшаем
      }
      timerEl.textContent = getTime(seconds); // Выводим результат
      if (seconds === 0 && timerId !== null) {
        clearInterval(timerId);
      }
    }
    timerId = setInterval(interval, 1000);
  };
};

function addLeadingZero(i) {
  return (i < 10) ? '0' + i : i;
}

function getTime(sec) {
  let min = sec / 60;

  let hour = min / 60;

  let result = `${addLeadingZero(Math.floor(hour % 24))}:${addLeadingZero(Math.floor(min % 60))}:${addLeadingZero(Math.floor(sec % 60))}`;

  return result;
}

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (event) => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const inputValue = event.target.value;
  const numericValue = parseInt(inputValue);

  if (isNaN(numericValue)) {
      event.target.value = '';
  } else {
      event.target.value = numericValue;
  }
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
