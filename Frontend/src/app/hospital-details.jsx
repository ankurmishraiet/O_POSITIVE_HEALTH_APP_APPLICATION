import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import HospitalDetailsScreen from "../components/ui/HospitalDetailsScreen";
import { BASE_URL } from "../config/api";

export default function HospitalDetails() {
  const params = useLocalSearchParams();
  const [hospital, setHospital] = useState(
    params.id
      ? null
      : {
          name: params.name,
          address: params.address,
          rating: params.rating,
          reviews: params.reviews,
          doctors: [],
        }
  );

  useEffect(() => {
    if (!params.id) {
      return;
    }
    const loadHospital = async () => {
      try {
        const res = await fetch(BASE_URL + "/hospitals/" + params.id);
        const data = await res.json();
        if (!res.ok) {
          alert(data.message);
          return;
        }

        let doctors = [];
        const doctorRes = await fetch(BASE_URL + "/doctors");
        const doctorData = await doctorRes.json();
        if (Array.isArray(doctorData)) {
          doctors = doctorData.filter(
            (item) =>
              item.hospital &&
              item.hospital.trim().toLowerCase() === data.name.trim().toLowerCase()
          );
        }

        setHospital({ ...data, doctors });
      } catch (err) {
        alert("Server se connect nahi ho paya");
      }
    };
    loadHospital();
  }, [params.id]);

  if (!hospital) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator color="#087BC1" />
      </View>
    );
  }

  return <HospitalDetailsScreen hospital={hospital} />;
}