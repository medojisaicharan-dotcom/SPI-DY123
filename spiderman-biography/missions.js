/**
 * Spider-Man Missions Hub - Dashboard State and Controller
 */

// Initial Default Missions
const defaultMissions = [
  {
    id: 'm1',
    title: 'Oscorp Chemical Theft',
    difficulty: 'street',
    diffLabel: 'STREET LEVEL',
    desc: 'Armed thugs are breaching Oscorp\'s research vault. Secure the bio-chemical samples before they escape.',
    hero: 'peter',
    objectives: [
      { text: 'Neutralize 4 vault gate guards', completed: false },
      { text: 'Override the central server alarm lock', completed: false },
      { text: 'Secure the genetic splice serum cartridge', completed: false }
    ],
    xp: 400,
    completed: false,
    claimed: false
  },
  {
    id: 'm2',
    title: 'Brooklyn Bridge Crisis',
    difficulty: 'city',
    diffLabel: 'CITY THREAT',
    desc: 'A massive vehicle multi-pileup has trapped citizens. Extreme fire hazards threaten the bridge structure.',
    hero: 'miles',
    objectives: [
      { text: 'Free 5 drivers from hanging vehicles', completed: false },
      { text: 'Cool down the leaking gas tankers', completed: false },
      { text: 'Absorb stray electrical discharge loops', completed: false },
      { text: 'Clear path for arriving medical teams', completed: false }
    ],
    xp: 800,
    completed: false,
    claimed: false
  },
  {
    id: 'm3',
    title: 'Subway Quantum Anomaly',
    difficulty: 'multiverse',
    diffLabel: 'MULTIVERSAL',
    desc: 'Dimensional sensors detect extreme bleed-through in unused subway lines. Investigate and secure.',
    hero: 'gwen',
    objectives: [
      { text: 'Calibrate 3 quantum anchor nodes', completed: false },
      { text: 'Locate the center of the timeline tear', completed: false },
      { text: 'Destroy the inter-dimensional glitch probe', completed: false }
    ],
    xp: 1200,
    completed: false,
    claimed: false
  },
  {
    id: 'm4',
    title: 'FEAST Shelter Protection',
    difficulty: 'street',
    diffLabel: 'STREET LEVEL',
    desc: 'Local gangs are stealing food and medicine trucks headed to the FEAST community shelter in Chinatown.',
    hero: 'peter',
    objectives: [
      { text: 'Track hijackers to the warehouse sector', completed: false },
      { text: 'Secure coordinates quietly without alert', completed: false },
      { text: 'Deploy web-nets to capture the gang leader', completed: false }
    ],
    xp: 300,
    completed: false,
    claimed: false
  },
  {
    id: 'm5',
    title: 'Times Square Generator Leak',
    difficulty: 'city',
    diffLabel: 'CITY THREAT',
    desc: 'High-voltage coils are draining power from Manhattan, causing massive blackouts and structural hazards.',
    hero: 'miles',
    objectives: [
      { text: 'Deactivate 3 high-voltage battery nodes', completed: false },
      { text: 'Clear blockades surrounding the substation', completed: false },
      { text: 'Absorb the core reactor surplus grid', completed: false }
    ],
    xp: 900,
    completed: false,
    claimed: false
  }
];

// Helper Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Local State
let activeHero = 'peter';
let missions = [];
let totalXP = 0;

// Load Data from Local Storage
function loadState() {
  const storedMissions = localStorage.getItem('spiderMissions');
  if (storedMissions) {
    try {
      missions = JSON.parse(storedMissions);
    } catch(e) {
      missions = [...defaultMissions];
    }
  } else {
    missions = [...defaultMissions];
  }

  const storedXP = localStorage.getItem('spiderMissionsXP');
  totalXP = storedXP ? Number(storedXP) : 0;
  
  const storedHero = localStorage.getItem('spiderMissionsActiveHero');
  activeHero = storedHero || 'peter';
}

// Save Data to Local Storage
function saveState() {
  localStorage.setItem('spiderMissions', JSON.stringify(missions));
  localStorage.setItem('spiderMissionsXP', totalXP.toString());
  localStorage.setItem('spiderMissionsActiveHero', activeHero);
}

// Loading Screen
window.addEventListener('load', () => {
  const loader = $('#loadingScreen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      AudioManager.play('energyPulse');
    }, 1500);
  }
});

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  initAudioControls();
  initThemeToggles();
  initHeroAssignment();
  initWeblineRun();
  initMissionsEngine();
  updateDashboardStats();
});

