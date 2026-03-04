import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const getEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

export const updateEvent = async (id, eventPatch) => {
  const response = await api.patch(`/events/${id}`, eventPatch);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  await api.delete(`/events/${id}`);
};