import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { setToken } from "../screens/auth/authSlice";
import { store } from "../store";
import { todosApi } from "../services";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });

        const token = await AsyncStorage.getItem("token");

        if (token) {
          const parsedToken = JSON.parse(token);

          store.dispatch(setToken(parsedToken));

          todosApi.defaults.headers.Authorization = `Bearer ${parsedToken.access}`;
        }
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
