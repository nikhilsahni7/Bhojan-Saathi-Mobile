import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import { useState, useRef, useCallback } from "react";
import { Text } from "@/components/ui/Text";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width - 60;

// Define types
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
  }>;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface CarouselItemProps {
  item: ThaliItem;
  onPress: () => void;
}

interface CustomPaginationProps {
  total: number;
  currentIndex: number;
}

// const categories: CategoryItem[] = [
//   { id: "1", name: "All", icon: "🍱" },
//   { id: "2", name: "Veg", icon: "🥗" },
//   { id: "3", name: "Non-Veg", icon: "🍗" },
//   { id: "4", name: "Sweet", icon: "🍨" },
// ];

const thaliItems: ThaliItem[] = [
  {
    id: "1",
    title: "Deluxe Thali",
    rating: 4.8,
    reviews: 163,
    time: "20 min",
    price: 40.0,
    category: "Veg",
    image: require("@/assets/images/thali.png"),
    description: "Panner ki Sabzi, Seasonal Sabzi, Dal, Rice, 4 Roti, Salad",
    items: [
      { name: "Paneer", icon: require("@/assets/images/paneer.png") },
      { name: "Rice", icon: require("@/assets/images/rice.png") },
      { name: "Roti", icon: require("@/assets/images/roti.png") },
      { name: "Salad", icon: require("@/assets/images/salad.png") },
      { name: "Dal", icon: require("@/assets/images/dal.png") },
    ],
  },
  {
    id: "2",
    title: "Premium Thali",
    rating: 4.9,
    reviews: 204,
    time: "25 min",
    price: 55.0,
    category: "Veg",
    image: require("@/assets/images/thali.png"),
    description: "Premium Panner, Special Dal, Rice, 6 Roti, Green Salad",
    items: [
      { name: "Paneer", icon: require("@/assets/images/paneer.png") },
      { name: "Rice", icon: require("@/assets/images/rice.png") },
      { name: "Roti", icon: require("@/assets/images/roti.png") },
      { name: "Salad", icon: require("@/assets/images/salad.png") },
      { name: "Dal", icon: require("@/assets/images/dal.png") },
    ],
  },
];

const CategoryButton = ({
  category,
  isSelected,
  onPress,
}: {
  category: CategoryItem;
  isSelected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
    onPress={onPress}
  >
    <Text style={styles.categoryIcon}>{category.icon}</Text>
    <Text
      style={[styles.categoryText, isSelected && styles.categoryTextSelected]}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
);

const CarouselItem: React.FC<CarouselItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={[carouselStyles.itemContainer, { width: ITEM_WIDTH }]}
      onPress={onPress}
    >
      <View style={carouselStyles.card}>
        <View style={carouselStyles.imageContainer}>
          <Image source={item.image} style={carouselStyles.image} />
          <View style={carouselStyles.timeContainer}>
            <Feather name="clock" size={14} color="#FFB74D" />
            <Text style={carouselStyles.time}>{item.time}</Text>
          </View>
        </View>
        <View style={carouselStyles.details}>
          <Text style={carouselStyles.itemTitle}>{item.title}</Text>
          <View style={carouselStyles.ratingContainer}>
            <View style={carouselStyles.ratingInner}>
              <Feather name="star" size={16} color="#FFB74D" />
              <Text style={carouselStyles.rating}>{item.rating}</Text>
              <Text style={carouselStyles.reviews}>({item.reviews})</Text>
            </View>
            <Text style={carouselStyles.category}>{item.category}</Text>
          </View>
          <View style={carouselStyles.bottomRow}>
            <Text style={carouselStyles.description} numberOfLines={1}>
              {item.description}
            </Text>
            <Text style={carouselStyles.price}>₹{item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  currentIndex,
}) => {
  return (
    <View style={styles.paginationContainer}>
      <View style={styles.paginationDotsWrapper}>
        {Array.from({ length: total }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              {
                backgroundColor: currentIndex === index ? "#FFB74D" : "#2A2A2A",
                width: currentIndex === index ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default function TabIndex() {
  const navigation = useNavigation();
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const offset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offset / slideSize);
    setActiveSlide(currentIndex);
  }, []);

  const navigateToDetails = useCallback(
    (item: ThaliItem) => {
      router.push({
        pathname: "/thalidetails",
        params: { item: JSON.stringify(item) },
      });
    },
    [router]
  );

  const filteredItems = thaliItems.filter(
    (item) =>
      (selectedCategory === "All" || item.category === selectedCategory) &&
      (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.title}>Welcome to Bhojansathi</Text>
        </View>

        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#999999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search dishes..."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.name}
              onPress={() => setSelectedCategory(category.name)}
            />
          ))}
        </ScrollView> */}

        <View style={styles.carouselContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Thalis</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.scrollViewContent}
            snapToAlignment="center"
          >
            {filteredItems.map((item) => (
              <CarouselItem
                key={item.id}
                item={item}
                onPress={() => navigateToDetails(item)}
              />
            ))}
          </ScrollView>

          <CustomPagination
            total={filteredItems.length}
            currentIndex={activeSlide}
          />
        </View>
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
    backgroundColor: "#1E1E1E",
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
  },
  greeting: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginTop: 4,
  },
  searchContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    padding: 0,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryButtonSelected: {
    backgroundColor: "#FFB74D",
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
  },
  categoryTextSelected: {
    color: "#1E1E1E",
  },
  carouselContainer: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
  },
  seeAll: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#FFB74D",
  },
  paginationContainer: {
    paddingVertical: 16,
  },
  paginationDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  scrollViewContent: {
    paddingHorizontal: 30,
  },
  paginationDotsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

const carouselStyles = StyleSheet.create({
  itemContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: "#2A2A2A",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  timeContainer: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.75)",
    padding: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  details: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FFB74D",
    marginLeft: 4,
    marginRight: 4,
  },
  reviews: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
  },
  category: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#FFB74D",
    backgroundColor: "rgba(255,183,77,0.1)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#999999",
    flex: 1,
  },
  price: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#FFB74D",
  },
});
