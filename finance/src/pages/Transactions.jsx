import { useContext, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionForm from "../components/transactions/TransactionForm";
import { exportToCSV } from "../utils/exportCSV";
import { exportToJSON } from "../utils/exportJSON";

function Transactions() {
  const { transactions, darkMode, role } = useContext(FinanceContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  // 🎨 Container Style
  const containerStyle = {
    padding: "30px",
    minHeight: "100vh",
    background: darkMode ? "#0f172a" : "#f1f5f9",
    transition: "0.3s ease",
  };

  //  1. VIEWER MODE STYLE 
  const viewerModeStyle = {
    background: "#c4d5ec", 
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
    border: "1px solid #bfdbfe",
    color: "#0f172a", 
    fontWeight: "600",
    filter: darkMode ? "brightness(0.9)" : "none",
  };

  //  2. ADMIN FORM OUTER BOX 
  const adminFormBoxStyle = {
    background: "#b5d0c9", 
    padding: "30px",
    borderRadius: "28px",
    marginBottom: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    filter: darkMode ? "brightness(0.85)" : "none",
  };

  //  3. RECENT ACTIVITIES OUTER BOX
  const tableOuterBoxStyle = {
    background: "#c3b5d0", 
    padding: "30px",
    borderRadius: "28px",
    marginTop: "25px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    filter: darkMode ? "brightness(0.85)" : "none",
  };

  //  4. INNER WHITE CARD 
  const tableInnerCardStyle = {
    background: "#f6ebeb", 
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
    color: "#0f172a", 
  };

  const summaryCardStyle = (gradient) => ({
    background: gradient,
    padding: "25px",
    borderRadius: "20px",
    color: "white",
    minWidth: "200px",
    flex: "1",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    filter: darkMode ? "brightness(0.9)" : "none",
  });

  return (
    <div style={containerStyle}>
      <h1 style={{ color: darkMode ? "white" : "#0f172a", fontWeight: "900" }}>
        Transactions 💸
      </h1>
      <p style={{ color: darkMode ? "#cbd5e1" : "#475569", marginBottom: "25px", fontWeight: "600" }}>
        Manage and track all your income and expenses in one place.
      </p>

      {/* SUMMARY CARDS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        <div style={summaryCardStyle("linear-gradient(135deg, #059669, #047857)")}>
          <h4 style={{ margin: 0, fontWeight: "700", fontSize: "13px", textTransform: "uppercase" }}>Total Income</h4>
          <h2 style={{ fontSize: "30px", margin: "10px 0 0 0", fontWeight: "800" }}>₹{income}</h2>
        </div>
        <div style={summaryCardStyle("linear-gradient(135deg, #dc2626, #b91c1c)")}>
          <h4 style={{ margin: 0, fontWeight: "700", fontSize: "13px", textTransform: "uppercase" }}>Total Expenses</h4>
          <h2 style={{ fontSize: "30px", margin: "10px 0 0 0", fontWeight: "800" }}>₹{expenses}</h2>
        </div>
        <div style={summaryCardStyle("linear-gradient(135deg, #4338ca, #3730a3)")}>
          <h4 style={{ margin: 0, fontWeight: "700", fontSize: "13px", textTransform: "uppercase" }}>Balance</h4>
          <h2 style={{ fontSize: "30px", margin: "10px 0 0 0", fontWeight: "800" }}>₹{balance}</h2>
        </div>
      </div>

      {/* CONDITIONAL RENDERING */}
      {role === "admin" ? (
        <div style={adminFormBoxStyle}>
          <h2 style={{ marginTop: 0, color: "#1e293b", marginBottom: "15px", fontWeight: "800" }}>
            Add New Transaction
          </h2>
          <div style={tableInnerCardStyle}>
            <TransactionForm />
          </div>
        </div>
      ) : (
        <div style={viewerModeStyle}>
          <p style={{ fontWeight: "900", margin: 0, fontSize: "17px" }}>🛡️ Viewer Mode Active</p>
          <p style={{ marginTop: "5px", fontSize: "14px", fontWeight: "700", opacity: 0.95 }}>
            Note: You can explore your transaction history, but adding or editing records is restricted.
          </p>
        </div>
      )}

      {/* RECENT ACTIVITIES */}
      <div style={tableOuterBoxStyle}>
        <h2 style={{ marginTop: 0, color: "#312e81", marginBottom: "15px", fontWeight: "800" }}>
          Recent Activities
        </h2>
        
        <div style={tableInnerCardStyle}>
          <TransactionTable role={role} />
          
          <div style={{ marginTop: "25px", display: "flex", gap: "12px" }}>
            <button 
                onClick={() => exportToCSV(transactions)} 
                style={btnStyle("#4338ca")}
            >
                Export CSV
            </button>
            <button 
                onClick={() => exportToJSON(transactions)} 
                style={btnStyle("#059669")}
            >
                Export JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const btnStyle = (bg) => ({
  padding: "12px 24px",
  border: "none",
  borderRadius: "12px",
  background: bg,
  color: "white",
  fontWeight: "800", 
  fontSize: "14px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
});

export default Transactions;