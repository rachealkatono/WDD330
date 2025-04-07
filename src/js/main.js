// This is the main JavaScript file for the Event Planner application.
import { login, register, logout, onUserChange } from "./auth.js";
import { saveEvent, getEvents } from "./events.js";
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

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
  const list = document.getElementById("eventList");
  list.innerHTML = events
    .map(
      (event) =>
        `<div><h3>${event.name}</h3><p>${event.date} ${event.time}</p><p>${event.description}</p></div>`,
    )
    .join("");
}
