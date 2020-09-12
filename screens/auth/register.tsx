import React, { useCallback } from "react";
import { register, selectAuth } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";
import AuthForm from "../../components/AuthForm";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const { registerErrors, loading } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const submitHandler = useCallback(({ username, password }) => {
    dispatch(register(username, password));
  }, []);

  return (
    <SafeAreaView>
      <AuthForm
        type="register"
        errors={registerErrors}
        loading={loading}
        onSubmit={submitHandler}
      />
    </SafeAreaView>
  );
}
