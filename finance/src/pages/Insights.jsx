import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

function Insights() {
  const { transactions, darkMode } = useContext(FinanceContext);

  let income = 0;
  let expenses = 0;
  const categoryTotals = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += Number(t.amount);
    } else {
      expenses += Number(t.amount);
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += Number(t.amount);
    }
  });

  const savings = income - expenses;
  const savingsRate = income ? ((savings / income) * 100).toFixed(1) : 0;
  const expenseRatio = income ? ((expenses / income) * 100).toFixed(1) : 0;

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  let score = 0;
  if (savings > 0) score += 40;
  if (expenses < income * 0.7) score += 30;
  if (savingsRate > 20) score += 30;

  
  const getDynamicSuggestions = () => {
    const suggestions = [];

    if (income === 0 && expenses === 0) {
      return [{ type: "info", text: "No data available. Start adding transactions to see insights!" }];
    }

    
    if (expenseRatio > 80) {
      suggestions.push({ type: "danger", text: `Warning: You're spending ${expenseRatio}% of income. High risk!` });
    } else if (expenseRatio < 50 && income > 0) {
      suggestions.push({ type: "success", text: "Great! Your expenses are well under 50% of your income." });
    }

    
    if (savingsRate > 25) {
      suggestions.push({ type: "success", text: `Excellent! Your savings rate is ${savingsRate}%. You are building wealth fast.` });
    } else if (savingsRate < 10 && income > 0) {
      suggestions.push({ type: "warning", text: "Low Savings: Try to save at least 15% of your monthly income." });
    }

    
    if (sortedCategories.length > 0) {
      const topCat = sortedCategories[0];
      if (topCat[1] > (expenses * 0.4)) {
        suggestions.push({ type: "info", text: `Budget Alert: ${topCat[0]} accounts for over 40% of your spending. Check for leaks.` });
      }
    }

    
    if (score >= 90) {
      suggestions.push({ type: "success", text: "Perfect Score! You have master-level control over your finances." });
    } else if (score < 50 && (income > 0 || expenses > 0)) {
      suggestions.push({ type: "danger", text: "Action Needed: Your financial health score is low. Reduce non-essential spending." });
    }

    return suggestions;
  };

  const currentSuggestions = getDynamicSuggestions();

  return (
    <div style={{ 
      padding: "20px", 
      color: darkMode ? "#cbd5e1" : "#1e293b",
      minHeight: "100vh",
      transition: "all 0.3s ease"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", margin: 0 }}>📊 Financial Analysis</h1>
      </div>

      {/* METRIC CARDS */}
      <div style={cardGrid}>
        <InsightCard
          title="Total Income"
          value={`₹${income.toLocaleString()}`}
          icon="💰"
          gradient="linear-gradient(135deg, #059669, #10b981)"
        />
        <InsightCard
          title="Total Expenses"
          value={`₹${expenses.toLocaleString()}`}
          icon="📉"
          gradient="linear-gradient(135deg, #e11d48, #fb7185)"
        />
        <InsightCard
          title="Net Savings"
          value={`₹${savings.toLocaleString()}`}
          icon="🏦"
          gradient="linear-gradient(135deg, #2563eb, #60a5fa)"
        />
        <InsightCard
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon="🎯"
          gradient="linear-gradient(135deg, #7c3aed, #a78bfa)"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "25px", marginTop: "30px" }}>
        
        {/* HEALTH SCORE BOX */}
        <div style={{...glassCard(darkMode), background: darkMode ? "#3d4654" : "#e3ecf7", border: "1px solid #a2b0c1"}}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={sectionTitle}>Financial Health Score</h3>
            <span style={{ fontSize: "24px", fontWeight: "900", color: getScoreColor(score) }}>{score}/100</span>
          </div>
          <div style={progressBarContainer(darkMode)}>
            <div style={progressFillStyle(score)} />
          </div>
          <p style={{ marginTop: "15px", fontSize: "15.5px", fontWeight: "600", color: darkMode ? "#94a3b8" : "#475569" }}>
             {score > 70 ? "Excellent management! Your habits are very strong." : 
              score > 40 ? "Good progress. Try to increase your savings slightly." : 
              "Critical: Focus on reducing non-essential expenses."}
          </p>
        </div>

        {/* TOP DRIVERS BOX */}
        <div style={{...glassCard(darkMode), background: darkMode ? "#3b344d" : "#f5f3ff", border: "1px solid #ddd6fe"}}>
          <h3 style={sectionTitle}>Top Spending Drivers</h3>
          {sortedCategories.length === 0 ? (
            <p style={{ opacity: 0.6 }}>No data tracked yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {sortedCategories.slice(0, 3).map(([category, amount], index) => (
                <div key={category} style={categoryRow(darkMode)}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={badge(index)}>{index + 1}</div>
                    <span style={{ fontWeight: "700" }}>{category}</span>
                  </div>
                  <span style={{ fontWeight: "800" }}>₹{amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DYNAMIC SUGGESTIONS SECTION */}
      <div style={{ ...glassCard(darkMode), marginTop: "30px", background: darkMode ? "#2d3d3a" : "#f0fdf4", border: "1px solid #bbf7d0" }}>
        <h3 style={{ ...sectionTitle, display: "flex", alignItems: "center", gap: "10px" }}>
          💡 Smart Insights & Suggestions
        </h3>
        <div style={suggestionGrid}>
          {currentSuggestions.map((s, idx) => (
            <SuggestionBox key={idx} type={s.type} text={s.text} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- HELPERS --- */

function InsightCard({ title, value, icon, gradient }) {
  return (
    <div style={{ ...metricCard, background: gradient }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <span style={{ fontSize: "14px", fontWeight: "600", opacity: 0.9 }}>{title}</span>
        <div style={{ fontSize: "20px" }}>{icon}</div>
      </div>
      <h2 style={{ fontSize: "28px", fontWeight: "900", margin: 0 }}>{value}</h2>
    </div>
  );
}

function SuggestionBox({ type, text }) {
  const styles = {
    danger: { bg: "#fee2e2", border: "#f87171", text: "#991b1b" },
    warning: { bg: "#fef3c7", border: "#fbbf24", text: "#92400e" },
    success: { bg: "#d1fae5", border: "#34d399", text: "#065f46" },
    info: { bg: "#dbeafe", border: "#60a5fa", text: "#1e40af" }
  };
  
  return (
    <div style={{
      background: styles[type].bg,
      borderLeft: `5px solid ${styles[type].border}`,
      color: styles[type].text,
      padding: "15px",
      borderRadius: "12px",
      fontSize: "14px",
      fontWeight: "700",
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
    }}>
      {text}
    </div>
  );
}

const getScoreColor = (score) => score > 70 ? "#10b981" : score > 40 ? "#f59e0b" : "#ef4444";
const glassCard = (darkMode) => ({ borderRadius: "24px", padding: "25px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", transition: "background 0.4s ease" });
const metricCard = { flex: 1, minWidth: "220px", padding: "25px", borderRadius: "24px", color: "white" };
const cardGrid = { display: "flex", gap: "20px", flexWrap: "wrap" };
const sectionTitle = { fontSize: "18px", fontWeight: "800", marginBottom: "20px" };
const progressBarContainer = (darkMode) => ({ height: "12px", background: darkMode ? "rgba(0,0,0,0.2)" : "#e2e8f0", borderRadius: "10px", overflow: "hidden" });
const progressFillStyle = (score) => ({ height: "100%", width: `${score}%`, background: getScoreColor(score), transition: "width 0.5s ease" });
const categoryRow = (darkMode) => ({ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: darkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.5)", borderRadius: "15px" });
const badge = (index) => ({ width: "24px", height: "24px", borderRadius: "50%", background: index === 0 ? "#fbbf24" : "#94a3b8", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "900" });
const suggestionGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "15px" };

export default Insights;