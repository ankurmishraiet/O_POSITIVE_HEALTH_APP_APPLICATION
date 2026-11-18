const uploadImage = async (file) => {
  const token = localStorage.getItem("adminToken");
  const body = new FormData();
  body.append("image", file);

  const res = await fetch("http://localhost:5000/api/admin/upload", {
    method: "POST",
    headers: { Authorization: "Bearer " + token },
    body,
  });

  const data = await res.json();
  if (!res.ok) {
    alert(data.message || "Upload nahi hua");
    return null;
  }
  return data.url;
};

export const showImage = (url) => {
  if (!url) return "";
  return url.startsWith("/") ? "http://localhost:5000" + url : url;
};

export default uploadImage;