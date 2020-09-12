import React, { useEffect, useCallback } from "react";
import { View } from "react-native";
import { login, selectAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { useLinkTo } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { loginErrors, loading } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const linkTo = useLinkTo();

  const submitHandler = useCallback(async ({ username, password }) => {
    await dispatch(login(username, password));
  }, []);

  return (
    <SafeAreaView>
      <AuthForm
        type="login"
        errors={loginErrors}
        loading={loading}
        onSubmit={submitHandler}
      />
    </SafeAreaView>
  );
}
