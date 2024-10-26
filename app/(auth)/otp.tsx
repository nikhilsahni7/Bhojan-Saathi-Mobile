// OTPScreen.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";

export default function OTPScreen() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      router.replace("/(tabs)");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Feather name="lock" size={32} color="#FFB74D" style={styles.icon} />
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>A code has been sent to your phone</Text>
        <Input
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="Enter OTP"
          style={styles.input}
        />
        <Button onPress={handleVerifyOTP} disabled={otp.length !== 6}>
          Verify OTP
        </Button>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.link}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
  },
  content: {
    padding: 20,
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  link: {
    color: "#FFB74D",
    textAlign: "center",
    marginTop: 20,
  },
});
