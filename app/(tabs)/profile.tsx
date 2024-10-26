import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { Text } from "@/components/ui/Text";
import { Feather } from "@expo/vector-icons";

type FeatherIconName =
  | "user"
  | "map-pin"
  | "credit-card"
  | "bell"
  | "globe"
  | "moon"
  | "help-circle"
  | "message-square"
  | "file-text"
  | "log-out"
  | "chevron-right";

const profileSections: {
  title: string;
  items: { icon: FeatherIconName; label: string }[];
}[] = [
  {
    title: "Account Settings",
    items: [
      { icon: "user", label: "Edit Profile" },
      { icon: "map-pin", label: "Saved Addresses" },
      { icon: "credit-card", label: "Payment Methods" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { icon: "bell", label: "Notifications" },
      { icon: "globe", label: "Language" },
      { icon: "moon", label: "Dark Mode" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: "help-circle", label: "Help Center" },
      { icon: "message-square", label: "Contact Us" },
      { icon: "file-text", label: "Terms & Privacy" },
    ],
  },
];

export default function Profile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image
              source={require("@/assets/images/avatar.jpeg")}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.email}>john.doe@example.com</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>18</Text>
              <Text style={styles.statLabel}>Reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Addresses</Text>
            </View>
          </View>
        </View>

        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity key={itemIndex} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Feather name={item.icon} size={20} color="#FFB74D" />
                  <Text style={styles.menuItemText}>{item.label}</Text>
                </View>
                <Feather name="chevron-right" size={20} color="#999999" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="#FF5252" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
  },
  header: {
    padding: 20,
    backgroundColor: "#2A2A2A",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: "#FFB74D",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  editButtonText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#1E1E1E",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3A3A3A",
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#4A4A4A",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2A2A2A",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2A2A2A",
    padding: 16,
    borderRadius: 12,
    margin: 20,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FF5252",
    marginLeft: 8,
  },
});
