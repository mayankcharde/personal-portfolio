# Interactive 3D Developer Portfolio

A modern, professional, and visually stunning developer portfolio website built using React (Vite), Tailwind CSS, React Three Fiber, GSAP, and Framer Motion. Featuring deep space indigo aesthetics, interactive 3D elements, custom cursors, and smooth inertia scrolling.

## Tech Stack & Integrations

- **Bundler & Core**: Vite + React 18 (JavaScript)
- **Styling**: Tailwind CSS 3.x (Glassmorphism & custom variables)
- **3D Graphics**: `@react-three/fiber` + `@react-three/drei` (distorted interactive mesh blob)
- **Scroll Animations**: GSAP 3.x + `ScrollTrigger` plugin
- **Inertia Scrolling**: Lenis smooth scroll
- **Micro-Animations**: Framer Motion (mobile menu transitions, state management)
- **SEO & Metadata**: `react-helmet-async` (document title & open-graph tags)

## Design System

- **Background**: `#0A0A12` (deep space)
- **Surface Cards**: `#13131F` (60% opacity + backdrop-blur)
- **Primary Accent**: `#635BFF` (electric indigo)
- **Secondary Accent**: `#22D3EE` (cyan)
- **Highlight Accent**: `#D4FF3F` (lime, used sparingly on CTA buttons)
- **Typography**:
  - Headings: **Clash Display** (Fontshare)
  - Body Text: **Satoshi** (Fontshare)
  - Fluid sizing clamp utilities
- **Texture**: Subtle animated noise overlay at 4% opacity.

## Project Structure

```text
/src
  /components
    - Cursor.jsx         # Custom interactive cursor tracking dot + outer text ring
    - GrainOverlay.jsx   # Fixed noise texture canvas
    - Loader.jsx         # Intro percentage bar loading transition screen
    - Navbar.jsx         # Glassmorphic header with Framer Motion mobile hamburger
    - Hero.jsx           # Welcome section, staggered word animations, magnetic CTA
    - Marquee.jsx        # CSS-only infinite horizontal skill icon ticker
    - About.jsx          # Bio description, portrait image, and counting stats
    - Projects.jsx       # Grid list container displaying featured work items
    - ProjectCard.jsx    # Glass project card with image scale and slide-up tags on hover
    - Experience.jsx     # Career timeline, certifications badge list, and achievements
    - Contact.jsx        # Footer email CTA and magnetic social connection buttons
  /data
    - portfolioData.js   # Main configuration file containing all personal details & icons
  /hooks
    - useLenis.js        # Smooth scroll context and GSAP ScrollTrigger bridge
    - useMediaQuery.js   # Breakpoint checks to bypass heavy 3D canvas on mobile devices
    - useReducedMotion.js# Respect OS-level animation preference toggles
  /three
    - HeroScene.jsx      # React Three Fiber Canvas and interactive MeshDistortMaterial blob
  /utils
    - magnetic.jsx       # GSAP magnetic wrapper component
  - App.jsx              # Main assembly, Helmet provider, and loader wrapper
  - index.css            # Base stylesheet containing tailwind layers, reset details, marquee keyframes
  - main.jsx             # React entry mount point
```

## Customization

To edit the portfolio contents, edit the configuration object exported in `src/data/portfolioData.js`. All sections and text are dynamically read from this single source file.

```javascript
// src/data/portfolioData.js
export const portfolioData = {
  personalInfo: {
    name: "Mayank Charde",
    initials: "MC",
    title: "AI & Full Stack Developer",
    // ...
  }
}
```

## Getting Started

### 1. Install Dependencies
Navigate to the `frontend` folder and run the installation:
```bash
npm install
```

### 2. Run the Development Server
Launch the local Hot-Module-Replacement server:
```bash
npm run dev
```

### 3. Build for Production
Bundle and optimize assets for hosting deployment:
```bash
npm run build
```
