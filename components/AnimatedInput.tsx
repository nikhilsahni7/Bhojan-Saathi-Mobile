import React, { useState, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Input } from "@/components/ui/Input";
import { sharedStyles } from "../styles/auth.styles";
import { AnimatedInputProps } from "../types/auth.types";
import { Text } from "@/components/ui/Text";

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  value,
  onChangeText,
  error,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = new Animated.Value(value ? 1 : 0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: "absolute",
    left: 16,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -10],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#999999", "#FFFFFF"],
    }),
    backgroundColor: "transparent",
  } as const;

  return (
    <View style={sharedStyles.inputWrapper}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <Input
        style={[sharedStyles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#666666"
        selectionColor="#FFFFFF"
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: 4,
    fontFamily: "Poppins-Regular",
  },
});
