const pairsDiv = document.getElementById("pairs");
const daySelect = document.getElementById("daySelect");

function render() {
  pairsDiv.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    pairsDiv.innerHTML += `
      <div class="pair-row">
        <label for="c${i}">Пара ${i + 1}</label>
        <input type="checkbox" id="c${i}" checked />
        <input type="text" id="n${i}" placeholder="Назва пари" />
      </div>`;
  }
}

function save() {
  const day = daySelect.value;
  let data = JSON.parse(localStorage.getItem("schedule") || "{}");

  data[day] = [];
  for (let i = 0; i < 4; i++) {
    data[day][i] = {
      name: document.getElementById("n" + i).value.trim(),
      enabled: document.getElementById("c" + i).checked,
    };
  }

  localStorage.setItem("schedule", JSON.stringify(data));
  alert("Збережено!");
}

// При зміні дня очищаємо пари і завантажуємо збережені (або пусті)
daySelect.addEventListener("change", () => {
  loadDay(daySelect.value);
});

function loadDay(day) {
  let data = JSON.parse(localStorage.getItem("schedule") || "{}");
  const dayData = data[day] || [];

  for (let i = 0; i < 4; i++) {
    const cb = document.getElementById("c" + i);
    const input = document.getElementById("n" + i);

    if (dayData[i]) {
      cb.checked = dayData[i].enabled;
      input.value = dayData[i].name || "";
    } else {
      cb.checked = true;
      input.value = "";
    }
  }
}

render();
loadDay(daySelect.value);
