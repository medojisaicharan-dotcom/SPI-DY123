/**
 * SPIDER-MAN: THREE HEROES, THREE UNIVERSES, ONE RESPONSIBILITY
 * Interactive Multiverse Dossier Engine & Comparison Controller
 */

// ==========================================================================
// 1. Multiverse Data Models
// ==========================================================================

const comparisonCategories = [
  {
    name: 'Superhuman Strength',
    desc: 'Raw physical lifting and structural support capacity under extreme tension.',
    holland: { score: 88, label: '88 / 100', note: 'Caught falling bell tower; held split Staten Island ferry cables.' },
    maguire: { score: 94, label: '94 / 100', note: 'Stopped full-speed runaway elevated train with pure arm strength and webs.' },
    garfield: { score: 90, label: '90 / 100', note: 'Caught speeding police cars and supported falling SWAT vehicles.' }
  },
  {
    name: 'Combat Agility & Reflexes',
    desc: 'Acrobatic speed, 3D aerial dodging, and kinetic momentum redirection.',
    holland: { score: 93, label: '93 / 100', note: 'Dodged thousands of Stark combat drones in close-quarters corridor.' },
    maguire: { score: 91, label: '91 / 100', note: 'High acrobatic poise dodging Goblin glider blades and Doc Ock tentacle strikes.' },
    garfield: { score: 99, label: '99 / 100', note: 'Hyper-kinetic acrobatics; dodges point-blank machine gun fire & lightning.' }
  },
  {
    name: 'Scientific Intelligence',
    desc: 'Chemical formula synthesis, physics problem-solving, and cross-species genetics.',
    holland: { score: 95, label: '95 / 100', note: 'Formulated web fluid in high school lab; solved geometry in Mirror Dimension.' },
    maguire: { score: 92, label: '92 / 100', note: 'Columbia University physics student praised by Dr. Otto Octavius.' },
    garfield: { score: 96, label: '96 / 100', note: 'Solved Dr. Connors’ decay-rate algorithm equation; built battery dampeners.' }
  },
  {
    name: 'Technology & Gadgets',
    desc: 'Nanotech, AI interfaces, mechanical suit additions, and HUD scanning systems.',
    holland: { score: 99, label: '99 / 100', note: 'Stark nanotech armor, Iron Spider waldoes, EDITH satellite grid, Karen AI.' },
    maguire: { score: 70, label: '70 / 100', note: 'Self-sufficient classic low-tech approach; relied completely on pure biology.' },
    garfield: { score: 86, label: '86 / 100', note: 'Custom Oscorp cable shooters, magnetized battery insulation modifications.' }
  },
  {
    name: 'Combat Experience',
    desc: 'Years of solo patrol, multi-villain warfare, and cross-dimensional battles.',
    holland: { score: 90, label: '90 / 100', note: 'Fought Thanos in cosmic war; cured 5 multiverse villains simultaneously.' },
    maguire: { score: 97, label: '97 / 100', note: 'Decades of seasoned solo patrolling and warfare across New York City.' },
    garfield: { score: 91, label: '91 / 100', note: 'High-intensity rogue containment and high-speed borough surveillance.' }
  },
  {
    name: 'Web Versatility & Delivery',
    desc: 'Organic wrist gland generation vs customizable chemical launchers.',
    holland: { score: 96, label: '96 / 100', note: 'Taser webs, split webs, ricochet grenades, and aerodynamic web-wings.' },
    maguire: { score: 95, label: '95 / 100', note: 'Organic spinnerets with infinite natural supply; never runs out of cartridges.' },
    garfield: { score: 94, label: '94 / 100', note: 'High-tensile bio-cables with high-voltage conductivity webbing.' }
  },
  {
    name: 'Emotional Resilience & Redemption',
    desc: 'Capacity to endure devastating grief, forgive enemies, and sustain the hero mantle.',
    holland: { score: 94, label: '94 / 100', note: 'Chose solitary isolation and forgave Osborn after Aunt May’s death.' },
    maguire: { score: 96, label: '96 / 100', note: 'Endured poverty and grief; reconciled with Harry and forgave Sandman.' },
    garfield: { score: 98, label: '98 / 100', note: 'Overcame the crushing despair of Gwen’s death; saved MJ across the multiverse.' }
  }
];

