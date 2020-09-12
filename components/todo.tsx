import React from "react";
import { ListRenderItemInfo, View, Text } from "react-native";
import { Todo } from "../types";

const TodoListItem = ({ item }: ListRenderItemInfo<Todo>) => {
  return (
    <View>
      <Text>{item.title}</Text>
      <Text>{item.content}</Text>
    </View>
  );
};

export default TodoListItem;