// Sound Settings Panel & Interactions Sync
function initAudioControls() {
  const soundToggle = $('#soundToggle');
  const soundPanel = $('#soundPanel');
  const muteCheck = $('#muteAudio');
  const volumeIcon = $('#volumeIcon');
  const soundBtnText = $('#soundBtnText');

  const updateUI = () => {
    const s = AudioManager.get();
    muteCheck.checked = !s.enabled;
    $('#masterVolume').value = s.master;
    $('#effectsVolume').value = s.effects;
    
    if (s.enabled) {
      soundBtnText.textContent = "Sound On";
      soundToggle.setAttribute('aria-label', "Mute sound");
      volumeIcon.innerHTML = '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>';
    } else {
      soundBtnText.textContent = "Sound Off";
      soundToggle.setAttribute('aria-label', "Unmute sound");
      volumeIcon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM19 12c0 3.28-2.16 6.07-5.14 7.06v2.02c4.09-1 7.14-4.66 7.14-9.08s-3.05-8.08-7.14-9.08v2.02c2.98.99 5.14 3.78 5.14 7.06zM3 9v6h4l5 5V4L7 9H3zm7 3.5v3.13l-2.74-2.74c-.2-.2-.46-.39-.76-.39H5v-3h1.5c.3 0 .56-.19.76-.39L10 8.37v4.13z"/>';
    }
  };

  soundToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    AudioManager.set('enabled', !AudioManager.get().enabled);
    const nextHidden = !soundPanel.hidden;
    soundPanel.hidden = nextHidden;
    soundToggle.setAttribute('aria-expanded', !nextHidden);
    updateUI();
    if (AudioManager.get().enabled) {
      AudioManager.ensureContext();
      AudioManager.play('click');
    }
  });

  document.addEventListener('click', (e) => {
    if (!soundPanel.hidden && !soundPanel.contains(e.target) && e.target !== soundToggle) {
      soundPanel.hidden = true;
      soundToggle.setAttribute('aria-expanded', 'false');
    }
  });

  $('#masterVolume').addEventListener('input', (e) => {
    AudioManager.set('master', Number(e.target.value));
  });

  $('#effectsVolume').addEventListener('input', (e) => {
    AudioManager.set('effects', Number(e.target.value));
  });

  muteCheck.addEventListener('change', (e) => {
    const isMuted = e.target.checked;
    AudioManager.set('enabled', !isMuted);
    updateUI();
    if (!isMuted) AudioManager.play('webShoot');
  });

  updateUI();

  // Standard interactive sounds
  const playWhoosh = () => AudioManager.play('whoosh');
  const playClick = () => AudioManager.play('click');

  $$('.main-nav a, .button, .filter-btn, .status-btn').forEach(el => {
    el.addEventListener('mouseenter', playWhoosh);
    el.addEventListener('focus', playWhoosh);
    el.addEventListener('click', playClick);
  });
}

// Assigned Body Themes & High Contrast controls
function initThemeToggles() {
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  
  menuToggle.addEventListener('click', () => {
    const open = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open);
    AudioManager.play('click');
  });

  $('#motionToggle').addEventListener('click', () => {
    const active = document.body.classList.toggle('reduced-motion');
    $('#motionToggle').textContent = active ? "Enable motion" : "Reduce motion";
    AudioManager.play('click');
  });

  $('#contrastToggle').addEventListener('click', () => {
    const active = document.body.classList.toggle('high-contrast');
    $('#contrastToggle').textContent = active ? "Normal contrast" : "High contrast";
    AudioManager.play('click');
  });
}

// Hero Assignment Selector
function initHeroAssignment() {
  const updateHeroVisualTheme = (hero) => {
    // Remove previous hero class modifiers
    document.body.classList.remove('hero-peter', 'hero-miles', 'hero-gwen');
    // Add current assigned modifier
    document.body.classList.add(`hero-${hero}`);

    $$('.hero-selector-card').forEach(card => {
      const cardHero = card.dataset.hero;
      const badge = card.querySelector('.active-badge');
      if (cardHero === hero) {
        card.classList.add('active');
        badge.textContent = 'ACTIVE ON DUTY';
      } else {
        card.classList.remove('active');
        badge.textContent = 'ASSIGN HERO';
      }
    });
  };

  // Initial render state
  updateHeroVisualTheme(activeHero);

  $$('.hero-selector-card').forEach(card => {
    const assign = () => {
      const selected = card.dataset.hero;
      if (selected !== activeHero) {
        activeHero = selected;
        updateHeroVisualTheme(activeHero);
        AudioManager.play('energyPulse');
        saveState();
        renderMissions();
      }
    };

    card.addEventListener('click', assign);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        assign();
      }
    });

    // Sounds hover
    card.addEventListener('mouseenter', () => AudioManager.play('whoosh'));
    card.addEventListener('focus', () => AudioManager.play('whoosh'));
  });
}

