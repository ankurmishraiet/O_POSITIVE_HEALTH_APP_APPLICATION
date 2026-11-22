// services/insuranceService.js
import { Platform } from "react-native";
import api from "./api";

export const submitInsuranceApplication = async (formData) => {
  const doc = formData.document;

  // Log only small info (the picked object can contain a huge base64 string on web)
  console.log("Uploading document:", doc?.name, doc?.mimeType, doc?.uri);

  if (!doc?.uri) {
    throw new Error("Selected document has no file path. Please pick it again.");
  }

  const body = new FormData();

  body.append("policyHolderName", formData.policyHolder);
  body.append("city", formData.city);
  body.append("treatmentCondition", formData.treatment);
  body.append("insuranceType", formData.insuranceType);

  // Field name MUST match upload.single("insuranceDocument") on the backend
  if (Platform.OS === "web") {
    // On web, the picker returns a blob: URL. FormData needs a real File/Blob,
    // not the { uri, name, type } object used on Android/iOS.
    const fileOrBlob = doc.file || (await (await fetch(doc.uri)).blob());
    body.append("insuranceDocument", fileOrBlob, doc.name || "insurance-document");
  } else {
    body.append("insuranceDocument", {
      uri: doc.uri,
      name: doc.name || "insurance-document",
      type: doc.mimeType || "application/octet-stream",
    });
  }

  // Do NOT set Content-Type manually. The browser/RN adds the multipart boundary.
  const response = await fetch(`${api.defaults.baseURL}/insurance/apply`, {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("Insurance API Error:", json);
    const error = new Error(json.message || "Request failed");
    error.response = { data: json };
    throw error;
  }

  return json;
};