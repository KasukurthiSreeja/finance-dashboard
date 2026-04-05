import { useState, useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function TransactionForm() {
  const { addTransaction, darkMode, role } = useContext(FinanceContext);

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  if (role !== "admin") {
    return <p style={{ color: "gray" }}>Only admin can add transactions.</p>;
  }

  const inputStyle = {
    padding: "10px",
    background: darkMode ? "#333" : "white",
    color: darkMode ? "white" : "black",
    border: "1px solid gray",
    borderRadius: "5px",
    flex: "1 1 150px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Number(amount),
      category,
      type,
    };

    addTransaction(newTransaction);
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "10px",
      }}
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={inputStyle}
        required
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        style={inputStyle}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        type="submit"
        style={{
          padding: "10px 15px",
          background: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add
      </button>
    </form>
  );
}

export default TransactionForm;