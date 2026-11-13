import { useLocalSearchParams } from "expo-router";
import HospitalDetailsScreen from "../components/ui/HospitalDetailsScreen";

export default function HospitalDetails() {
  const params = useLocalSearchParams();

  const hospital = {
    name: params.name,
    address: params.address,
    rating: params.rating,
    reviews: params.reviews,
  };

  return <HospitalDetailsScreen hospital={hospital} />;
}