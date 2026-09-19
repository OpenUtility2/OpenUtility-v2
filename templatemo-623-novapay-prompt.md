# NovaPay — Design Prompt

## Vibe
Modern fintech landing page with a premium, slightly editorial feel.
Should feel **alive but composed** — closer to Linear/Stripe than to a
typical SaaS template. Avoid generic AI aesthetics (no cyan/purple
gradients, no Inter, no centered hero with three-column icon grid).

## Color System
- **Base**: deep dark slate `#0F1319` with layered surfaces `#141920`, `#1A2130`, `#1E2838`
- **Accent**: sky blue `#4A9EE8` (primary), `#7EC8F0` (lighter), `#2A6AAA` (deeper)
- **Text**: warm cream-tinted whites stepping down through `#E4EEF8`, `#8AAEC8`, `#506070`
- **Status**: green `#3DCC8E`, red `#E85A5A` for indicators only
- **Borders**: low-contrast `#1E3050` and `#2A4060`

## Typography
- **Display / headlines**: Outfit (700–800), letter-spacing −0.03em
- **Body / UI**: DM Sans (300–500), default body 16px
- Numbers and stats use Outfit for that geometric financial weight

## Motion Language
- Custom easing variable `--silk: cubic-bezier(0.16, 1, 0.3, 1)`
- Transitions average **500–800ms**, never snappy/linear
- Hover states involve micro-translations (1–4px) and scale (1.02–1.08)
- Scroll-triggered fade-and-rise via IntersectionObserver
- 3D mouse-parallax tilt on the phone mockup with rAF + lerp

## Layout Rules
- Max content width **1280px**, sections fade edge-to-edge with `padding: x max(48px, calc((100vw - max-w) / 2))`
- 60–100px vertical breathing room between sections
- Mobile breakpoint 900px → 24px side padding, single column
- Diagonal grid backgrounds (120px cells, 35% opacity sky lines, radial mask) anchored to opposite corners across hero, app, and FAQ sections for visual rhythm

## Distinctive Touches
- **Ticker strip** above nav with live FX/crypto ticker (pause on hover)
- **Sticky stack features** — scroll-pinned cards with swapping UI mockup panel
- **Stat hover** — ripple/pulse rings emanating from the icon, no underline slide
- **Phone tilt** — full-window mouse tracking, doubled horizontal axis
- **Silk reveal** entrance animations on hero halves and section headers

## What This Template Avoids
- Default Tailwind/Bootstrap gradient hero
- Inter, Roboto, or Poppins typography
- Sliding underline nav hovers
- Centered hero with three-column feature icons below
- Generic card shadows and rounded-xl-everything aesthetic
- Cyan, purple, magenta, neon accent colors
