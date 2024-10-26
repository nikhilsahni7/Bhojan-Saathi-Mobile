import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "./Text";

interface ButtonProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({ children, onPress, disabled, loading }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFB74D",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: "#666666",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
