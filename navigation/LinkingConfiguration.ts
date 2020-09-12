import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      auth: {
        screens: {
          login: "auth/login",
          register: "auth/register",
        },
      },
      todos: {
        screens: {
          todos: "todos",
        },
      },
      NotFound: "*",
    },
  },
};
