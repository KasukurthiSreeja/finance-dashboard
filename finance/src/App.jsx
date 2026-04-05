import { useContext } from "react";
import { FinanceContext } from "./context/FinanceContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { darkMode } = useContext(FinanceContext);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(to right, #141e30, #243b55)"
          : "linear-gradient(to right, #e3f2fd, #ffffff)",
      }}
    >
      <AppRoutes />
    </div>
  );
}

export default App;