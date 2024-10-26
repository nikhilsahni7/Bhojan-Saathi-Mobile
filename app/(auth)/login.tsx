// LoginScreen.tsx
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

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleRequestOTP = () => {
    if (phone.length === 10) {
      router.push("/otp");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Feather name="phone" size={32} color="#FFB74D" style={styles.icon} />
        <Text style={styles.title}>Login</Text>
        <Input
          label="Phone No"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
          placeholder="Enter your Phone no"
          style={styles.input}
        />
        <Button onPress={handleRequestOTP} disabled={phone.length !== 10}>
          Request OTP
        </Button>
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

// // LoginScreen.tsx
// import React, { useState } from "react";
// import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
// import { useRouter } from "expo-router";
// import { Text } from "@/components/ui/Text";
// import { AnimatedInput } from "@/components/AnimatedInput";
// import EnhancedButton from "@/components/EnhancedButton";

// export default function LoginScreen() {
//   const [phone, setPhone] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleRequestOTP = async () => {
//     if (phone.length === 10) {
//       setLoading(true);
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       setLoading(false);
//       router.push("/otp");
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={styles.container}
//     >
//       <View style={styles.content}>
//         <Text style={styles.title}>Login</Text>
//         <AnimatedInput
//           label="Phone No"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           maxLength={10}
//           placeholder="Enter your Phone no"
//         />
//         <EnhancedButton
//           onPress={handleRequestOTP}
//           disabled={phone.length !== 10}
//           loading={loading}
//         >
//           Request OTP
//         </EnhancedButton>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#1E1E1E",
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 28,
//     fontFamily: "Poppins-Bold",
//     color: "#FFFFFF",
//     marginBottom: 32,
//   },
// });
