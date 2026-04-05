import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function BalanceChart() {
  const { transactions } = useContext(FinanceContext);

  let balance = 0;
  const balances = [];
  const dates = [];

  transactions.forEach((t) => {
    if (t.type === "income") balance += Number(t.amount);
    else balance -= Number(t.amount);

    balances.push(balance);
    dates.push(t.date);
  });

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Balance",
        data: balances,
        borderColor: "#4facfe",
        backgroundColor: "rgba(79, 172, 254, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div
      style={{
        marginTop: "30px",
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <Line data={data} />
    </div>
  );
}

export default BalanceChart;