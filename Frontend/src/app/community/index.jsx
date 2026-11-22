import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CommunityScreen from "../../components/home/CommunityScreen";

export default function Community() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <View style={{ paddingHorizontal: 12, paddingTop: 4 }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ flexDirection: "row", alignItems: "center", padding: 4 }}
        >
          <Ionicons name="chevron-back" size={24} color="#123D83" />
          <Text style={{ color: "#123D83", fontWeight: "600", fontSize: 15 }}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      <CommunityScreen />
    </SafeAreaView>
  );
}