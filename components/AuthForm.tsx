import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { TextInput, Button, Text, Headline } from "react-native-paper";
import { useLinkTo } from "@react-navigation/native";

interface IProps {
  type: "login" | "register";
  errors: { [key: string]: string[] };
  loading: boolean;
  onSubmit: (form: { username: string; password: string }) => void;
}

export default function AuthForm({
  type,
  errors = {},
  loading,
  onSubmit,
}: IProps) {
  const [form, setForm] = useState({ username: "", password: "" });
  const linkTo = useLinkTo();

  const formChangeHandler = useCallback(
    (name) => (value: string) =>
      setForm((prevForm) => ({ ...prevForm, [name]: value })),
    []
  );

  return (
    <View style={{ marginVertical: 10, marginHorizontal: 12 }}>
      <Headline
        style={{ textAlign: "center", marginTop: 20, marginBottom: 20 }}
      >
        {type === "login" ? "login" : "register"}
      </Headline>
      <TextInput
        label="user name"
        onChangeText={formChangeHandler("username")}
        error={errors.username?.length > 0}
      />
      <Text style={{ color: "#A50203", marginBottom: 10 }}>
        {errors.username?.length > 0 ? errors.username[0] : ""}
      </Text>
      <TextInput
        label="password"
        textContentType="password"
        onChangeText={formChangeHandler("password")}
        error={errors.password?.length > 0}
      />
      <Text style={{ color: "#A50203", marginBottom: 10 }}>
        {errors.password?.length > 0 ? errors.password[0] : ""}
      </Text>
      <Button mode="contained" onPress={() => onSubmit(form)}>
        {type === "login" ? "login" : "register"}
      </Button>
      <Button
        style={{ marginTop: 10 }}
        mode="text"
        onPress={() =>
          type === "login" ? linkTo("/auth/register") : linkTo("/auth/login")
        }
      >
        {type === "login" ? "new user ?" : "already a user ?"}
      </Button>
    </View>
  );
}
