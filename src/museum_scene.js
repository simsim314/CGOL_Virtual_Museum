import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.174.0/build/three.module.js';
import { LifeExhibit } from './life_engine.js';

export const roomData = [
  ['000','Main Hall',[0,0],[28,18],'Welcome + giant glider + map'],
  ['001','Rules Theater',[34,0],[14,12],'B3/S23 rules'],
  ['002','Taxonomy Gallery',[52,0],[16,12],'Pattern families'],
  ['003','Timeline Corridor',[72,0],[22,8],'History milestones'],
  ['004','Sandbox',[96,0],[14,12],'Warm-up interaction'],
  ['101','Still Lifes',[0,30],[16,12],'Stable forms'],
  ['102','Oscillators',[20,30],[16,12],'Periodic motion'],
  ['103','Spaceships',[40,30],[16,12],'Traveling patterns'],
  ['104','Methuselahs',[60,30],[16,12],'Long-lived seeds'],
  ['105','Soup Observatory',[80,30],[18,12],'Emergence'],
  ['106','Garden of Eden',[102,30],[16,12],'No predecessor concept'],
  ['201','Glider Synthesis',[0,60],[20,14],'Collision construction'],
  ['202','Gun Gallery',[24,60],[16,12],'Gosper and guns'],
  ['203','Reflector Gallery',[44,60],[16,12],'Snark routing'],
  ['204','Herschel Conduits',[64,60],[18,14],'Signal plumbing'],
  ['205','Puffer/Rake',[86,60],[16,12],'Trail builders'],
  ['206','Breeder Hall',[106,60],[18,12],'Superlinear growth'],
  ['207','Engineering Corridor',[130,60],[28,8],'Signal highway'],
  ['301','Logic Gates',[0,92],[16,12],'NOT/AND/OR'],
  ['302','Sliding Memory',[20,92],[16,12],'Position as data'],
  ['303','Universal Constructor',[40,92],[20,14],'Elbow + push/pull'],
  ['304','Universal Computation',[64,92],[20,14],'Turing machine lineage'],
  ['305','Meta-Life',[88,92],[20,14],'OTCA + 0E0P'],
  ['306','Self Construction',[112,92],[20,14],'Gemini family'],
  ['307','Mega-Ship Long Wall',[136,92],[40,12],'Caterpillar panoramic wall'],
  ['308','Frontier / POTY',[180,92],[20,14],'Rotating frontier']
];

const exhibitCatalog = {
  '000': [{title:'Giant Glider Phase Exhibit',description:'A huge glider sculpture pulsing through phases.',pattern:'glider',size:72}],
  '001': [{title:'Rules Demo',description:'Birth on 3 neighbors, survival on 2 or 3.',pattern:'blinker'}],
  '002': [{title:'Taxonomy Screen',description:'Still life, oscillator, spaceship families.',pattern:'beacon'}],
  '003': [{title:'Timeline Beacon',description:'From 1970 to modern breakthroughs.',pattern:'pulsar'}],
  '004': [{title:'Sandbox',description:'Try random seeds.',pattern:'random'}],
  '101': [{title:'Block & Beehive',description:'Canonical still lifes.',pattern:'block'},{title:'Loaf',description:'Quiet ash object.',pattern:'loaf'}],
  '102': [{title:'Blinker',description:'Period-2 oscillator.',pattern:'blinker'},{title:'Pulsar',description:'Large iconic oscillator.',pattern:'pulsar'}],
  '103': [{title:'Glider Runway',description:'Diagonal spaceship.',pattern:'glider'},{title:'LWSS',description:'Orthogonal spaceship.',pattern:'lwss'}],
  '104': [{title:'R-pentomino',description:'Long chaotic transient.',pattern:'rpentomino'},{title:'Acorn',description:'Small seed, large future.',pattern:'acorn'}],
  '105': [{title:'Random Soup',description:'Emergence observatory.',pattern:'random',size:112}],
  '106': [{title:'Predecessor Concepts',description:'Garden of Eden conceptual exhibit.',pattern:'beehive'}],
  '201': [{title:'Glider Synthesis Lab',description:'Collision timing and construction.',pattern:'glider'}],
  '202': [{title:'Gosper Gun',description:'Infinite growth from finite seed.',pattern:'gosper',size:112}],
  '203': [{title:'Snark Routing',description:'Stable 90-degree reflection concept.',pattern:'snarkish'}],
  '204': [{title:'Herschel Chain',description:'Conduits route active signals.',pattern:'herschel'}],
  '205': [{title:'Trail Machines',description:'Puffer/rake inspired motion.',pattern:'lwss'}],
  '206': [{title:'Breeder Intuition',description:'Population growth over time.',pattern:'gosper',size:96}],
  '207': [{title:'Signal Highway',description:'Engineering corridor pulse.',pattern:'glider'}],
  '301': [{title:'Logic Pulses',description:'NOT/AND/OR visual metaphor.',pattern:'blinker'}],
  '302': [{title:'Sliding Block Memory',description:'Geometry encodes state.',pattern:'block'}],
  '303': [{title:'Universal Constructor',description:'Push/pull/fire conceptual lane.',pattern:'glider'}],
  '304': [{title:'Universal Computation',description:'Turing machine lineage hall.',pattern:'gosper'}],
  '305': [{title:'Meta-Life',description:'OTCA metapixel / 0E0P metacell framing.',pattern:'pulsar'}],
  '306': [{title:'Self Construction',description:'Programmable spaceship concepts.',pattern:'lwss'}],
  '307': [{title:'Caterpillar Long Wall',description:'Panoramic mega-ship wall.',pattern:'gosper',size:128}],
  '308': [{title:'Pattern of the Year',description:'Rotating frontier discoveries.',pattern:'random'}]
};

