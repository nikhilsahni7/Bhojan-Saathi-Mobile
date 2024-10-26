import { Text as RNText, TextProps as RNTextProps } from "react-native";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
}

export function Text({ style, ...props }: TextProps) {
  return (
    <RNText style={[{ fontFamily: "Poppins-Regular" }, style]} {...props} />
  );
}
