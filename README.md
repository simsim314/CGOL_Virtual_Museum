# Conway's Game of Life Virtual Museum

A fully implemented browser-based 3D virtual museum inspired by Conway's Game of Life.

## Features

- First-person navigation (WASD + mouse look, Shift sprint)
- Room-by-room themed museum layout for Stages 0–3
- Live Conway's Life exhibits in each room (B3/S23)
- Interactive exhibit focus mode (`E`) with controls:
  - `R` reset focused exhibit
  - `Space` pause/resume all exhibits
  - `ArrowUp/ArrowDown` adjust focused simulation speed
- Stage 0 main hall includes:
  - giant animated glider sculpture
  - large museum map wall
- Stage 3 includes a long-form mega-ship gallery room (`307`)

## Run locally

Because package registry access may be restricted in some environments, this project is implemented as a static module site.

1. Start a local static server from repo root.
   - Python: `python -m http.server 8000`
2. Open `http://localhost:8000`
3. Click the canvas to lock pointer and start exploring.

## File structure

- `index.html` — app shell and UI overlays
- `styles.css` — museum HUD/overlay styling
- `src/main.js` — Three.js app, first-person controls, interactions
- `src/museum_scene.js` — room generation, room labels, exhibits
- `src/life_engine.js` — Life simulation engine and texture updates
- `src/pattern_library.js` — built-in pattern definitions and seeding

## Notes

- Three.js is imported as an ES module from jsDelivr in source files.
- The museum is manifest-like/data-driven via room + exhibit catalogs in `museum_scene.js`.
