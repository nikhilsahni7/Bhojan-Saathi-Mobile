import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { Text } from "@/components/ui/Text";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function ThankYouScreen() {
  const router = useRouter();
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Auto navigate back to home after 3 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        <View style={styles.checkCircle}>
          <Icon name="checkmark" size={48} color="#1E1E1E" />
        </View>
        <Text style={styles.title}>Thank You!</Text>
        <Text style={styles.message}>
          Your order has been successfully placed
        </Text>
        <Text style={styles.orderNumber}>Order #123456</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginBottom: 16,
    textAlign: "center",
  },
  orderNumber: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFB74D",
  },
});
