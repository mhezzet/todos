import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  TextInput,
  Modal,
  Alert,
  TouchableHighlight,
  ListRenderItemInfo,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../auth/authSlice";
import {
  getTodos,
  createTodo,
  selectTodos,
  updateTodo,
  deleteTodo,
  toggleCompleteTodo,
} from "./todosSlice";
import TodoForm from "../../components/TodoForm";
import { Todo } from "../../types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Checkbox,
  Text,
  Button,
  Headline,
  List,
  IconButton,
  Colors,
  Portal,
  Dialog,
  Paragraph,
} from "react-native-paper";

export default function Todos() {
  const { todos, createTodosLoading } = useSelector(selectTodos);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todosCompletedFilter, setTodosCompletedFilter] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const addTodoHandler = useCallback((form) => {
    dispatch(createTodo(form.title, form.content));
    setIsModalOpen(false);
  }, []);

  const updateTodoHandler = useCallback((todo) => {
    dispatch(updateTodo(todo));
    setIsModalOpen(false);
  }, []);

  const deleteTodoHandler = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, []);

  const toggleCompleteTodoHandler = useCallback((id, completed) => {
    dispatch(toggleCompleteTodo(id, completed));
  }, []);

  const filteredTodos = useMemo(
    () =>
      todosCompletedFilter
        ? todos
        : todos.filter((todo: Todo) => todo.completed === todosCompletedFilter),
    [todosCompletedFilter, todos]
  );

  return (
    <SafeAreaView style={{ marginHorizontal: 10 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: 20,
          marginTop: 10,
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Headline>TODO LIST</Headline>
        </View>
        <View>
          <Button onPress={() => dispatch(signOut())} mode="text">
            signout
          </Button>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Button
            mode="contained"
            icon="plus"
            onPress={() => {
              setSelectedTodo(null);
              setIsModalOpen(true);
            }}
          >
            ADD
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Checkbox
            status={todosCompletedFilter ? "checked" : "unchecked"}
            onPress={() => setTodosCompletedFilter((prevValue) => !prevValue)}
          />
          <Text style={{ fontSize: 16 }}>completed</Text>
        </View>
      </View>

      <Portal>
        <Dialog
          visible={isModalOpen}
          onDismiss={() => {
            setIsModalOpen(false);
          }}
        >
          <Dialog.Title>{selectedTodo ? "update" : "add"}</Dialog.Title>
          <Dialog.Content>
            <TodoForm
              loading={createTodosLoading}
              type={selectedTodo ? "update" : "add"}
              defaultValues={
                selectedTodo ? selectedTodo : { title: "", content: "" }
              }
              onSubmit={selectedTodo ? updateTodoHandler : addTodoHandler}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      {filteredTodos.length === 0 && (
        <View>
          <Paragraph style={{ textAlign: "center" }}>
            there is no todos !!
          </Paragraph>
        </View>
      )}

      <FlatList
        data={filteredTodos}
        renderItem={({ item: todo }: ListRenderItemInfo<Todo>) => (
          <List.Item
            onPress={() => toggleCompleteTodoHandler(todo.id, todo.completed)}
            title={<Text>{todo.title}</Text>}
            titleStyle={
              todo.completed
                ? {
                    textDecorationLine: "line-through",
                    textDecorationStyle: "solid",
                  }
                : {}
            }
            description={todo.content}
            right={(props) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <IconButton
                  icon="pencil"
                  color={Colors.grey600}
                  size={20}
                  onPress={() => {
                    setSelectedTodo(todo);
                    setIsModalOpen(true);
                  }}
                />
                <IconButton
                  icon="delete"
                  color={Colors.grey600}
                  size={20}
                  onPress={() => deleteTodoHandler(todo.id)}
                />
              </View>
            )}
          />
        )}
        keyExtractor={(todo) => todo.id.toString()}
      />
    </SafeAreaView>
  );
}
