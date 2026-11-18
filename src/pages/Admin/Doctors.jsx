import { useState, useEffect } from "react";
import { C, font, cardBase } from "../../theme";
import uploadImage, { showImage } from "../../uploadImage";

const API = "http://localhost:5000/api/admin/doctors";

const emptyForm = {
  name: "",
  specialty: "",
  hospital: "",
  experience: "",
  fees: "",
  city: "",
  photo: "",
  about: "",
};

const fields = [
  ["name", "Name"],
  ["specialty", "Specialty"],
  ["hospital", "Hospital"],
  ["experience", "Experience (years)"],
  ["fees", "Consultation fees (₹)"],
  ["city", "City"],
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

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
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

  const loadDoctors = async () => {
    const res = await fetch(API, { headers });
    const data = await res.json();
    if (Array.isArray(data)) setDoctors(data);
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (d) => {
    setForm({
      name: d.name,
      specialty: d.specialty,
      hospital: d.hospital,
      experience: d.experience,
      fees: d.fees,
      city: d.city,
      photo: d.photo,
      about: d.about,
    });
    setEditId(d._id);
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
    if (url) setForm({ ...form, photo: url });
  };

  const saveDoctor = async (e) => {
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
    loadDoctors();
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Is doctor ko delete karna hai?")) return;
    await fetch(API + "/" + id, { method: "DELETE", headers });
    loadDoctors();
  };

  const shown = doctors.filter((d) =>
    (d.name + " " + d.specialty).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors by name or specialty..."
          style={{ ...inputStyle, width: 320 }}
        />
        <button onClick={openAdd} style={{ border: "none", cursor: "pointer", background: C.orange, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "11px 20px", borderRadius: 8 }}>
          + Add Doctor
        </button>
      </div>

      <div style={{ ...cardBase, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: C.orange, textAlign: "left" }}>
              {["Doctor", "Specialty", "Hospital", "Experience", "Fees", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 18px", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((d) => (
              <tr key={d._id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {d.photo ? (
                      <img src={showImage(d.photo)} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: `${C.indigo}1A`, color: C.indigo, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        {d.name.charAt(0)}
                      </div>
                    )}
                    {d.name}
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <span style={{ background: `${C.indigo}1A`, color: C.indigo, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>{d.specialty}</span>
                </td>
                <td style={{ padding: "12px 18px", color: C.muted }}>{d.hospital}</td>
                <td style={{ padding: "12px 18px" }}>{d.experience} years</td>
                <td style={{ padding: "12px 18px" }}>₹{d.fees}</td>
                <td style={{ padding: "12px 18px" }}>
                  <button onClick={() => openEdit(d)} style={{ border: "none", background: "none", cursor: "pointer", color: C.indigo, fontWeight: 600, fontFamily: font, marginRight: 14 }}>Edit</button>
                  <button onClick={() => deleteDoctor(d._id)} style={{ border: "none", background: "none", cursor: "pointer", color: C.red, fontWeight: 600, fontFamily: font }}>Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: "center", color: C.muted }}>Koi doctor nahi mila</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(31,27,122,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <form onSubmit={saveDoctor} style={{ ...cardBase, width: 640, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", padding: "24px 28px" }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 20, color: C.navy }}>{editId ? "Edit Doctor" : "Add Doctor"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px 18px" }}>
              {fields.map(([key, label]) => (
                <div key={key}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>{label}</label>
                  <input
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    type={key === "experience" || key === "fees" ? "number" : "text"}
                    required={key === "name" || key === "specialty"}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1 / 3" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Photo</label>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  {form.photo && (
                    <img src={showImage(form.photo)} alt="" style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover" }} />
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
                Save Doctor
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}