const villainsList = [
  // Tom Holland Villains
  {
    name: 'Vulture (Adrian Toomes)',
    hero: 'holland',
    heroClass: 'tag-holland',
    heroLabel: 'Tom Holland',
    cat: 'tech',
    catLabel: 'Tech / Crime',
    outcome: 'Incarcerated',
    film: 'Spider-Man: Homecoming (2017)',
    abilities: 'Chitauri-hybrid flight harness, matter phase-shifter, thermal lasers',
    motivation: 'Provide for his family; black-market revenge against Tony Stark',
    result: 'Defeated at Coney Island; spared by Peter and imprisoned.',
    impact: 'Taught Peter that being a hero means saving your enemy even when they try to destroy you.'
  },
  {
    name: 'Mysterio (Quentin Beck)',
    hero: 'holland',
    heroClass: 'tag-holland',
    heroLabel: 'Tom Holland',
    cat: 'tech',
    catLabel: 'Tech / Crime',
    outcome: 'Deceased',
    film: 'Spider-Man: Far From Home (2019)',
    abilities: 'Stark holographic combat drones, psychological simulation, master deception',
    motivation: 'Fame, glory, and replacing Iron Man as Earth’s premier savior',
    result: 'Killed by his own misfired drone; leaked Peter’s secret identity to the world.',
    impact: 'Forced Peter to rely entirely on his instinctual Spider-sense over visual perception.'
  },
  {
    name: 'Green Goblin (Norman Osborn)',
    hero: 'holland',
    heroClass: 'tag-holland',
    heroLabel: 'Tom Holland (Crossover)',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Cured & Returned',
    film: 'Spider-Man: No Way Home (2021)',
    abilities: 'Superhuman strength, jet glider, razor bats, pumpkin bombs, dark split persona',
    motivation: 'Anarchy, destroying Peter’s moral optimism, proving morality is a weakness',
    result: 'Murdered Aunt May; Peter synthesized an anti-serum and cured him of the Goblin persona.',
    impact: 'The ultimate emotional crucible for Holland’s Spider-Man, cementing May’s lesson on responsibility.'
  },
  {
    name: 'Doctor Octopus (Otto Octavius)',
    hero: 'holland',
    heroClass: 'tag-holland',
    heroLabel: 'Tom Holland (Crossover)',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Cured & Allied',
    film: 'Spider-Man: No Way Home (2021)',
    abilities: 'Four telepathically controlled titanium-steel arms with immense crushing force',
    motivation: 'Complete his fusion reactor; control over his neural-linked hardware',
    result: 'Peter replaced his damaged neural inhibitor chip, restoring Otto’s sanity as a valuable ally.',
    impact: 'Proved to Peter that curing villains was a viable, noble alternative to sending them to die.'
  },
  {
    name: 'Electro (Max Dillon)',
    hero: 'holland',
    heroClass: 'tag-holland',
    heroLabel: 'Tom Holland (Crossover)',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Cured & Returned',
    film: 'Spider-Man: No Way Home (2021)',
    abilities: 'Pure bio-electrical manipulation, lightning flight, Arc Reactor energy absorption',
    motivation: 'Desire to be seen, respected, and possess godlike power',
    result: 'Peter and Garfield’s Spider-Man drained his electrical charge using an energy dissipator.',
    impact: 'Provided Andrew Garfield’s Peter Parker a crucial opportunity to make peace with his past enemy.'
  },

  // Tobey Maguire Villains
  {
    name: 'Green Goblin (Norman Osborn)',
    hero: 'maguire',
    heroClass: 'tag-maguire',
    heroLabel: 'Tobey Maguire',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Deceased',
    film: 'Spider-Man (2002)',
    abilities: 'Goblin formula strength, jet glider, razor bats, pumpkin bombs',
    motivation: 'Preserve military funding, eliminate Oscorp board of directors & Spider-Man',
    result: 'Impaled by his own glider during final warehouse duel after trying to ambush Peter.',
    impact: 'The defining ideological test of Maguire’s youth, forcing him to keep secrets from Harry.'
  },
  {
    name: 'Doctor Octopus (Otto Octavius)',
    hero: 'maguire',
    heroClass: 'tag-maguire',
    heroLabel: 'Tobey Maguire',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Redeemed / Deceased',
    film: 'Spider-Man 2 (2004)',
    abilities: 'Neural-linked AI tentacles, nuclear fusion brilliance, tactical intellect',
    motivation: 'Rebuild his fusion reactor at any cost to prove his genius to the scientific world',
    result: 'Peter reasoned with him; Otto regained his mind and drowned the machine in the Hudson River.',
    impact: 'Taught Peter that true brilliance requires moral restraint and personal sacrifice.'
  },
  {
    name: 'Sandman (Flint Marko)',
    hero: 'maguire',
    heroClass: 'tag-maguire',
    heroLabel: 'Tobey Maguire',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Forgiven / Free',
    film: 'Spider-Man 3 (2007)',
    abilities: 'Molecular sand transmutation, density shifting, colossal mass, shape-shifting',
    motivation: 'Acquire funds for his critically ill daughter Penny’s medical treatment',
    result: 'Confessed the accidental shooting of Uncle Ben; Peter granted him heartfelt forgiveness.',
    impact: 'Freed Peter from the destructive cycle of revenge and taught him the healing power of empathy.'
  },
  {
    name: 'Venom (Eddie Brock)',
    hero: 'maguire',
    heroClass: 'tag-maguire',
    heroLabel: 'Tobey Maguire',
    cat: 'symbiote',
    catLabel: 'Symbiote / Cosmic',
    outcome: 'Deceased',
    film: 'Spider-Man 3 (2007)',
    abilities: 'Symbiote mimicry of Spider-Man powers, camouflage, organic web creation',
    motivation: 'Vengeance against Peter Parker for exposing his fraudulent photography',
    result: 'Trapped by resonant steel piping frequencies and destroyed by a pumpkin bomb.',
    impact: 'Showed Peter the danger of letting pride, arrogance, and anger control his actions.'
  },

  // Andrew Garfield Villains
  {
    name: 'The Lizard (Dr. Curt Connors)',
    hero: 'garfield',
    heroClass: 'tag-garfield',
    heroLabel: 'Andrew Garfield',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Cured & Incarcerated',
    film: 'The Amazing Spider-Man (2012)',
    abilities: 'Reptilian regeneration, superhuman mass, telepathic lizard influence, tail whip',
    motivation: 'Regrow lost arm; evolve humanity into superior cross-species reptilians',
    result: 'Peter released cloud antidote at Oscorp tower, restoring Connors to human form.',
    impact: 'Cost Captain Stacy’s life, imposing an impossible moral burden on Peter’s relationship with Gwen.'
  },
  {
    name: 'Electro (Max Dillon)',
    hero: 'garfield',
    heroClass: 'tag-garfield',
    heroLabel: 'Andrew Garfield',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Overloaded',
    film: 'The Amazing Spider-Man 2 (2014)',
    abilities: 'High-voltage electrical projection, teleportation through power lines, grid manipulation',
    motivation: 'Anger over a lifetime of being invisible; absolute control of New York’s power grid',
    result: 'Peter and Gwen overloaded his electrical capacity at the central power substation.',
    impact: 'Demonstrated Peter’s scientific ingenuity in modifying his suits with magnetic insulation.'
  },
  {
    name: 'Green Goblin (Harry Osborn)',
    hero: 'garfield',
    heroClass: 'tag-garfield',
    heroLabel: 'Andrew Garfield',
    cat: 'science',
    catLabel: 'Science Mutation',
    outcome: 'Incarcerated',
    film: 'The Amazing Spider-Man 2 (2014)',
    abilities: 'Venom armor, tactical glider, enhanced combat endurance, blade weapons',
    motivation: 'Cure his genetic terminal illness with Spider-Man’s blood; revenge for betrayal',
    result: 'Defeated in the clocktower, but his attack caused the catastrophic fall of Gwen Stacy.',
    impact: 'The most heartbreaking tragedy in Garfield’s life, plunging him into years of grief.'
  }
];

