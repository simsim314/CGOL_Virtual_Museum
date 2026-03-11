export const PATTERNS = {
  block: [[1,1],[1,2],[2,1],[2,2]],
  beehive: [[2,1],[3,1],[1,2],[4,2],[2,3],[3,3]],
  loaf: [[2,1],[3,1],[1,2],[4,2],[2,3],[4,3],[3,4]],
  blinker: [[1,2],[2,2],[3,2]],
  toad: [[2,2],[3,2],[4,2],[1,3],[2,3],[3,3]],
  beacon: [[1,1],[2,1],[1,2],[4,3],[3,4],[4,4]],
  pulsar: (() => {
    const pts = [];
    const base=[ [2,0],[3,0],[4,0],[8,0],[9,0],[10,0],[0,2],[5,2],[7,2],[12,2],[0,3],[5,3],[7,3],[12,3],[0,4],[5,4],[7,4],[12,4],[2,5],[3,5],[4,5],[8,5],[9,5],[10,5] ];
    const offsets=[[0,0],[0,7],[7,0],[7,7]];
    offsets.forEach(([ox,oy]) => base.forEach(([x,y])=>pts.push([x+ox,y+oy])));
    return pts;
  })(),
  glider: [[1,0],[2,1],[0,2],[1,2],[2,2]],
  lwss: [[1,0],[4,0],[0,1],[0,2],[4,2],[0,3],[1,3],[2,3],[3,3]],
  rpentomino: [[1,0],[2,0],[0,1],[1,1],[1,2]],
  acorn: [[1,0],[3,1],[0,2],[1,2],[4,2],[5,2],[6,2]],
  diehard: [[6,0],[0,1],[1,1],[1,2],[5,2],[6,2],[7,2]],
  gosper: [[24,0],[22,1],[24,1],[12,2],[13,2],[20,2],[21,2],[34,2],[35,2],[11,3],[15,3],[20,3],[21,3],[34,3],[35,3],[0,4],[1,4],[10,4],[16,4],[20,4],[21,4],[0,5],[1,5],[10,5],[14,5],[16,5],[17,5],[22,5],[24,5],[10,6],[16,6],[24,6],[11,7],[15,7],[12,8],[13,8]],
  snarkish: [[2,0],[3,0],[4,0],[0,1],[4,1],[0,2],[1,2],[2,2],[4,2],[5,2],[6,2],[2,3],[6,3],[2,4],[6,4],[2,5],[3,5],[4,5]],
  herschel: [[0,0],[1,0],[1,1],[1,2],[2,2],[3,2],[4,2]],
  random: []
};

export function seedPattern(grid, name) {
  const pts = PATTERNS[name] || PATTERNS.random;
  const h = grid.length, w = grid[0].length;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) grid[y][x] = 0;
  if (name === 'random') {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) grid[y][x] = Math.random() > 0.82 ? 1 : 0;
    return;
  }
  const minX = Math.min(...pts.map(p => p[0])), minY = Math.min(...pts.map(p => p[1]));
  const maxX = Math.max(...pts.map(p => p[0])), maxY = Math.max(...pts.map(p => p[1]));
  const ox = Math.floor((w - (maxX - minX + 1)) / 2) - minX;
  const oy = Math.floor((h - (maxY - minY + 1)) / 2) - minY;
  pts.forEach(([x,y]) => { if (x+ox>=0&&x+ox<w&&y+oy>=0&&y+oy<h) grid[y+oy][x+ox]=1; });
}
