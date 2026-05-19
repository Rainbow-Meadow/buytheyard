Remove the small Abby avatar image from the hero eyebrow, keeping the "Hi, I'm Abby — owner · Jefferson, MA" text intact.

In `src/routes/index.tsx`:
- Delete the `<img src={abbyPortrait} ... />` element inside the eyebrow `<p>` (lines ~363–371).
- Remove the now-unused `import abbyPortrait from "@/assets/source/abby-portrait.webp"` at line 7.

No other changes; the asset file is left on disk in case it's wanted later.