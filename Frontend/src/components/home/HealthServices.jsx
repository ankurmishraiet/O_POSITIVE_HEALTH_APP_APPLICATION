
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Svg, {
  Path,
  Circle,
  Rect,
  Ellipse,
  G,
} from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";

// 1. Insurance SVG Illustration
const InsuranceIcon = () => (
  <Svg width={65} height={75} viewBox="0 0 65 75">
    <Path
      d="M32 3 L58 13 V33 Q56 54 32 68 Q8 54 7 33 V13 Z"
      fill="#087BC1"
    />
    <Path
      d="M32 9 L52 17 V33 Q50 49 32 60 Q14 49 13 33 V17 Z"
      fill="#D7EBFF"
    />
    <Path
      d="M32 18 L46 24 V34 Q44 46 32 52 Q20 46 18 34 V24 Z"
      fill="#FFFFFF"
    />
    <Path
      d="M29 25 H35 V31 H41 V37 H35 V43 H29 V37 H23 V31 H29 Z"
      fill="#087BC1"
    />
  </Svg>
);

// 2. Medical Loan SVG Illustration
const LoanIcon = () => (
  <Svg width={65} height={75} viewBox="0 0 65 75">
    <Path
      d="M23 12 L16 3 L27 5 L32 10 L38 5 L49 3 L42 14"
      fill="#F58220"
    />
    <Path
      d="M25 13 Q32 17 40 13 L47 25 L55 55 Q55 66 32 68 Q9 66 10 55 L18 25 Z"
      fill="#F58220"
    />
    <Path
      d="M25 16 Q32 20 40 16"
      stroke="#D75A00"
      strokeWidth={2}
      fill="none"
    />
    <Circle cx="32" cy="42" r="16" fill="#FFFFFF" />
    <Path
      d="M35 29 Q24 25 23 34 Q22 41 34 42 Q43 44 39 53 Q35 60 24 55"
      stroke="#F58220"
      strokeWidth={3}
      fill="none"
      strokeLinecap="round"
    />
    <Path
      d="M32 25 V59"
      stroke="#F58220"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

// 3. Second Opinion SVG Illustration
const OpinionIcon = () => (
  <Svg width={75} height={75} viewBox="0 0 75 75">
    {/* Center Person */}
    <Circle cx="37" cy="18" r="10" fill="#087BC1" />
    <Path
      d="M19 56 Q19 34 37 34 Q55 34 55 56"
      stroke="#087BC1"
      strokeWidth={8}
      fill="none"
      strokeLinecap="round"
    />

    {/* Left Person */}
    <Circle cx="13" cy="34" r="7" fill="#436DDA" />
    <Path
      d="M3 57 Q3 42 15 42 Q22 42 24 49"
      stroke="#436DDA"
      strokeWidth={6}
      fill="none"
      strokeLinecap="round"
    />

    {/* Right Person */}
    <Circle cx="62" cy="34" r="7" fill="#436DDA" />
    <Path
      d="M72 57 Q72 42 60 42 Q53 42 51 49"
      stroke="#436DDA"
      strokeWidth={6}
      fill="none"
      strokeLinecap="round"
    />

    {/* Base */}
    <Path
      d="M9 60 Q37 71 66 60"
      stroke="#087BC1"
      strokeWidth={4}
      fill="none"
      strokeLinecap="round"
    />
  </Svg>
);

// Reusable Service Card
const ServiceCard = ({
  title,
  description,
  features,
  buttonText,
  background,
  icon,
  onPress,
  textColor = "#17213B",
}) => {
  return (
    <View
      className="rounded-[20px] p-4 mb-3 overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <View className="flex-row justify-between">

        {/* Left Content */}
        <View className="flex-1 pr-1">

          <Text className="text-[19px] font-extrabold text-[#17213B]">
            {title}
          </Text>

          <Text className="text-[13px] font-semibold text-[#263449] mt-1 mb-2">
            {description}
          </Text>

          {/* Feature List */}
          {features.map((feature, index) => (
            <View
              key={index}
              className="flex-row items-center mb-[3px]"
            >
              <Ionicons
                name="checkmark"
                size={16}
                color={textColor}
              />

              <Text className="text-[12px] font-medium text-[#344054] ml-1 flex-1">
                {feature}
              </Text>
            </View>
          ))}

        </View>

        {/* Right SVG Icon */}
        <View className="w-[65px] items-center justify-start pt-1">
          {icon}
        </View>

      </View>

      {/* CTA Button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        className="bg-[#F58220] h-[43px] rounded-full flex-row items-center justify-center mt-3"
        style={{
          elevation: 3,
          shadowColor: "#F58220",
          shadowOpacity: 0.2,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text className="text-white text-[14px] font-extrabold mr-2">
          {buttonText}
        </Text>

        <Ionicons
          name="arrow-forward"
          size={18}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

// Main Component
const HealthServices = ({
  onInsurancePress,
  onLoanPress,
  onOpinionPress,
}) => {
  return (
    <View className="px-4 mt-4">

      {/* Insurance Assistance */}
      <ServiceCard
        title="Have Insurance?"
        description="We provide complete insurance assistance"
        background="#EAF4FF"
        textColor="#087BC1"
        icon={<InsuranceIcon />}
        features={[
          "Hassle-Free Approval",
          "No Paperwork",
          "Cashless Facilitation",
          "Reimbursement Facilitation",
          "No Charges",
        ]}
        buttonText="Check Cashless Facility"
        onPress={onInsurancePress}
      />

      {/* Medical Loan */}
      <ServiceCard
        title="Need Medical Loan?"
        description="We provide loan at zero interest"
        background="#FFF0E1"
        textColor="#A33A18"
        icon={<LoanIcon />}
        features={[
          "Easy & Flexible EMIs at 0% Interest",
          "Instant Approval",
          "No Processing Charges",
          "Get Healthy Now - Pay Later",
        ]}
        buttonText="Check Eligibility"
        onPress={onLoanPress}
      />

      {/* Second Opinion */}
      <ServiceCard
        title="Want Second Opinion?"
        description="We provide free second opinion"
        background="#F1E9FF"
        textColor="#3158C8"
        icon={<OpinionIcon />}
        features={[
          "Upload test reports",
          "Free consultation with top surgeons",
          "Get more clarity on treatment options",
        ]}
        buttonText="Upload Reports"
        onPress={onOpinionPress}
      />

    </View>
  );
};

export default HealthServices;
