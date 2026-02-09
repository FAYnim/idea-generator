let ideaHistory = JSON.parse(localStorage.getItem('ideaHistory')) || [];
let filteredHistory = [...ideaHistory];
let viewModal = null;

document.addEventListener('DOMContentLoaded', () => {
  viewModal = new bootstrap.Modal(document.getElementById('viewModal'));
  renderHistory();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById('searchInput').addEventListener('input', filterHistory);
  document.getElementById('filterDate').addEventListener('change', filterHistory);
  document.getElementById('sortOrder').addEventListener('change', filterHistory);
  document.getElementById('btnExport').addEventListener('click', exportJson);
  document.getElementById('btnClearAll').addEventListener('click', clearAllHistory);
  document.getElementById('btnCopyModal').addEventListener('click', copyFromModal);
}

function filterHistory() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const filter = document.getElementById('filterDate').value;
  const sort = document.getElementById('sortOrder').value;

  filteredHistory = ideaHistory.filter(item => {
    const matchesSearch = item.topic.toLowerCase().includes(search);
    let matchesDate = true;

    if (filter === 'today') {
      matchesDate = item.date === new Date().toDateString();
    } else if (filter === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesDate = new Date(item.savedAt) >= weekAgo;
    } else if (filter === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesDate = new Date(item.savedAt) >= monthAgo;
    }

    return matchesSearch && matchesDate;
  });

  if (sort === 'newest') {
    filteredHistory.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
  } else {
    filteredHistory.sort((a, b) => new Date(a.savedAt) - new Date(b.savedAt));
  }

  renderHistory();
}

function renderHistory() {
  const tbody = document.getElementById('historyTableBody');
  document.getElementById('resultCount').textContent = `${filteredHistory.length} items`;

  if (filteredHistory.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Tidak ada riwayat yang cocok</td></tr>';
    return;
  }

  tbody.innerHTML = filteredHistory.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>
        <strong>${escapeHtml(item.topic)}</strong>
        <small class="text-muted d-block">${item.time}</small>
      </td>
      <td>${item.date}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" onclick="window.viewItem(${item.id})">Lihat</button>
        <button class="btn btn-sm btn-outline-danger" onclick="window.deleteItem(${item.id})">Hapus</button>
      </td>
    </tr>
  `).join('');
}

function viewItem(id) {
  const item = ideaHistory.find(i => i.id === id);
  if (item) {
    document.getElementById('viewModalTitle').textContent = item.topic;
    document.getElementById('viewModalContent').textContent = item.output;
    viewModal.show();
  }
}

function deleteItem(id) {
  if (confirm('Yakin ingin menghapus item ini?')) {
    ideaHistory = ideaHistory.filter(i => i.id !== id);
    localStorage.setItem('ideaHistory', JSON.stringify(ideaHistory));
    filterHistory();
    updateStats();
  }
}

function clearAllHistory() {
  if (confirm('Yakin ingin menghapus SEMUA riwayat? Tindakan ini tidak dapat dibatalkan.')) {
    ideaHistory = [];
    localStorage.setItem('ideaHistory', JSON.stringify(ideaHistory));
    filterHistory();
    updateStats();
  }
}

function exportJson() {
  const data = JSON.stringify(ideaHistory, null, 2);
  downloadFile(data, 'idea-history.json', 'application/json');
}

function copyFromModal() {
  const content = document.getElementById('viewModalContent').textContent;
  navigator.clipboard.writeText(content).then(() => {
    const btn = document.getElementById('btnCopyModal');
    const original = btn.textContent;
    btn.textContent = 'Tersalin!';
    setTimeout(() => btn.textContent = original, 2000);
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

function updateStats() {
  const totalIdeas = ideaHistory.length;
  document.getElementById('totalIdeasInfo').textContent = totalIdeas;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
