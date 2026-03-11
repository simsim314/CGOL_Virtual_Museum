import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';
import { buildMuseum } from './museum_scene.js';

const canvas = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05080e);
scene.fog = new THREE.Fog(0x05080e, 40, 280);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.8, -4);

scene.add(new THREE.HemisphereLight(0x8ea9d8, 0x10131a, 0.55));
const dir = new THREE.DirectionalLight(0x8bb7ff, 0.55); dir.position.set(18, 26, 8); scene.add(dir);

const { roomMeshes, exhibits, collisionBoxes } = buildMuseum(scene);
addMainHallHero(scene);

const roomLabel = document.getElementById('roomLabel');
const status = document.getElementById('status');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayDesc = document.getElementById('overlayDesc');

const input = {};
let yaw = 0, pitch = 0;
let pointerLocked = false;
let focused = null;
let globalPaused = false;

canvas.addEventListener('click', () => { if (!pointerLocked) canvas.requestPointerLock(); });
document.addEventListener('pointerlockchange', () => pointerLocked = document.pointerLockElement === canvas);
document.addEventListener('mousemove', (e) => {
  if (!pointerLocked) return;
  yaw -= e.movementX * 0.002;
  pitch -= e.movementY * 0.002;
  pitch = Math.max(-1.45, Math.min(1.45, pitch));
});

document.addEventListener('keydown', (e) => {
  input[e.key.toLowerCase()] = true;
  if (e.key === ' ') { globalPaused = !globalPaused; exhibits.forEach(ex => ex.life.running = !globalPaused); }
  if (e.key.toLowerCase() === 'r' && focused) focused.life.reset();
  if (e.key === 'ArrowUp' && focused) focused.life.speed = Math.min(30, focused.life.speed + 1);
  if (e.key === 'ArrowDown' && focused) focused.life.speed = Math.max(1, focused.life.speed - 1);
  if (e.key.toLowerCase() === 'e') toggleFocus();
});
document.addEventListener('keyup', (e) => input[e.key.toLowerCase()] = false);

function nearestExhibit() {
  let best = null, bestD = 5;
  exhibits.forEach(ex => {
    const d = camera.position.distanceTo(ex.mesh.position);
    if (d < bestD) { bestD = d; best = ex; }
  });
  return best;
}

function toggleFocus() {
  if (focused) {
    focused.mesh.position.copy(focused.basePos);
    focused = null;
    overlay.classList.add('hidden');
    return;
  }
  const ex = nearestExhibit();
  if (!ex) return;
  focused = ex;
  const forward = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation).setY(0).normalize();
  ex.mesh.position.copy(camera.position).add(forward.multiplyScalar(2.8)).setY(2.1);
  overlay.classList.remove('hidden');
  overlayTitle.textContent = ex.title;
  overlayDesc.textContent = ex.description;
}

function collide(pos) {
  const r = 0.35;
  for (const box of collisionBoxes) {
    const expanded = box.clone().expandByScalar(r);
    if (expanded.containsPoint(pos)) return true;
  }
  return false;
}

let last = performance.now();
function animate(now) {
  requestAnimationFrame(animate);
  const dt = Math.min(0.033, (now - last) / 1000);
  last = now;

  camera.rotation.set(pitch, yaw, 0, 'YXZ');

  const speed = (input['shift'] ? 8.4 : 4.6) * dt;
  const forward = new THREE.Vector3(0,0,-1).applyEuler(camera.rotation).setY(0).normalize();
  const right = new THREE.Vector3(1,0,0).applyEuler(camera.rotation).setY(0).normalize();

  const next = camera.position.clone();
  if (input['w']) next.addScaledVector(forward, speed);
  if (input['s']) next.addScaledVector(forward, -speed);
  if (input['a']) next.addScaledVector(right, -speed);
  if (input['d']) next.addScaledVector(right, speed);

  next.x = Math.max(-12, Math.min(198, next.x));
  next.z = Math.max(-16, Math.min(112, next.z));

  if (!collide(next)) camera.position.copy(next);

  // proximity-based update
  exhibits.forEach(ex => {
    const dist = camera.position.distanceTo(ex.mesh.position);
    ex.life.running = !globalPaused && (dist < 25 || ex === focused);
    ex.life.update(dt);
  });

  const room = roomMeshes.reduce((acc, r) => {
    const d = Math.abs(camera.position.x - r.center.x) + Math.abs(camera.position.z - r.center.z);
    return d < acc.d ? { d, r } : acc;
  }, { d: Infinity, r: roomMeshes[0] }).r;
  roomLabel.textContent = `${room.id} — ${room.name}`;

  const near = nearestExhibit();
  status.textContent = near
    ? `Nearest exhibit: ${near.title}${focused ? ` | Focus speed: ${focused.life.speed} gen/s` : ''}`
    : 'Move closer to an exhibit and press E to focus.';

  renderer.render(scene, camera);
}
requestAnimationFrame(animate);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function addMainHallHero(scene) {
  // giant glider sculpture
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x80bfff, emissive: 0x295baa, emissiveIntensity: 0.8, transparent:true, opacity:0.92 });
  const cube = new THREE.BoxGeometry(0.9,0.9,0.9);
  const glider = [[0,0],[1,0],[2,0],[2,1],[1,2]];
  glider.forEach(([x,z]) => {
    const m = new THREE.Mesh(cube, mat);
    m.position.set(-2 + x*1.05, 4.5, -1 + z*1.05);
    group.add(m);
  });
  group.position.set(0,0,0);
  scene.add(group);

  // floor medallion
  const med = new THREE.Mesh(new THREE.CircleGeometry(4.6, 42), new THREE.MeshStandardMaterial({ color: 0x122034, emissive:0x1a3760, emissiveIntensity:0.2 }));
  med.rotation.x = -Math.PI / 2;
  med.position.set(0,0.25,0);
  scene.add(med);

  // museum map wall in main hall
  const map = document.createElement('canvas');
  map.width = 1024; map.height = 512;
  const ctx = map.getContext('2d');
  ctx.fillStyle = '#081120'; ctx.fillRect(0,0,1024,512);
  ctx.strokeStyle = '#79a9ff'; ctx.lineWidth = 4; ctx.strokeRect(8,8,1008,496);
  ctx.fillStyle = '#dbe9ff'; ctx.font = 'bold 48px Arial'; ctx.fillText('Museum Map (Stages 0–3)', 42, 64);
  ctx.font = '24px Arial';
  ['Stage 0: Orientation (000-004)','Stage 1: Foundations (101-106)','Stage 2: Engineering (201-207)','Stage 3: Computation + Frontier (301-308)'].forEach((line,i)=>ctx.fillText(line,42,124+i*46));
  ctx.fillStyle = '#8ac3ff'; ctx.fillText('You are here: Room 000 Main Hall', 42, 342);
  ctx.fillStyle = '#a9d7ff'; ctx.fillText('Walk forward through galleries; press E near exhibits.', 42, 390);
  const tex = new THREE.CanvasTexture(map);
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(10,5), new THREE.MeshBasicMaterial({ map: tex }));
  plane.position.set(0,3.4,8.6); plane.rotation.y = Math.PI;
  scene.add(plane);
}
