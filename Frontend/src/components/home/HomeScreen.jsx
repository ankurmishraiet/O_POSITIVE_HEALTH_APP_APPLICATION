
import React from "react";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import HealthServices from "./HealthServices"
import HomeHeader from "./HomeHeader";
import HomeSearch from "./HomeSearch";
import HealthAssistant from "./HealthAssistant";
import QuickServices from "./QuickService";
import HealthProgram from "./HealthProgram";
import OurServices  from "./OurServices";
import Conditions from "./Conditions";
import Treatments from "./Treatments"
import CommunityBanner from "./CommunityBanner"
export default function HomeScreen() {
   const router = useRouter();
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <HomeSearch />
        <HealthAssistant />
        <QuickServices />
        <HealthProgram />
        <OurServices />
        <Conditions />
       <Treatments
  onTreatmentPress={(name) => {
    console.log("Selected:", name);
  }}
  onViewAllPress={() => {
    console.log("View All Treatments");
  }}
/>

<CommunityBanner
  onPress={() => router.push("/community")}
/>
<HealthServices
  onInsurancePress={() => router.push("/forms/insurance")}
  onLoanPress={() =>
    router.push("/forms/medical-loan-eligibility")
  }
  onOpinionPress={() => router.push("/forms/second-opinion")}
/>

      </ScrollView>
    </View>
  );
}
