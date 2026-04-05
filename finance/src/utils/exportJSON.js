export function exportToJSON(transactions) {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(transactions));

  const link = document.createElement("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "transactions.json");
  document.body.appendChild(link);

  link.click();
}