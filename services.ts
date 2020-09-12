import axios from "axios";

export const authApi = axios.create({
  baseURL: process.env.AUTH_URI,
});

export const todosApi = axios.create({
  baseURL: process.env.AUTH_URI,
});