// Small canvas patrol: swing upward, collect beacons, and avoid drones.
function initWeblineRun() {
  const canvas = $('#webRunCanvas');
  const startButton = $('#webRunStart');
  const webButton = $('#webRunWeb');
  const status = $('#webRunStatus');
  if (!canvas || !startButton || !webButton || !status) return;

  const context = canvas.getContext('2d');
  const heroColor = getComputedStyle(document.body).getPropertyValue('--active-hero-color').trim() || '#e52f43';
  const game = {
    active: false,
    swinging: false,
    score: 0,
    distance: 0,
    playerY: 170,
    velocityY: 0,
    beacons: [],
    drones: [],
    lastTime: 0,
    animationFrame: 0
  };
  const width = 900;
  const height = 360;
  const playerX = 165;

  const resizeCanvas = () => {
    const scale = window.devicePixelRatio || 1;
    canvas.width = width * scale;
    canvas.height = height * scale;
    context.setTransform(scale, 0, 0, scale, 0, 0);
    drawScene();
  };

  const resetGame = () => {
    game.active = true;
    game.swinging = false;
    game.score = 0;
    game.distance = 0;
    game.playerY = 170;
    game.velocityY = 0;
    game.beacons = Array.from({ length: 8 }, (_, index) => ({
      x: 430 + index * 145,
      y: 72 + (index % 3) * 66,
      collected: false
    }));
    game.drones = Array.from({ length: 5 }, (_, index) => ({
      x: 660 + index * 245,
      y: 100 + (index % 2) * 100
    }));
    status.textContent = 'PATROL ACTIVE';
    startButton.textContent = 'Restart Patrol';
    game.lastTime = performance.now();
    cancelAnimationFrame(game.animationFrame);
    game.animationFrame = requestAnimationFrame(step);
  };

  const endGame = (message) => {
    game.active = false;
    game.swinging = false;
    status.textContent = message;
    AudioManager.play('success');
    drawScene();
  };

  const setSwinging = (value) => {
    game.swinging = value;
    webButton.classList.toggle('active', value);
    if (value && !game.active) resetGame();
  };

  const drawBuilding = (x, buildingWidth, buildingHeight, hue) => {
    const top = height - buildingHeight;
    context.fillStyle = hue;
    context.fillRect(x, top, buildingWidth, buildingHeight);
    context.strokeStyle = 'rgba(110, 225, 232, 0.12)';
    context.strokeRect(x, top, buildingWidth, buildingHeight);
    for (let row = top + 18; row < height - 14; row += 32) {
      for (let column = x + 14; column < x + buildingWidth - 10; column += 28) {
        context.fillStyle = (Math.floor(row + column) % 3 === 0) ? '#e4b76e' : 'rgba(110, 225, 232, 0.18)';
        context.fillRect(column, row, 10, 13);
      }
    }
  };

  const drawScene = () => {
    context.clearRect(0, 0, width, height);
    const sky = context.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#071827');
    sky.addColorStop(1, '#03070c');
    context.fillStyle = sky;
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'rgba(110, 225, 232, 0.08)';
    for (let index = 0; index < 18; index += 1) {
      const x = (index * 83 - game.distance * 0.25) % width;
      context.fillRect(x < 0 ? x + width : x, 42 + (index % 4) * 27, 2, 2);
    }

    for (let index = 0; index < 7; index += 1) {
      const buildingX = ((index * 155 - game.distance * 0.55) % 1085) - 100;
      drawBuilding(buildingX, 120 + (index % 2) * 24, 130 + (index % 3) * 30, index % 2 ? '#0c1d2a' : '#102536');
    }

    context.fillStyle = '#05090e';
    context.fillRect(0, height - 20, width, 20);
    game.beacons.forEach(beacon => {
      if (beacon.collected || beacon.x < -30 || beacon.x > width + 30) return;
      context.beginPath();
      context.arc(beacon.x, beacon.y, 7, 0, Math.PI * 2);
      context.fillStyle = '#6ee1e8';
      context.shadowColor = '#6ee1e8';
      context.shadowBlur = 16;
      context.fill();
      context.shadowBlur = 0;
    });

    game.drones.forEach(drone => {
      if (drone.x < -30 || drone.x > width + 30) return;
      context.fillStyle = '#e52f43';
      context.fillRect(drone.x - 10, drone.y - 4, 20, 8);
      context.fillStyle = '#f4f7fb';
      context.fillRect(drone.x - 3, drone.y - 2, 6, 4);
    });

    if (game.swinging) {
      context.beginPath();
      context.moveTo(playerX, game.playerY - 10);
      context.lineTo(playerX + 75, 30);
      context.strokeStyle = 'rgba(244, 247, 251, 0.8)';
      context.lineWidth = 2;
      context.stroke();
    }

    context.beginPath();
    context.arc(playerX, game.playerY, 12, 0, Math.PI * 2);
    context.fillStyle = heroColor;
    context.fill();
    context.fillStyle = '#f4f7fb';
    context.fillRect(playerX - 7, game.playerY - 3, 4, 3);
    context.fillRect(playerX + 3, game.playerY - 3, 4, 3);
  };

  const step = (time) => {
    if (!game.active) return;
    const delta = Math.min((time - game.lastTime) / 16.67, 2);
    game.lastTime = time;
    game.distance += 2.2 * delta;
    game.beacons.forEach(beacon => { beacon.x -= 2.2 * delta; });
    game.drones.forEach(drone => { drone.x -= 2.2 * delta; });
    if (game.swinging) game.velocityY -= 0.72 * delta;
    game.velocityY += 0.48 * delta;
    game.velocityY *= 0.98;
    game.playerY += game.velocityY * delta;
    if (game.playerY < 38) { game.playerY = 38; game.velocityY = 0; }

    game.beacons.forEach(beacon => {
      if (!beacon.collected && Math.hypot(beacon.x - playerX, beacon.y - game.playerY) < 22) {
        beacon.collected = true;
        game.score += 10;
        AudioManager.play('webShoot');
      }
    });
    if (game.drones.some(drone => Math.abs(drone.x - playerX) < 24 && Math.abs(drone.y - game.playerY) < 22)) {
      endGame('PATROL INTERRUPTED');
      return;
    }
    if (game.playerY > height - 38) {
      endGame('ROOFTOP IMPACT');
      return;
    }
    $('#webRunScore').textContent = game.score;
    $('#webRunDistance').textContent = `${Math.floor(game.distance)}M`;
    drawScene();
    game.animationFrame = requestAnimationFrame(step);
  };

  startButton.addEventListener('click', resetGame);
  ['pointerdown', 'touchstart'].forEach(eventName => webButton.addEventListener(eventName, (event) => {
    event.preventDefault();
    setSwinging(true);
  }, { passive: false }));
  ['pointerup', 'pointercancel', 'touchend', 'touchcancel', 'mouseleave'].forEach(eventName => webButton.addEventListener(eventName, () => setSwinging(false)));
  window.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      event.preventDefault();
      setSwinging(true);
    }
  });
  window.addEventListener('keyup', (event) => {
    if (event.code === 'Space') setSwinging(false);
  });
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
}