const galleryList = [
  { title: 'The Multiverse Convergence', tag: 'EARTH-199999', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', desc: 'Dimensional fractures revealing parallel realities colliding over Manhattan.' },
  { title: 'Classic Rooftop Patrol', tag: 'EARTH-96283', img: 'https://images.unsplash.com/photo-1518235506717-e1ed3306a89b?auto=format&fit=crop&w=800&q=80', desc: 'Peter Parker watching over the classic skyline at sunset.' },
  { title: 'Rain and Neon Reflections', tag: 'EARTH-120703', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', desc: 'The dramatic, high-contrast streets of Andrew Garfield’s New York.' },
  { title: 'Stark High-Tech Lab', tag: 'TECHNOLOGY', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80', desc: 'Advanced nanotech fabrication interfaces for MCU suit construction.' },
  { title: 'The Clocktower Remains', tag: 'MEMORY', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', desc: 'Atmospheric ruins symbolizing the profound loss that reshaped a hero.' },
  { title: 'High-Tensile Web Pattern', tag: 'SUIT DESIGN', img: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&w=800&q=80', desc: 'Micro-weave detail of the iconic red-and-blue hero fabrics.' },
  { title: 'Queens Evening Glow', tag: 'HOME', img: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80', desc: 'The neighborhood that forged three separate Peter Parkers into protectors.' },
  { title: 'Statue of Liberty Night', tag: 'SANCTUARY', img: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80', desc: 'The historic setting where three brothers united to cure their enemies.' }
];

// Helper Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ==========================================================================
// 2. Lifecycle & Initializations
// ==========================================================================

window.addEventListener('load', () => {
  const loader = $('#loadingScreen');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('fade-out');
      AudioManager.play('cinematicImpact');
    }, 1400);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initAudioControls();
  initDossierTabs();
  initHeroDimensionPills();
  initSpoilerToggles();
  initCharacterLossModal();
  initComparisonMatrix();
  initVillainArchive();
  initCountingModal();
  initGalleryLightbox();
  initHeroCanvas();
  initScrollObservers();
  initBackToTop();
});

// ==========================================================================
// 3. Reading Progress Indicator
// ==========================================================================

function initReadingProgress() {
  const progressBar = $('#readingProgress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }, { passive: true });
}

// ==========================================================================
// 4. Dossier Switcher Tabs
// ==========================================================================

function initDossierTabs() {
  const tabs = $$('.dossier-nav-btn');
  const blocks = $$('.spiderman-dossier-block');

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      const hero = btn.dataset.hero;
      AudioManager.play('portalWhoosh');

      if (hero === 'all') {
        blocks.forEach(b => b.classList.add('active'));
      } else {
        blocks.forEach(b => {
          if (b.id === `dossier-${hero}`) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      }

      // Re-trigger reveal observer
      $$('.spiderman-dossier-block.active .reveal').forEach(el => el.classList.add('visible'));
    });
  });
}

function initHeroDimensionPills() {
  $$('.dimension-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      const hero = pill.dataset.jump;
      const targetBtn = $(`.dossier-nav-btn[data-hero="${hero}"]`);
      if (targetBtn) {
        targetBtn.click();
      }
      const targetBlock = $(`#dossier-${hero}`);
      if (targetBlock) {
        targetBlock.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ==========================================================================
// 5. Spoiler Reveal Engine
// ==========================================================================

function initSpoilerToggles() {
  $$('.spoiler-container').forEach(container => {
    const btn = container.querySelector('.spoiler-overlay-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const revealed = container.classList.toggle('revealed');
      btn.setAttribute('aria-expanded', revealed);
      btn.querySelector('span').textContent = revealed ? 'HIDE SPOILER CONTENT' : 'SPOILER CONTENT';
      btn.querySelector('small').textContent = revealed ? 'Click to re-lock loss record' : 'Click to decrypt loss record';
      AudioManager.play(revealed ? 'cinematicImpact' : 'click');
    });
  });
}

function initCharacterLossModal() {
  const modal = $('#lossModal');
  const closeButton = $('#lossModalClose');
  const storyToggle = $('#lossStoryToggle');
  if (!modal || !closeButton || !storyToggle) return;

  const records = {
    holland: {
      title: "Tom Holland's Spider-Man — The Cost of Growing Up",
      context: 'Aunt May and the erased life of Peter Parker // Earth-199999 / Spider-Man: No Way Home',
      summary: 'A symbolic loss record about growing beyond mentorship, accepting grief, and choosing responsibility without an audience.',
      image: 'assets/tom-holland-loss.jpg', fallback: 'assets/tom-holland-loss.svg',
      alt: "Symbolic scene representing Tom Holland's Spider-Man experiencing personal loss.",
      full: 'After losing Aunt May and the life he built with his friends, Peter chooses a lonely future to protect the wider world. His new suit and quiet patrols mark a painful independence: heroism becomes a commitment he keeps even when nobody remembers his name.'
    },
    maguire: {
      title: "Tobey Maguire's Spider-Man — Responsibility and Sacrifice",
      context: 'Uncle Ben and the moral foundation of Peter Parker // Earth-96283 / Spider-Man',
      summary: 'A symbolic loss record about the event that turns regret into a lifelong promise to protect others.',
      image: 'assets/tobey-maguire-loss.jpg', fallback: 'assets/tobey-maguire-loss.svg',
      alt: "Symbolic scene representing Tobey Maguire's Spider-Man experiencing personal loss.",
      full: "Uncle Ben's loss gives Peter a principle that outlasts every costume and battle. Later sacrifices, including Harry's final act, deepen that lesson: personal happiness matters, but Peter refuses to make innocent people pay for his choices."
    },
    garfield: {
      title: "Andrew Garfield's Spider-Man — Grief and Redemption",
      context: 'Gwen Stacy and the burden of surviving her loss // Earth-120703 / The Amazing Spider-Man 2',
      summary: 'A symbolic loss record about grief, guilt, and finding a way back to hope without forgetting what happened.',
      image: 'assets/andrew-garfield-loss.jpg', fallback: 'assets/andrew-garfield-loss.svg',
      alt: "Symbolic scene representing Andrew Garfield's Spider-Man experiencing personal loss.",
      full: "Gwen's death leaves Peter convinced that his love and his mission can only endanger people. Years later, saving MJ in another universe gives him a chance to act where he once could not, transforming guilt into renewed compassion."
    }
  };
  let returnFocus = null;

  $$('.character-image-trigger img').forEach(image => {
    image.addEventListener('error', () => {
      if (image.dataset.fallback && image.src.endsWith(image.dataset.fallback)) return;
      image.src = image.dataset.fallback;
    }, { once: true });
  });

  $('#lossModalImage').addEventListener('error', event => {
    const image = event.currentTarget;
    if (image.dataset.fallback && image.src.endsWith(image.dataset.fallback)) return;
    image.src = image.dataset.fallback;
  });

  const close = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    storyToggle.setAttribute('aria-expanded', 'false');
    storyToggle.firstChild.textContent = 'Read the Full Story ';
    $('#lossModalFullStory').hidden = true;
    returnFocus?.focus();
  };

  $$('.character-image-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const record = records[trigger.dataset.character];
      if (!record) return;
      returnFocus = trigger;
      $('#lossModalImage').src = record.image;
      $('#lossModalImage').dataset.fallback = record.fallback;
      $('#lossModalImage').alt = record.alt;
      $('#lossModalTitle').textContent = record.title;
      $('#lossModalContext').textContent = record.context;
      $('#lossModalSummary').textContent = record.summary;
      $('#lossModalFullStory').textContent = record.full;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      closeButton.focus();
      const sound = trigger.dataset.character === 'maguire' ? 'cinematicImpact' : trigger.dataset.character === 'garfield' ? 'whoosh' : 'webShoot';
      AudioManager.play(sound);
    });
  });

  storyToggle.addEventListener('click', () => {
    const expanded = storyToggle.getAttribute('aria-expanded') === 'true';
    storyToggle.setAttribute('aria-expanded', !expanded);
    storyToggle.firstChild.textContent = expanded ? 'Read the Full Story ' : 'Hide Full Story ';
    $('#lossModalFullStory').hidden = expanded;
  });
  closeButton.addEventListener('click', close);
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('active')) close();
  });
}

