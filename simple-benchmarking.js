document.getElementById('benchmarkForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const sales = parseFloat(document.getElementById('sales').value);
  const cogs = parseFloat(document.getElementById('cogs').value);
  const operationalExpense = parseFloat(document.getElementById('operationalExpense').value);

  // Simple calculations similar to the original app
  const grossProfit = sales - cogs;
  const operatingProfit = grossProfit - operationalExpense;

  const resultDiv = document.getElementById('result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <p><strong>Laba Kotor:</strong> Rp ${grossProfit.toLocaleString('id-ID')}</p>
    <p><strong>Laba Operasional:</strong> Rp ${operatingProfit.toLocaleString('id-ID')}</p>
  `;
});
