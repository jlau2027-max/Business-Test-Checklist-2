# IBrev.org

## Design Context

### Users
IB students aged 16–18 using IBrev for exam revision. Two modes: **steady revisers** who build habits with daily/weekly sessions and want calm, structured tools — and **crammers** under exam pressure who need to feel fast progress. The interface must serve both: focused and efficient for daily use, but also scannable and rewarding when time is short.

### Brand Personality
**Sharp, modern, premium.** IBrev should feel like a high-end study tool — polished, fast, and aspirational. Not playful or gamified. The confidence comes from restraint: clean type, purposeful color, and quiet competence. Think "tool that respects your intelligence."

### Aesthetic Direction
- **Visual tone:** Editorial and sophisticated. Apple/Stripe-level polish — premium type, purposeful animation, generous whitespace. Every element earns its place.
- **References:** Apple (editorial precision, type hierarchy), Stripe (clean information density, purposeful color accents)
- **Anti-references:** Quizlet/Kahoot (gamified, loud, cartoon-ish), generic SaaS landing pages (hero + feature grids + testimonial carousels), brutalist/terminal aesthetics (too intimidating for the audience)
- **Theme:** Light and dark mode. Dark is the primary/default experience. Color palette is muted and earthy — teal, sage, warm tan — never neon or saturated.
- **Typography:** JSans (custom variable font), weight 100–900. Tight letter-spacing on headings, relaxed line-height on body text. Font does the heavy lifting.
- **Color philosophy:** Restrained. Accent colors differentiate subjects/categories but stay muted. Status colors (success/danger/warning) are desaturated. No bright primaries.

### Design Principles

1. **Content-first.** The interface disappears — questions, flashcards, and checklists are the product. Chrome, navigation, and decoration exist only to support the content.

2. **Quiet confidence.** No exclamation marks in design. No bouncing badges, no confetti, no streaks. Progress is shown calmly (progress bars, percentages). The design communicates competence through restraint.

3. **Density without clutter.** IB students are reviewing hundreds of questions. Show information efficiently — compact cards, good scan-ability, clear category color coding — but never feel overwhelming. Whitespace is a feature.

4. **Speed is a feature.** Every interaction should feel instant. Animations are short (200–400ms), transitions are functional (not decorative), loading states are informative. Respect the student's time.

5. **One typeface, many weights.** JSans carries the entire typographic hierarchy. No icon fonts, no decorative type. Weight, size, and color create hierarchy — nothing else.

### Technical Constraints
- **Stack:** React 19 + Vite + Tailwind CSS 4 + HeroUI (beta) + GSAP/Motion for animation
- **Deployment:** Vercel (frontend) + Cloudflare Workers/D1 (backend API)
- **Auth:** Clerk
- **AI grading:** Anthropic Claude API via Cloudflare Worker
- **Font:** Custom JSans TTF, preloaded, `font-display: swap`
- **CSS approach:** Hybrid — Tailwind utilities + CSS custom properties for theming + component CSS files for complex animations
- **Responsive:** Mobile support is a known gap. Sidebar needs mobile treatment. Currently only 1 `@media` query in custom CSS.

### Color System
```
Backgrounds:  --bg-base → --bg-card → --bg-input → --bg-elevated  (4 layers)
Text:         --text-primary → --text-secondary → --text-muted → --text-dim  (4 levels)
Accents:      --accent (teal) / --accent-secondary (sage) / --accent-tertiary (tan)
Status:       --color-success / --color-danger / --color-warning  (each with -soft variant)
Categories:   --cat-costs through --cat-bmt  (8 subject-specific colors)
```
All colors have light/dark variants defined in `:root` and `.dark` in `index.css`.

### Critical Infrastructure — Do Not Modify
- **Clerk auth:** Never change the working Clerk setup. The publishable key (`pk_live_Y2xlcmsuaWJyZXYub3JnJA`) is hardcoded as a fallback in `main.jsx`. Do not remove it, change the `AuthGate` passthrough logic, or restructure the `ClerkProvider` wrapper.
- **Grading worker:** `ib-grading-hollen.c9tggsfst9.workers.dev` — API endpoint for AI grading and feedback submission.
- **Cloudflare D1 databases:**
  - `ib-revision-content` — all questions, flashcards, checklists
  - `ib-revision-db` — user accounts and attempt tracking

### Git
- Commit as **sol5000** only. No `Co-Authored-By` line.

### Component Libraries
- **Icons:** Lucide React (never mix in other icon sets)
- **UI components:** HeroUI v3 beta (MCP server available for docs/source lookup)
