import { useState, useEffect } from "react";
import { C, font, cardBase } from "../../theme";

const API = "http://localhost:5000/api/admin/articles";

const emptyForm = {
  title: "",
  author: "",
  image: "",
  content: "",
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

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("adminToken");
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };

  const loadArticles = async () => {
    const res = await fetch(API, { headers });
    const data = await res.json();
    if (Array.isArray(data)) setArticles(data);
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const openAdd = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(true);
  };

  const openEdit = (a) => {
    setForm({
      title: a.title,
      author: a.author,
      image: a.image,
      content: a.content,
    });
    setEditId(a._id);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveArticle = async (e) => {
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
    loadArticles();
  };

  const deleteArticle = async (id) => {
    if (!window.confirm("Is article ko delete karna hai?")) return;
    await fetch(API + "/" + id, { method: "DELETE", headers });
    loadArticles();
  };

  const shown = articles.filter((a) =>
    (a.title + " " + a.author).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles by title or author..."
          style={{ ...inputStyle, width: 320 }}
        />
        <button onClick={openAdd} style={{ border: "none", cursor: "pointer", background: C.orange, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "11px 20px", borderRadius: 8 }}>
          + Add Article
        </button>
      </div>

      <div style={{ ...cardBase, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ color: C.orange, textAlign: "left" }}>
              {["Article", "Author", "Added on", "Actions"].map((h) => (
                <th key={h} style={{ padding: "14px 18px", fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((a) => (
              <tr key={a._id} style={{ borderTop: `1px solid ${C.line}` }}>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {a.image ? (
                      <img src={a.image} alt="" style={{ width: 64, height: 38, borderRadius: 6, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 64, height: 38, borderRadius: 6, background: `${C.indigo}1A`, color: C.indigo, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
                        {a.title.charAt(0)}
                      </div>
                    )}
                    {a.title}
                  </div>
                </td>
                <td style={{ padding: "12px 18px", color: C.muted }}>{a.author}</td>
                <td style={{ padding: "12px 18px" }}>{new Date(a.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: "12px 18px" }}>
                  <button onClick={() => openEdit(a)} style={{ border: "none", background: "none", cursor: "pointer", color: C.indigo, fontWeight: 600, fontFamily: font, marginRight: 14 }}>Edit</button>
                  <button onClick={() => deleteArticle(a._id)} style={{ border: "none", background: "none", cursor: "pointer", color: C.red, fontWeight: 600, fontFamily: font }}>Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 24, textAlign: "center", color: C.muted }}>Koi article nahi mila</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(31,27,122,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
          <form onSubmit={saveArticle} style={{ ...cardBase, width: 620, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", padding: "24px 28px" }}>
            <h2 style={{ margin: "0 0 18px", fontSize: 20, color: C.navy }}>{editId ? "Edit Article" : "Add Article"}</h2>
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Title</label>
                <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Author</label>
                <input name="author" value={form.author} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://..." style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Content</label>
                <textarea name="content" value={form.content} onChange={handleChange} required rows={7} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 20 }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ cursor: "pointer", background: "#fff", border: `1px solid ${C.line}`, fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 8 }}>
                Cancel
              </button>
              <button type="submit" style={{ cursor: "pointer", border: "none", background: C.indigo, color: "#fff", fontFamily: font, fontSize: 14, fontWeight: 600, padding: "10px 26px", borderRadius: 8 }}>
                Save Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}