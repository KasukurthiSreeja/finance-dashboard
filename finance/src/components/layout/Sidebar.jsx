import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function Sidebar() {
  const { darkMode } = useContext(FinanceContext);
  const [collapsed, setCollapsed] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Transactions", path: "/transactions", icon: "📄" },
    { name: "Insights", path: "/insights", icon: "📊" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <div
      style={{
        width: collapsed ? "80px" : "250px", 
        minHeight: "100vh",
        padding: "25px 15px",
        
        background: darkMode
          ? "linear-gradient(180deg, #0f172a, #1e293b)"
          : "linear-gradient(180deg, #1e293b, #334155)", 
        color: "white",
        transition: "0.4s ease",
        boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* Header & Toggle Button Section */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: collapsed ? "center" : "space-between", 
        marginBottom: "40px" 
      }}>
        {!collapsed && (
          <h2 style={{ 
            fontSize: "1.4rem", 
            fontWeight: "bold", 
            margin: 0,
            letterSpacing: "1px",
            color: "#38bdf8" 
          }}>
            Finance
          </h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            padding: "8px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.1)",
            color: "white",
            fontSize: "1.2rem"
          }}
        >
          ☰
        </button>
      </div>

      {/* Menu List */}
      <div style={{ flexGrow: 1 }}>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "12px 15px",
              marginBottom: "10px",
              textDecoration: "none",
              borderRadius: "12px",
              color: hoverIndex === index ? "white" : "#cbd5e1", 
              background:
                hoverIndex === index
                  ? "rgba(255,255,255,0.15)" 
                  : "transparent",
              transition: "0.3s",
              justifyContent: collapsed ? "center" : "flex-start"
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
            {!collapsed && (
              <span style={{ fontWeight: "500", fontSize: "1rem" }}>
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Profile Section (Bottom) */}
      {!collapsed && (
        <div style={{
          padding: "15px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          fontSize: "0.85rem",
          marginTop: "auto"
        }}>
          <p style={{ margin: 0, color: "#94a3b8" }}>User</p>
          <p style={{ margin: 0, fontWeight: "bold" }}>Sreeja</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;