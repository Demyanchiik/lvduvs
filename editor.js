const pairsDiv = document.getElementById("pairs");
const daySelect = document.getElementById("daySelect");

function render(){
  pairsDiv.innerHTML = "";
  for(let i=0;i<4;i++){
    pairsDiv.innerHTML += `
      <label>
        <input type="checkbox" id="c${i}" checked> Пара ${i+1}
      </label>
      <input id="n${i}" placeholder="Назва пари">
    `;
  }
}

function save(){
  const day = daySelect.value;
  let data = JSON.parse(localStorage.getItem("schedule")||"{}");

  data[day] = [];
  for(let i=0;i<4;i++){
    data[day][i] = {
      name: document.getElementById("n"+i).value,
      enabled: document.getElementById("c"+i).checked
    };
  }

  localStorage.setItem("schedule", JSON.stringify(data));
  alert("Збережено!");
}

render();
