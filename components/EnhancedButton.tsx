// components/ui/EnhancedButton.tsx
import React from "react";
import {
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Text } from "@/components/ui/Text";

interface EnhancedButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  onPress,
  disabled = false,
  loading = false,
  children,
  style,
}) => {
  const animatedScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.button,
          disabled ? styles.buttonDisabled : styles.buttonEnabled,
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : typeof children === "string" ? (
          <Text style={styles.buttonText}>{children}</Text>
        ) : (
          children
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEnabled: {
    backgroundColor: "#4F46E5",
  },
  buttonDisabled: {
    backgroundColor: "#4B5563",
    opacity: 0.75,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});

export default EnhancedButton;
