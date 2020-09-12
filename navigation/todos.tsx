import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Update from "../screens/todos/update";
import Todos from "../screens/todos";
import { TodosStackParamsList } from "../types";

const Stack = createStackNavigator<TodosStackParamsList>();

export function TodosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="todos" component={Todos} />
    </Stack.Navigator>
  );
}
