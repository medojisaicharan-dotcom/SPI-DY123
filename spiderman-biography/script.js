const origin = [
  ['1940s', 'The beginning', 'A Queens childhood shaped by Aunt May, Uncle Ben, and a restless scientific mind.'],
  ['THE BITE', 'A changed biology', 'A radioactive spider bite unlocks strength, agility, wall-crawling, and a new responsibility.'],
  ['THE LOSS', 'The lesson', 'Peter learns that power without responsibility is just another kind of weakness.'],
  ['THE MASK', 'A symbol emerges', 'A homemade suit gives a private promise a public shape: protect the city.'],
  ['TODAY', 'The ongoing story', 'Every new threat tests the same choice: help first, explain later.']
];
const powers = [['STRENGTH', 'Lift impossible weight.', 91], ['AGILITY', 'Move through the city in three dimensions.', 97], ['REFLEXES', 'React before danger arrives.', 96], ['WALL-CRAWLING', 'Adhere to almost any surface.', 99], ['HEALING', 'Recover faster than a normal human.', 76], ['ENDURANCE', 'Keep moving after the impossible hit.', 89], ['COMBAT', 'Turn momentum into a language.', 88], ['SCIENCE', 'Build the solution from what is available.', 94]];
const tech = [['01', 'Web-shooters', 'Mechanical launchers designed by Peter, with interchangeable cartridges for different web types.', '08'], ['02', 'Advanced lenses', 'Optical protection, targeting overlays, and expressive eye shapes. Entirely fictional in-universe tech.', '12'], ['03', 'Spider-tracers', 'Small signal devices that make a moving city searchable.', '24'], ['04', 'Suit materials', 'Layered fabric, impact distribution, and a recognizable red-and-blue visual language.', '07']];
const allies = [['AUNT MAY', 'THE ANCHOR', 'The person who turns a hidden life into a human one.', 'Family / guardian'], ['UNCLE BEN', 'THE CONSTANT', 'His lesson becomes the moral architecture beneath every swing.', 'Family / legacy'], ['MARY JANE', 'THE WITNESS', 'A relationship built on honesty, courage, and seeing the person beneath the mask.', 'Partner / confidant'], ['MILES MORALES', 'THE LEGACY', 'A second voice proves the symbol was never owned by one person.', 'Spider-hero / ally']];
const villains = [['GREEN GOBLIN', 'science', 'A brilliant mind bent by power, obsession, and a personal connection to Peter.'], ['DOCTOR OCTOPUS', 'science', 'A gifted engineer whose ambition turns innovation into a threat.'], ['VENOM', 'cosmic', 'An alien symbiote and its host make identity itself the battleground.'], ['MYSTERIO', 'crime', 'A master of illusion who weaponizes perception and public trust.'], ['VULTURE', 'crime', 'A salvager who turns advanced technology into airborne predation.'], ['ELECTRO', 'cosmic', 'Living energy, unstable power, and a grudge against the world.'], ['SANDMAN', 'cosmic', 'A desperate man whose body becomes an ever-shifting weapon.'], ['KINGPIN', 'crime', 'Organized power that treats the city like property.']];
const universes = [['EARTH-616', 'Peter Parker', 'The classic continuity: science, grief, humor, and responsibility.'], ['EARTH-1610', 'Miles Morales', 'A Brooklyn successor proves the mask can belong to anyone.'], ['EARTH-65', 'Gwen Stacy', 'A drummer, detective, and hero carrying a different kind of loss.'], ['EARTH-928', 'Miguel O’Hara', 'A future Spider-Man balancing biology, systems, and destiny.'], ['EARTH-42', 'The Prowler', 'A fractured reality where the symbol takes a darker route.']];
const story = [['01', 'The origin', 'A science trip, a spider bite, and an experiment in what responsibility means.'], ['02', 'The city learns his name', 'The mask becomes a promise made in public, one rescue at a time.'], ['03', 'The cost of saving everyone', 'Personal sacrifice turns heroism from a fantasy into a daily decision.'], ['04', 'Across the spider-verse', 'Alternate lives reveal that courage is a pattern, not a single face.'], ['05', 'The legacy continues', 'The web expands beyond one borough, one timeline, and one generation.']];

const $ = (selector) => document.querySelector(selector);
const render = (selector, template) => { $(selector).innerHTML = template; };

const audioManager = (() => {
  let context;
  let lastPlayed = 0;
  const settings = JSON.parse(localStorage.getItem('spiderArchiveSound') || '{"enabled":true,"master":35,"effects":80,"ambient":0}');
  const tones = { navigation: [520, 760], biography: [220, 440], powers: [330, 880], technology: [150, 620], web: [720, 1180], allies: [523, 784], villains: [110, 165], universe: [440, 990], timeline: [390, 580], search: [600, 740], open: [280, 620], close: [420, 250], cta: [300, 680], error: [160, 110] };
  const save = () => localStorage.setItem('spiderArchiveSound', JSON.stringify(settings));
  const ensureContext = () => { if (!context) context = new (window.AudioContext || window.webkitAudioContext)(); if (context.state === 'suspended') context.resume(); return context; };
  const play = (type = 'navigation') => {
    if (!settings.enabled || settings.master === 0 || settings.effects === 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const now = performance.now(); if (now - lastPlayed < 90) return; lastPlayed = now;
    try { const audio = ensureContext(); const gain = audio.createGain(); const oscillator = audio.createOscillator(); const [start, end] = tones[type] || tones.navigation; const volume = (settings.master / 100) * (settings.effects / 100) * .07; oscillator.type = type === 'villains' || type === 'error' ? 'sine' : 'triangle'; oscillator.frequency.setValueAtTime(start, audio.currentTime); oscillator.frequency.exponentialRampToValueAtTime(end, audio.currentTime + .12); gain.gain.setValueAtTime(.001, audio.currentTime); gain.gain.exponentialRampToValueAtTime(volume, audio.currentTime + .015); gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + .17); oscillator.connect(gain).connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + .18); } catch { /* Audio is optional enhancement. */ }
  };
  const set = (key, value) => { settings[key] = value; save(); };
  return { play, set, get: () => settings };
})();

