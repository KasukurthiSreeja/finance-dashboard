import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function SavingsGoal() {
  const { transactions } = useContext(FinanceContext);

  let balance = 0;
  transactions.forEach((t) => {
    if (t.type === "income") balance += Number(t.amount);
    else balance -= Number(t.amount);
  });

  const goal = 50000;
  const percent = Math.min((balance / goal) * 100, 100);

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
      <h3>Savings Goal</h3>
      <p>₹{balance} / ₹{goal}</p>

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
            background: "#764ba2",
            transition: "0.3s",
          }}
        />
      </div>
    </div>
  );
}

export default SavingsGoal;