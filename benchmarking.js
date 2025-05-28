document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('benchmarkForm');
  const grossProfitInput = document.getElementById('grossProfit');
  const operatingProfitInput = document.getElementById('operatingProfit');
  const testedPartyInput = document.getElementById('testedParty');
  const resultSection = document.querySelector('.result-section');

  // Format number to Indonesian currency format
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number).replace('Rp', '').trim();
  };

  // Calculate and display results
  const calculateResults = () => {
    const sales = parseFloat(form.sales.value) || 0;
    const cogs = parseFloat(form.cogs.value) || 0;
    const operationalExpense = parseFloat(form.operationalExpense.value) || 0;

    const grossProfit = sales - cogs;
    const operatingProfit = grossProfit - operationalExpense;
    const testedParty = ((operatingProfit / sales) * 100);

    grossProfitInput.value = formatCurrency(grossProfit);
    operatingProfitInput.value = formatCurrency(operatingProfit);
    testedPartyInput.value = isFinite(testedParty) ? testedParty.toFixed(2) + '%' : '0%';
  };

  // Handle form input changes
  ['sales', 'cogs', 'operationalExpense'].forEach(fieldId => {
    const input = document.getElementById(fieldId);
    input.addEventListener('input', calculateResults);
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      'industry', 'classification', 'subclassification', 'taxYear',
      'yearRange', 'method', 'ratio', 'companyName', 'sales',
      'cogs', 'operationalExpense'
    ];

    const missingFields = requiredFields.filter(fieldId => {
      const field = document.getElementById(fieldId);
      return !field.value.trim();
    });

    if (missingFields.length > 0) {
      alert('Mohon lengkapi semua informasi yang diperlukan.');
      return;
    }

    // Show loading state or spinner here if needed

    // Calculate final results
    calculateResults();

    // Update result section (in a real app, this would show the benchmarking results)
    resultSection.innerHTML = `
      <div class="result-cards">
        <div class="result-card">
          <h3>Jenis Kegiatan Usaha</h3>
          <p>${form.industry.value}</p>
        </div>
        <div class="result-card">
          <h3>Klasifikasi Usaha</h3>
          <p>${form.classification.value}</p>
        </div>
        <div class="result-card">
          <h3>Subklasifikasi Usaha</h3>
          <p>${form.subclassification.value}</p>
        </div>
        <div class="result-card">
          <h3>Rasio Method</h3>
          <p>${form.ratio.value}</p>
        </div>
        <div class="result-card">
          <h3>Tested Party</h3>
          <p>${testedPartyInput.value}</p>
        </div>
      </div>
    `;
  });

  // Handle form reset
  form.addEventListener('reset', () => {
    setTimeout(() => {
      grossProfitInput.value = '';
      operatingProfitInput.value = '';
      testedPartyInput.value = '';
      
      // Reset result section to initial state
      resultSection.innerHTML = `
        <img src="repo-catur2/wwwroot/image/service/empty.svg" alt="Belum Ada Hasil" />
        <p>Belum Ada Hasil</p>
        <p>Hasil Benchmarking akan ditampilkan setelah anda mengisi seluruh informasi pada form di atas. Lengkapi informasi dan klik tombol Hitung.</p>
      `;
    }, 0);
  });

  // Toggle about section
  const toggleBtn = document.querySelector('.toggle-btn');
  const aboutText = document.getElementById('about-text');
  
  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    toggleBtn.textContent = isExpanded ? '▼' : '▲';
    
    if (aboutText.hasAttribute('hidden')) {
      aboutText.removeAttribute('hidden');
    } else {
      aboutText.setAttribute('hidden', '');
    }
  });

  // Add input event listeners for automatic calculation
  form.addEventListener('input', (e) => {
    if (['sales', 'cogs', 'operationalExpense'].includes(e.target.id)) {
      calculateResults();
    }
  });
});