// ==========================================================================
// 6. Multiverse Comparison Engine
// ==========================================================================

function initComparisonMatrix() {
  const matrixContainer = $('#comparisonMatrix');
  const checkHolland = $('#checkHolland');
  const checkMaguire = $('#checkMaguire');
  const checkGarfield = $('#checkGarfield');

  if (!matrixContainer) return;

  const renderMatrix = () => {
    matrixContainer.innerHTML = comparisonCategories.map(cat => `
      <div class="matrix-row reveal">
        <div class="matrix-category">
          <h4>${cat.name}</h4>
          <p>${cat.desc}</p>
        </div>
        <div class="matrix-bars-container">
          <!-- Holland Bar -->
          <div class="matrix-hero-bar ${!checkHolland.checked ? 'hidden-hero' : ''}" data-hero="holland">
            <div class="matrix-hero-label">
              <span>Tom Holland (MCU)</span>
              <b>${cat.holland.label}</b>
            </div>
            <div class="stat-track">
              <div class="stat-bar-fill" style="width: ${cat.holland.score}%; background: linear-gradient(90deg, var(--holland-red), var(--holland-cyan));"></div>
            </div>
            <small style="font-size:0.68rem; color:var(--muted); margin-top:0.25rem;">${cat.holland.note}</small>
          </div>

          <!-- Maguire Bar -->
          <div class="matrix-hero-bar ${!checkMaguire.checked ? 'hidden-hero' : ''}" data-hero="maguire">
            <div class="matrix-hero-label">
              <span>Tobey Maguire (Raimi)</span>
              <b>${cat.maguire.label}</b>
            </div>
            <div class="stat-track">
              <div class="stat-bar-fill" style="width: ${cat.maguire.score}%; background: linear-gradient(90deg, var(--maguire-red), var(--maguire-gold));"></div>
            </div>
            <small style="font-size:0.68rem; color:var(--muted); margin-top:0.25rem;">${cat.maguire.note}</small>
          </div>

          <!-- Garfield Bar -->
          <div class="matrix-hero-bar ${!checkGarfield.checked ? 'hidden-hero' : ''}" data-hero="garfield">
            <div class="matrix-hero-label">
              <span>Andrew Garfield (Webb)</span>
              <b>${cat.garfield.label}</b>
            </div>
            <div class="stat-track">
              <div class="stat-bar-fill" style="width: ${cat.garfield.score}%; background: linear-gradient(90deg, var(--garfield-red), var(--garfield-neon));"></div>
            </div>
            <small style="font-size:0.68rem; color:var(--muted); margin-top:0.25rem;">${cat.garfield.note}</small>
          </div>
        </div>
      </div>
    `).join('');

    // Trigger reveal observer for new items
    $$('#comparisonMatrix .reveal').forEach(el => el.classList.add('visible'));
  };

  [checkHolland, checkMaguire, checkGarfield].forEach(chk => {
    if (chk) {
      chk.addEventListener('change', () => {
        AudioManager.play('click');
        renderMatrix();
      });
    }
  });

  renderMatrix();
}

