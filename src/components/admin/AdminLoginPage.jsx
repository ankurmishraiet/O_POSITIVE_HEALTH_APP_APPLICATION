import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* O Positive Health theme (taken from the logo) */
const BLUE = "#2E35B5";
const NAVY = "#1B2380";
const ORANGE = "#F7941D";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
html,body,#root{margin:0;min-height:100%}
.op-page{position:fixed;inset:0;overflow:auto;display:flex;align-items:center;justify-content:center;padding:32px;box-sizing:border-box;
  font-family:'Montserrat',system-ui,sans-serif;
  background:linear-gradient(135deg,${NAVY} 0%,${BLUE} 55%,${ORANGE} 140%);}
.op-shell{width:100%;max-width:1000px;background:#fff;display:grid;grid-template-columns:380px 1fr;align-items:center;
  gap:24px;padding:48px;border-radius:6px;box-shadow:0 20px 50px rgba(0,0,0,.25);box-sizing:border-box}
.op-art-wrap{display:flex;align-items:center;justify-content:center}
.op-card{background:#fff;border-radius:10px;padding:32px 28px;box-shadow:0 10px 40px rgba(46,53,181,.15)}
.op-brand{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-weight:700;color:${BLUE};font-size:13px}
.op-card h1{margin:0 0 4px;font-size:24px;color:${NAVY}}
.op-sub{margin:0 0 22px;font-size:13px;color:#8a8fa8}
.op-sub a,.op-forgot{color:${ORANGE};font-weight:500}
.op-forgot{font-size:11px}
.op-row{display:flex;justify-content:space-between;align-items:baseline}
.op-card label{display:block;font-size:12px;font-weight:600;color:${NAVY};margin-bottom:6px}
.op-input{width:100%;box-sizing:border-box;padding:12px 14px;margin-bottom:16px;border:1px solid #b9bdd6;border-radius:5px;
  font:inherit;font-size:13px;color:${NAVY};outline:none}
.op-input:focus{border-color:${BLUE};box-shadow:0 0 0 3px rgba(46,53,181,.18)}
.op-remember{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b708c;margin-bottom:20px}
.op-remember input{accent-color:${BLUE}}
.op-login{width:100%;padding:12px;border:0;border-radius:5px;background:${BLUE};color:#fff;font:inherit;font-size:12px;
  font-weight:700;letter-spacing:.06em;cursor:pointer;transition:background .15s}
.op-login:hover{background:${NAVY}}
.op-login:focus-visible,.op-social:focus-visible{outline:3px solid ${ORANGE};outline-offset:2px}
.op-or{display:flex;align-items:center;gap:10px;margin:18px 0;font-size:11px;color:#9aa0bb}
.op-or::before,.op-or::after{content:"";flex:1;height:1px;background:#e3e5f0}
.op-socials{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.op-social{display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;background:#fff;border-radius:5px;
  font:inherit;font-size:11px;font-weight:700;cursor:pointer}
.op-google{border:1px solid ${ORANGE};color:#d9780a}
.op-facebook{border:1px solid ${BLUE};color:${BLUE}}
.op-art{width:100%;height:auto;max-height:420px}
@media(max-width:860px){.op-shell{grid-template-columns:1fr;padding:20px}.op-art-wrap{display:none}}
`;

function Illustration() {
  return (
    <svg className="op-art" viewBox="0 0 440 400" role="img" aria-label="Person signing in at a desk">
      {/* floating icons */}
      <circle cx="150" cy="70" r="14" fill={ORANGE} />
      <rect x="144" y="70" width="12" height="9" rx="2" fill="#fff" />
      <path d="M147 70v-3a3 3 0 0 1 6 0v3" stroke="#fff" strokeWidth="1.5" fill="none" />
      <circle cx="205" cy="45" r="15" fill="#FDE3C2" />
      <rect x="197" y="40" width="16" height="11" rx="2" fill={ORANGE} />
      <circle cx="262" cy="35" r="10" fill="#22A06B" />
      <path d="M257 35l4 4 6-8" stroke="#fff" strokeWidth="2" fill="none" />
      <circle cx="300" cy="75" r="12" fill={BLUE} />
      <circle cx="300" cy="72" r="3.5" fill="#fff" />
      <path d="M293 81a7 6 0 0 1 14 0z" fill="#fff" />
      {/* monitor */}
      <rect x="215" y="95" width="170" height="125" rx="8" fill="#C9CCF2" />
      <rect x="225" y="104" width="150" height="104" rx="4" fill="#E9EAFB" />
      <rect x="265" y="112" width="70" height="88" rx="5" fill="#F6F6FC" />
      <circle cx="300" cy="136" r="11" fill={BLUE} />
      <circle cx="300" cy="133" r="3.5" fill="#fff" />
      <path d="M293 141a7 5 0 0 1 14 0z" fill="#fff" />
      <rect x="280" y="156" width="40" height="3" rx="1.5" fill="#cfd1ea" />
      <rect x="284" y="164" width="32" height="3" rx="1.5" fill="#cfd1ea" />
      <rect x="292" y="180" width="16" height="7" rx="3.5" fill="#d9dbef" />
      <rect x="290" y="220" width="20" height="14" fill="#C9CCF2" />
      <rect x="265" y="232" width="70" height="8" rx="4" fill="#C9CCF2" />
      {/* folders */}
      <rect x="395" y="148" width="14" height="82" rx="2" fill={ORANGE} />
      <rect x="410" y="148" width="14" height="82" rx="2" fill="#7C83E6" />
      <rect x="425" y="148" width="14" height="82" rx="2" fill={BLUE} />
      {/* mug */}
      <rect x="360" y="212" width="22" height="18" rx="4" fill={ORANGE} />
      {/* desk */}
      <rect x="150" y="238" width="290" height="9" rx="4" fill="#8C92E8" />
      <path d="M185 247l-28 140h12l28-140zM395 247l22 140h-12l-22-140z" fill="#8C92E8" />
      <path d="M425 247l22 140h-12l-22-140z" fill="#8C92E8" opacity="0" />
      {/* chair */}
      <rect x="55" y="215" width="55" height="105" rx="8" fill="#C9CCF2" />
      <path d="M70 320l-15 70h10l18-70zM140 320l10 70h-10l-18-70z" fill="#A9AEEE" />
      <rect x="62" y="305" width="100" height="14" rx="7" fill="#B7BBF0" />
      {/* person */}
      <path d="M110 120c-30 10-45 60-30 110 10 25 35 30 45 15l-5-120z" fill={NAVY} />
      <circle cx="132" cy="108" r="20" fill="#F2C6A5" />
      <path d="M112 105c0-22 22-30 38-18 6 5 4 15-6 12-12-2-22 2-26 12z" fill={NAVY} />
      <path d="M118 128c-10 20-20 60-12 100h50l28-8 50-26-6-14-48 12-12-40z" fill={ORANGE} />
      <path d="M200 186l46-6 4 12-44 12z" fill="#F2C6A5" />
      <path d="M130 225l60 10 40 70-8 6-44-48-40 6z" fill={NAVY} />
      <path d="M150 300l10 75h10l-6-75z" fill="#fff" opacity="0" />
      <path d="M150 232c10 30 20 80 20 130h24l-6-125z" fill={BLUE} />
      <rect x="148" y="355" width="42" height="12" rx="6" fill={NAVY} />
      {/* briefcase */}
      <rect x="215" y="350" width="62" height="38" rx="4" fill="#8C92E8" />
      <path d="M235 350v-8a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v8" stroke={NAVY} strokeWidth="4" fill="none" />
      <rect x="270" y="350" width="7" height="38" fill={NAVY} />
      {/* plant */}
      <path d="M385 300c-30-5-35-45 5-45 15 15 15 35-5 45z" fill={ORANGE} />
      <path d="M400 300c-5-30 8-55 20-60 10 20 0 50-20 60z" fill={BLUE} />
      <path d="M410 300c10-15 30-20 40-15-5 15-20 25-40 15z" fill={NAVY} />
      <path d="M375 300h40l-6 50h-28z" fill="#5A2D82" opacity="0" />
      <path d="M380 320h40l-5 55h-30z" fill={NAVY} />
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: replace with your real auth API call.
    // Only save the token and navigate if the API says login succeeded.
    localStorage.setItem("adminToken", "demo-token");

    navigate("/admin/dashboard");
  };

  return (
    <div className="op-page">
      <style>{css}</style>
      <div className="op-shell">
        <div className="op-card">
          <div className="op-brand" aria-label="O Positive Health">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <circle cx="13" cy="13" r="12" fill="none" stroke={ORANGE} strokeWidth="2" />
              <path d="M10 6h6v4h4v6h-4v4h-6v-4H6v-6h4z" fill={BLUE} />
            </svg>
            O Positive Health
          </div>

          <h1>Login</h1>
          <p className="op-sub">
            Doesn’t have an account yet? <a href="/signup">Sign Up</a>
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" className="op-input" placeholder="you@example.com"
              value={email} onChange={(e) => setEmail(e.target.value)} required />

            <div className="op-row">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password" className="op-forgot">Forgot Password?</a>
            </div>
            <input id="password" type="password" className="op-input" placeholder="Enter 6 character or more"
              minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} required />

            <label className="op-remember" style={{ fontWeight: 400 }}>
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              Remember me
            </label>

            <button type="submit" className="op-login">LOGIN</button>
          </form>

          <div className="op-or">or login with</div>

          <div className="op-socials">
            <button type="button" className="op-social op-google">
              <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.7 2.4 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z" />
                <path fill="#FBBC05" d="M10.4 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z" />
                <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.6l-7.6-5.9c-2.1 1.4-4.8 2.3-7.6 2.3-6.3 0-11.7-4.1-13.6-9.8l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
              </svg>
              Google
            </button>
            <button type="button" className="op-social op-facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill={BLUE} d="M14 8V6.5c0-.7.2-1 1.2-1H17V2h-2.7C11.5 2 10 3.7 10 6.2V8H7.5v3.5H10V22h4V11.5h2.7L17 8z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>

        <div className="op-art-wrap">
          <Illustration />
        </div>
      </div>
    </div>
  );
}