const characters = [
  {
    id: 'tobey',
    name: 'Tobey Maguire',
    identity: 'Peter Parker',
    universe: 'Earth-96283',
    tagline: 'The original wound never truly healed.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    summary: 'He is the original live-action Spider-Man, carrying the burden of responsibility with a quiet, devastating sincerity that shaped a whole generation of Spider-Man stories.',
    bio: 'Tobey Maguire’s Peter Parker begins as a lonely, awkward young man and matures into a deeply devoted hero shaped by loss and duty. His journey is rooted in sorrow, affection, and sacrifice—showing that true strength is not the absence of fear, but the decision to keep going anyway.',
    origin: 'After a life-changing science accident and the loss of his uncle, Peter learns the most painful lesson of all: with great power comes great responsibility.',
    traits: ['Emotionally grounded', 'Brave under pressure', 'Devoted to family', 'Incredibly self-sacrificing'],
    stats: [
      { label: 'Resilience', value: 94 },
      { label: 'Spider-Sense', value: 88 },
      { label: 'Strength', value: 90 },
      { label: 'Emotional Depth', value: 96 }
    ],
    weaknesses: ['Burdens too much alone', 'Physical pain can overwhelm him', 'Trusts too deeply at times'],
    lovedOnes: [
      { name: 'Mary Jane Watson', relation: 'romantic counterpart', icon: '💗' },
      { name: 'Aunt May', relation: 'guardian and emotional anchor', icon: '🕊️' },
      { name: 'Uncle Ben', relation: 'moral foundation', icon: '🌙' }
    ],
    secret: 'A hidden signal reveals: the first Spider-Man was never just a hero. He was the first memory.'
  },
  {
    id: 'garfield',
    name: 'Andrew Garfield',
    identity: 'Peter Parker',
    universe: 'Earth-120703',
    tagline: 'A restless heart trying not to become a machine.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80',
    video: 'https://www.w3schools.com/html/movie.mp4',
    summary: 'Andrew Garfield’s Peter Parker is emotionally intense, rebellious, and deeply human, carrying grief in a way that makes the character feel contemporary and alive.',
    bio: 'Peter Parker here is shaped by loss, curiosity, and a desperate urge to understand his father, his purpose, and the burden of being a hero. He is witty and deeply feeling, walking the line between self-doubt and fierce conviction.',
    origin: 'In a modernized origin story, Peter becomes Spider-Man after discovering the truth about his parents and accepting the danger his abilities bring to the people he loves.',
    traits: ['Analytical', 'Intense', 'Heartfelt', 'Driven by purpose'],
    stats: [
      { label: 'Mobility', value: 92 },
      { label: 'Reflexes', value: 95 },
      { label: 'Agility', value: 96 },
      { label: 'Emotional Intensity', value: 90 }
    ],
    weaknesses: ['Overthinks decisions', 'Self-destructive under pressure', 'Feels isolated from true belonging'],
    lovedOnes: [
      { name: 'Gwen Stacy', relation: 'deep emotional bond', icon: '💫' },
      { name: 'Aunt May', relation: 'family source of calm', icon: '🌌' },
      { name: 'Captain Stacy', relation: 'legacy of duty', icon: '🛡️' }
    ],
    secret: 'The second Spider-Man carried a signal hidden in grief: the web is not built to save the world—it is built to keep people alive.'
  },
  {
    id: 'holland',
    name: 'Tom Holland',
    identity: 'Peter Parker',
    universe: 'Earth-199999',
    tagline: 'The city is loud, but the heart is louder.',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80',
    video: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    summary: 'Tom Holland’s Spider-Man is the most modern, energetic, and globally connected version: a young hero with humor, empathy, and an urgent sense of purpose.',
    bio: 'This Peter Parker is a young man caught between adolescence and heroism. He moves through a world where the stakes are global, yet his instincts remain deeply personal—rooted in friendship, responsibility, and the desire to protect the people around him.',
    origin: 'His story begins amid the Avengers and evolves through loss, mentorship, and the realization that being Spider-Man is not about being the strongest, but being the most human.',
    traits: ['Playful', 'Quick-thinking', 'Adaptable', 'Emotionally loyal'],
    stats: [
      { label: 'Speed', value: 94 },
      { label: 'Teamwork', value: 93 },
      { label: 'Innovation', value: 98 },
      { label: 'Heroic Drive', value: 92 }
    ],
    weaknesses: ['Young and impulsive', 'Overextends to protect others', 'Struggles with burden of expectation'],
    lovedOnes: [
      { name: 'MJ', relation: 'deep friendship and love', icon: '💙' },
      { name: 'Ned Leeds', relation: 'trusted friend', icon: '🧠' },
      { name: 'Tony Stark', relation: 'mentor and father figure', icon: '⚙️' }
    ],
    secret: 'The third signal is not fear—it is hope. The web remembers every promise, even the ones no one keeps.'
  }
];

