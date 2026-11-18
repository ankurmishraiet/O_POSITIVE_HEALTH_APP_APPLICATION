import { cardBase, C } from "../../theme";

export default function ComingSoon({ title }) {
  return (
    <div style={{ ...cardBase, padding: 32 }}>
      <h2 style={{ margin: 0, color: C.indigo }}>{title}</h2>
      <p style={{ color: C.muted }}>This page is not built yet.</p>
    </div>
  );
}