export function buildMuseum(scene) {
  const roomMeshes = [];
  const exhibits = [];
  const collisionBoxes = [];

  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0d1118, metalness: 0.5, roughness: 0.5 });
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x171d28, metalness: 0.2, roughness: 0.9 });

  roomData.forEach(([id,name,[x,z],[w,d],theme]) => {
    const floor = new THREE.Mesh(new THREE.BoxGeometry(w, 0.4, d), floorMat);
    floor.position.set(x, 0, z);
    scene.add(floor);

    const wallT = 0.4, h=4.5;
    const doorW = 3.2;
    const sideSeg = (w - doorW) / 2;
    const walls = [
      [sideSeg, h, wallT, x-(doorW/2+sideSeg/2), h/2, z-d/2],
      [sideSeg, h, wallT, x+(doorW/2+sideSeg/2), h/2, z-d/2],
      [w, h, wallT, x, h/2, z+d/2],
      [wallT, h, d, x-w/2, h/2, z],
      [wallT, h, d, x+w/2, h/2, z]
    ];
    walls.forEach(([ww,hh,dd,wx,wy,wz]) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(ww,hh,dd), wallMat);
      m.position.set(wx,wy,wz);
      scene.add(m);
      collisionBoxes.push(new THREE.Box3().setFromObject(m));
    });

    // carve a door by overlaying dark portal visually + open path in collision by skipping one front wall segment
    const door = new THREE.Mesh(new THREE.BoxGeometry(2.8,3.2,0.2), new THREE.MeshStandardMaterial({color:0x05080e, emissive:0x0c1422, emissiveIntensity:0.2}));
    door.position.set(x,1.6,z-d/2+0.21);
    scene.add(door);

    const label = makeLabel(`${id} — ${name}`);
    label.position.set(x,3.8,z-d/2+0.45);
    scene.add(label);

    const themeLabel = makeLabel(theme, 0.8);
    themeLabel.position.set(x,3.1,z-d/2+0.45);
    scene.add(themeLabel);

    roomMeshes.push({ id, name, center: new THREE.Vector3(x,0,z), w, d });

    const roomEx = exhibitCatalog[id] || [];
    roomEx.forEach((spec, idx) => {
      const life = new LifeExhibit(spec);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(Math.min(6, w-3), 3.2),
        new THREE.MeshBasicMaterial({ map: life.texture, toneMapped: false })
      );
      screen.position.set(x + (idx%2===0 ? -w/4 : w/4), 2.1, z + d/4);
      screen.rotation.y = Math.PI;
      scene.add(screen);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(Math.min(6,w-3)+0.2,3.4,0.1), new THREE.MeshStandardMaterial({color:0x202a3b, emissive:0x1d2e4b, emissiveIntensity:0.3}));
      frame.position.copy(screen.position).add(new THREE.Vector3(0,0,-0.08));
      frame.rotation.y = Math.PI;
      scene.add(frame);

      const t = makeLabel(spec.title, 0.85);
      t.position.set(screen.position.x, 4, screen.position.z-0.1);
      scene.add(t);

      exhibits.push({ roomId:id, life, mesh:screen, title:spec.title, description:spec.description, basePos:screen.position.clone() });
    });
  });

  // connectors (simple open corridors)
  for (let x=14; x<=176; x+=20) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(8,0.2,8), new THREE.MeshStandardMaterial({color:0x101823, roughness:1}));
    c.position.set(x,0,15);
    scene.add(c);
  }

  return { roomMeshes, exhibits, collisionBoxes };
}

function makeLabel(text, scale=1) {
  const c=document.createElement('canvas'); c.width=768; c.height=120;
  const ctx=c.getContext('2d');
  ctx.fillStyle='rgba(0,0,0,0.45)'; ctx.fillRect(0,0,c.width,c.height);
  ctx.strokeStyle='rgba(144,188,255,0.55)'; ctx.strokeRect(2,2,c.width-4,c.height-4);
  ctx.fillStyle='#dce9ff'; ctx.font=`${44*scale}px Arial`;
  ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(text,c.width/2,c.height/2);
  const t=new THREE.CanvasTexture(c); t.needsUpdate=true;
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true}));
  s.scale.set(8*scale,1.4*scale,1);
  return s;
}
