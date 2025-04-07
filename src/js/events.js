// This file contains functions to save and retrieve events from local storage
export function saveEvent(eventData) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.push(eventData);
  localStorage.setItem("events", JSON.stringify(events));
}

export function getEvents() {
  return JSON.parse(localStorage.getItem("events")) || [];
}
