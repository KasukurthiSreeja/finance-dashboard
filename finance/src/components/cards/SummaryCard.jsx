function SummaryCard({ title, amount, color }) {
  const gradients = {
    green: "linear-gradient(135deg, #43cea2, #185a9d)",
    blue: "linear-gradient(135deg, #36d1dc, #5b86e5)",
    red: "linear-gradient(135deg, #ff758c, #ff7eb3)",
    purple: "linear-gradient(135deg, #667eea, #764ba2)",
  };

  return (
    <div
      style={{
        flex: 1,
        padding: "20px",
        borderRadius: "12px",
        color: "white",
        background: gradients[color] || gradients.blue,
        boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
      }}
    >
      <h3>{title}</h3>
      <h2>{amount}</h2>
    </div>
  );
}

export default SummaryCard;