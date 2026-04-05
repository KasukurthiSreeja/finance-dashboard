import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext } from "react";
import { FinanceContext } from "../../context/FinanceContext";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryPieChart() {
  const { transactions } = useContext(FinanceContext);

  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += Number(t.amount);
    }
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: [
          "#4facfe",
          "#ff7eb3",
          "#f6d365",
          "#43cea2",
          "#764ba2",
        ],
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
     
      <Pie data={data} />
    </div>
  );
}

export default CategoryPieChart;