const soundToggle = $('#soundToggle');
const soundPanel = $('#soundPanel');
const soundSettings = [['masterVolume', 'master'], ['effectsVolume', 'effects'], ['ambientVolume', 'ambient']];
soundToggle.addEventListener('click', () => { const enabled = !audioManager.get().enabled; audioManager.set('enabled', enabled); soundToggle.textContent = enabled ? 'Sound off' : 'Sound on'; if (enabled) audioManager.play('navigation'); soundPanel.hidden = !soundPanel.hidden; soundToggle.setAttribute('aria-expanded', !soundPanel.hidden); });
soundSettings.forEach(([id, key]) => { const input = $(`#${id}`); input.value = audioManager.get()[key]; input.addEventListener('input', () => audioManager.set(key, Number(input.value))); });
$('#muteAudio').checked = !audioManager.get().enabled;
$('#muteAudio').addEventListener('change', (event) => { const enabled = !event.target.checked; audioManager.set('enabled', enabled); soundToggle.textContent = enabled ? 'Sound off' : 'Sound on'; if (enabled) audioManager.play('navigation'); });
soundToggle.textContent = audioManager.get().enabled ? 'Sound off' : 'Sound on';
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => audioManager.play(link.hash.slice(1) === 'universes' ? 'universe' : link.hash.slice(1))));
render('#originTimeline', origin.map(([year, title, text]) => `<article class="origin-item reveal"><strong>${year}</strong><h3>${title}</h3><p>${text}</p></article>`).join(''));
render('#powerGrid', powers.map(([title, text, value], index) => `<article class="power-card reveal"><span>0${index + 2}</span><h3>${title}</h3><p>${text}</p><div class="meter"><i style="--value:${value}%"></i></div><small>${value} / 100</small></article>`).join(''));
render('#techList', tech.map(([number, title, text, value]) => `<article class="tech-item reveal"><span>${number}</span><div><h3>${title}</h3><p>${text}</p></div><b>${value}</b></article>`).join(''));
render('#allyGrid', allies.map(([name, role, text, detail]) => `<article class="profile-card reveal" tabindex="0"><small>${role}</small><h3>${name}</h3><p>${text}</p><p class="expanded"><b>RELATIONSHIP FILE</b><br />${detail}. Click again to collapse.</p></article>`).join(''));
render('#threatGrid', villains.map(([name, category, text]) => `<article class="threat-card reveal" data-category="${category}"><small>${category} / THREAT RECORD</small><h3>${name}</h3><p>${text}</p><b>connection: adversarial</b></article>`).join(''));
render('#universeGrid', universes.map(([universe, identity, text]) => `<article class="universe-card reveal" data-search="${universe} ${identity} ${text}"><small>${universe}</small><h3>${identity}</h3><p>${text}</p></article>`).join(''));
render('#storyline', story.map(([number, title, text]) => `<article class="story-item reveal"><strong>${number}</strong><h3>${title}</h3><p>${text}</p></article>`).join(''));

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  audioManager.play('search');
  document.querySelectorAll('.filter').forEach((item) => item.classList.remove('active'));
  button.classList.add('active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.threat-card').forEach((card) => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
}));
$('#universeSearch').addEventListener('input', (event) => {
  audioManager.play('search');
  const query = event.target.value.toLowerCase();
  const visible = [...document.querySelectorAll('.universe-card')].filter((card) => { const match = card.dataset.search.toLowerCase().includes(query); card.hidden = !match; return match; }).length;
  $('#resultCount').textContent = `${String(visible).padStart(2, '0')} RECORDS`;
});
document.querySelectorAll('.profile-card').forEach((card) => { const toggle = () => { card.classList.toggle('open'); audioManager.play(card.classList.contains('open') ? 'open' : 'close'); }; card.addEventListener('click', toggle); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(); } }); });
$('#menuToggle').addEventListener('click', () => { const nav = $('#mainNav'); const open = nav.classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', open); audioManager.play('navigation'); });
document.querySelectorAll('.main-nav a').forEach((link) => link.addEventListener('click', () => { $('#mainNav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded', 'false'); }));
document.querySelectorAll('.button, .text-link, .scroll-cue').forEach((link) => link.addEventListener('click', () => audioManager.play('cta')));
document.querySelectorAll('.origin-item, .story-item').forEach((item) => item.addEventListener('click', () => audioManager.play('timeline')));
$('#motionToggle').addEventListener('click', () => { document.body.classList.toggle('reduced-motion'); audioManager.play('navigation'); });
$('#contrastToggle').addEventListener('click', () => { document.body.classList.toggle('high-contrast'); audioManager.play('navigation'); });
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('visible'); }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
