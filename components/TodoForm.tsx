import React, { useState, useCallback } from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

interface IProps {
  type: "add" | "update";
  errors?: { [key: string]: string[] };
  onSubmit: (form: { title: string; content: string }) => void;
  loading: boolean;
  defaultValues: { title: string; content: string };
}

export default function TodoForm({
  type,
  onSubmit,
  loading,
  defaultValues,
}: IProps) {
  const [form, setForm] = useState(defaultValues);

  const formChangeHandler = useCallback(
    (name) => (text: string) => {
      setForm((prevForm) => ({ ...prevForm, [name]: text }));
    },
    []
  );

  return (
    <View>
      <TextInput
        value={form.title}
        style={{ marginBottom: 15 }}
        placeholder="title"
        onChangeText={formChangeHandler("title")}
      />
      <TextInput
        style={{ marginBottom: 25 }}
        value={form.content}
        placeholder="content"
        onChangeText={formChangeHandler("content")}
      />
      <Button
        mode="contained"
        disabled={loading || form.title.length < 1}
        onPress={() => onSubmit(form)}
      >
        {type === "add" ? "add" : "update"}
      </Button>
    </View>
  );
}
