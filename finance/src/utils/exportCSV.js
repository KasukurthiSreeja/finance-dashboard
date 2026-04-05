export function exportToCSV(transactions) {
  const headers = ["Date", "Amount", "Category", "Type"];

  const rows = transactions.map((t) => [
    t.date,
    t.amount,
    t.category,
    t.type,
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);

  link.click();
}