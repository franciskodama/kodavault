/**
 * Dynamic Audio Synthesizer for Trezo Assets actions
 */

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
}

/**
 * Play a sweet, pleasant upward chime when an asset is successfully added.
 */
export function playAddAssetSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Create nodes
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();

  // Setup sound properties: Sine wave for purity, soft tone
  osc1.type = 'sine';
  osc2.type = 'sine';

  // Chime frequencies (ascending musical chord): C5 (523.25) then G5 (783.99)
  osc1.frequency.setValueAtTime(523.25, now);
  osc2.frequency.setValueAtTime(783.99, now + 0.12);

  // Setup gain envelope to prevent clicking and provide smooth fade-out
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.12, now + 0.04);
  gainNode.gain.setValueAtTime(0.12, now + 0.12);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

  // Setup filter to warm up the sound
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(2000, now);
  filterNode.frequency.exponentialRampToValueAtTime(800, now + 0.6);

  // Connections
  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(filterNode);
  filterNode.connect(ctx.destination);

  // Playback control
  osc1.start(now);
  osc1.stop(now + 0.6);

  osc2.start(now + 0.12);
  osc2.stop(now + 0.6);
}

/**
 * Play a modern, soft downward slide sound when an asset is deleted.
 */
export function playDeleteAssetSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Create nodes
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();

  // Soft triangle wave for delete sound to sound different, but not harsh
  osc.type = 'triangle';

  // Smooth slide downward from G4 (392) down to E3 (164.81)
  osc.frequency.setValueAtTime(392, now);
  osc.frequency.exponentialRampToValueAtTime(164.81, now + 0.4);

  // Setup gain envelope for decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  // Lowpass filter to keep it deep and warm
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(1000, now);
  filterNode.frequency.exponentialRampToValueAtTime(250, now + 0.45);

  // Connections
  osc.connect(gainNode);
  gainNode.connect(filterNode);
  filterNode.connect(ctx.destination);

  // Playback control
  osc.start(now);
  osc.stop(now + 0.45);
}

/**
 * Play a bright, swift double-glide sound when an asset is updated.
 */
export function playUpdateAssetSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Create nodes
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filterNode = ctx.createBiquadFilter();

  // Use a mixture of sine and triangle for a rich, modern digital chime
  osc1.type = 'sine';
  osc2.type = 'triangle';

  // Swift upward dual glides:
  // osc1: D5 (587.33 Hz) to A5 (880 Hz)
  osc1.frequency.setValueAtTime(587.33, now);
  osc1.frequency.exponentialRampToValueAtTime(880.00, now + 0.15);

  // osc2: F#5 (739.99 Hz) to C#6 (1109.73 Hz) starting slightly offset
  osc2.frequency.setValueAtTime(739.99, now + 0.05);
  osc2.frequency.exponentialRampToValueAtTime(1109.73, now + 0.2);

  // Setup gain envelope: very snappy attack and short decay
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.08, now + 0.02);
  gainNode.gain.setValueAtTime(0.08, now + 0.12);
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  // Setup filter to warm up the sound
  filterNode.type = 'lowpass';
  filterNode.frequency.setValueAtTime(2000, now);
  filterNode.frequency.exponentialRampToValueAtTime(700, now + 0.35);

  // Connections
  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(filterNode);
  filterNode.connect(ctx.destination);

  // Playback control
  osc1.start(now);
  osc1.stop(now + 0.35);

  osc2.start(now + 0.05);
  osc2.stop(now + 0.35);
}

