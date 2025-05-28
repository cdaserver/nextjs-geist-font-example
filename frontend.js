document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('benchmarkForm');
  const grossProfitInput = document.getElementById('grossProfit');
  const operatingProfitInput = document.getElementById('operatingProfit');
  const testedPartyInput = document.getElementById('testedParty');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const sales = parseFloat(form.sales.value);
    const cogs = parseFloat(form.cogs.value);
    const operationalExpense = parseFloat(form.operationalExpense.value);

    if (isNaN(sales) || isNaN(cogs) || isNaN(operationalExpense)) {
      alert('Mohon isi semua nilai numerik dengan benar.');
      return;
    }

    const grossProfit = sales - cogs;
    const operatingProfit = grossProfit - operationalExpense;

    grossProfitInput.value = grossProfit.toLocaleString('id-ID');
    operatingProfitInput.value = operatingProfit.toLocaleString('id-ID');

    // Example calculation for Tested Party (dummy value)
    const testedParty = ((operatingProfit / sales) * 100).toFixed(2);
    testedPartyInput.value = testedParty;

    // Show result section or update UI as needed
  });

  // Toggle about card content
  const toggleBtn = document.querySelector('.toggle-btn');
  const aboutText = document.getElementById('about-text');
  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !expanded);
    if (aboutText.hasAttribute('hidden')) {
      aboutText.removeAttribute('hidden');
    } else {
      aboutText.setAttribute('hidden', '');
    }
  });
});
