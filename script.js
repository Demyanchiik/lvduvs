// Стандартний розклад часу пар (можна змінювати через editor.html)
const schedule = [
  ["08:30","09:50"],
  ["10:05","11:25"],
  ["11:40","13:00"],
  ["14:00","15:20"]
];

const timer = document.getElementById("timer");
const pairName = document.getElementById("pairName");

// Користувацький колір
let customColor = localStorage.getItem("color");

// ⏰ оновлення часу та дати
function updateClock(){
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
  document.getElementById("date").textContent =
    now.toLocaleDateString("uk-UA",{weekday:"short",day:"numeric",month:"short"});
}

// Отримати актуальну пару
function getPair(){
  const now = new Date();
  const day = now.getDay();
  const data = JSON.parse(localStorage.getItem("schedule")||"{}");
  const today = data[day]||[];

  for(let i=0;i<schedule.length;i++){
    if(!today[i]?.enabled) continue;

    let start = new Date();
    let end = new Date();
    start.setHours(...schedule[i][0].split(":"),0);
    end.setHours(...schedule[i][1].split(":"),0);

    if(now<start) return {name: today[i].name||`Пара ${i+1}`, diff:(start-now)/1000};
    if(now<=end) return {name: today[i].name||`Пара ${i+1}`, diff:(end-now)/1000};
  }
  return null;
}

// Задати колір фону
function setColor(pair){
  if(customColor){
    document.body.style.background = customColor;
    return;
  }
  // Авто кольори: пара - червоний, перерва - зелений, обідня - фіолетовий, нічого - синій
  if(!pair) document.body.style.background = "#1976d2"; // синій - немає пар
  else if(pair.toLowerCase().includes("перерва") && !pair.toLowerCase().includes("обід")) document.body.style.background = "#2e7d32"; // зелений
  else if(pair.toLowerCase().includes("обід")) document.body.style.background = "#6a1b9a"; // фіолет
  else document.body.style.background = "#d32f2f"; // червоний
}

// Плавний відлік часу
function update(){
  const p = getPair();
  if(!p){
    pairName.textContent = "Немає пар";
    timer.textContent = "00:00:00";
    setColor(null);
    return;
  }

  pairName.textContent = p.name;

  let t = Math.floor(p.diff);
  let h = Math.floor(t/3600).toString().padStart(2,'0');
  let m = Math.floor((t%3600)/60).toString().padStart(2,'0');
  let s = Math.floor(t%60).toString().padStart(2,'0');

  timer.textContent = `${h}:${m}:${s}`;
  setColor(p.name);

  p.diff -= 0.2; // для плавності оновлення
}

// ⚙️ кнопка налаштувань
document.getElementById("settingsBtn").onclick = ()=>{
  document.getElementById("settingsMenu").classList.toggle("active");
};

// Кольори з кнопок
document.querySelectorAll(".color-option").forEach(b=>{
  b.onclick = ()=>{
    localStorage.setItem("color",b.dataset.color);
    location.reload();
  };
});

// Авто колір
document.getElementById("autoColor").onclick = ()=>{
  localStorage.removeItem("color");
  location.reload();
};

// Інтервали оновлення
setInterval(update,200);
setInterval(updateClock,1000);
update();
updateClock();
