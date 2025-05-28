document.addEventListener('DOMContentLoaded', () => {
  // Toggle about section
  const toggleBtn = document.querySelector('.toggle-btn');
  const aboutContent = document.getElementById('about-content');
  
  if (toggleBtn && aboutContent) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      aboutContent.classList.toggle('show');
    });
  }

  // Form elements
  const form = {
    jenisKegiatanUsaha: document.getElementById('jenisKegiatanUsaha'),
    klasifikasiUsaha: document.getElementById('klasifikasiUsaha'),
    subKlasifikasiUsaha: document.getElementById('subKlasifikasiUsaha'),
    tahunPajak: document.getElementById('tahunPajak'),
    rentangTahun: document.getElementById('rentangTahun'),
    metode: document.getElementById('metode'),
    rasio: document.getElementById('rasio'),
    namaPerusahaan: document.getElementById('namaPerusahaan'),
    penjualan: document.getElementById('penjualan'),
    hargaPokokPenjualan: document.getElementById('hargaPokokPenjualan'),
    labaKotor: document.getElementById('labaKotor'),
    bebanOperasional: document.getElementById('bebanOperasional'),
    labaOperasional: document.getElementById('labaOperasional'),
    testedParty: document.getElementById('testedParty')
  };

  const btnHitung = document.getElementById('btnHitung');
  const btnReset = document.getElementById('btnReset');
  const toastHide = document.querySelector('.toast-hide');
  const resultHide = document.querySelector('.to-hide');
  const resultShow = document.querySelector('.to-show');

  // Format currency
  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number).replace('Rp', '').trim();
  };

  // Calculate profits
  const calculateProfits = () => {
    const penjualan = parseFloat(form.penjualan.value) || 0;
    const hpp = parseFloat(form.hargaPokokPenjualan.value) || 0;
    const bebanOperasional = parseFloat(form.bebanOperasional.value) || 0;

    const labaKotor = penjualan - hpp;
    const labaOperasional = labaKotor - bebanOperasional;
    const testedParty = penjualan ? ((labaOperasional / penjualan) * 100) : 0;

    form.labaKotor.value = formatCurrency(labaKotor);
    form.labaOperasional.value = formatCurrency(labaOperasional);
    form.testedParty.value = testedParty.toFixed(2) + '%';

    return {
      labaKotor,
      labaOperasional,
      testedParty
    };
  };

  // Show toast message
  const showToast = (message, duration = 5000) => {
    toastHide.classList.remove('hidden');
    toastHide.querySelector('.toast-message').textContent = message;
    setTimeout(() => {
      toastHide.classList.add('hidden');
    }, duration);
  };

  // Validate form
  const validateForm = () => {
    const requiredFields = [
      { id: 'jenisKegiatanUsaha', label: 'Jenis Kegiatan Usaha' },
      { id: 'klasifikasiUsaha', label: 'Klasifikasi Usaha' },
      { id: 'subKlasifikasiUsaha', label: 'Subklasifikasi Usaha' },
      { id: 'tahunPajak', label: 'Tahun Pajak' },
      { id: 'rentangTahun', label: 'Rentang Tahun' },
      { id: 'metode', label: 'Metode' },
      { id: 'rasio', label: 'Rasio' },
      { id: 'namaPerusahaan', label: 'Nama Perusahaan' },
      { id: 'penjualan', label: 'Penjualan' },
      { id: 'hargaPokokPenjualan', label: 'Harga Pokok Penjualan' },
      { id: 'bebanOperasional', label: 'Beban Operasional' }
    ];

    const emptyFields = requiredFields.filter(field => !form[field.id].value);
    
    if (emptyFields.length > 0) {
      showToast('Mohon lengkapi semua informasi yang diperlukan.');
      return false;
    }
    return true;
  };

  // Update result section
  const updateResult = (data) => {
    resultShow.classList.add('hidden');
    resultHide.classList.remove('hidden');
    
    resultHide.innerHTML = `
      <div class="result-grid">
        <div class="result-card">
          <h5>${form.jenisKegiatanUsaha.value}</h5>
          <p>Jenis Kegiatan Usaha</p>
        </div>
        <div class="result-card">
          <h5>${form.klasifikasiUsaha.value}</h5>
          <p>Klasifikasi Usaha</p>
        </div>
        <div class="result-card">
          <h5>${form.subKlasifikasiUsaha.value}</h5>
          <p>Subklasifikasi Usaha</p>
        </div>
        <div class="result-card">
          <h5>${form.rasio.value}</h5>
          <p>Rasio Method</p>
        </div>
        <div class="result-card">
          <div class="result-split">
            <div>
              <h5>${data.testedParty.toFixed(2)}%</h5>
              <p>Tested Party</p>
            </div>
            <div>
              <h5>${form.tahunPajak.value}</h5>
              <p>Tahun Pajak</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  // Event: Calculate button click
  btnHitung.addEventListener('click', () => {
    if (validateForm()) {
      const results = calculateProfits();
      updateResult(results);
    }
  });

  // Event: Reset button click
  btnReset.addEventListener('click', () => {
    Object.values(form).forEach(element => {
      if (element && typeof element.value !== 'undefined') {
        element.value = '';
      }
    });
    resultHide.classList.add('hidden');
    resultShow.classList.remove('hidden');
  });

  // Event: Auto-calculate on input
  ['penjualan', 'hargaPokokPenjualan', 'bebanOperasional'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', calculateProfits);
    }
  });
});
