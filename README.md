# Conway's Game of Life Virtual Museum — Agent Build Spec

This repository contains a **production-ready prompt/spec** you can hand to Codex, Cursor, Claude Code, or another coding agent to build a browser-based 3D virtual museum of Conway’s Game of Life.

## 1) Project objective

Build a real-time, explorable, thematic 3D museum (not a card grid) that teaches:

- foundational Life patterns,
- engineering primitives (glider synthesis, reflectors, Herschel conduits),
- growth mechanisms,
- universal computation/construction,
- modern frontier discoveries (Pattern of the Year, omniperiodicity milestones).

The museum should feel like a curated science institution: dark modern aesthetic, clear circulation, room identity, signage, and polished exhibit interactions.

---

## 2) High-quality master prompt (copy/paste for coding agents)

```md
ROLE
You are an expert coding agent and 3D experience designer.
Build a browser-based, explorable, real-feeling 3D virtual museum of Conway’s Game of Life.

PRIMARY GOAL
Create a static web project where the visitor can:
1) Spawn into a grand lobby with a giant animated glider sculpture.
2) See a large museum map immediately.
3) Walk through themed rooms and interact with live Life exhibits.
4) Learn both historical milestones and engineering/computation concepts.

TECH STACK
- HTML, CSS, JavaScript/TypeScript
- Three.js + WebGL2
- No backend required
- Local static assets only
- Modular architecture

NON-NEGOTIABLE EXPERIENCE
- First-person WASD + mouse look + wall collisions
- Room numbers, clear wayfinding, and “You are here” map
- Exhibit controls: play/pause, step, reset, speed
- Focus mode per exhibit (zoomed local theater)
- Main hall must include:
  - giant glider sculpture,
  - large map wall,
  - short orientation panels
- Stage 3 must include a long back-wall mega-ship gallery
  (Caterpillar/Caterloopillars-style long-thin presentation)

SIMULATION REQUIREMENTS
- Correct B3/S23 rules
- Real-time simulation
- Pattern loading from local RLE files
- GPU ping-pong engine for standard exhibits
- Hybrid strategy for huge patterns (time-lapse / segmented zoom / abstract map)

VISUAL STYLE
- Contemporary science museum
- Dark concrete/basalt palette
- Subtle architectural lighting
- Glowing exhibit screens and clean typography
- Minimal clutter

DELIVERABLE FILES
- index.html
- src/life/life_engine.(js|ts)
- src/scene/museum_scene.(js|ts)
- src/content/manifest.(js|ts)
- assets/patterns/rle/*.rle
- README.md with run instructions

IMPLEMENTATION ORDER
1) Scene shell + navigation + collision
2) Stage 0 main hall with glider sculpture and map
3) Base exhibit component + one live Life screen
4) Pattern manifest + RLE loader
5) Stage 1 room pack
6) Stage 2 room pack
7) Stage 3 room pack (including mega-ship long-wall gallery)
8) Polish + performance culling + accessibility toggles
```

---

## 3) Comprehensive thematic floor plan

## Stage 0 — Orientation & Onboarding

**Room 000 — Main Hall (30m x 18m, 9–11m ceiling)**
- Hero: giant animated glider sculpture (5–7m visual width)
- Giant museum map wall (8–12m)
- Welcome title wall + interaction instructions
- Direct sightlines to at least two next rooms

**Room 001 — Rules Theater**
- Interactive B3/S23 neighbor demo
- Step/pause/reset controls
- Animated rules, minimal text

**Room 002 — Pattern Taxonomy Gallery**
- Tiles for still lifes, oscillators, spaceships, methuselahs, guns,
  reflectors, conduits, puffers/rakes/breeders, logic/memory,
  universal construction/self-construction

**Room 003 — Historical Timeline Corridor**
- Chronological milestones from 1970 onward
- Early landmarks → modern engineering era → frontier era

**Room 004 — Orientation Sandbox**
- Warm-up room to spawn tiny classic seeds

## Stage 1 — Foundations of Life

**Room 101 — Still Lifes + Eaters**
- Block, beehive, loaf, boat, tub, pond, eater examples

**Room 102 — Oscillators**
- Blinker, toad, beacon, pulsar, pentadecathlon

**Room 103 — Spaceships**
- Glider, LWSS, MWSS, HWSS
- Optional advanced preview: loafer / copperhead

