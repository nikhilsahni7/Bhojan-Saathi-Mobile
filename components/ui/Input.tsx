import { View, TextInput, StyleSheet, TextInputProps } from "react-native";
import { Text } from "./Text";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, style, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error ? styles.inputError : null, style]}
        placeholderTextColor="#999999"
        {...props}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
    fontFamily: "Poppins-Medium",
  },
  input: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#FF5252",
    borderWidth: 1,
  },
  error: {
    color: "#FF5252",
    fontSize: 12,
    marginTop: 4,
  },
});
