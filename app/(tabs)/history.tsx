import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";

interface OrderHistory {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: "delivered" | "cancelled" | "processing";
}

const orderHistory: OrderHistory[] = [
  {
    id: "ORD001",
    date: "26 Oct 2024",
    items: ["Deluxe Thali", "Premium Thali"],
    total: 95.0,
    status: "delivered",
  },
  {
    id: "ORD002",
    date: "25 Oct 2024",
    items: ["Premium Thali"],
    total: 55.0,
    status: "delivered",
  },
  {
    id: "ORD003",
    date: "24 Oct 2024",
    items: ["Deluxe Thali"],
    total: 40.0,
    status: "cancelled",
  },
  {
    id: "ORD004",
    date: "24 Oct 2024",
    items: ["Premium Thali", "Deluxe Thali"],
    total: 95.0,
    status: "processing",
  },
];

const StatusBadge = ({ status }: { status: OrderHistory["status"] }) => {
  const getStatusColor = () => {
    switch (status) {
      case "delivered":
        return { bg: "#4CAF50", text: "#FFFFFF" };
      case "cancelled":
        return { bg: "#FF5252", text: "#FFFFFF" };
      case "processing":
        return { bg: "#FFB74D", text: "#1E1E1E" };
      default:
        return { bg: "#999999", text: "#FFFFFF" };
    }
  };

  const colors = getStatusColor();

  return (
    <View style={[styles.statusBadge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.statusText, { color: colors.text }]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Text>
    </View>
  );
};

export default function History() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Order History</Text>
      </View>

      <ScrollView style={styles.container}>
        {orderHistory.map((order) => (
          <TouchableOpacity key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderId}>{order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <StatusBadge status={order.status} />
            </View>

            <View style={styles.divider} />

            <View style={styles.orderItems}>
              {order.items.map((item, index) => (
                <Text key={index} style={styles.itemText}>
                  • {item}
                </Text>
              ))}
            </View>

            <View style={styles.orderFooter}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₹{order.total}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1E1E1E",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  orderCard: {
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  orderDate: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "#3A3A3A",
    marginVertical: 12,
  },
  orderItems: {
    marginBottom: 12,
  },
  itemText: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#FFB74D",
  },
});