// ==========================================================================
// 7. Searchable & Filterable Villain Archive
// ==========================================================================

function initVillainArchive() {
  const grid = $('#villainGrid');
  const searchInput = $('#villainSearch');
  const heroFilters = $$('[data-vhero]');
  const catFilters = $$('[data-vcat]');

  let selectedHero = 'all';
  let selectedCat = 'all';

  if (!grid) return;

  const renderVillains = () => {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    const filtered = villainsList.filter(v => {
      const matchHero = selectedHero === 'all' || v.hero === selectedHero;
      const matchCat = selectedCat === 'all' || v.cat === selectedCat;
      const matchSearch = 
        v.name.toLowerCase().includes(query) ||
        v.abilities.toLowerCase().includes(query) ||
        v.outcome.toLowerCase().includes(query) ||
        v.film.toLowerCase().includes(query);

      return matchHero && matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem; border: 1px dashed var(--line); color: var(--muted);">
          <p>No villains matching the selected filter coordinates.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(v => `
      <article class="villain-card reveal">
        <div class="villain-card-header">
          <span class="villain-hero-tag ${v.heroClass}">${v.heroLabel}</span>
          <span class="villain-outcome-badge">${v.outcome}</span>
        </div>
        <h3>${v.name}</h3>
        <small style="font-family:'DM Mono',monospace; font-size:0.65rem; color:var(--gold); text-transform:uppercase;">
          FIRST APPEARANCE: ${v.film}
        </small>
        <p><b>Abilities:</b> ${v.abilities}</p>
        <p><b>Battle Result:</b> ${v.result}</p>
        <div class="villain-impact-note">
          <small>NARRATIVE SIGNIFICANCE</small>
          <span>${v.impact}</span>
        </div>
      </article>
    `).join('');

    $$('#villainGrid .reveal').forEach(el => el.classList.add('visible'));
  };

  heroFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      heroFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedHero = btn.dataset.vhero;
      AudioManager.play('webShoot');
      renderVillains();
    });
  });

  catFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      catFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCat = btn.dataset.vcat;
      AudioManager.play('click');
      renderVillains();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (e.target.value.length % 3 === 0) {
        AudioManager.play('click');
      }
      renderVillains();
    });
  }

  renderVillains();
}

