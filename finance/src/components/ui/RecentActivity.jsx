import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

function RecentActivity() {
  const { transactions } = useContext(FinanceContext);

  const recent = [...transactions].slice(-5).reverse();

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
      <h3>Recent Activity</h3>

      {recent.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            borderBottom: "1px solid #eee",
            paddingBottom: "5px",
          }}
        >
          <span>{t.category}</span>
          <span
            style={{
              color: t.type === "income" ? "green" : "red",
            }}
          >
            {t.type === "income" ? "+" : "-"}₹{t.amount}
          </span>
        </div>
      ))}
    </div>
  );
}

export default RecentActivity;