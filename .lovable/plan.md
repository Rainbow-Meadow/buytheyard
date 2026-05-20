## Goal

Add a **dedicated 9:16 vertical loop** for mobile (`< md`) on `/`, mirroring the desktop hero treatment: 4 photoreal golden-hour macro clips, match-cut with crossfades, final blend back to clip 1 for an invisible loop seam. Desktop's 16:9 loop is unchanged.

## Shot list (same 4 shots, reframed vertical)

All 1080p (1080×1920), 9:16, 5s, golden hour, photoreal documentary, shallow DOF, slow motion, fine grain, no faces, no text, no logos. Reuse the prompts from the desktop loop but reframe each so the subject reads strongly in portrait:

1. **Loam sift (vertical)** — Gloved hand from upper frame; soil cascades downward through the full vertical frame, dust catching low sun. Ends mid-fall.
2. **Mulch pour (vertical)** — Shovel edge from upper-right; mulch falls diagonally down through the tall frame into a pile. Starts on falling material (matches end of shot 1). Ends settled with gentle downward drift.
3. **Stone tumble (vertical)** — Polished river stones tumbling gently downward through the vertical frame past a pile (downward motion fits portrait better than rightward). Ends settled with dust drifting upward.
4. **Mulch macro (vertical)** — Slow handheld drift across dark mulch surface with dust drifting in a warm side-light. Ends with a slight downward camera tilt that match-cuts back to shot 1's downward soil fall.

Same negative-prompt cues as desktop: "no text, no captions, no faces, no warped hands, no extra fingers, no logos, no UI, no cartoon, no oversaturation, no fake bokeh, photoreal, 24fps cinematic, Kodak Portra palette, no lens flare ghosts."

## Steps

1. **Generate 4 vertical clips** with `videogen--generate_video`
   - `resolution: "1080p"`, `aspect_ratio: "9:16"`, `duration: 5`, `camera_fixed: false`
   - `target_path: src/assets/video/raw/hero-mobile-0{1..4}.mp4`

2. **Download + QA** each clip (download from preview CDN, extract 3 stills/clip with ffmpeg, inspect with `code--view`). Reject + regenerate (max 2 retries each) for: warped hands, melting objects, fake lens orbs, text artifacts, oversaturation, broken match-cut.

3. **Stitch with ffmpeg** (same recipe as desktop)
   - `xfade fade duration=0.4` between each pair of clips
   - Final `xfade` from clip 4 → first 0.4s of clip 1, so the last frame of the loop blends back into clip 1's first frame → invisible loop seam.
   - Output length ≈ 18.4s.
   - Scale to **720×1280** (mobile doesn't need 1080p; halves file size), H.264, `-crf 26 -preset slow -movflags +faststart -pix_fmt yuv420p -an`.
   - Target ≤ ~3 MB. Output: `src/assets/video/hero-loop-mobile.mp4`.
   - Poster JPG from frame 0 → `src/assets/video/hero-loop-mobile-poster.jpg`.

4. **Wire into `src/routes/index.tsx`**
   - Import `heroLoopMobileMp4` and `heroLoopMobilePoster`.
   - Replace the mobile `<img src={heroMobile} … className="md:hidden …" />` with:
     ```tsx
     <video
       className="md:hidden absolute inset-0 w-full h-full object-cover"
       autoPlay muted loop playsInline preload="metadata"
       poster={heroLoopMobilePoster}
       aria-hidden="true"
     >
       <source src={heroLoopMobileMp4} type="video/mp4" />
     </video>
     ```
   - Swap the mobile preload `<link>` from `heroMobile` to `heroLoopMobilePoster` (poster is the LCP, not the video).
   - Remove the now-unused `heroMobile` import.

5. **No copy, layout, or other-section changes.** Headline/subtext untouched, line-limit rule respected.

## Files

- **Created**: `src/assets/video/raw/hero-mobile-01.mp4` … `hero-mobile-04.mp4`, `src/assets/video/hero-loop-mobile.mp4`, `src/assets/video/hero-loop-mobile-poster.jpg`
- **Edited**: `src/routes/index.tsx` (mobile `<img>` → `<video>`, swap mobile preload `href`, drop unused import)

## Out of scope

- No audio.
- No `prefers-reduced-data` / Save-Data fallback (can add later if you want).
- No changes to the desktop loop or any other section.
- No WebM sibling (mobile MP4 stays small enough on its own).

## Risks / mitigations

- **AI tells in portrait framing** → same 2-retry QA gate on stills as desktop pass.
- **Mobile bandwidth** → 720×1280 + CRF 26 + `preload="metadata"` keeps the cost low; poster image is the LCP, video streams after.
- **Autoplay blocked on iOS Low Power Mode** → `poster` JPG ensures the hero still looks intentional if the video never plays.
