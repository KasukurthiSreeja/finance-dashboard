import { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";
import { Bell, ShieldCheck, Eye, Wallet } from "lucide-react"; 

function Navbar() {
  const { role, setRole, darkMode } = useContext(FinanceContext);
  const [name, setName] = useState("sreeja");

  useEffect(() => {
    const updateName = () => {
      const storedName = localStorage.getItem("userName") || "sreeja";
      setName(storedName);
    };

    updateName();
    window.addEventListener("storage", updateName);
    return () => window.removeEventListener("storage", updateName);
  }, []);

  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 40px",
    background: darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)", 
    backdropFilter: "blur(12px)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: darkMode ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.08)",
    borderBottom: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  };

  const roleSwitcherStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "6px 12px",
    borderRadius: "12px",
    background: darkMode ? "rgba(255,255,255,0.08)" : "#f1f5f9",
    border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e2e8f0",
  };

  const selectStyle = {
    padding: "2px 4px",
    borderRadius: "8px",
    border: "none",
    background: "transparent",
    color: darkMode ? "#ffffff" : "#1e293b", 
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
    outline: "none",
  };

  const profileContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: darkMode ? "#6366f1" : "#b6f3f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "16px",
    color: darkMode ? "white" : "#1e293b",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    cursor: "pointer",
    zIndex: 2,
  };

  const notificationStyle = {
    position: "absolute",
    top: "48px",
    right: "-10px",
    background: darkMode ? "#4f46e5" : "#ffffff", 
    color: darkMode ? "#ffffff" : "#4f46e5",
    padding: "5px 14px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    border: darkMode ? "1px solid rgba(255,255,255,0.2)" : "1px solid #4f46e5",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    animation: "slideNotification 3s ease-in-out infinite",
  };

  const keyframes = `
    @keyframes slideNotification {
      0% { transform: translateY(0); opacity: 0.9; }
      50% { transform: translateY(5px); opacity: 1; }
      100% { transform: translateY(0); opacity: 0.9; }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <nav style={navStyle}>
        {/* Added Wallet Symbol next to Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Wallet size={24} color={darkMode ? "#818cf8" : "#4f46e5"} />
          <h2 style={{ 
            margin: 0, 
            fontSize: "22px", 
            fontWeight: "900", 
            letterSpacing: "-0.5px",
            color: darkMode ? "#ffffff" : "#0f172a" 
          }}>
            Finance Dashboard
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={roleSwitcherStyle}>
            {role === "admin" ? (
              <ShieldCheck size={16} color="#10b981" />
            ) : (
              <Eye size={16} color="#6366f1" />
            )}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={selectStyle}
            >
              <option value="viewer">Viewer Mode</option>
              <option value="admin">Admin Access</option>
            </select>
          </div>

          <Bell size={20} color={darkMode ? "#cbd5e1" : "#475569"} style={{ cursor: "pointer" }} />
          
          <div style={profileContainerStyle}>
            <div style={avatarStyle}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div style={notificationStyle}>
              Welcome, {name} 👋
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;