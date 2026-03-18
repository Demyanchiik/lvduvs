// розклад
const schedule = [
  { name: "1 пара", start: "08:30", end: "09:50" },
  { name: "Перерва", start: "09:50", end: "10:05" },
  { name: "2 пара", start: "10:05", end: "11:25" },
  { name: "Перерва", start: "11:25", end: "11:40" },
  { name: "3 пара", start: "11:40", end: "13:00" },
  { name: "Обідня перерва", start: "13:00", end: "14:00" },
  { name: "4 пара", start: "14:00", end: "15:20" }
];

const timerDisplay = document.getElementById('timer');
const currentSessionDisplay = document.getElementById('current-session');
const clock = document.getElementById('clock');

// ⚙️
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const colorOptions = document.querySelectorAll(".color-option");
const resetBtn = document.querySelector(".reset");
const checkboxes = document.querySelectorAll("input[type='checkbox']");

let manualColor = localStorage.getItem("manualColor");
let disabledPairs = JSON.parse(localStorage.getItem("disabledPairs") || "[]");

// меню
settingsBtn.onclick = () => {
  settingsMenu.classList.toggle("active");
};

// кольори
colorOptions.forEach(btn => {
  btn.onclick = () => {
    manualColor = btn.dataset.color;
    localStorage.setItem("manualColor", manualColor);
    document.body.style.background = manualColor;
  };
});

resetBtn.onclick = () => {
  manualColor = null;
  localStorage.removeItem("manualColor");
};

// чекбокси
checkboxes.forEach(cb => {
  if (disabledPairs.includes(cb.dataset.id)) {
    cb.checked = false;
  }

  cb.onchange = () => {
    const id = cb.dataset.id;

    if (!cb.checked) {
      disabledPairs.push(id);
    } else {
      disabledPairs = disabledPairs.filter(x => x !== id);
    }

    localStorage.setItem("disabledPairs", JSON.stringify(disabledPairs));
  };
});

// час
function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

// колір
function setColor(name) {
  if (manualColor) {
    document.body.style.background = manualColor;
    return;
  }

  let color = "#1976d2";

  if (name.includes("перерва") && !name.includes("Обідня")) color = "#2e7d32";
  else if (name.includes("Обідня")) color = "#6a1b9a";
  else if (name.includes("пара")) color = "#d32f2f";

  document.body.style.background = color;
}

// логіка
function getNextSession() {
  const now = new Date();

  for (let i = 0; i < schedule.length; i++) {
    if (disabledPairs.includes(i.toString())) continue;

    const s = schedule[i];
    const start = parseTime(s.start);
    const end = parseTime(s.end);

    if (now >= start && now <= end) {
      return { name: s.name, diff: Math.floor((end - now)/1000) };
    }

    if (now < start) {
      return { name: s.name, diff: Math.floor((start - now)/1000) };
    }
  }

  return null;
}

// таймер
function updateTimer() {
  const next = getNextSession();

  if (next) {
    const h = String(Math.floor(next.diff/3600)).padStart(2,'0');
    const m = String(Math.floor((next.diff%3600)/60)).padStart(2,'0');
    const s = String(next.diff%60).padStart(2,'0');

    timerDisplay.textContent = `${h}:${m}:${s}`;
    currentSessionDisplay.textContent = next.name;

    setColor(next.name);

  } else {
    timerDisplay.textContent = "00:00:00";
    currentSessionDisplay.textContent = "Немає пар зараз";
    document.body.style.background = manualColor || "#1976d2";
  }
}

// годинник
function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}

// запуск
setInterval(updateTimer, 1000);
setInterval(updateClock, 1000);

updateTimer();
updateClock();

// годинник + дата
function updateClock() {
  const now = new Date();

  // час
  clock.textContent = now.toLocaleTimeString();

  // дата + день
  const days = ["Неділя","Понеділок","Вівторок","Середа","Четвер","П’ятниця","Субота"];
  const dayName = days[now.getDay()];

  const dateStr = now.toLocaleDateString("uk-UA");

  document.getElementById("date").textContent = `${dayName}, ${dateStr}`;
}
