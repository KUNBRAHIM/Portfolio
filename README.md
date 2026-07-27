# Portfolio — Latreche Brahim

Personal portfolio website for **Latreche Brahim** (Adrian), a full-stack developer. Built with React 19, Three.js, and Tailwind CSS v4. Features an interactive 3D hero section with a rotating animated disc and orbiting tech stack models, plus a scroll-driven 3D experience showcase.

## Features

- **3D Hero Section** — Full-screen Three.js scene with a rotating double-sided disc (personal photo + background image), animated gradient torus ring, contact shadows, floating animation, and 5 orbiting tech logo models (React, JavaScript, TypeScript, Python, Node.js).
- **Scroll Animations** — GSAP ScrollTrigger drives the 3D disc rotation and position as the user scrolls; the disc moves right and spins as content scrolls, then shrinks when the Experience section enters viewport.
- **Responsive 3D** — Adapts layout and 3D scene scaling for mobile, tablet, and desktop via `react-responsive`.
- **Word Slider** — Animated text carousel cycling through "Ideas", "Concepts", "Designs", "Code" with matching SVG icons.
- **Custom Shaders** — Two custom `ShaderMaterial` implementations: an animated torus ring with time-varying color waves and a gradient face shader.
- **Experience Section** — Interactive card selector with 4 roles (Frontend Developer, Full Stack Developer, React Native Developer, Mobile App Developer) displayed in a styled card with dynamic colors per role, fade + slide animations, and fully responsive layout (phone/tablet/desktop).
- **Abilities Grid** — Three animated cards (Quality Focus, Reliable Communication, On-Time Delivery) with Framer Motion entrance animations; scrollable horizontally on mobile.
- **Custom Navbar** — Fixed navigation with cream/yellow palette, mobile hamburger menu, and active link highlighting.
- **Data-Driven** — All portfolio content lives in a single constants file.

## Tech Stack

| Category | Libraries |
|---|---|
| **Core** | React 19, Vite 8, JavaScript (JSX) |
| **3D Graphics** | Three.js, @react-three/fiber (v9), @react-three/drei (v10), @react-three/postprocessing |
| **Styling** | Tailwind CSS v4 (via @tailwindcss/vite), custom theme colors |
| **Animations** | GSAP (with ScrollTrigger & @gsap/react), Framer Motion |
| **Icons** | lucide-react |
| **Responsive** | react-responsive |
| **Linting** | ESLint 10 with react-hooks & react-refresh plugins |

## Scripts

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Project Structure

```
Portfolio/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── public/
│   ├── images/             # Personal photos, logos, icons, client images, textures
│   └── models/             # GLTF 3D models (tech logos, sci-fi bg, room)
├── src/
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Root component 
│   ├── index.css           # Tailwind imports + custom theme colors & animations
│   ├── constants/
│   │   └── index.js        # All portfolio data (navLinks, words, expCards, etc.)
│   ├── context/
│   │   └── ExperienceContext.jsx  # Context for active experience card
│   ├── components/
│   │   ├── Navbar.jsx      # Fixed navbar with theme colors & mobile menu
│   │   ├── button.jsx      # Reusable "View My Work" button with arrow animation
│   │   ├── DownloadCV.jsx  # CV download button
│   │   └── HeroModels/
│   │       ├── HeroExperience.jsx  # Main 3D scene (disc, ring, orbiting models, shaders)

│   │       ├── Sci-fi_background.jsx
│   │       ├── React.jsx / Javascript.jsx / Typescript.jsx / Python.jsx
│   │       ├── Nodejs.jsx / Html.jsx / Css.jsx / Flutter.jsx / Laravel.jsx
│   └── sections/
│       ├── Hero.jsx         # Hero section with 3D background, word slider & CTAs
│       └── Experience.jsx   # Experience section with card selector, content card & abilities grid
```

## Hero Section Details

The `HeroExperience` component (`src/components/HeroModels/HeroExperience.jsx`) renders a fixed full-screen Canvas behind the hero content:

- **Styled3DCircle** — A 3D disc consisting of:
  - **Torus ring** with a custom animated gradient shader (yellow/white/slate, time-varying).
  - **Circle face** with a vertical yellow-to-white gradient shader.
  - **Front face** — Developer's photo (`/images/personal.png`).
  - **Back face** — Background image (`/images/bg.png`).
- **FloatingModels** — 5 orbiting tech logos (React, JavaScript, TypeScript, Python, Node.js) on elliptical paths at varying radii, speeds, and Y offsets. Each model spins on its own Y axis.
- **Lighting** — Ambient + two directional lights (warm/cool) + Environment preset.
- **Contact Shadows** — Yellow-tinted drop shadow beneath the disc.
- **GSAP ScrollTrigger** — Disc translates right and rotates 180° on scroll; scales down when Experience section enters viewport.
- **Floating** — Gentle Y-axis oscillation via `useFrame`.

## Experience Section Details

The detail card in `src/sections/Experience.jsx` renders a styled card:

- **Styled Card** — `rounded-xl` card with dynamic border, background, and shadow color per role (teal, purple, pink, amber).
- **Content** — Logo (or initials fallback), title, date range, review quote, and responsibility bullet points.
- **Animations** — Content fades in and slides up on card change via Framer Motion; border/background/shadow colors transition smoothly via CSS.
- **Card Selector** — 4 buttons horizontally scrollable on mobile, vertical column on desktop; active card highlighted with matching teal glow.
- **Responsive** — Mobile: single column with horizontal scroll cards; Tablet: 2-column grid with cards in a 2-column sub-grid; Desktop: 2-column grid with vertical card stack.
- **Abilities** — Three animated cards (Quality Focus, Reliable Communication, On-Time Delivery) appear below the experience grid; horizontally scrollable on mobile.

## Constants Data

`src/constants/index.js` provides all portfolio content:

| Export | Purpose |
|---|---|
| `navLinks` | Navigation items (Work, Experience, Skills, Testimonials) |
| `words` | Rotating word slider items with SVG icon paths |
| `counterItems` | Stats (years, clients, projects, retention) |
| `logoIconsList` | Client/company logo carousel |
| `abilities` | Quality focus, communication, on-time delivery cards |
| `techStackImgs` | 2D tech icon references |
| `techStackIcons` | 3D model paths with scale/rotation configs |
| `expCards` | Experience timeline entries with reviews & responsibilities |
| `expLogos` | Company logo paths |
| `testimonials` | Client testimonials with names and avatars |
| `socialImgs` | Social media icon paths |

## Theme Colors

Custom palette defined in `src/index.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-white-50` | `#FFFDD0` | Primary text (cream/off-white) |
| `--color-black-50` | `#1c1c21` | Light dark backgrounds |
| `--color-black-100` | `#0e0e10` | Main background |
| `--color-black-200` | `#282732` | Card backgrounds |
| `--color-blue-50` | `#E4D00A` | Accent color (yellow) |
| `--color-blue-100` | `#2d2d38` | Input backgrounds |
