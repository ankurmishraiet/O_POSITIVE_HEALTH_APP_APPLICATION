import { useState, useEffect } from "react";
import { C, font, cardBase } from "../../theme";
import uploadImage, { showImage } from "../../uploadImage";

const API = "http://localhost:5000/api/admin/hospitals";

const emptyForm = {
  name: "",
  city: "",
  phone: "",
  rating: "",
  ratingCount: "",
  address: "",
  image: "",
  about: "",
};

const fields = [
  ["name", "Hospital name"],
  ["city", "City"],
  ["phone", "Phone"],
  ["rating", "Rating (0 to 5)"],
  ["ratingCount", "Number of ratings"],
];

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: `1px solid ${C.line}`,
  borderRadius: 6,
  fontFamily: font,
  fontSize: 14,
};

export default function Hospitals() {
  const [hospitals, setHospitals] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("adminToken");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  const loadHospitals = async () => {
    const res = await fetch(API, { headers });
    const data = await res.json();
    if (Array.isArray(data)) setHospitals(data);
  };

  useEffect(() => {
    loadHospitals();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (h) => {
    // purane hospitals mein naye fields nahi hote, isliye || "" lagaya hai
    setForm({
      name: h.name,
      city: h.city,
      phone: h.phone,
      rating: h.rating || "",
      ratingCount: h.ratingCount || "",
      address: h.address,
      image: h.image,
      about: h.about,
    });
    setEditId(h._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const chooseImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);
    if (url) setForm({ ...form, image: url });
  };

  const saveHospital = async (e) => {
    e.preventDefault();
    const url = editId ? API + "/" + editId : API;
    const method = editId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    setShowForm(false);
    loadHospitals();
  };

  const deleteHospital = async (id) => {
    if (!window.confirm("Is hospital ko delete karna hai?")) return;
    await fetch(API + "/" + id, { method: "DELETE", headers });
    loadHospitals();
  };

  const shown = hospitals.filter((h) =>
    (h.name + " " + h.city).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search hospitals by name or city..."
          style={{ ...inputStyle, width: 320 }}
        />
        <button onClick={openAdd} style={{ border: "none", cursor: "pointer", background: C.orange, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "11px 20px", borderRadius: 8 }}>
          + Add Hospital
        </button>
      </div>

      <div style={{ ...cardBase, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: C.orange, textAlign: "left" }}>
              {["Hospital", "City", "Address", "Phone", "Rating", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 18px", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((h) => (
              <tr key={h._id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {h.image ? (
                      <img src={showImage(h.image)} alt="" style={{ width: 38, height: 38, borderRadius: 8, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: `${C.indigo}1A`, color: C.indigo, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        {h.name.charAt(0)}
                      </div>
                    )}
                    {h.name}
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <span style={{ background: `${C.indigo}1A`, color: C.indigo, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>{h.city}</span>
                </td>
                <td style={{ padding: "12px 18px", color: C.muted }}>{h.address}</td>
                <td style={{ padding: "12px 18px" }}>{h.phone}</td>
                <td style={{ padding: "12px 18px" }}>{h.rating > 0 ? "★ " + h.rating : "-"}</td>
                <td style={{ padding: "12px 18px" }}>
                  <button onClick={() => openEdit(h)} style={{ border: "none", background: "none", cursor: "pointer", color: C.indigo, fontWeight: 600, fontFamily: font, marginRight: 14 }}>Edit</button>
                  <button onClick={() => deleteHospital(h._id)} style={{ border: "none", background: "none", cursor: "pointer", color: C.red, fontWeight: 600, fontFamily: font }}>Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: "center", color: C.muted }}>Koi hospital nahi mila</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(31,27,122,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <form onSubmit={saveHospital} style={{ ...cardBase, width: 640, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", padding: "24px 28px" }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 20, color: C.navy }}>{editId ? "Edit Hospital" : "Add Hospital"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 18px" }}>
              {fields.map(([key, label]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</label>
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    type={key === "rating" || key === "ratingCount" ? "number" : "text"}
                    min={key === "rating" || key === "ratingCount" ? 0 : undefined}
                    max={key === "rating" ? 5 : undefined}
                    step={key === "rating" ? "0.1" : undefined}
                    required={key === "name"}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Address</label>
                <input name="address" value={form.address} onChange={handleChange} style={inputStyle} />
              </div>
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Image</label>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {form.image && (
                    <img src={showImage(form.image)} alt="" style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }} />
                  )}
                  <input type="file" accept="image/*" onChange={chooseImage} />
                  {uploading && <span style={{ fontSize: 13, color: C.muted }}>Uploading...</span>}
                </div>
              </div>
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>About</label>
                <textarea name="about" value={form.about} onChange={handleChange} rows={3} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ cursor: "pointer", background: "#fff", border: `1px solid ${C.line}`, fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 8 }}>
                Cancel
              </button>
              <button type="submit" style={{ cursor: "pointer", border: "none", background: C.indigo, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 26px", borderRadius: 8 }}>
                Save Hospital
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}