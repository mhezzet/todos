import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import { AuthStackParamsList } from "../types";

const Stack = createStackNavigator<AuthStackParamsList>();

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="register" component={Register} />
    </Stack.Navigator>
  );
}
