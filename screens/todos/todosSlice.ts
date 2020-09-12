import { createSlice } from "@reduxjs/toolkit";
import { todosApi } from "../../services";
import { Todo } from "../../types";

export const genreSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    getTodosLoading: false,
    updateTodosLoading: false,
    deleteTodosLoading: false,
    createTodosLoading: false,
  },
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos = [action.payload as never, ...state.todos];
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(
        (todo) => (todo as any).id != (action.payload as any)
      );
    },
    editTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        (todo as any).id !== (action.payload as any).id
          ? todo
          : (action.payload as never)
      );
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        (todo as any).id !== (action.payload as any)
          ? todo
          : { ...(todo as any), completed: !(todo as any).completed }
      ) as never[];
    },
    setGetTodosLoading: (state, action) => {
      state.getTodosLoading = action.payload;
    },
    setUpdateTodosLoading: (state, action) => {
      state.updateTodosLoading = action.payload;
    },
    setDeleteTodosLoading: (state, action) => {
      state.deleteTodosLoading = action.payload;
    },
    setCreateTodosLoading: (state, action) => {
      state.createTodosLoading = action.payload;
    },
  },
});

export const {
  setCreateTodosLoading,
  setDeleteTodosLoading,
  setGetTodosLoading,
  setTodos,
  setUpdateTodosLoading,
  addTodo,
  removeTodo,
  editTodo,
  toggleTodo,
} = genreSlice.actions;

export const getTodos = () => async (dispatch: any) => {
  const response = await todosApi.get("todo");

  dispatch(setTodos(response.data));
};

export const toggleCompleteTodo = (id: string, completed: boolean) => async (
  dispatch: any
) => {
  dispatch(toggleTodo(id));

  const response = await todosApi.patch(`todo/${id}/`, {
    completed: !completed,
  });
};

export const updateTodo = (todo: Todo) => async (dispatch: any) => {
  dispatch(editTodo(todo));

  await todosApi.patch(`todo/${todo.id}/`, todo);
};

export const deleteTodo = (id: string) => async (dispatch: any) => {
  dispatch(removeTodo(id));

  await todosApi.delete(`todo/${id}/`);
};

export const createTodo = (title: string, content: string) => async (
  dispatch: any
) => {
  dispatch(setCreateTodosLoading(true));

  const response = await todosApi.post("todo/", { title, content });

  dispatch(addTodo(response.data));
  dispatch(setCreateTodosLoading(false));
};

export const selectTodos = (state: any) => state.todos;

export default genreSlice.reducer;
