import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL ?? "";

const api = axios.create({
  baseURL: API_URL,
});

export const getTodos = () => api.get("/api/todos");

export const createTodo = (text) => api.post("/api/todos", { text });

export const updateTodo = (id, body) => api.patch(`/api/todos/${id}`, body);

export const deleteTodo = (id) => api.delete(`/api/todos/${id}`);