// Dispatch Missions Manager Engine
function initMissionsEngine() {
  const diffFilters = $$('[data-difficulty]');
  const statusFilters = $$('[data-status]');
  const searchInput = $('#missionSearch');

  // Assign Event Listeners for Filters
  diffFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      diffFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AudioManager.play('webShoot');
      renderMissions();
    });
  });

  statusFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      statusFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      AudioManager.play('click');
      renderMissions();
    });
  });

  searchInput.addEventListener('input', (e) => {
    if (e.target.value.length % 3 === 0) {
      AudioManager.play('click');
    }
    renderMissions();
  });

  renderMissions();
}

// Render dynamic mission cards based on active filtering parameters
function renderMissions() {
  const container = $('#missionsGrid');
  if (!container) return;

  const activeDifficulty = $('.filter-btn.active').dataset.difficulty;
  const activeStatus = $('.status-btn.active').dataset.status;
  const searchQuery = $('#missionSearch').value.toLowerCase().trim();

  // Filter conditions
  const filtered = missions.filter(m => {
    // 1. Assign filter logic: only display missions related to assigned active hero?
    // Wait, the prompt says "select a character selector, and adjust difficulty/dialogue or filter".
    // We filter so they show all, but we highlight matching active hero missions! Or we show all.
    // Let\'s show all, but we filter based on query and status.
    
    const matchesDiff = activeDifficulty === 'all' || m.difficulty === activeDifficulty;
    
    let matchesStatus = true;
    if (activeStatus === 'active') {
      matchesStatus = !m.completed;
    } else if (activeStatus === 'completed') {
      matchesStatus = m.completed;
    }

    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery) ||
      m.desc.toLowerCase().includes(searchQuery) ||
      m.objectives.some(o => o.text.toLowerCase().includes(searchQuery));

    return matchesDiff && matchesStatus && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="reveal" style="grid-column: 1/-1; text-align: center; padding: 3rem; border: 1px dashed var(--line); color: var(--muted);">
        <p>No precinct alerts logged on this security coordinate.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const totalCount = m.objectives.length;
    const completedCount = m.objectives.filter(o => o.completed).length;
    const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    let claimBtnHtml = '';
    if (m.claimed) {
      claimBtnHtml = `<button class="claim-btn" disabled>REWARDS CLAIMED</button>`;
    } else if (m.completed) {
      claimBtnHtml = `<button class="claim-btn" data-claim="${m.id}">CLAIM ${m.xp} XP</button>`;
    } else {
      claimBtnHtml = `<button class="claim-btn" disabled>MISSION IN PROGRESS</button>`;
    }

    // Hero identifier letters
    const heroInitials = m.hero === 'peter' ? 'PP' : (m.hero === 'miles' ? 'MM' : 'GS');

    return `
      <article class="mission-card reveal ${m.completed ? 'completed' : ''} ${m.claimed ? 'claimed' : ''}" data-id="${m.id}">
        <div class="mission-card-header">
          <span class="diff-badge ${m.difficulty}">${m.diffLabel}</span>
          <div class="hero-indicator" title="Recommended for ${m.hero.toUpperCase()}">${heroInitials}</div>
        </div>
        
        <div class="mission-card-body">
          <h3>${m.title}</h3>
          <p>${m.desc}</p>
        </div>

        <div class="objective-list" aria-label="Objective list checklist">
          ${m.objectives.map((o, idx) => `
            <label class="objective-item">
              <input type="checkbox" data-mission="${m.id}" data-idx="${idx}" ${o.completed ? 'checked' : ''} ${m.claimed ? 'disabled' : ''} />
              <span class="check-box"></span>
              <span class="objective-text">${o.text}</span>
            </label>
          `).join('')}
        </div>

        <div class="mission-card-progress">
          <div class="progress-info">
            <span>PATROL STAGES</span>
            <span>${pct}% COMPLETE</span>
          </div>
          <div class="meter">
            <i style="width: ${pct}%"></i>
          </div>
        </div>

        <div class="reward-badge">
          <span>XP REWARD</span>
          <b>${m.xp} XP</b>
        </div>

        ${claimBtnHtml}
      </article>
    `;
  }).join('');

  // Handle Dynamic Checklist Events
  $$('.objective-item input[type="checkbox"]').forEach(box => {
    box.addEventListener('change', (e) => {
      const missionId = e.target.dataset.mission;
      const objIndex = Number(e.target.dataset.idx);
      const isChecked = e.target.checked;

      const mission = missions.find(m => m.id === missionId);
      if (mission) {
        mission.objectives[objIndex].completed = isChecked;

        // Check if all objectives are completed
        const allDone = mission.objectives.every(o => o.completed);
        
        // If it transitions to complete for the first time, play success chime
        if (allDone && !mission.completed) {
          mission.completed = true;
          AudioManager.play('success');
        } else {
          mission.completed = allDone;
          AudioManager.play('click');
        }

        saveState();
        renderMissions();
        updateDashboardStats();
      }
    });
  });

  // Handle Dynamic Reward Claim Events
  $$('.claim-btn[data-claim]').forEach(btn => {
    btn.addEventListener('click', () => {
      const missionId = btn.dataset.claim;
      const mission = missions.find(m => m.id === missionId);
      
      if (mission && mission.completed && !mission.claimed) {
        mission.claimed = true;
        totalXP += mission.xp;
        
        AudioManager.play('success');
        saveState();
        renderMissions();
        updateDashboardStats();
      }
    });
  });

  // Re-run scroll observer reveals
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  $$('#missionsGrid .reveal').forEach(el => revealObserver.observe(el));
}

// Update live dashboard stats panel values
function updateDashboardStats() {
  const completed = missions.filter(m => m.completed).length;
  const total = missions.length;
  const activeAlerts = missions.filter(m => !m.completed).length;

  $('#statTotalCompleted').textContent = `${completed} / ${total}`;
  $('#statActiveAlerts').textContent = activeAlerts.toString();
  $('#statTotalXP').textContent = totalXP.toString();
}

