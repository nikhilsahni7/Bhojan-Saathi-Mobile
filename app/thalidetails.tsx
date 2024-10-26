import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Feather, FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const HEADER_HEIGHT =
  Platform.OS === "ios" ? 90 : 70 + (StatusBar.currentHeight || 0);

interface ThaliItem {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  time: string;
  price: number;
  image: any;
  description: string;
  category: string;
  items: Array<{
    name: string;
    icon: any;
    quantity?: string;
  }>;
}

const SpicyLevelIndicator = ({ level }: { level: number }) => (
  <View style={styles.spicyLevelContainer}>
    <Text style={styles.spicyLabel}>Spicy Level</Text>
    <View style={styles.spicyDots}>
      {[1, 2, 3].map((dot) => (
        <View
          key={dot}
          style={[
            styles.spicyDot,
            { backgroundColor: dot <= level ? "#FF5252" : "#444444" },
          ]}
        />
      ))}
    </View>
  </View>
);

const ThaliDetailsScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Parse the item from params
  const item: ThaliItem = JSON.parse(
    Array.isArray(params.item) ? params.item[0] : params.item
  );

  const handleAddToCart = () => {
    const orderData = {
      items: [
        {
          title: item.title,
          price: item.price,
          quantity,
          description: item.description,
        },
      ],
      totalAmount: item.price * quantity,
    };

    router.push({
      pathname: "/order",
      params: { orderData: JSON.stringify(orderData) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} bounces={false}>
        <ImageBackground
          source={item.image}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.headerActions}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.back()}
              >
                <Feather name="arrow-left" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <FontAwesome
                  name={isFavorite ? "heart" : "heart-o"}
                  size={24}
                  color={isFavorite ? "#FF5252" : "#FFFFFF"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.categoryBadge}>
              <Feather name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.contentContainer}>
          <View style={styles.mainInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Feather name="star" size={20} color="#FFB74D" />
              <Text style={styles.statValue}>{item.rating}</Text>
              <Text style={styles.statLabel}>({item.reviews})</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Feather name="clock" size={20} color="#FFB74D" />
              <Text style={styles.statValue}>{item.time}</Text>
              <Text style={styles.statLabel}>Delivery</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Feather name="zap" size={20} color="#FFB74D" />
              <Text style={styles.statValue}>850</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>

          <SpicyLevelIndicator level={2} />

          <View style={styles.itemsSection}>
            <Text style={styles.sectionTitle}>What's Included</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemsScrollView}
            >
              {item.items.map((foodItem, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemIconContainer}>
                    <Image source={foodItem.icon} style={styles.itemIcon} />
                  </View>
                  <Text style={styles.itemName}>{foodItem.name}</Text>
                  {foodItem.quantity && (
                    <Text style={styles.itemQuantity}>{foodItem.quantity}</Text>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            style={[styles.quantityButton, styles.quantityButtonShadow]}
            onPress={() => setQuantity(quantity - 1)}
            disabled={quantity === 1}
          >
            <Feather name="minus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, styles.quantityButtonShadow]}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.addButton, styles.addButtonShadow]}
          onPress={handleAddToCart}
        >
          <View style={styles.addButtonContent}>
            <Feather
              name="shopping-cart"
              size={20}
              color="#1E1E1E"
              style={styles.cartIcon}
            />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  scrollView: {
    flex: 1,
  },
  headerImage: {
    width: width,
    height: height * 0.45,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight,
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 16,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#4CAF50",
    marginLeft: 6,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  mainInfo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#3A3A3A",
  },
  spicyLevelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  spicyLabel: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  spicyDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  spicyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  itemsSection: {
    marginBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  itemsScrollView: {
    paddingRight: 20,
  },
  itemCard: {
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 100,
  },
  itemIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#3A3A3A",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  itemName: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    textAlign: "center",
  },
  itemQuantity: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginTop: 4,
  },
  footer: {
    color: "#1E1E1E",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    paddingBottom: Platform.OS === "ios" ? 34 : 20,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 4,
    marginRight: 16,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3A3A",
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginHorizontal: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: "#FFB74D",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1E1E1E",
  },

  quantityButtonShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  addButtonShadow: {
    shadowColor: "#FF4B2B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  addButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  cartIcon: {
    marginRight: 8,
  },
});

export default ThaliDetailsScreen;
