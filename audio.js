// Audio Manager using Web Audio API for Vishwa's Little Ghost World
// Provides soft lofi/music-box background music and cute sound effects with zero external asset dependencies!

class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.isMuted = false;
    this.musicTimer = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.masterGain = null;
    this.currentNoteIndex = 0;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMusic() {
    this.ensureContext();
    if (!this.ctx) return false;

    if (this.isPlayingMusic) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  startMusic() {
    this.ensureContext();
    if (!this.ctx) return;
    if (this.isPlayingMusic) return;

    this.isPlayingMusic = true;
    this.scheduleNextMusicBar();
  }

  stopMusic() {
    this.isPlayingMusic = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
    }
    return !this.isMuted;
  }

  // Sweet gentle music box / lofi birthday melody loop
  scheduleNextMusicBar() {
    if (!this.isPlayingMusic || !this.ctx) return;

    // Cozy, dreamy pentatonic chord progression (C - G/B - Am - F - C)
    const chords = [
      // Bar 1: C major (C4, E4, G4, B4, C5)
      { notes: [261.63, 329.63, 392.00, 493.88, 523.25], pattern: [0, 1, 2, 4, 2, 1] },
      // Bar 2: G / B (B3, D4, G4, B4)
      { notes: [246.94, 293.66, 392.00, 493.88], pattern: [0, 1, 2, 3, 2, 1] },
      // Bar 3: Am (A3, C4, E4, A4)
      { notes: [220.00, 261.63, 329.63, 440.00, 523.25], pattern: [0, 1, 2, 3, 4, 2] },
      // Bar 4: F (F3, A3, C4, F4, G4)
      { notes: [174.61, 220.00, 261.63, 349.23, 392.00], pattern: [0, 1, 2, 3, 4, 3] },
      // Bar 5: Happy Birthday motif hint
      { notes: [261.63, 293.66, 329.63, 392.00, 523.25], pattern: [0, 0, 1, 0, 3, 2] }
    ];

    const currentBar = chords[this.currentNoteIndex % chords.length];
    this.currentNoteIndex++;

    const noteDuration = 0.38; // cozy relaxed tempo
    const now = this.ctx.currentTime;

    currentBar.pattern.forEach((pIndex, step) => {
      const freq = currentBar.notes[pIndex % currentBar.notes.length];
      const time = now + (step * noteDuration);
      this.playMusicBoxNote(freq, time, 0.9);
    });

    const barTotalTime = (currentBar.pattern.length * noteDuration) * 1000;
    this.musicTimer = setTimeout(() => {
      this.scheduleNextMusicBar();
    }, barTotalTime - 50);
  }

  playMusicBoxNote(freq, time, duration = 0.8) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm bell / music box tone: sine + triangle blend
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.Q.setValueAtTime(1.5, time);

    // Pluck envelope
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.2, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  // --- SOUND EFFECTS ---

  // 1. Cute Balloon Pop
  playBalloonPop() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;

    // Pop body (quick pitch-drop sine)
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.09);

    oscGain.gain.setValueAtTime(0.4, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.1);

    // Pop burst (white noise snap)
    const bufferSize = this.ctx.sampleRate * 0.06;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(1600, now);
    noiseFilter.Q.setValueAtTime(1.0, now);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + 0.06);

    // Cute sparkle chime right after pop
    setTimeout(() => {
      this.playSparkleChime();
    }, 70);
  }

  // 2. Cute Sparkle Chime
  playSparkleChime() {
    if (!this.ctx || this.isMuted) return;
    const freqs = [880, 1174, 1480, 1760];
    const now = this.ctx.currentTime;
    freqs.forEach((f, i) => {
      const time = now + (i * 0.04);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, time);
      gain.gain.setValueAtTime(0.12, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(time);
      osc.stop(time + 0.26);
    });
  }

  // 3. Candle Blow Out Sound (Breath wind + magic twinkle)
  playCandleBlow() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const duration = 0.6;

    // Breath noise
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(300, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    noise.start(now);
    noise.stop(now + duration);

    // Magical chime celebration
    setTimeout(() => {
      this.playSuccessFanfare();
    }, 400);
  }

  // 4. Success Fanfare (Ascending sweet glockenspiel)
  playSuccessFanfare() {
    if (!this.ctx || this.isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const now = this.ctx.currentTime;
    notes.forEach((freq, idx) => {
      const time = now + (idx * 0.08);
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(time);
      osc.stop(time + 0.46);
    });
  }

  // 5. Wrong Answer Cute Boing / Wobble
  playWrongBoing() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // 6. Cute Click Button Sound
  playClick() {
    this.ensureContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.04);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

const audioMgr = new AudioManager();
