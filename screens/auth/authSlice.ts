import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-community/async-storage";

import { authApi, todosApi } from "../../services";

export const genreSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    refreshToken: "",
    loading: false,
    registerErrors: {},
    loginErrors: {},
  },
  reducers: {
    setToken: (
      state,
      action: { payload: { access: string; refresh: string } }
    ) => {
      state.token = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setRegisterErrors: (state, action) => {
      state.registerErrors = action.payload;
    },
    setLoginErrors: (state, action) => {
      state.loginErrors = action.payload;
    },
  },
});

export const {
  setToken,
  setloading,
  setRegisterErrors,
  setLoginErrors,
} = genreSlice.actions;

export const login = (username: string, password: string) => async (
  dispatch: any
) => {
  dispatch(setloading(true));
  try {
    const response = await authApi.post("token/", {
      username,
      password,
    });

    todosApi.defaults.headers.Authorization = `Bearer ${response.data.access}`;

    dispatch(
      setToken({ access: response.data.access, refresh: response.data.refresh })
    );

    await AsyncStorage.setItem(
      "token",
      JSON.stringify({
        access: response.data.access,
        refresh: response.data.refresh,
      })
    );

    dispatch(setLoginErrors({}));

    dispatch(setloading(false));
  } catch (error) {
    dispatch(setLoginErrors(error.response?.data));
    dispatch(setloading(false));
    if (error.response?.data.detail)
      Toast.show({
        type: "error",
        text1: "error",
        text2: error.response.data.detail,
      });
  }
};

export const register = (username: string, password: string) => async (
  dispatch: any
) => {
  dispatch(setloading(true));

  try {
    await authApi.post("register", {
      username,
      password,
    });

    const response = await authApi.post("token/", {
      username,
      password,
    });

    todosApi.defaults.headers.Authorization = `Bearer ${response.data.access}`;

    dispatch(
      setToken({ access: response.data.access, refresh: response.data.refresh })
    );

    await AsyncStorage.setItem(
      "token",
      JSON.stringify({
        access: response.data.access,
        refresh: response.data.refresh,
      })
    );

    dispatch(setRegisterErrors({}));

    dispatch(setloading(false));

    Toast.show({
      text1: "success",
      text2: "user created",
    });
  } catch (error) {
    dispatch(setloading(false));

    dispatch(setRegisterErrors(error.response?.data));
  }
};

export const signOut = () => async (dispatch: any) => {
  await AsyncStorage.removeItem("token");

  dispatch(setToken({ access: "", refresh: "" }));
};

export const selectAuth = (state: any) => state.auth;
export const selectToken = (state: any) => state.auth.token;

export default genreSlice.reducer;
