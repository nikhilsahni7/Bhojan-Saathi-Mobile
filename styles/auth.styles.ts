import { StyleSheet, Dimensions } from "react-native";
import { AuthStyles } from "../types/auth.types";

const { width, height } = Dimensions.get("window");

export const sharedStyles = StyleSheet.create<AuthStyles>({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A",
  },
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: height * 0.4,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 24,
    padding: 24,
    marginTop: height * 0.15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#CCCCCC",
    marginBottom: 32,
    textAlign: "center",
    lineHeight: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    marginTop: 12,
  },
  decorationCircle: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  input: {
    height: 56,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  button: {
    height: 56,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 24,
  },
});
