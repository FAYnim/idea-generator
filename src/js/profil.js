let profile = JSON.parse(localStorage.getItem('userProfile')) || {
  username: '',
  bio: '',
  niche: [],
  positioning: '',
  tone: []
};

document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  setupEventListeners();
  updatePreview();
});

function setupEventListeners() {
  // Save & Reset buttons
  document.getElementById('btnSaveProfile').addEventListener('click', saveProfile);
  document.getElementById('btnResetProfile').addEventListener('click', resetProfile);

  // Bio character counter
  const bioInput = document.getElementById('profileBio');
  bioInput.addEventListener('input', () => {
    updateBioCounter();
    updatePreview();
  });

  // Username live preview
  document.getElementById('profileUsername').addEventListener('input', updatePreview);

  // Positioning live preview
  document.getElementById('profilePositioning').addEventListener('input', updatePreview);

  // Tone checkboxes live preview
  document.querySelectorAll('.tone-checkbox').forEach(cb => {
    cb.addEventListener('change', updatePreview);
  });

  // Niche tag input
  const nicheInput = document.getElementById('nicheInput');
  nicheInput.addEventListener('keydown', handleNicheKeydown);

  // Focus input when clicking wrapper
  document.getElementById('nicheTagWrapper').addEventListener('click', () => {
    nicheInput.focus();
  });
}

function loadProfile() {
  document.getElementById('profileUsername').value = profile.username;
  document.getElementById('profileBio').value = profile.bio;
  document.getElementById('profilePositioning').value = profile.positioning;

  // Load niche tags
  renderNicheTags();

  // Load tone checkboxes
  document.querySelectorAll('.tone-checkbox').forEach(cb => {
    cb.checked = profile.tone.includes(cb.value);
  });

  updateBioCounter();
}

function saveProfile() {
  const username = document.getElementById('profileUsername').value.trim();
  const bio = document.getElementById('profileBio').value.trim();
  const positioning = document.getElementById('profilePositioning').value.trim();

  const tone = [];
  document.querySelectorAll('.tone-checkbox:checked').forEach(cb => {
    tone.push(cb.value);
  });

  profile = {
    username: username,
    bio: bio,
    niche: profile.niche,
    positioning: positioning,
    tone: tone
  };

  localStorage.setItem('userProfile', JSON.stringify(profile));
  showToast('Profil berhasil disimpan!');
}

function resetProfile() {
  if (confirm('Yakin ingin mereset semua data profil?')) {
    profile = {
      username: '',
      bio: '',
      niche: [],
      positioning: '',
      tone: []
    };
    localStorage.setItem('userProfile', JSON.stringify(profile));
    loadProfile();
    updatePreview();
    showToast('Profil telah direset');
  }
}

// --- Bio Counter ---
function updateBioCounter() {
  const bio = document.getElementById('profileBio');
  const counter = document.getElementById('bioCounter');
  const len = bio.value.length;
  counter.textContent = len + '/150';

  if (len >= 140) {
    counter.classList.add('text-danger');
    counter.classList.remove('text-muted');
  } else {
    counter.classList.remove('text-danger');
    counter.classList.add('text-muted');
  }
}

// --- Niche Tag Input ---
function handleNicheKeydown(e) {
  const input = e.target;
  const value = input.value.trim();

  if ((e.key === 'Enter' || e.key === ',') && value) {
    e.preventDefault();
    addNicheTag(value.replace(/,/g, ''));
    input.value = '';
  }

  // Remove last tag on Backspace if input is empty
  if (e.key === 'Backspace' && !input.value && profile.niche.length > 0) {
    removeNicheTag(profile.niche.length - 1);
  }
}

function addNicheTag(tag) {
  tag = tag.trim();
  if (!tag) return;

  // Prevent duplicates (case-insensitive)
  const exists = profile.niche.some(n => n.toLowerCase() === tag.toLowerCase());
  if (exists) {
    showToast('Niche sudah ada!', 'error');
    return;
  }

  profile.niche.push(tag);
  renderNicheTags();
  updatePreview();
}

function removeNicheTag(index) {
  profile.niche.splice(index, 1);
  renderNicheTags();
  updatePreview();
}

function renderNicheTags() {
  const tagList = document.getElementById('nicheTagList');
  tagList.innerHTML = '';

  profile.niche.forEach((tag, index) => {
    const tagEl = document.createElement('span');
    tagEl.className = 'niche-tag';
    tagEl.innerHTML = escapeHtml(tag) + ' <button type="button" class="tag-remove" data-index="' + index + '">&times;</button>';
    tagList.appendChild(tagEl);
  });

  // Attach remove event listeners
  tagList.querySelectorAll('.tag-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-index'));
      removeNicheTag(idx);
    });
  });
}

// --- Preview Card ---
function updatePreview() {
  // Username
  const username = document.getElementById('profileUsername').value.trim();
  document.getElementById('previewUsername').textContent = username ? '@' + username : '@username';

  // Bio
  const bio = document.getElementById('profileBio').value.trim();
  document.getElementById('previewBio').innerHTML = bio
    ? escapeHtml(bio)
    : '<em class="text-muted">Belum diisi</em>';

  // Niche
  const nichePreview = document.getElementById('previewNiche');
  if (profile.niche.length > 0) {
    nichePreview.innerHTML = profile.niche.map(n =>
      '<span class="badge bg-primary bg-opacity-10 text-primary me-1 mb-1">' + escapeHtml(n) + '</span>'
    ).join('');
  } else {
    nichePreview.innerHTML = '<em class="text-muted small">Belum diisi</em>';
  }

  // Positioning
  const positioning = document.getElementById('profilePositioning').value.trim();
  document.getElementById('previewPositioning').innerHTML = positioning
    ? escapeHtml(positioning)
    : '<em class="text-muted">Belum diisi</em>';

  // Tone
  const tonePreview = document.getElementById('previewTone');
  const selectedTones = [];
  document.querySelectorAll('.tone-checkbox:checked').forEach(cb => {
    selectedTones.push(cb.value);
  });
  if (selectedTones.length > 0) {
    tonePreview.innerHTML = selectedTones.map(t =>
      '<span class="badge bg-success bg-opacity-10 text-success me-1 mb-1">' + escapeHtml(t) + '</span>'
    ).join('');
  } else {
    tonePreview.innerHTML = '<em class="text-muted small">Belum diisi</em>';
  }
}

// --- Utilities ---
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showToast(message, type) {
  type = type || 'success';
  const toast = document.createElement('div');
  toast.className = 'alert alert-' + (type === 'success' ? 'success' : 'danger') + ' position-fixed bottom-0 end-0 m-3';
  toast.style.zIndex = '9999';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(function() { toast.remove(); }, 3000);
}