const lovedMoments = [
  { title: 'Mary Jane', subtitle: 'A choice that changed everything', thumb: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' },
  { title: 'The Promise', subtitle: 'Worth carrying into the dark', thumb: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80' },
  { title: 'A New Dawn', subtitle: 'The signal grows stronger', thumb: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80' }
];

const fileCards = [
  { title: 'Threat Index', value: '92%', note: 'The pattern is spreading through memory.' },
  { title: 'Signal Noise', value: '17%', note: 'Residual distortion from fractured timelines.' },
  { title: 'Archive Status', value: 'LIVE', note: 'The trace has become self-aware.' }
];

const secretClues = [
  'The first web was personal. The second was mournful. The third was a promise.',
  'Every lifetime carries a hidden fracture that keeps the web alive.',
  'The archive did not create the signal. It only learned how to hear it.'
];

const characterGrid = document.getElementById('characterGrid');
const lovedGrid = document.getElementById('lovedGrid');
const fileGrid = document.getElementById('fileGrid');
const clueList = document.getElementById('clueList');
const secretMessage = document.getElementById('secretMessage');
const revealSecretBtn = document.getElementById('revealSecret');
const profileModal = document.getElementById('profileModal');
const profileContent = document.getElementById('profileContent');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');

let revealedClues = 0;

function renderCharacters() {
  characterGrid.innerHTML = characters.map((character) => `
    <article class="character-card" data-character="${character.id}" tabindex="0">
      <img class="character-image" src="${character.image}" alt="${character.name} portrait" />
      <div class="character-overlay">
        <div class="character-topline">
          <span class="character-tag">${character.universe}</span>
          <span class="love-badge">🕷</span>
        </div>
        <h3>${character.name}</h3>
        <div class="identity">${character.identity}</div>
        <p class="tagline">${character.tagline}</p>
        <div class="card-footer">
          <span class="dimension">Dimension</span>
          <button type="button" class="video-trigger" data-video="${character.video}">Loved Ones</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.character-card').forEach((card) => {
    card.addEventListener('click', () => openProfile(card.dataset.character));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProfile(card.dataset.character);
      }
    });
  });

  document.querySelectorAll('.video-trigger').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const videoSrc = button.dataset.video;
      initVideo(videoSrc);
    });
  });
}

function renderLovedGrid() {
  lovedGrid.innerHTML = lovedMoments.map((item) => `
    <article class="love-card">
      <img class="love-thumb" src="${item.thumb}" alt="${item.title}" />
      <div class="love-info">
        <h3>${item.title}</h3>
        <p>${item.subtitle}</p>
      </div>
    </article>
  `).join('');
}

function renderFiles() {
  fileGrid.innerHTML = fileCards.map((item) => `
    <article class="file-card">
      <div class="file-info">
        <h3>${item.title}</h3>
        <p>${item.note}</p>
        <div class="file-stat">
          <span>STATUS</span>
          <strong>${item.value}</strong>
        </div>
      </div>
    </article>
  `).join('');
}

function renderClues() {
  clueList.innerHTML = secretClues.map((clue, index) => `
    <li><strong>CLUE ${index + 1}</strong> // ${index <= revealedClues ? clue : '███ encrypted trace ███'}</li>
  `).join('');
}

function setSecretMessage(message) {
  secretMessage.textContent = message;
}

function revealSecret() {
  if (revealedClues >= secretClues.length) {
    setSecretMessage('[ SIGNAL COMPLETE ] // the archive has accepted the truth');
    return;
  }

  const clue = secretClues[revealedClues];
  setSecretMessage(`[ SIGNAL ${String(revealedClues + 1).padStart(2, '0')} ] // ${clue}`);
  revealedClues += 1;
  renderClues();
}

function openProfile(characterId) {
  const character = characters.find((entry) => entry.id === characterId);
  if (!character) return;

  setSecretMessage(character.secret);
  revealedClues = Math.min(revealedClues + 1, secretClues.length);
  renderClues();

  profileContent.innerHTML = `
    <div class="profile-layout">
      <div class="profile-hero">
        <img src="${character.image}" alt="${character.name} profile" />
        <div class="profile-hero-copy">
          <h2>${character.name}</h2>
          <div class="identity-tag">${character.identity} // ${character.universe}</div>
        </div>
      </div>

      <div class="profile-details">
        <p class="summary">${character.summary}</p>
        <div class="meta-row">
          <div class="meta-box">
            <span>Origin</span>
            <strong>${character.origin.split(' ').slice(0, 3).join(' ')}</strong>
          </div>
          <div class="meta-box">
            <span>Traits</span>
            <strong>${character.traits[0]}</strong>
          </div>
        </div>

        <div class="split-grid">
          <div class="detail-panel">
            <h3>Biography</h3>
            <ul>
              <li>${character.bio}</li>
              <li>${character.origin}</li>
            </ul>
          </div>

          <div class="detail-panel">
            <h3>Strengths</h3>
            <div class="strength-list">
              ${character.stats.map((stat) => `
                <div class="strength-item">
                  <div class="label-row"><span>${stat.label}</span><span>${stat.value}%</span></div>
                  <div class="meter"><span style="width:${stat.value}%"></span></div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="split-grid">
          <div class="detail-panel">
            <h3>Weaknesses</h3>
            <ul>
              ${character.weaknesses.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div class="detail-panel">
            <h3>Loved Ones</h3>
            <div class="loved-list">
              ${character.lovedOnes.map((person) => `
                <div class="loved-item">
                  <div class="mini-circle">${person.icon}</div>
                  <div>
                    <strong>${person.name}</strong>
                    <span>${person.relation}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  profileModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProfile() {
  profileModal.classList.add('hidden');
  document.body.style.overflow = '';
}

function initVideo(src) {
  videoPlayer.src = src;
  videoModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  videoPlayer.play().catch(() => {});
}

function closeVideo() {
  videoModal.classList.add('hidden');
  document.body.style.overflow = '';
  videoPlayer.pause();
  videoPlayer.currentTime = 0;
}

revealSecretBtn.addEventListener('click', revealSecret);

document.querySelectorAll('[data-close="true"]').forEach((element) => {
  element.addEventListener('click', () => {
    closeProfile();
    closeVideo();
  });
});

document.getElementById('closeProfile').addEventListener('click', closeProfile);
document.getElementById('closeVideo').addEventListener('click', closeVideo);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeProfile();
    closeVideo();
  }
});

renderCharacters();
renderLovedGrid();
renderFiles();
renderClues();
setSecretMessage('[ SIGNAL UNSTABLE ] // the archive is listening');