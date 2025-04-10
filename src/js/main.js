// This is the main JavaScript file for the Event Planner application.
import { saveEvent, getEvents } from "./events.js";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
import { login, register, logout, onUserChange } from './auth.js';
import {
  saveRSVP,
  getRSVPs,
  saveTask,
  getTasks,
  toggleTask
} from './events.js';
import './venue.js';


document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await login(email, password);
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("registerBtn").addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    await register(email, password);
  } catch (err) {
    alert(err.message);
  }
});

document.getElementById("logoutBtn").addEventListener("click", logout);

onUserChange((user) => {
  if (user) {
    document.getElementById("authSection").style.display = "none";
    document.getElementById("eventSection").style.display = "block";
    showEvents();
  } else {
    document.getElementById("authSection").style.display = "block";
    document.getElementById("eventSection").style.display = "none";
  }
});

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
  document.getElementById('eventList').innerHTML = events.map(e =>
    `<div><h3>${e.name}</h3><p>${e.date} ${e.time}</p><p>${e.description}</p></div>`).join('');
}

// RSVP
document.getElementById('rsvpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const guest = {
    name: document.getElementById('guestName').value,
    response: document.getElementById('response').value
  };
  saveRSVP(guest);
  showRSVPs();
});
function showRSVPs() {
  const rsvps = getRSVPs();
  document.getElementById('rsvpList').innerHTML = rsvps.map(r => `<p>${r.name} - ${r.response}</p>`).join('');
}

// Tasks
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const task = document.getElementById('taskInput').value;
  saveTask(task);
  showTasks();
});
function showTasks() {
  const tasks = getTasks();
  const list = document.getElementById('taskList');
  list.innerHTML = tasks.map((t, i) =>
    `<li><input type="checkbox" ${t.done ? 'checked' : ''} data-index="${i}"><span style="text-decoration:${t.done ? 'line-through' : 'none'}">${t.task}</span></li>`
  ).join('');
  list.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', () => {
      toggleTask(input.dataset.index);
      showTasks();
    });
  });
}