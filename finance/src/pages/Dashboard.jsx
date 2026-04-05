import { useContext, useState, useEffect } from "react";
import { FinanceContext } from "../context/FinanceContext";
import SummaryCard from "../components/cards/SummaryCard";
import BalanceChart from "../components/charts/BalanceChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import BudgetProgress from "../components/ui/BudgetProgress";
import SavingsGoal from "../components/ui/SavingsGoal";

function Dashboard() {
  const { loading, darkMode, transactions } = useContext(FinanceContext);
  const [viewFull, setViewFull] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [welcomeContent, setWelcomeContent] = useState({ title: "", sub: "" });

  useEffect(() => {
    const contents = [
      { title: "Welcome back, Sreeja 👋", sub: "Your financial health is looking strong today. Let's keep the momentum going!" },
      { title: "Hello Sreeja, Ready to Grow? 🚀", sub: "Visualize your spending habits and make informed decisions with real-time data." },
      { title: "Smart Tracking, Better Savings 💡", sub: "Review your balance trends. Small adjustments today lead to big financial freedom." },
      { title: "Your Money, Your Rules 🛡️", sub: "Manage your monthly budgets seamlessly and watch your wealth grow." }
    ];
    setWelcomeContent(contents[Math.floor(Math.random() * contents.length)]);
  }, []);

  if (loading) return <h2 style={{ textAlign: 'center', color: darkMode ? '#fff' : '#000', marginTop: '50px' }}>Loading Dashboard...</h2>;

  const income = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expenses;

  const theme = {
    bg: darkMode ? "#2d3748" : "#f1f5f9", 
    text: darkMode ? "#ffffff" : "#1e293b",
    accent: "linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)",
    balanceBoxBg: "#c3d7ed",
    spendingBoxBg: "#cea8b4",
    recentActivityFixed: "#c8d0db",
    rowEven: "#ffffff",
    rowOdd: "#f8fafc",
    rowHover: "#e2f2f0",
  };

  const boxStyle = (customBg) => ({
    background: customBg,
    padding: '20px',
    borderRadius: '20px',
    color: "#1e293b", 
    border: "1px solid #e2e8f0",
    boxShadow: darkMode ? "0 10px 30px rgba(0,0,0,0.2)" : "0 4px 12px rgba(0,0,0,0.05)",
    transition: '0.3s ease-in-out',
  });

  return (
   
    <div style={{ 
      background: `${theme.bg} !important`, 
      backgroundColor: theme.bg,
      minHeight: "100vh", 
      padding: "20px 30px", 
      color: theme.text, 
      transition: "0.3s" 
    }}>
      
      {/* WELCOME BANNER */}
      <div style={{ background: theme.accent, padding: '30px', borderRadius: '20px', color: '#fff', marginBottom: '25px' }}>
        <h2 style={{ margin: '0 0 10px 0', fontSize: '26px', fontWeight: '800' }}>{welcomeContent.title}</h2>
        <p style={{ margin: 0, opacity: 0.9, fontSize: '15px', fontWeight: '500' }}>{welcomeContent.sub}</p>
      </div>

      {/* SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
        <SummaryCard title="Total Balance" amount={`₹${balance}`} color="#10b981" />
        <SummaryCard title="Income" amount={`₹${income}`} color="#3b82f6" />
        <SummaryCard title="Expenses" amount={`₹${expenses}`} color="#ef4444" />
        <SummaryCard title="Savings" amount={`₹${balance}`} color="#8b5cf6" />
      </div>

      {/* CHART SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div style={boxStyle(theme.balanceBoxBg)}>
          <h4 style={{ marginBottom: '15px', fontWeight: '700', color: "#1e293b" }}>Balance Trend</h4>
          <BalanceChart />
        </div>
        <div style={boxStyle(theme.spendingBoxBg)}>
          <h4 style={{ marginBottom: '15px', fontWeight: '700', color: "#1e293b" }}>Spending Breakdown</h4>
          <CategoryPieChart />
        </div>
      </div>

      {/* GOALS & RECENT ACTIVITY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '25px' }}>
        <div style={boxStyle("#b0cdcc")}> <BudgetProgress /> </div>
        <div style={boxStyle("#dccded")}> <SavingsGoal /> </div>
        <div style={{ ...boxStyle(theme.recentActivityFixed), display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ margin: '0 0 12px 0', fontWeight: '700', color: "#1e293b" }}>Recent Activity</h4>
            {transactions.slice(0, 3).map((t, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.08)', fontSize: '14px' }}>
                <span style={{color: "#1e293b"}}>{t.category}</span>
                <span style={{ fontWeight: '800', color: t.type === 'income' ? '#059669' : '#dc2626' }}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount}
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => setViewFull(!viewFull)} style={{ background: theme.accent, border: 'none', color: "#fff", padding: '10px', borderRadius: '10px', marginTop: '10px', cursor: 'pointer', fontWeight: '700' }}>
            {viewFull ? "Close History" : "View Full Activity →"}
          </button>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      {viewFull && (
        <div style={{ ...boxStyle("#ffffff"), padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 25px' }}><h3>Transaction History</h3></div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {["Date", "Amount", "Category", "Type"].map(h => <th key={h} style={{ padding: '12px 25px' }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, idx) => (
                <tr 
                  key={idx} 
                  onMouseEnter={() => setHoveredRow(idx)}
                  onMouseLeave={() => setHoveredRow(null)}
                  style={{ background: hoveredRow === idx ? theme.rowHover : (idx % 2 === 0 ? theme.rowEven : theme.rowOdd) }}
                >
                  <td style={{ padding: '15px 25px' }}>{t.date || "2026-04-01"}</td>
                  <td style={{ padding: '15px 25px', fontWeight: '700' }}>₹{t.amount}</td>
                  <td style={{ padding: '15px 25px' }}>{t.category}</td>
                  <td style={{ padding: '15px 25px' }}>
                    <span style={{ 
                      padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '800',
                      background: t.type === 'income' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                      color: t.type === 'income' ? '#4ade80' : '#f87171'
                    }}>
                      {t.type.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dashboard;