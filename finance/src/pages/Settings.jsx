import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

function Settings() {
  const { darkMode, setDarkMode } = useContext(FinanceContext);

  const [name, setName] = useState(localStorage.getItem("userName") || "sreeja");
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "sreeja@email.com");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "INR");
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem("notifications")) || false
  );

  const saveProfile = () => {
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    alert("Profile Updated Successfully! ✅");
  };

  const savePreferences = () => {
    localStorage.setItem("currency", currency);
    localStorage.setItem("notifications", notifications);
    alert("Preferences Saved! ⚙️");
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      localStorage.clear();
      alert("All data cleared. Refreshing page...");
      window.location.reload();
    }
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    transition: "all 0.3s ease",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "transparent",
  };

  const cardStyle = (darkMode, lightColor) => ({
    background: lightColor, 
    padding: "25px",
    borderRadius: "24px",
    boxShadow: darkMode 
      ? "0 10px 30px rgba(0,0,0,0.5)" 
      : "0 8px 20px rgba(0,0,0,0.06)",
    color: "#2d3436", 
    transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "1px solid rgba(255,255,255,0.5)",
    marginBottom: "25px",
    filter: darkMode ? "brightness(0.9)" : "none", 
  });

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(0,0,0,0.1)",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#333",
    marginTop: "8px",
    marginBottom: "15px",
    fontSize: "14px",
    outline: "none",
  };

  const buttonStyle = (bgColor) => ({
    padding: "12px 24px",
    border: "none",
    borderRadius: "12px",
    background: bgColor || "#4f46e5",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "0.2s ease",
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ 
        color: darkMode ? "#f1f5f9" : "#1e293b", 
        fontSize: "32px", 
        fontWeight: "800", 
        marginTop: "10px",   
        marginBottom: "15px" 
      }}>Settings ⚙️</h1>

      {/* User Profile - Soft Aqua Blue */}
      <div style={cardStyle(darkMode, "#b6f3f0")}>
        <h2 style={{ marginTop: 0 }}>👤 User Profile</h2>
        <label style={{ fontWeight: "600", fontSize: "14px" }}>Full Name</label>
        <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} />
        
        <label style={{ fontWeight: "600", fontSize: "14px" }}>Email Address</label>
        <input style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
        
        <button style={buttonStyle("#51c6ba")} onClick={saveProfile}>Save Profile</button>
      </div>

      {/* Appearance - Soft Lavender */}
      <div style={cardStyle(darkMode, "#e6d7e8")}>
        <h2 style={{ marginTop: 0 }}>🎨 Appearance</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input
            type="checkbox"
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span style={{ fontSize: "16px", fontWeight: "600" }}>Enable Dark Mode Experience</span>
        </div>
      </div>

      {/* Preferences - Soft Mint */}
      <div style={cardStyle(darkMode, "#c4d6c6")}>
        <h2 style={{ marginTop: 0 }}>⚙️ Preferences</h2>
        <label style={{ fontWeight: "600", fontSize: "14px" }}>Base Currency</label>
        <select style={inputStyle} value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option>INR</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
          <label style={{ fontWeight: "600" }}>Push Notifications</label>
        </div>
        
        <button style={buttonStyle("#2e7d32")} onClick={savePreferences}>Save Preferences</button>
      </div>

      {/* Data Management - Soft Rose */}
      <div style={cardStyle(darkMode, "#f0e0e1")}>
        <h2 style={{ marginTop: 0 }}>📊 Data Management</h2>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={buttonStyle("#546e7a")}>Export CSV</button>
          <button style={buttonStyle("#546e7a")}>Export JSON</button>
        </div>
        <button onClick={resetData} style={buttonStyle("#e11d48", {marginTop: '20px'})}>
          Reset All Data
        </button>
      </div>

      {/* App Info - Subtle Grey */}
      <div style={cardStyle(darkMode, "#d3d7dc")}>
        <h2 style={{ marginTop: 0 }}>ℹ️ App Information</h2>
        <p style={{ margin: "5px 0" }}>✨ <b>Finance Dashboard</b> v1.0</p>
        <p style={{ margin: "5px 0" }}>🔥 Role Based Finance Dashboard UI</p>
        <p style={{ margin: "5px 0" }}>💻 Developed by <b>Sreeja Kasukurthi</b></p>
        <p style={{ margin: "5px 0" }}>🚀 Built with React & Love</p>
      </div>
    </div>
  );
}

export default Settings;