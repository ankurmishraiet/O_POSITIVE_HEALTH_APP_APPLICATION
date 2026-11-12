
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Path,
} from "react-native-svg";

// SVG Community Illustration
const CommunityIllustration = () => {
  return (
    <Svg width="145" height="130" viewBox="0 0 180 150">

      {/* Background shapes */}
      <Circle cx="145" cy="28" r="20" fill="#D7E8FF" />
      <Circle cx="30" cy="40" r="18" fill="#D7E8FF" />

      {/* Back person */}
      <Path
        d="M65 75 Q65 45 90 45 Q115 45 115 75 L120 130 L60 130 Z"
        fill="#087BC1"
      />
      <Circle cx="90" cy="35" r="17" fill="#F2B58E" />
      <Path
        d="M73 33 Q72 12 92 15 Q109 17 108 36 Q96 24 73 33"
        fill="#302B32"
      />

      {/* Left person */}
      <Path
        d="M20 105 Q20 65 48 65 Q76 65 76 105 L80 145 L15 145 Z"
        fill="#F58220"
      />
      <Circle cx="48" cy="57" r="17" fill="#C98660" />
      <Path
        d="M31 56 Q30 35 49 37 Q68 37 66 57 Q48 44 31 56"
        fill="#29232A"
      />

      {/* Right person */}
      <Path
        d="M112 105 Q112 66 140 66 Q168 66 168 105 L172 145 L108 145 Z"
        fill="#E95D72"
      />
      <Circle cx="140" cy="58" r="17" fill="#E9A77E" />
      <Path
        d="M123 57 Q121 36 141 37 Q161 38 158 58 Q144 43 123 57"
        fill="#29232A"
      />

      {/* Doctor / middle front person */}
      <Path
        d="M65 112 Q65 85 90 85 Q115 85 115 112 L118 150 L62 150 Z"
        fill="#FFFFFF"
        stroke="#087BC1"
        strokeWidth="2"
      />
      <Circle cx="90" cy="79" r="15" fill="#D99B76" />
      <Path
        d="M75 77 Q74 59 91 61 Q106 61 105 78 Q92 68 75 77"
        fill="#302B32"
      />

      {/* Doctor coat details */}
      <Path
        d="M83 96 L90 108 L97 96"
        fill="none"
        stroke="#087BC1"
        strokeWidth="2"
      />

      {/* Decorative medical cross */}
      <Circle cx="153" cy="16" r="11" fill="#A5C83C" />
      <Path
        d="M153 10 V22 M147 16 H159"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Ground */}
      <Ellipse
        cx="90"
        cy="145"
        rx="75"
        ry="4"
        fill="#C7DDF7"
      />

    </Svg>
  );
};

const CommunityBanner = ({ onPress }) => {
  return (
    <View className="mx-4 mt-6 bg-[#EAF3FF] rounded-[20px] p-5 overflow-hidden">

      {/* Banner Content */}
      <View className="flex-row items-center">

        {/* Left Text */}
        <View className="flex-1">
          <Text className="text-[23px] font-extrabold text-[#123D83] leading-[29px]">
            O Positive{"\n"}Community
          </Text>

          <Text className="text-[14px] font-semibold text-[#17213B] mt-4 leading-[21px]">
            Ask Health Questions,{"\n"}
            Get Expert Answers
          </Text>
        </View>

        {/* SVG Illustration */}
        <View className="items-center justify-center">
          <CommunityIllustration />
        </View>

      </View>

      {/* Community Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        className="bg-[#F58220] h-[48px] rounded-full flex-row items-center justify-center mt-6"
        style={{
          elevation: 4,
          shadowColor: "#F58220",
          shadowOpacity: 0.2,
          shadowRadius: 5,
          shadowOffset: {
            width: 0,
            height: 3,
          },
        }}
      >
        <Text className="text-white text-[15px] font-extrabold mr-2">
          Go to Community
        </Text>

        <Text className="text-white text-[21px] font-bold">
          →
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default CommunityBanner;
