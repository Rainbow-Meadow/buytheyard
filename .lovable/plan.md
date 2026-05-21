## What I found

I went through all 19 screenshots and labeled each one against the live site. A few slides in the current deck pair photos with the wrong page.

**True page for each screenshot:**

| File | Actual page |
|------|-------------|
| 3939 | Home — hero ("Mulch. Loam. Sand. Stone") |
| 3940 | Home — Featured Materials grid |
| 3941 | Home — Facebook reviews / community |
| 3942 | Home — Premium Black Mulch carousel + "today's price by phone" |
| 3943 | About — "Built by Abby" (owner portrait) |
| 3944 | About — "In her own words" quote + Charlie |
| 3945 | Delivery — "You call. We deliver." (truck hero) |
| 3946 | Delivery — "Call by noon" details + Talk to Abby |
| 3947 | Get a Quote — Step 01 Materials form |
| 3948 | Contact — "Call. We answer." (Open flag photo) |
| 3949 | Contact — Map + email card |
| 3950 | Service Area — "Across Central Mass" hero |
| 3951 | Service Area — Daily routes / towns list |
| 3952 | Service Area — "Not sure if we deliver?" |
| 3953 | Privacy — top tap-to-flip cards (01–04) |
| 3954 | Privacy — bottom cards (05–09) |
| 3955 | Hamburger menu (open) |
| 3956 | About — bottom (WBENC cert + hours) |
| 3957 | Contact — bottom (map + Google review + footer) |

## Mismatches in the current deck

1. **Slide 4 "Built on real reviews"** — pairs Home reviews (3941) with About quote (3944). 3944 is not a home page.
2. **Slide 5 "One call locks the price"** — pairs Home carousel (3942) with Contact (3948). 3948 is not a pricing screen.
3. **Slide 8 "Your story, on the page" (About)** — uses 3943 + 3956 but skips the strongest About shot, 3944 (Abby's quote).
4. **Slide 9 "Tap. Call. Drive over." (Contact)** — uses 3957 + 3949 and skips 3948, the actual contact hero.

## Corrections I'll apply

| Slide | Before | After |
|-------|--------|-------|
| 4 Home trust | 3941 + 3944 | **3941 only** (single phone layout) |
| 5 Pricing | 3942 + 3948 | **3942 only** (single phone layout) |
| 8 About | 3943 + 3956 | **3943 + 3944** (portrait + her own words) |
| 9 Contact | 3957 + 3949 | **3948 + 3949** (contact hero + map) |

All other slides already match correctly:
- Slide 3 Home: 3939 + 3940 ✓
- Slide 6 Delivery: 3945 + 3946 ✓
- Slide 7 Service Area: 3950 + 3951 ✓
- Slide 10 Quote: 3947 ✓
- Slide 11 Privacy: 3953 + 3954 ✓
- Slide 12 "Designed for the phone" triple: 3940 / 3946 / 3954 (one per major section) ✓

Unused after corrections: 3952, 3955, 3956, 3957 — kept out so each slide stays focused on the page it claims to show.

## Then

Re-run the existing build script with the corrected mapping, convert to PDF via LibreOffice, render every slide to JPG, and visually QA all 14 before handing over. Output overwrites `/mnt/documents/buy-the-yard-new-site.pptx` and `.pdf`.