import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import { AuthStack } from "./auth";
import LinkingConfiguration from "./LinkingConfiguration";
import { TodosStack } from "./todos";
import { selectToken } from "../screens/auth/authSlice";
import { useSelector } from "react-redux";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const token = useSelector(selectToken);

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="todos" component={TodosStack} />
        ) : (
          <Stack.Screen name="auth" component={AuthStack} />
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
