class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private initialized: boolean = false;

  // Ambient synth nodes
  private masterGain: GainNode | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientFilter: BiquadFilterNode | null = null;
  private ambientGain: GainNode | null = null;

  constructor() {
    // Initialize upon first user action
  }

  public init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;

        // Create Master Gain node
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = this.isMuted ? 0 : 0.8;
        this.masterGain.connect(this.ctx.destination);
        
        // Resume context if suspended
        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }

        // Start premium ambient soundscape
        this.startAmbient();
      }
    } catch (e) {
      console.warn("Web Audio API not supported in this browser", e);
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.8, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private playTone(
    freqStart: number,
    freqEnd: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.1
  ) {
    if (this.isMuted || !this.initialized || !this.ctx || !this.masterGain) return;

    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime);
      
      if (freqEnd !== freqStart) {
        osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + duration);
      }

      gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio glitches
    }
  }

  // Generative Sci-Fi Ambient Soundscape
  private startAmbient() {
    if (!this.initialized || !this.ctx || !this.masterGain) return;

    try {
      // Osc 1: Deep low frequency sawtooth (detuned, filtered)
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc1.type = 'sawtooth';
      this.ambientOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      // Osc 2: Sub-octave sine drone for warmth
      this.ambientOsc2 = this.ctx.createOscillator();
      this.ambientOsc2.type = 'sine';
      this.ambientOsc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note
      this.ambientOsc2.detune.setValueAtTime(8, this.ctx.currentTime); // Subtle chorus detune

      // Biquad Resonant Lowpass Filter
      this.ambientFilter = this.ctx.createBiquadFilter();
      this.ambientFilter.type = 'lowpass';
      this.ambientFilter.frequency.setValueAtTime(160, this.ctx.currentTime);
      this.ambientFilter.Q.setValueAtTime(5.5, this.ctx.currentTime); // High resonance

      // Gain Node for Ambient balance
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.035, this.ctx.currentTime); // Low background volume

      // Connect nodes
      this.ambientOsc1.connect(this.ambientFilter);
      this.ambientOsc2.connect(this.ambientFilter);
      this.ambientFilter.connect(this.ambientGain);
      this.ambientGain.connect(this.masterGain);

      // Start the oscillators
      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch (e) {
      console.warn("Failed to initialize ambient soundscape", e);
    }
  }

  // Modulate ambient soundscape based on scroll velocity
  public updateAmbientFilter(scrollVelocity: number) {
    if (!this.initialized || !this.ctx || !this.ambientFilter || !this.ambientGain || this.isMuted) return;

    try {
      // Scale frequency from 160Hz up to 750Hz based on scroll velocity
      const targetFreq = Math.min(160 + scrollVelocity * 6.5, 750);
      this.ambientFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.12);

      // Sligtly swell volume when scrolling fast for organic response
      const targetGain = Math.min(0.035 + (scrollVelocity / 80) * 0.025, 0.065);
      this.ambientGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.15);
    } catch {
      // Safe fallback
    }
  }

  public hover() {
    this.playTone(1800, 1800, 0.03, 'sine', 0.015);
  }

  public click() {
    this.playTone(880, 1200, 0.08, 'triangle', 0.05);
  }

  public swipe() {
    this.playTone(300, 800, 0.15, 'sine', 0.03);
  }

  public success() {
    if (!this.initialized || !this.ctx) return;
    setTimeout(() => this.playTone(523.25, 523.25, 0.12, 'sine', 0.05), 0);
    setTimeout(() => this.playTone(659.25, 659.25, 0.20, 'sine', 0.05), 100);
  }

  public warning() {
    this.playTone(180, 120, 0.25, 'sawtooth', 0.04);
  }
}

const soundCtrl = new SoundController();
export default soundCtrl;
