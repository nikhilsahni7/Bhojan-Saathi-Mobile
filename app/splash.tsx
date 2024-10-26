import { View, Image, StyleSheet } from "react-native";
import { useRouter, Href } from "expo-router";
import { useEffect } from "react";
import { Text } from "@/components/ui/Text";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(auth)/login" as Href);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/thali.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Bhojan<Text style={styles.highlight}>sathi</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  highlight: {
    color: "#FFB74D",
  },
});
