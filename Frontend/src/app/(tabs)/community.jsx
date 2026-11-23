import { SafeAreaView } from "react-native-safe-area-context";
import CommunityScreen from "../../components/home/CommunityScreen";

// Bottom bar ke Community tab ke liye, Khushi ka CommunityScreen dikhata hai
export default function CommunityTab() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }} edges={["top"]}>
      <CommunityScreen />
    </SafeAreaView>
  );
}