// ==========================================================================
// 8. Counting Method Modal Dialog
// ==========================================================================

function initCountingModal() {
  const modal = $('#countingModal');
  const openBtn = $('#openModalBtn');
  const closeBtn = $('#closeModalBtn');

  if (!modal || !openBtn || !closeBtn) return;

  const openModal = () => {
    modal.classList.add('active');
    AudioManager.play('energyPulse');
    modal.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    AudioManager.play('click');
  };

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 9. Multiverse Media Gallery & Lightbox
// ==========================================================================

function initGalleryLightbox() {
  const galleryContainer = $('#galleryGrid');
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCaption = $('#lightboxCaption h3');
  const lightboxDesc = $('#lightboxCaption p');

  if (!galleryContainer || !lightbox) return;

  galleryContainer.innerHTML = galleryList.map((item, idx) => `
    <div class="gallery-item reveal" tabindex="0" data-idx="${idx}" aria-label="View photo ${item.title}">
      <img src="${item.img}" alt="${item.title}" loading="lazy" />
      <div class="gallery-overlay">
        <span>${item.tag}</span>
        <h3>${item.title}</h3>
      </div>
    </div>
  `).join('');

  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    const item = galleryList[index];
    lightboxImg.src = item.img;
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = item.title;
    lightboxDesc.textContent = item.desc;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    AudioManager.play('energyPulse');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    AudioManager.play('click');
  };

  const nextImg = () => {
    currentIndex = (currentIndex + 1) % galleryList.length;
    openLightbox(currentIndex);
  };

  const prevImg = () => {
    currentIndex = (currentIndex - 1 + galleryList.length) % galleryList.length;
    openLightbox(currentIndex);
  };

  $$('.gallery-item').forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  $('#lightboxClose').addEventListener('click', closeLightbox);
  $('#lightboxNext').addEventListener('click', nextImg);
  $('#lightboxPrev').addEventListener('click', prevImg);

  lightbox.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

// ==========================================================================
// 10. Web Audio Controls & Settings Panel
// ==========================================================================

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
    const nextHidden = !soundPanel.hidden;
    soundPanel.hidden = nextHidden;
    soundToggle.setAttribute('aria-expanded', !nextHidden);
    AudioManager.play('click');
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

  // Attach hover and click sound triggers to standard elements
  const playWhoosh = () => AudioManager.play('whoosh');
  const playClick = () => AudioManager.play('click');

  $$('.main-nav a, .button, .dossier-nav-btn, .filter-btn, .dimension-pill').forEach(el => {
    el.addEventListener('mouseenter', playWhoosh);
    el.addEventListener('focus', playWhoosh);
    el.addEventListener('click', playClick);
  });
}

