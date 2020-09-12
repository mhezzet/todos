import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import { Provider as PaperProvider } from "react-native-paper";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import store from "./store";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) return null;
  else
    return (
      <Provider store={store}>
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
            <Toast ref={(ref: any) => Toast.setRef(ref)} />
          </SafeAreaProvider>
        </PaperProvider>
      </Provider>
    );
}
