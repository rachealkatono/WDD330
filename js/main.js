// Main logic for Event Planner Pro
import { login, register, logout, onUserChange } from './auth.js';
import {
  saveEvent,
  getEvents,
  saveRSVP,
  getRSVPs,
  saveTask,
  getTasks,
  toggleTask
} from './events.js';


// --- DOM Elements ---
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// --- Auth Logic ---
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    await login(emailInput.value, passwordInput.value);
    console.log("Login successful!");
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("registerBtn").addEventListener("click", async () => {
  try {
    await register(emailInput.value, passwordInput.value);

    // ✅ Show success message
    alert("🎉 Registration successful! You can now log in.");

    // Optional: auto-log in or clear the fields
    // await login(emailInput.value, passwordInput.value);
    // OR
    // document.getElementById("password").value = "";

  } catch (err) {
    alert("❌ " + err.message);
  }
});


document.getElementById("logoutBtn").addEventListener("click", () => {
  logout();
});

// --- Show/Hide UI Based on Auth ---
document.addEventListener("DOMContentLoaded", () => {
  onUserChange((user) => {

    const authSection = document.getElementById("authSection");
    const eventSection = document.getElementById("eventSection");
    const budgetSection = document.getElementById("budgetSection");
    const weatherSection = document.getElementById("weatherSection");

    if (user) {
      authSection.style.display = "none";
      eventSection.style.display = "block";
      budgetSection.style.display = "block";
      weatherSection.style.display = "block";
      showEvents();
      showExpenses();
      showTasks();
      showRSVPs();
    } else {
      authSection.style.display = "block";
      eventSection.style.display = "none";
      budgetSection.style.display = "none";
      weatherSection.style.display = "none";
    }
  });
});

// --- Event Creation ---
document.getElementById("eventForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const eventData = {
    name: document.getElementById("eventName").value,
    date: document.getElementById("eventDate").value,
    time: document.getElementById("eventTime").value,
    description: document.getElementById("eventDescription").value,
  };
  saveEvent(eventData);
  showEvents();
});

function showEvents() {
  const events = getEvents();
  const list = document.getElementById('eventList');
  list.innerHTML = events.map(e =>
    `<div class="box"><h3>${e.name}</h3><p>${e.date} ${e.time}</p><p>${e.description}</p></div>`
  ).join('');
}

// --- RSVP ---
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const guest = {
      name: document.getElementById('guestName').value,
      response: document.getElementById('response').value
    };
    saveRSVP(guest);
    showRSVPs();
  });
}

function showRSVPs() {
  const rsvps = getRSVPs();
  const rsvpList = document.getElementById('rsvpList');
  if (rsvpList) {
    rsvpList.innerHTML = rsvps.map(r => `<p>${r.name} - ${r.response}</p>`).join('');
  }
}

// --- Task Manager ---
const taskForm = document.getElementById('taskForm');
if (taskForm) {
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = document.getElementById('taskInput').value;
    saveTask(task);
    showTasks();
  });
}

function showTasks() {
  const tasks = getTasks();
  const list = document.getElementById('taskList');
  if (!list) return;

  list.innerHTML = tasks.map((t, i) =>
    `<li><input type="checkbox" ${t.done ? 'checked' : ''} data-index="${i}">
    <span style="text-decoration:${t.done ? 'line-through' : 'none'}">${t.task}</span></li>`
  ).join('');

  list.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
      toggleTask(input.dataset.index);
      showTasks();
    });
  });
}

// --- Budget Tracker ---
const expenseForm = document.getElementById('budgetForm');
if (expenseForm) {
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    if (!name || isNaN(amount)) return;

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push({ name, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));

    showExpenses();
  });
}

function showExpenses() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const expenseList = document.getElementById('expenseList');
  const totalSpentDisplay = document.getElementById('totalSpent');

  let total = 0;
  expenseList.innerHTML = expenses.map(e => {
    total += e.amount;
    return `<li>${e.name}: $ ${e.amount}</li>`;
  }).join('');

  totalSpentDisplay.textContent = total;
}

// --- Weather API ---
const weatherForm = document.getElementById('weatherForm');
if (weatherForm) {
  weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('weatherCity').value;
    const weatherResult = document.getElementById('weatherResult');
    const API_KEY = '7658eb2fdd3e14b939a33b4706cc5074';

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        weatherResult.innerHTML = `<p class="has-text-danger">❌ ${data.message}</p>`;
        return;
      }

      const { name, weather, main } = data;
      weatherResult.innerHTML = `
        <p><strong>${name}</strong></p>
        <p>${weather[0].description}</p>
        <p>🌡 Temp: ${main.temp}°C</p>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather icon" />
      `;
    } catch (error) {
      console.error("Weather error:", error);
      weatherResult.innerHTML = `<p class="has-text-danger">❌ Error fetching weather.</p>`;
    }
  });
}
