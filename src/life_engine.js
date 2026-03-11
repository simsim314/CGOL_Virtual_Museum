import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';
import { seedPattern } from './pattern_library.js';

export class LifeExhibit {
  constructor({ title, description, pattern='random', size=96 }) {
    this.title = title;
    this.description = description;
    this.pattern = pattern;
    this.size = size;
    this.speed = 8;
    this.running = true;
    this.elapsed = 0;

    this.grid = Array.from({ length: size }, () => Array(size).fill(0));
    this.next = Array.from({ length: size }, () => Array(size).fill(0));
    seedPattern(this.grid, pattern);

    this.canvas = document.createElement('canvas');
    this.canvas.width = size;
    this.canvas.height = size;
    this.ctx = this.canvas.getContext('2d');
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.NearestFilter;
    this.texture.magFilter = THREE.NearestFilter;
    this.draw();
  }

  draw() {
    const img = this.ctx.createImageData(this.size, this.size);
    const d = img.data;
    for (let y=0; y<this.size; y++) for (let x=0; x<this.size; x++) {
      const i=(y*this.size+x)*4;
      const alive=this.grid[y][x]===1;
      if (alive) { d[i]=120; d[i+1]=200; d[i+2]=255; d[i+3]=255; }
      else { d[i]=7; d[i+1]=14; d[i+2]=24; d[i+3]=255; }
    }
    this.ctx.putImageData(img,0,0);
    this.texture.needsUpdate = true;
  }

  step() {
    const n=this.size;
    for (let y=0;y<n;y++) for (let x=0;x<n;x++) {
      let c=0;
      for (let dy=-1;dy<=1;dy++) for (let dx=-1;dx<=1;dx++) {
        if (!dx && !dy) continue;
        const yy=(y+dy+n)%n, xx=(x+dx+n)%n;
        c += this.grid[yy][xx];
      }
      const alive=this.grid[y][x]===1;
      this.next[y][x] = (alive && (c===2||c===3)) || (!alive && c===3) ? 1 : 0;
    }
    [this.grid,this.next]=[this.next,this.grid];
    this.draw();
  }

  update(dt) {
    if (!this.running) return;
    this.elapsed += dt;
    const interval = 1 / this.speed;
    while (this.elapsed >= interval) { this.step(); this.elapsed -= interval; }
  }

  reset() { seedPattern(this.grid, this.pattern); this.draw(); }
}
