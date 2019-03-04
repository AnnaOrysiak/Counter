const doc = document;

const counter = doc.querySelector(".counter");
const btn = doc.getElementById("btn");
const sessionValue = doc.getElementById("session-time");
const breakValue = doc.getElementById("break-time")
const arrows = doc.querySelectorAll("i");
const status = doc.getElementById("counter-status");
const timer = doc.getElementById("timer");

const breakStart = new Audio('sounds/break-start.mp3');
const braekEnd = new Audio('sounds/break-end.mp3');

let minutes = sessionValue.textContent;
let seconds = 0;
let counterOn;
let sessionTime = true;

changeCounterStatus = () => {
  btn.textContent = "";
  let action;
  if (counter.classList.contains("active")) {
    action = counter.classList.contains("paused") ? "ZATRZYMAJ" : "WZNÓW";
    counter.classList.toggle("paused");
  } else {
    counter.classList.add("active");
    action = "ZATRZYMAJ";
  }
  setTimeout(() => {
    btn.textContent = action
  }, 100)
  counterControl();
}

changeTime = (id) => {
  clearInterval(counterOn);
  counter.classList.remove("active", "paused");
  btn.textContent = "START";
  seconds = 0;
  let sValue = sessionValue.textContent;
  let bValue = breakValue.textContent;
  if (id === "session-less" || id === "session-more") {
    id === "session-less" ? sValue-- : sValue++;
  }
  else if (id === "break-less" || id === "break-more") {
    id === "break-less" ? bValue-- : bValue++;
  }
  if (sValue < 1 || bValue < 1) {
    alert("Wybrana wartość musi być większa od 0!");
    sValue > 0 ? bValue++ : sValue++;
  }
  minutes = sValue;
  timer.textContent = `${sValue}:00`;
  sessionValue.textContent = sValue;
  breakValue.textContent = bValue;
}

count = () => {
  if (minutes > 0 || (minutes === 0 && seconds > 0)) {
    if (seconds > 0) {
      seconds--;
    } else {
      minutes--;
      seconds = 59;
    }
  } else {
    sessionTime ? breakStart.play() : braekEnd.play();
    alert(sessionTime ? "Koniec nauki, czas na przerwę!" : "Koniec obijania, pora się pouczyć!");
    sessionTime = !sessionTime;
    minutes = sessionTime ? sessionValue.textContent : breakValue.textContent;
    status.textContent = sessionTime ? "Czas nauki" : "Przerwa";
  }
  timer.textContent = `${minutes}:${seconds >= 10 ? seconds : "0" + seconds}`;
}

counterControl = () => {
  if (!counter.classList.contains("paused") && counter.classList.contains("active")) {
    counterOn = setInterval(count, 1000);
  } else { clearInterval(counterOn) }
}

btn.addEventListener("click", changeCounterStatus);
for (let arrow of arrows) {
  arrow.addEventListener("click", () => changeTime(arrow.id));
}