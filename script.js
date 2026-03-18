// Розклад пар і перерв
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

// Перетворюємо час "HH:MM" в Date сьогоднішнього дня
function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  const now = new Date();
  now.setHours(h, m, 0, 0);
  return now;
}

// Оновлення таймера
function updateTimer() {
  const now = new Date();
  let sessionFound = false;

  for (const s of schedule) {
    const start = parseTime(s.start);
    const end = parseTime(s.end);

    if (now >= start && now <= end) {
      sessionFound = true;
      const diff = Math.floor((end - now) / 1000);
      const hrs = Math.floor(diff / 3600);
      const mins = Math.floor((diff % 3600) / 60);
      const secs = diff % 60;

      timerDisplay.textContent = `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
      currentSessionDisplay.textContent = s.name;
      break;
    }
  }

  if (!sessionFound) {
    timerDisplay.textContent = "00:00:00";
    currentSessionDisplay.textContent = "Немає пар зараз";
  }
}

// Оновлюємо таймер кожну секунду автоматично
updateTimer();
setInterval(updateTimer, 1000);
