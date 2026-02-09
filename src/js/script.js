let ideaHistory = JSON.parse(localStorage.getItem('ideaHistory')) || [];

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();

  const form = document.getElementById('topicForm');
  const topicInput = document.getElementById('topic');
  const outputTextarea = document.getElementById('output');
  const btnCopy = document.getElementById('btnCopy');
  const btnSave = document.getElementById('btnSave');

  const generateOutput = (topic) => {
    return `Topik: ${topic}\n\n` +
      `Berikut adalah ide kreatif tentang ${topic}:\n\n` +
      `1. Konsep Dasar\n${topic} menawarkan peluang menarik untuk dikembangkan lebih lanjut dengan pendekatan inovatif.\n\n` +
      `2. Potensi Pengembangan\n- Implementasi praktis dalam kehidupan sehari-hari\n- Kolaborasi dengan komunitas terkait\n- Pengembangan fitur tambahan\n\n` +
      `3. Target Pengguna\nSolusi ini cocok untuk pengguna yang membutuhkan:\n• Kemudahan penggunaan\n• Efisiensi waktu\n• Hasil yang optimal\n\n` +
      `4. Langkah Selanjutnya\n1. Riset pasar lebih lanjut\n2. Prototype mockup\n3. Uji coba dengan pengguna\n\n` +
      `5. Kesimpulan\n${topic} memiliki potensi besar untuk memberikan dampak positif bagi penggunanya.`;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = topicInput.value.trim();
    if (topic) {
      outputTextarea.value = generateOutput(topic);
    }
  });

  btnCopy.addEventListener('click', () => {
    if (outputTextarea.value) {
      navigator.clipboard.writeText(outputTextarea.value);
      const originalText = btnCopy.textContent;
      btnCopy.textContent = 'Tersalin!';
      setTimeout(() => btnCopy.textContent = originalText, 2000);
    }
  });

  btnSave.addEventListener('click', () => {
    const topic = topicInput.value.trim();
    const output = outputTextarea.value.trim();
    if (topic && output) {
      saveToHistory(topic, output);
      outputTextarea.value = '';
      topicInput.value = '';
      updateStats();
      renderHistory();
    }
  });
});

function initDashboard() {
  updateStats();
  renderHistory();
}

function updateStats() {
  const today = new Date().toDateString();
  const todayEntries = ideaHistory.filter(item => item.date === today);
  const categories = new Set(ideaHistory.map(item => item.topic.toLowerCase().split(' ')[0]));

  document.getElementById('totalIdeas').textContent = ideaHistory.length;
  document.getElementById('todayIdeas').textContent = todayEntries.length;
  document.getElementById('totalCategories').textContent = categories.size || 0;
}

function renderHistory() {
  const historyList = document.getElementById('historyList');
  const historyCount = document.getElementById('historyCount');

  historyCount.textContent = `${ideaHistory.length} items`;

  if (ideaHistory.length === 0) {
    historyList.innerHTML = '<div class="list-group-item text-center text-muted py-4">Belum ada riwayat</div>';
    return;
  }

  const recentItems = ideaHistory.slice(-10).reverse();
  historyList.innerHTML = recentItems.map((item, index) => `
    <div class="list-group-item">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <strong>${escapeHtml(item.topic)}</strong>
          <small class="text-muted d-block">${item.date}</small>
        </div>
        <button class="btn btn-sm btn-outline-primary py-0" onclick="loadHistoryItem(${ideaHistory.length - 10 + index})">Lihat</button>
      </div>
    </div>
  `).join('');
}

function saveToHistory(topic, output) {
  const item = {
    id: Date.now(),
    topic: topic,
    output: output,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString('id-ID')
  };
  ideaHistory.push(item);
  localStorage.setItem('ideaHistory', JSON.stringify(ideaHistory));
}

function loadHistoryItem(index) {
  if (index >= 0 && index < ideaHistory.length) {
    const item = ideaHistory[index];
    document.getElementById('topic').value = item.topic;
    document.getElementById('output').value = item.output;
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
