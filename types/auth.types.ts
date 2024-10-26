import { ViewStyle, TextStyle } from "react-native";

export interface AuthStyles {
  container: ViewStyle;
  gradientBackground: ViewStyle;
  content: ViewStyle;
  card: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  inputContainer: ViewStyle;
  buttonContainer: ViewStyle;
  decorationCircle: ViewStyle;
  inputWrapper: ViewStyle;
  input: ViewStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  buttonText: TextStyle;
  icon: ViewStyle;
}

export interface AnimatedInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "number-pad" | "phone-pad";
  maxLength?: number;
  placeholder?: string;
  error?: string;
}

export interface EnhancedButtonProps {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
  style?: Object;
}
