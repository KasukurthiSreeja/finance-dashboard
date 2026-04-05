import { useState, useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function TransactionTable({ limit }) {
  const {
    transactions,
    deleteTransaction,
    editTransaction,
    darkMode,
    role,
  } = useContext(FinanceContext);

  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("expense");

  const displayTransactions = limit
    ? transactions.slice(0, limit)
    : transactions;

  const startEdit = (t) => {
    setEditingId(t.id);
    setEditAmount(t.amount);
    setEditCategory(t.category);
    setEditType(t.type);
  };

  const saveEdit = (id) => {
    editTransaction({
      id,
      date: new Date().toISOString().split("T")[0],
      amount: Number(editAmount),
      category: editCategory,
      type: editType,
    });
    setEditingId(null);
  };

  return (
    <div style={{ overflowX: "auto", marginTop: "10px" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          borderRadius: "12px",
          overflow: "hidden",
          background: darkMode
            ? "linear-gradient(135deg, #1f1f2e, #2a2a40)"
            : "linear-gradient(135deg, #f0f6fb, #e2ecf5)",
          color: darkMode ? "white" : "#333",
        }}
      >
        {/* HEADER */}
        <thead>
          <tr
            style={{
              background: darkMode ? "#2a2a40" : "#d9e7f3",
            }}
          >
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Amount</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Type</th>
            {role === "admin" && <th style={thStyle}>Actions</th>}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {displayTransactions.map((t, index) => {
            const baseRowColor = darkMode
              ? index % 2 === 0
                ? "#25253a"
                : "#2c2c44"
              : index % 2 === 0
              ? "#f7fbff"
              : "#edf4fa";

            return (
              <tr
                key={t.id}
                style={{
                  background: baseRowColor,
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = darkMode
                    ? "#3a3a55"
                    : "#d6e6f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = baseRowColor)
                }
              >
                <td style={tdStyle}>{t.date}</td>

                {editingId === t.id ? (
                  <>
                    <td style={tdStyle}>
                      <input
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        style={inputStyle(darkMode)}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        style={inputStyle(darkMode)}
                      />
                    </td>
                    <td style={tdStyle}>
                      <select
                        value={editType}
                        onChange={(e) => setEditType(e.target.value)}
                        style={inputStyle(darkMode)}
                      >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </td>
                    <td style={tdStyle}>
                      <button style={saveBtn} onClick={() => saveEdit(t.id)}>
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}>₹{t.amount}</td>
                    <td style={tdStyle}>{t.category}</td>

                    <td style={tdStyle}>
                      <span
                        style={{
                          padding: "5px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "500",
                          background:
                            t.type === "income"
                              ? "rgba(76, 175, 80, 0.15)"
                              : "rgba(244, 67, 54, 0.15)",
                          color:
                            t.type === "income" ? "#4caf50" : "#f44336",
                        }}
                      >
                        {t.type}
                      </span>
                    </td>

                    {role === "admin" && (
                      <td style={tdStyle}>
                        <button style={editBtn} onClick={() => startEdit(t)}>
                          Edit
                        </button>

                        <button
                          style={deleteBtn}
                          onClick={() => deleteTransaction(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* STYLES */
const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid rgba(0,0,0,0.05)",
};

/* INPUT STYLE (REMOVE WHITE BOX LOOK) */
const inputStyle = (darkMode) => ({
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  background: darkMode ? "#2a2a40" : "#f1f6fb",
  color: darkMode ? "white" : "#333",
});

/* BUTTONS */
const editBtn = {
  background: "#2196f3",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#f44336",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  marginLeft: "5px",
  cursor: "pointer",
};

const saveBtn = {
  background: "#10b981",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

export default TransactionTable;