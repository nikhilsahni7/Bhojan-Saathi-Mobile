import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/Text";

interface CarouselItemProps {
  item: {
    title: string;
    rating: number;
    reviews: number;
    time: string;
    price: number;
    image: any;
  };
}

export function CarouselItem({ item }: CarouselItemProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoRow}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#FFB74D" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviews}>({item.reviews})</Text>
          </View>
          <View style={styles.time}>
            <Ionicons name="time-outline" size={16} color="#999999" />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        </View>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginLeft: 4,
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginLeft: 4,
  },
  price: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#FFB74D",
  },
});
