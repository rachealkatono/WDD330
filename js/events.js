export function saveEvent(eventData) {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  events.push(eventData);
  localStorage.setItem('events', JSON.stringify(events));
}
export function getEvents() {
  return JSON.parse(localStorage.getItem('events')) || [];
}

export function saveRSVP(guest) {
  const rsvps = JSON.parse(localStorage.getItem('rsvps')) || [];
  rsvps.push(guest);
  localStorage.setItem('rsvps', JSON.stringify(rsvps));
}
export function getRSVPs() {
  return JSON.parse(localStorage.getItem('rsvps')) || [];
}

export function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ task, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
export function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
export function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
