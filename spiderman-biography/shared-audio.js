/**
 * Spider-Man Multiverse Dossier - Shared Audio Synthesizer Engine
 * Generates futuristic, cinematic sound effects dynamically using Web Audio API.
 * Syncs user mute/volume preferences across pages via localStorage.
 */

const AudioManager = (() => {
  let context = null;
  let lastPlayed = 0;

  // Load volume and status from localStorage
  let settings;
  try {
    settings = JSON.parse(
      localStorage.getItem('spiderArchiveSound') ||
      '{"enabled":true,"master":35,"effects":80,"ambient":0}'
    );
  } catch (error) {
    settings = { enabled: true, master: 35, effects: 80, ambient: 0 };
  }
  
  const save = () => {
    localStorage.setItem('spiderArchiveSound', JSON.stringify(settings));
  };

  const ensureContext = () => {
    if (!context) {
      context = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (context.state === 'suspended') {
      context.resume();
    }
    return context;
  };

  const play = (type) => {
    if (!settings.enabled || settings.master === 0 || settings.effects === 0) return;
    
    // Respect system-wide reduced motion by disabling sound if preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.body.classList.contains('reduced-motion')) {
      return;
    }
    
    // Throttle sound play to avoid clipping/noise stacking
    const now = performance.now();
    if (now - lastPlayed < 50) return; 
    lastPlayed = now;

    try {
      const ctx = ensureContext();
      
      // Calculate output volume
      const volume = (settings.master / 100) * (settings.effects / 100) * 0.12;
      
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      if (type === 'click') {
        // Clean interface click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.02);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.8, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
        
        osc.connect(gain).connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } 
      else if (type === 'webShoot') {
        // Mechanical thwip: rapid dual-tone frequency sweep with noise burst
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(1500, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.095);
        
        gain1.gain.setValueAtTime(0.001, ctx.currentTime);
        gain1.gain.exponentialRampToValueAtTime(0.9, ctx.currentTime + 0.008);
        gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.095);
        
        osc1.connect(gain1).connect(masterGain);
        osc1.start();
        osc1.stop(ctx.currentTime + 0.1);

        // Noise buffer for the air friction of the web launch
        const bufferSize = ctx.sampleRate * 0.09;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(1200, ctx.currentTime);
        noiseFilter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.09);
        noiseFilter.Q.setValueAtTime(4, ctx.currentTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.45, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

        noise.connect(noiseFilter).connect(noiseGain).connect(masterGain);
        noise.start();
        noise.stop(ctx.currentTime + 0.1);
      } 
      else if (type === 'energyPulse') {
        // High-tech pulse: sweeping resonant oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(360, ctx.currentTime + 0.22);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.22);
        filter.Q.setValueAtTime(6, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.7, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        
        osc.connect(filter).connect(gain).connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.23);
      } 
      else if (type === 'whoosh') {
        // Quick atmospheric whoosh/air swing sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(75, ctx.currentTime + 0.16);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(500, ctx.currentTime);
        filter.frequency.setValueAtTime(120, ctx.currentTime + 0.16);
        
        gain.gain.setValueAtTime(0.65, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
        
        osc.connect(filter).connect(gain).connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.17);
      }
      else if (type === 'portalWhoosh') {
        // Multiverse portal dimensional sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.18);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.38);
        
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
        filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.38);
        filter.Q.setValueAtTime(3, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
        
        osc.connect(filter).connect(gain).connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
      else if (type === 'cinematicImpact') {
        // Deep low-frequency cinematic boom / dramatic reveal
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(95, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(32, ctx.currentTime + 0.45);
        
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(1.0, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
        
        osc.connect(gain).connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.46);
      }
      else if (type === 'success') {
        // Digital major triad chime (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);
          
          gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + idx * 0.05 + 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.05 + 0.14);
          
          osc.connect(gain).connect(masterGain);
          osc.start(ctx.currentTime + idx * 0.05);
          osc.stop(ctx.currentTime + idx * 0.05 + 0.15);
        });
      }
    } catch (e) {
      console.warn("Audio Context Error or blocked playback", e);
    }
  };

  const setSetting = (key, value) => {
    settings[key] = value;
    save();
  };

  const getSettings = () => settings;

  // Auto-initialize context on common user gestures
  const initGestures = ['click', 'keydown', 'touchstart'];
  const initHandler = () => {
    try {
      ensureContext();
    } catch(e){}
    initGestures.forEach(g => document.removeEventListener(g, initHandler));
  };
  initGestures.forEach(g => document.addEventListener(g, initHandler, { passive: true }));

  return {
    play,
    set: setSetting,
    get: getSettings,
    ensureContext
  };
})();
