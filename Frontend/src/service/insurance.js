import { Platform } from "react-native";
import api from "./api";

export const submitInsuranceApplication = async (formData) => {
  const doc = formData.document;

  console.log("Uploading document:", doc?.name, doc?.mimeType);

  if (!doc?.uri) {
    throw new Error("Selected document has no file path. Please pick it again.");
  }

  const body = new FormData();

  body.append("policyHolderName", formData.policyHolder);
  body.append("city", formData.city);
  body.append("treatmentCondition", formData.treatment);
  body.append("insuranceType", formData.insuranceType);

  // Field name backend ke upload.single("insuranceDocument") se match hona chahiye
  if (Platform.OS === "web") {
    // Web par blob chahiye hota hai
    const fileOrBlob = doc.file || (await (await fetch(doc.uri)).blob());
    body.append("insuranceDocument", fileOrBlob, doc.name || "insurance-document");
  } else {
    body.append("insuranceDocument", {
      uri: doc.uri,
      name: doc.name || "insurance-document",
      type: doc.mimeType || "application/octet-stream",
    });
  }

  // Naye Expo ka fetch file upload nahi karta, isliye axios use kiya
  const response = await api.post("/insurance/apply", body, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
    transformRequest: (data) => data,
  });

  return response.data;
};