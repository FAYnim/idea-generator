document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('topicForm');
  const topicInput = document.getElementById('topic');
  const outputTextarea = document.getElementById('output');
  const btnCopy = document.getElementById('btnCopy');

  const generateOutput = (topic) => {
    return `Topik: ${topic}\n\n` +
      `Berikut adalah pembahasan tentang ${topic}:\n\n` +
      `1. Pendahuluan\n${topic} merupakan topik yang penting untuk dibahas.\n\n` +
      `2. Konsep Dasar\nPemahaman fundamental tentang ${topic} sangat diperlukan.\n\n` +
      `3. Kesimpulan\n${topic} memiliki dampak signifikan dalam berbagai aspek kehidupan.`;
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
});
