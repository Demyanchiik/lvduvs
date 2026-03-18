// Розклад
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

// ⚙️ налаштування
const settingsBtn = document.getElementById("settingsBtn");
const settingsMenu = document.getElementById("settingsMenu");
const colorOptions = document.querySelectorAll(".color-option");
const resetBtn = document.querySelector(".reset");

let manualColor = localStorage.getItem("manualColor");

// відкриття меню
settingsBtn.addEventListener("click", () => {
  settingsMenu.classList.toggle("active");
});

// вибір кольору
colorOptions.forEach(btn => {
  btn.addEventListener("click", () => {
    const color = btn.dataset.color;
    manualColor = color;
    localStorage.setItem("manualColor", color);
    document.body.style.background = color;
  });
});

// авто режим
resetBtn.addEventListener("click", () => {
  manualColor = null;
  localStorage.removeItem("manualColor");
});

// час
function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return now;
}

// логіка кольору
function setBackgroundBySession(name) {
  if (manualColor) {
    document.body.style.background = manualColor;
    return;
  }

  let color = "#1976d2";

  if (name.includes("перерва") && !name.includes("Обідня")) {
    color = "#2e7d32";
  } else if (name.includes("Обідня")) {
    color = "#6a1b9a";
  } else if (name.includes("пара")) {
    color = "#d32f2f";
  }

  document.body.style.background = color;
}

// пошук пари
function getNextSession() {
  const now = new Date();

  for (const s of schedule) {
    const start = parseTime(s.start);
    const end = parseTime(s.end);

    if (now >= start && now <= end) {
      return { session: s, diff: Math.floor((end - now)/1000) };
    }

    if (now < start) {
      return { session: s, diff: Math.floor((start - now)/1000) };
    }
  }

  return null;
}

// оновлення
function updateTimer() {
  const next = getNextSession();

  if (next) {
    const hrs = Math.floor(next.diff / 3600);
    const mins = Math.floor((next.diff % 3600) / 60);
    const secs = next.diff % 60;

    timerDisplay.textContent =
      `${hrs.toString().padStart(2,'0')}:` +
      `${mins.toString().padStart(2,'0')}:` +
      `${secs.toString().padStart(2,'0')}`;

    currentSessionDisplay.textContent = next.session.name;

    setBackgroundBySession(next.session.name);

  } else {
    timerDisplay.textContent = "00:00:00";
    currentSessionDisplay.textContent = "Немає пар зараз";
    document.body.style.background = manualColor || "#1976d2";
  }
}

// запуск
updateTimer();
setInterval(updateTimer, 1000);
