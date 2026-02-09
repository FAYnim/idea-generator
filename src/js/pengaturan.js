let settings = JSON.parse(localStorage.getItem('ideaGeneratorSettings')) || {
  language: 'id',
  theme: 'light',
  format: 'standard',
  autoSave: false,
  notifications: true
};

document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  updateInfo();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('btnSaveSettings').addEventListener('click', saveSettings);
  document.getElementById('btnResetSettings').addEventListener('click', resetSettings);
  document.getElementById('btnExportJson').addEventListener('click', exportJson);
  document.getElementById('btnExportCsv').addEventListener('click', exportCsv);
  document.getElementById('btnResetData').addEventListener('click', resetAllData);
  document.getElementById('importFile').addEventListener('change', importData);
}

function loadSettings() {
  document.getElementById('settingLanguage').value = settings.language;
  document.getElementById('settingTheme').value = settings.theme;
  document.getElementById('settingFormat').value = settings.format;
  document.getElementById('settingAutoSave').checked = settings.autoSave;
  document.getElementById('settingNotifications').checked = settings.notifications;
}

function saveSettings() {
  settings = {
    language: document.getElementById('settingLanguage').value,
    theme: document.getElementById('settingTheme').value,
    format: document.getElementById('settingFormat').value,
    autoSave: document.getElementById('settingAutoSave').checked,
    notifications: document.getElementById('settingNotifications').checked
  };
  localStorage.setItem('ideaGeneratorSettings', JSON.stringify(settings));
  showToast('Pengaturan berhasil disimpan!');
}

function resetSettings() {
  settings = {
    language: 'id',
    theme: 'light',
    format: 'standard',
    autoSave: false,
    notifications: true
  };
  loadSettings();
  localStorage.setItem('ideaGeneratorSettings', JSON.stringify(settings));
  showToast('Pengaturan dikembalikan ke default');
}

function updateInfo() {
  const ideaHistory = JSON.parse(localStorage.getItem('ideaHistory')) || [];
  document.getElementById('totalIdeasInfo').textContent = ideaHistory.length;

  const created = localStorage.getItem('ideaGeneratorCreated');
  document.getElementById('createdDate').textContent = created ? formatDate(created) : '-';

  const storage = calculateStorage();
  document.getElementById('storageUsed').textContent = formatBytes(storage);
}

function exportJson() {
  const ideaHistory = JSON.parse(localStorage.getItem('ideaHistory')) || [];
  const data = JSON.stringify(ideaHistory, null, 2);
  downloadFile(data, 'idea-history.json', 'application/json');
}

function exportCsv() {
  const ideaHistory = JSON.parse(localStorage.getItem('ideaHistory')) || [];
  const headers = ['ID', 'Topik', 'Output', 'Tanggal', 'Waktu'];
  const rows = ideaHistory.map(item => [
    item.id,
    `"${item.topic.replace(/"/g, '""')}"`,
    `"${item.output.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    item.date,
    item.time
  ]);
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  downloadFile(csv, 'idea-history.csv', 'text/csv');
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        const existing = JSON.parse(localStorage.getItem('ideaHistory')) || [];
        const merged = [...existing, ...data];
        localStorage.setItem('ideaHistory', JSON.stringify(merged));
        showToast(`Berhasil impor ${data.length} items!`);
        updateInfo();
      }
    } catch (err) {
      showToast('Gagal membaca file!', 'error');
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function resetAllData() {
  if (confirm('Yakin ingin menghapus SEMUA data? Ini akan menghapus riwayat dan pengaturan.')) {
    localStorage.removeItem('ideaHistory');
    localStorage.removeItem('ideaGeneratorSettings');
    localStorage.removeItem('ideaGeneratorCreated');
    settings = {
      language: 'id',
      theme: 'light',
      format: 'standard',
      autoSave: false,
      notifications: true
    };
    loadSettings();
    updateInfo();
    showToast('Semua data telah dihapus');
  }
}

function calculateStorage() {
  let total = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    total += (key.length + localStorage.getItem(key).length) * 2;
  }
  return total;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `alert alert-${type === 'success' ? 'success' : 'danger'} position-fixed bottom-0 end-0 m-3`;
  toast.style.zIndex = '9999';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
