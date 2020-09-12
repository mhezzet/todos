import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../screens/auth/authSlice";
import todosSlice from "../screens/todos/todosSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todos: todosSlice,
  },
});

export default store;
