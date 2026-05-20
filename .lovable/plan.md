## Goal

Replace the static desktop hero image on `/` with a **seamless ~20s endless loop made of 4 photoreal 5s AI clips**, match-cut on motion, golden-hour cinematic. Mobile keeps the current still image.

## Shot list (curated, match-cut on motion)

All 1080p, 16:9, 5s, golden hour, photoreal documentary, shallow DOF, slow motion, fine grain, no faces, no text, no logos. Each shot's **ending motion** matches the **starting motion** of the next so cuts feel invisible.

1. **Loam sift** — Gloved hand lifts a fistful of dark screened loam; soil cascades **downward** through the fingers in slow motion, dust catching low sun. End on falling stream of soil.
2. **Mulch pour** — Macro of rich brown shredded mulch **falling diagonally** off a shovel edge into a fresh pile, warm rim light, drifting particles. Starts with falling material (matches end of shot 1). End on settled mulch with a slow camera drift to the right.
3. **Stone tumble** — Close-up of polished river stones **drifting / rolling rightward** through frame as the camera continues the drift past a pile; gentle clatter implied, soft golden bounce light. End on settled stones with subtle dust drifting upward.
4. **Sun-beam yard pull-back** — Slow rack-focus through drifting **dust motes rising** in a low golden sunbeam, revealing the soft-focus silhouette of a material pile and the corner of a loader bucket. End on rising dust + slight downward camera tilt — which match-cuts back to shot 1's downward soil fall, closing the loop.

Negative-prompt cues every clip: "no text, no captions, no faces, no warped hands, no extra fingers, no logos, no UI overlays, no cartoon, no oversaturation, no fake bokeh, photoreal, 24fps cinematic look, Kodak Portra palette."

## Steps

1. **Generate 4 clips** with `videogen--generate_video`
   - For each: `resolution: "1080p"`, `aspect_ratio: "16:9"`, `duration: 5`, `camera_fixed: false`
   - `target_path: src/assets/video/raw/hero-0{1..4}.mp4`
   - Use the per-shot prompts above + shared style suffix.

2. **QA each clip** before stitching
   - Extract 4 stills per clip (frames 0, 60, 90, end) with ffmpeg → `/tmp/qa/clipN-frameX.jpg`, `code--view` them.
   - Reject + regenerate (max 2 retries per clip) if: warped hands, melting objects, text artifacts, hard color shift, jitter at first/last frame, anything that breaks the match-cut.

3. **Stitch into a seamless loop** with ffmpeg (pre-installed)
   - Use `xfade` with `transition=fade, duration=0.4` between each pair, and one final `xfade` between clip 4 and clip 1 so the very last frame of the loop blends back into the first frame → true endless loop with no visible seam.
   - Result length: 4×5s − 4×0.4s ≈ **~18.4s loop**.
   - Encode two outputs (no audio):
     - `src/assets/video/hero-loop.mp4` — H.264, `-crf 22 -preset slow -movflags +faststart -pix_fmt yuv420p -an`, target ≤ 4 MB
     - `src/assets/video/hero-loop.webm` — VP9, `-b:v 0 -crf 33 -an`, target smaller
   - **Poster JPG** from frame 0 of clip 1 → `src/assets/video/hero-loop-poster.jpg` (used as LCP image + `<video poster>`).

4. **Wire into `src/routes/index.tsx` hero (desktop ≥ md only)**
   - Import `heroLoopMp4`, `heroLoopWebm`, `heroPoster`.
   - Replace the desktop `<img src={heroDesktop} … className="hidden md:block …" />` with:
     ```tsx
     <video
       className="hidden md:block absolute inset-0 w-full h-full object-cover"
       autoPlay muted loop playsInline preload="metadata"
       poster={heroPoster}
       aria-hidden="true"
     >
       <source src={heroLoopWebm} type="video/webm" />
       <source src={heroLoopMp4}  type="video/mp4"  />
     </video>
     ```
   - Mobile `<img md:hidden …>` stays untouched (saves data + battery on the 440px viewport you're currently using).
   - Keep both existing scrims — they already guarantee headline contrast.
   - Update the desktop preload `<link>` to point at the **poster JPG** instead of `heroDesktop` (the poster is the LCP, not the video).

5. **No text / layout changes.** Eyebrow, H1, lead, CTAs, and everything below the hero stay identical. Respects the headline/subtext line-limit rule (nothing is touched).

## Files

- **Created**:
  - `src/assets/video/raw/hero-01.mp4` … `hero-04.mp4` (source clips, kept for re-edits)
  - `src/assets/video/hero-loop.mp4`
  - `src/assets/video/hero-loop.webm`
  - `src/assets/video/hero-loop-poster.jpg`
- **Edited**: `src/routes/index.tsx` (desktop `<img>` → `<video>`, swap desktop preload `href` to the poster).

## Out of scope

- No audio (muted hero).
- No mobile video swap (kept as still image for performance).
- No copy, layout, or other-section changes.
- No new components or routes.

## Risks / mitigations

- **AI tells (warped hands, melting textures)** → subjects chosen are the ones current models render best (falling soil, mulch, stones, dust in light); 2-retry QA gate per clip on extracted stills.
- **Visible seams / non-seamless loop** → final `xfade` between clip 4 and clip 1 ensures the loop boundary is also blended, not just inter-clip cuts.
- **LCP regression** → preload the poster JPG as `image`, use `preload="metadata"` on the video, mobile stays on the existing image.
