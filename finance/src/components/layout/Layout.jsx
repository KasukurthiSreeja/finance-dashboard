import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function Layout() {
  const { darkMode } = useContext(FinanceContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
  ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
  : "linear-gradient(135deg, #e3f2fd, #f1f8ff)",
        color: darkMode ? "white" : "black",
      }}
    >
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;