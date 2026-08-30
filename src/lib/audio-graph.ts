export class MediaAudioGraph {
  ctx: AudioContext;
  source: MediaElementAudioSourceNode;
  analyser: AnalyserNode;
  recDest: MediaStreamAudioDestinationNode;
  private connected = true;

  constructor(el: HTMLMediaElement) {
    this.ctx = new AudioContext();
    this.source = this.ctx.createMediaElementSource(el);
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.recDest = this.ctx.createMediaStreamDestination();
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.analyser.connect(this.recDest);
  }

  async resume() {
    if (this.ctx.state === "suspended") await this.ctx.resume();
  }

  disconnect() {
    if (!this.connected) return;
    this.connected = false;
    try {
      this.source.disconnect();
      this.analyser.disconnect();
    } catch {
      /* already gone */
    }
    void this.ctx.close();
  }
}

const graphs = new WeakMap<HTMLMediaElement, MediaAudioGraph>();

export function ensureGraph(el: HTMLMediaElement): MediaAudioGraph {
  const existing = graphs.get(el);
  if (existing && existing.ctx.state !== "closed") return existing;
  const graph = new MediaAudioGraph(el);
  graphs.set(el, graph);
  return graph;
}
