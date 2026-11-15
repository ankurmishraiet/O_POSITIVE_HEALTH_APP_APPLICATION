import { Image, Text, View } from 'react-native';

const hospitals = [
  { id: 1, image: require('../../../assets/images/hospital-apex.png') },
  { id: 2, image: require('../../../assets/images/hospital-apollo.png') },
  { id: 3, image: require('../../../assets/images/hospital-narayana.png') },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Aman Priya Khanna',
    speciality: 'General Surgery, Laparoscopic Surgery, Proctology, Bariatric Surgery',
    experience: '14+ years',
    image: require('../../../assets/images/doctor-1.png'),
  },
  {
    id: 2,
    name: 'Dr. Ankit Vivek Potdar',
    speciality: 'Bariatric Surgery, General Surgery, Laparoscopic Surgery',
    experience: '13+ years',
    image: require('../../../assets/images/doctor-2.png'),
  },
  {
    id: 3,
    name: 'Dr. Darshna Amol Wahane',
    speciality: 'Obstetrics and Gynaecology',
    experience: '19+ years',
    image: require('../../../assets/images/doctor-3.png'),
  },
];

const cardShadow = {
  shadowColor: '#2846A0',
  shadowOpacity: 0.12,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 3 },
  elevation: 5,
};

function SectionHeader({ title }) {
  return (
    <View className="mb-[10px] mt-[10px] flex-row items-center justify-between px-6">
      <Text className="text-[23px] font-extrabold text-[#111111]">{title}</Text>
      <Text className="text-[13px] font-extrabold text-[#1B5FD8]">View All</Text>
    </View>
  );
}

export default function HomeHospitals() {
  return (
    <View className="bg-white pb-6">
      <SectionHeader title="Our Hospitals" />

      <View className="flex-row px-[17px]">
        {hospitals.map((item, index) => (
          <View
            key={item.id}
            className={
              index === hospitals.length - 1
                ? 'h-[108px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white'
                : 'mr-[13px] h-[108px] flex-1 items-center justify-center overflow-hidden rounded-2xl bg-white'
            }
            style={cardShadow}
          >
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </View>
        ))}
      </View>

      <SectionHeader title="Our Doctors" />

      {doctors.map((item) => (
        <View
          key={item.id}
          className="mx-4 mb-[10px] flex-row items-center rounded-2xl bg-white px-4 py-[14px]"
          style={cardShadow}
        >
          <Image
            source={item.image}
            style={{ width: 88, height: 88, borderRadius: 44 }}
            resizeMode="cover"
          />
          <View className="ml-[14px] flex-1">
            <Text className="text-[14.5px] font-extrabold text-[#111111]">
              {item.name}
            </Text>
            <Text className="mt-1 text-[11px] leading-[15px] text-[#666666]">
              {item.speciality}
            </Text>
            <Text className="mt-2 text-[12px] text-[#555555]">
              Experience:{' '}
              <Text className="font-bold text-[#111111]">{item.experience}</Text>
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}