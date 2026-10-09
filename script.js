// Sample data for the first prototype.
// Replace these values with your team's real experimental measurements.

const productionCtx = document.getElementById("productionChart");
const productionChart = new Chart(productionCtx, {
  type: "bar",
  data: {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{
      label: "Greywater produced (L)",
      data: [130, 150, 175, 145, 160],
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, title: { display: true, text: "Litres" } } }
  }
});

const qualityCtx = document.getElementById("qualityChart");
const qualityChart = new Chart(qualityCtx, {
  type: "bar",
  data: {
    labels: ["Turbidity (NTU)", "Relative impurity index"],
    datasets: [
      { label: "Before filtration", data: [50, 100] },
      { label: "After filtration", data: [9, 18] }
    ]
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

function calculateSavings() {
  const greywater = Number(document.getElementById("greywaterInput").value) || 0;
  const reuse = Number(document.getElementById("reuseInput").value) || 0;
  const days = Number(document.getElementById("daysInput").value) || 0;

  const daily = greywater * (reuse / 100);
  const annual = daily * days;

  document.getElementById("dailyResult").textContent = `${daily.toLocaleString()} L/day`;
  document.getElementById("annualResult").textContent = `${annual.toLocaleString()} L/year`;

  document.getElementById("reuseMetric").textContent = `${daily.toLocaleString()} L`;
  document.getElementById("waterMetric").textContent = `${greywater.toLocaleString()} L`;
}

document.getElementById("calculateBtn").addEventListener("click", calculateSavings);

document.getElementById("addDataBtn").addEventListener("click", () => {
  const date = document.getElementById("dateInput").value || "New entry";
  const litres = document.getElementById("litresInput").value;
  const turbidity = document.getElementById("turbidityInput").value;
  const ph = document.getElementById("phInput").value;

  if (!litres || !turbidity || !ph) {
    alert("Please enter greywater, turbidity and pH values.");
    return;
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${date}</td>
    <td>${litres} L</td>
    <td>${turbidity} NTU</td>
    <td>${ph}</td>
  `;
  document.querySelector("#dataTable tbody").appendChild(row);

  document.getElementById("waterMetric").textContent = `${litres} L`;
  document.getElementById("turbidityMetric").textContent = `${turbidity} NTU`;
  document.getElementById("phMetric").textContent = ph;

  document.getElementById("litresInput").value = "";
  document.getElementById("turbidityInput").value = "";
  document.getElementById("phInput").value = "";
});