**Room 104 — Methuselahs**
- R-pentomino, acorn, diehard
- Show lifespan and stabilization metrics

**Room 105 — Soup Observatory**
- Random soup runs with object emergence highlights

**Room 106 — Garden of Eden Concepts**
- Predecessor/no-predecessor concepts via visual panels

## Stage 2 — Signal Engineering & Growth

**Room 201 — Glider Synthesis Lab**
- Collision timing, stage markers, rewind
- Small-ship and selected advanced synthesis examples

**Room 202 — Gun Gallery**
- Gosper glider gun hero + period variants

**Room 203 — Reflector Gallery**
- Snark hero exhibit
- Signal turning/repeat-time concepts

**Room 204 — Herschel Conduit Hall**
- Herschel object, conduits, displacement/timing chain display

**Room 205 — Puffer & Rake Gallery**
- Trail-producing moving machines

**Room 206 — Breeder/Spacefiller Hall**
- Superlinear growth intuition with population charts

**Room 207 — Engineering Corridor**
- Overhead glider lanes linking synthesis → guns → reflectors → conduits

## Stage 3 — Computation, Mega-Structures, Frontier

**Room 301 — Logic Gates**
- NOT/AND/OR with togglable inputs and output lamps

**Room 302 — Sliding Block Memory**
- Position-as-value memory demo and readout

**Room 303 — Universal Constructor Concepts**
- Elbow push/pull/fire abstractions

**Room 304 — Universal Computation Hall**
- Turing machine lineage + zoomed active subregion playback

**Room 305 — Meta-Life Room**
- OTCA metapixel and 0E0P metacell perspectives

**Room 306 — Self-Construction & Programmable Ships**
- Gemini / related family-level conceptual exhibits

**Room 307 — Long-Form Mega-Ship Gallery (MANDATORY)**
- Min 36m x 10m room
- Continuous back wall min 28m x 4m
- Dedicated Caterpillar/Caterloopillars-style presentation

**Room 308 — Pattern of the Year / Frontier**
- Rotating modern milestones and current discoveries

---

## 4) Canonical core pattern shortlist (hero set)

If scope is limited, prioritize these first:

1. Block
2. Blinker
3. Glider
4. LWSS
5. R-pentomino
6. Pulsar
7. Gosper glider gun
8. Snark
9. Herschel conduit chain demo
10. Sliding block memory demo
11. OTCA metapixel
12. Gemini or equivalent self-construction showcase
13. 0E0P metacell
14. Long-wall Caterpillar/Caterloopillars exhibit

---

## 5) Engineering constraints for implementation

- Do **not** run every room at max simulation speed simultaneously.
- Activate high-frequency simulation for near/focused exhibits only.
- Use display modes per exhibit:
  - `live_gpu`
  - `live_cpu`
  - `time_lapse`
  - `segmented_zoom`
  - `abstract_map`
- Keep giant artifacts readable using layered views rather than brute-force full-scale rendering.

Recommended manifest fields:

- `id`, `roomId`, `stage`, `theme`, `title`, `subtitle`, `summary`
- `sourceType`, `sourceUrl`
- `patternFile`, `fileType`
- `displayMode`, `simulationStrategy`
- `boardWidth`, `boardHeight`, `focusBoardWidth`, `focusBoardHeight`
- `chronologyYear`, `discoverer`, `heroPriority`
- `plaqueText`, `engineeringNotes`, `relatedExhibits`

---

## 6) Build stages

### Stage 1 (MVP)
Deliver Stage 0 + Stage 1 with complete navigation, room identity, and live core exhibits.

### Stage 2 (Engineering)
Add Stage 2 rooms with serious synthesis, Snark reflector routing, and Herschel conduit coverage.

### Stage 3 (Prestige/Frontier)
Add Stage 3 computation, metacells, self-construction, mega-ship long wall, and rotating frontier room.

---

## 7) Acceptance checklist

- Spawn begins in Main Hall with visible glider sculpture and map.
- All rooms are navigable and numbered.
- Each room has real content (no placeholder blank walls).
- Stage 2 includes serious glider synthesis + Herschel conduit exhibits.
- Stage 3 includes serious universal computation + mega-ship long-wall gallery.
- Pattern loading is manifest-driven and easy to extend.
- Performance remains smooth through proximity-based simulation activation.

