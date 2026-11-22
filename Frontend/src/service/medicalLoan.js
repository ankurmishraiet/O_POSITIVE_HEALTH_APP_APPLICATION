// services/medicalLoanService.js
import api from "./api";

export const submitMedicalLoanApplication = async (formData) => {
  try {
    const response = await api.post("/medical-loan/apply", {
      patientName: formData.patientName,
      city: formData.city,
      monthlyIncome: formData.monthlyIncome,
      // Backend expects "treatmentCondition", not "treatment"
      treatmentCondition: formData.treatment,
      // Optional: add userId if you have a logged-in user
      // userId: formData.userId,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Medical Loan API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};