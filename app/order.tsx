import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Text } from "@/components/ui/Text";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

export default function OrderScreen() {
  const router = useRouter();

  const orderItems = [
    {
      title: "Premium Thali",
      price: 78.0,
      description: "Paneer ki Sabji, Seasonal Sabji, Dal, Rice, 4 Roti, Salad",
      quantity: 1,
    },
    {
      title: "Deluxe Thali",
      price: 68.0,
      description: "Paneer ki Sabji, Seasonal Sabji, Dal, Rice, 4 Roti, Salad",
      quantity: 1,
    },
  ];

  const handlePlaceOrder = () => {
    router.push({ pathname: "../thankyou" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {orderItems.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDescription}>{item.description}</Text>
              <View style={styles.quantityRow}>
                <Text style={styles.itemPrice}>₹{item.price}</Text>
                <View style={styles.quantityControl}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.deliverySection}>
          <View style={styles.deliveryRow}>
            <Icon name="time-outline" size={20} color="#FFB74D" />
            <Text style={styles.deliveryText}>Delivery in 20 min</Text>
          </View>
          <View style={styles.deliveryRow}>
            <Icon name="home-outline" size={20} color="#FFB74D" />
            <Text style={styles.deliveryText}>Delivery to Home</Text>
            <Icon name="chevron-forward" size={20} color="#999999" />
          </View>
          <View style={styles.deliveryRow}>
            <Icon name="person-outline" size={20} color="#FFB74D" />
            <Text style={styles.deliveryText}>Luffy, +91-494949494</Text>
          </View>
        </View>

        <View style={styles.billSection}>
          <Text style={styles.billTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Item Total</Text>
            <Text style={styles.billAmount}>₹100.00</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Delivery Fee</Text>
            <Text style={styles.billAmount}>₹0.00</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>₹100.00</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={handlePlaceOrder}>
          <Text style={styles.payButtonText}>Pay using UPI</Text>
          <Text style={styles.payAmount}>₹100.00</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1E1E",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  orderItem: {
    padding: 16,
    backgroundColor: "#2A2A2A",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginTop: 4,
  },
  quantityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFB74D",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 6,
  },
  quantityButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
  },
  quantity: {
    marginHorizontal: 12,
    fontSize: 14,
    color: "#FFFFFF",
    fontFamily: "Poppins-Medium",
  },
  deliverySection: {
    backgroundColor: "#2A2A2A",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  deliveryText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
  },
  billSection: {
    backgroundColor: "#2A2A2A",
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  billTitle: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  billText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  billAmount: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
  },
  totalText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  totalAmount: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#FFB74D",
  },
  footer: {
    padding: 20,
    backgroundColor: "#2A2A2A",
  },
  payButton: {
    backgroundColor: "#FFB74D",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#1E1E1E",
  },
  payAmount: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#1E1E1E",
  },
});
