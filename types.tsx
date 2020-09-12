export type RootStackParamList = {
  auth: undefined;
  todos: undefined;
  NotFound: undefined;
};

export type AuthStackParamsList = {
  register: undefined;
  login: undefined;
};

export type TodosStackParamsList = {
  todos: undefined;
};

export type Todo = {
  completed: boolean;
  content: string;
  created: string;
  due_date: string;
  id: number;
  title: string;
};
