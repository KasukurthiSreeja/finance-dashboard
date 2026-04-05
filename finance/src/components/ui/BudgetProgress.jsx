import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function BudgetProgress() {
  const { transactions } = useContext(FinanceContext);

  const budget = 10000; // monthly budget

  let expenses = 0;
  transactions.forEach((t) => {
    if (t.type === "expense") expenses += Number(t.amount);
  });

  const percent = Math.min((expenses / budget) * 100, 100);

  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginTop: "20px",
      }}
    >
      <h3>Monthly Budget</h3>
      <p>₹{expenses} / ₹{budget}</p>

      <div
        style={{
          height: "20px",
          background: "#eee",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background:
              percent > 80
                ? "#ff4d4d"
                : percent > 50
                ? "#ffa500"
                : "#4caf50",
            transition: "0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default BudgetProgress;