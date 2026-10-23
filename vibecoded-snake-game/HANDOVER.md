# Handover Document: Viewport Game (Snake-Like Multi-Colored String)

## 1. Project Overview & Architecture
The project is a lightweight, zero-dependency browser game served by a simple Node.js static server.

- **Workspace Path**: `d:\_dev\my-playground`
- **Entry Points**:
  - [index.html](file:///d:/_dev/my-playground/index.html): Contains all game markup, styling, animations, and game loop logic.
  - [server.js](file:///d:/_dev/my-playground/server.js): Minimal native `http` static file server running on port `3000`.
  - [package.json](file:///d:/_dev/my-playground/package.json): Simple NPM manifest (`npm start` runs `node server.js`).
- **Server Address**: `http://localhost:3000` (runs in background with `BypassSandbox: true` so local Windows browsers can connect).

---

## 2. Core Game Rules & Mechanics

### Grid & Viewport
- **Grid Cell Size**: `40px` (`size = 40`).
- **Play Area Dimensions**: `800px` width $\times$ `600px` height ($20 \times 15$ cells).
- **Edge Fitting**: `#viewport` uses `box-sizing: content-box` with a `3px` solid border outside the play area, ensuring all segments on border coordinates ($x=760\text{px}$, $y=560\text{px}$) fit completely without being clipped.

### Segment Mechanics & Colors
- **Initial State**: 2 horizontal squares centered at $(400, 280)$ and $(360, 280)$, moving `RIGHT`.
- **Persistent Non-Repeating Colors**: Each segment permanently maintains its own gradient color from `colorPalette`.
- **Food Absorption & Reverse Progression**:
  - When the snake's head steps on food, the food disappears from the board immediately.
  - A new segment with the eaten food's color is inserted **directly behind the head (index 1)**.
  - On subsequent moves, the food square's color swaps backwards down the body (`index 1 -> 2 -> ... -> tail`) until it reaches the last segment, where it permanently settles.
- **Food Respawn**: The next food square spawns **exactly 2 moves** after the previous food was eaten (`foodRespawnCountdown = 2`).

### Movement, Speed, & Animations
- **Direction & Turn Validation**: Standard WASD / Arrows. 180° immediate reversal into the opposite direction is blocked.
- **Directional Chevron**: The head (`#player`) contains a `#headArrow` that dynamically rotates ($0^\circ, 90^\circ, 180^\circ, 270^\circ$) to point towards `currentDir`.
- **Smooth Animation**: Movement uses CSS transitions on `left` and `top` with an ease curve. The transition duration (`--anim-duration`) scales dynamically with the speed tier.
- **Teleport Transitions**: When teleporting across the screen in wrap-around mode, `.no-transition` is applied to jumping segments so they do not sweep across the canvas.
- **Speed System**:
  - Speed tiers range from 1 to 10.
  - Adjusted manually via <kbd>+</kbd> / <kbd>-</kbd> buttons or keys.
  - Automatically increases by $+1$ for every **5 foods eaten** (`score % 5 === 0`).
  - Speed calculation: `getSpeedIntervalMs(sp) = Math.max(50, Math.round(400 * Math.pow(0.85, sp - 1)))`.

### Boundary Modes & Game Over
- **Teleport Mode (Default: ON)**:
  - Toggleable via button or <kbd>T</kbd>.
  - When **ON**: Moving past any edge wraps around seamlessly to the opposite side.
  - When **OFF**: Touching the play area border triggers **GAME OVER**.
- **Self-Collision**:
  - Colliding with any trailing body segment (excluding the tail that vacates on the same move) triggers **GAME OVER**.
- **Game Over Overlay**: Displays final score and provides a restart button or <kbd>R</kbd> key.

---

## 3. Controls Reference

| Control | Action |
| :--- | :--- |
| <kbd>W</kbd> / <kbd>&uarr;</kbd> | Move UP |
| <kbd>A</kbd> / <kbd>&larr;</kbd> | Move LEFT |
| <kbd>S</kbd> / <kbd>&darr;</kbd> | Move DOWN |
| <kbd>D</kbd> / <kbd>&rarr;</kbd> | Move RIGHT |
| <kbd>Space</kbd> | Toggle Auto-Run (ON / OFF) |
| <kbd>T</kbd> | Toggle Teleport / Wrap-around boundary mode |
| <kbd>+</kbd> / <kbd>=</kbd> | Increase Speed |
| <kbd>-</kbd> / <kbd>_</kbd> | Decrease Speed |
| <kbd>R</kbd> | Restart Game |

---

## 4. Key JavaScript State Variables ([index.html](file:///d:/_dev/my-playground/index.html))

```javascript
let snake = [ { x, y, color }, ... ]; // index 0 is head
let currentDir = 'RIGHT';             // 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
let wrapAround = true;                // Teleport boundary toggle
let isGameOver = false;               // Game over flag
let score = 0;                        // Total foods eaten
let speed = 1;                        // Speed tier (1 - 10)
let autoRunInterval = null;           // Auto-move timer
let foodActive = false;               // Whether food is currently rendered on board
let foodRespawnCountdown = 0;         // 2-step countdown timer after eating
let travelingFoodIndex = -1;          // Position of food segment traveling down body
```

---

## 5. Notes for the Next Agent
- **Server Execution**: Always run `node server.js` with `BypassSandbox: true` so the user's local Windows browser can reach `http://localhost:3000`.
- **Aesthetics**: Avoid reintroducing harsh borders or glowing box-shadows on food and segments; keep styling minimal with standard border-radius and clean drop-shadows.
- **Clean Structure**: The entire game is self-contained within [index.html](file:///d:/_dev/my-playground/index.html), making it easy to extend with sound effects, local high scores, or pause states.

