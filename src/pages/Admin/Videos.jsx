import { useState, useEffect } from "react";
import { C, font, cardBase } from "../../theme";

const API = "http://localhost:5000/api/admin/videos";

const emptyForm = {
  title: "",
  category: "",
  youtubeUrl: "",
  thumbnail: "",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "10px 12px",
  border: `1px solid ${C.line}`,
  borderRadius: 6,
  fontFamily: font,
  fontSize: 14,
};

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("adminToken");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  const loadVideos = async () => {
    const res = await fetch(API, { headers });
    const data = await res.json();
    if (Array.isArray(data)) setVideos(data);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (v) => {
    setForm({
      title: v.title,
      category: v.category,
      youtubeUrl: v.youtubeUrl,
      thumbnail: v.thumbnail,
    });
    setEditId(v._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveVideo = async (e) => {
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
    loadVideos();
  };

  const deleteVideo = async (id) => {
    if (!window.confirm("Is video ko delete karna hai?")) return;
    await fetch(API + "/" + id, { method: "DELETE", headers });
    loadVideos();
  };

  const shown = videos.filter((v) =>
    (v.title + " " + v.category).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search videos by title or category..."
          style={{ ...inputStyle, width: 320 }}
        />
        <button onClick={openAdd} style={{ border: "none", cursor: "pointer", background: C.orange, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "11px 20px", borderRadius: 8 }}>
          + Add Video
        </button>
      </div>

      <div style={{ ...cardBase, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: C.orange, textAlign: "left" }}>
              {["Video", "Category", "Link", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 18px", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((v) => (
              <tr key={v._id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {v.thumbnail ? (
                      <img src={v.thumbnail} alt="" style={{ width: 64, height: 38, borderRadius: 6, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 64, height: 38, borderRadius: 6, background: `${C.indigo}1A`, color: C.indigo, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        ▶
                      </div>
                    )}
                    {v.title}
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <span style={{ background: `${C.indigo}1A`, color: C.indigo, fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>{v.category}</span>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <a href={v.youtubeUrl} target="_blank" rel="noreferrer" style={{ color: C.indigo }}>Open</a>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <button onClick={() => openEdit(v)} style={{ border: "none", background: "none", cursor: "pointer", color: C.indigo, fontWeight: 600, fontFamily: font, marginRight: 14 }}>Edit</button>
                  <button onClick={() => deleteVideo(v._id)} style={{ border: "none", background: "none", cursor: "pointer", color: C.red, fontWeight: 600, fontFamily: font }}>Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 24, textAlign: "center", color: C.muted }}>Koi video nahi mila</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(31,27,122,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <form onSubmit={saveVideo} style={{ ...cardBase, width: 560, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", padding: "24px 28px" }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 20, color: C.navy }}>{editId ? "Edit Video" : "Add Video"}</h2>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Category</label>
                <input name="category" value={form.category} onChange={handleChange} placeholder="Heart, Diabetes, Fitness..." style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>YouTube link</label>
                <input name="youtubeUrl" value={form.youtubeUrl} onChange={handleChange} required placeholder="https://www.youtube.com/watch?v=..." style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Thumbnail URL</label>
                <input name="thumbnail" value={form.thumbnail} onChange={handleChange} placeholder="https://..." style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ cursor: "pointer", background: "#fff", border: `1px solid ${C.line}`, fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 8 }}>
                Cancel
              </button>
              <button type="submit" style={{ cursor: "pointer", border: "none", background: C.indigo, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 26px", borderRadius: 8 }}>
                Save Video
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}