// ==========================================================================
// 11. Interactive Hero Canvas Web Physics
// ==========================================================================

function initHeroCanvas() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  const maxDistance = 140;

  const mouse = { x: null, y: null, radius: 180 };

  const handleResize = () => {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    initParticles();
  };

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      this.size = Math.random() * 2 + 1;
      this.density = (Math.random() * 25) + 10;
    }

    draw() {
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      if (document.body.classList.contains('reduced-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.x = this.baseX;
        this.y = this.baseY;
        return;
      }

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius) {
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxForce = (mouse.radius - distance) / mouse.radius;
        let force = maxForce * 4;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        this.x -= directionX;
        this.y -= directionY;
      } else {
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 12;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 12;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const width = canvas.width;
    const height = canvas.height;
    const nodeCount = Math.floor((width * height) / 12000);

    for (let i = 0; i < nodeCount; i++) {
      particles.push(new Particle(Math.random() * width, Math.random() * height));
    }
  }

  function drawConnections() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        let dx = particles[a].x - particles[b].x;
        let dy = particles[a].y - particles[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const alpha = (1 - (distance / maxDistance)) * 0.12;
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - canvas.getBoundingClientRect().left;
    mouse.y = e.clientY - canvas.getBoundingClientRect().top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  window.addEventListener('resize', handleResize);
  handleResize();
  animate();
}

// ==========================================================================
// 12. Scroll Observers & Back-to-Top
// ==========================================================================

function initScrollObservers() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach(el => observer.observe(el));

  // Navigation Mobile Menu Toggle
  const menuToggle = $('#menuToggle');
  const mainNav = $('#mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open);
      AudioManager.play('click');
    });

    $$('.main-nav a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Accessibility Toggles
  $('#motionToggle')?.addEventListener('click', () => {
    const active = document.body.classList.toggle('reduced-motion');
    $('#motionToggle').textContent = active ? "Enable motion" : "Reduce motion";
    AudioManager.play('click');
  });

  $('#contrastToggle')?.addEventListener('click', () => {
    const active = document.body.classList.toggle('high-contrast');
    $('#contrastToggle').textContent = active ? "Normal contrast" : "High contrast";
    AudioManager.play('click');
  });
}

function initBackToTop() {
  const btn = $('#backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    AudioManager.play('webShoot');
  });
}
