# Choose Effective Growth — editable review build

This is a **review-only** conversion of the October 13, 2026 original `.dc.html` source files. No production deployment has been made.

## Site files

- `index.html`: homepage markup, with original inline layout styles kept unchanged.
- `podcast/index.html`: unlisted podcast guest page. The `noindex, nofollow` meta tag is retained.
- `css/home.css`, `css/podcast.css`: page-wide CSS, breakpoints and hover rules.
- `js/home.js`: lead drawer, mobile nav, calendar handoff, Monday scorecard dates and RSS episodes.
- `js/podcast.js`: podcast questions and hero video autoplay.
- `assets/`: original photography, video and logo artwork.

The layout uses **inline element styles on purpose**. They are valid HTML and retain the exact source's CSS values; the shared stylesheets hold global styles and responsive rules. Unlike the original templates, the files do not require `support.js`, React or the `.dc.html` runtime.

## Test locally

Run `python3 -m http.server 8000` in this folder, then visit `http://localhost:8000/` and `http://localhost:8000/podcast/`. Do not submit the form during a visual-only review: it targets the live Google Apps Script endpoint and may create a real lead.

## Before publishing

1. Compare desktop and mobile visuals against the live website at widths 1440, 1024, 768, 390 pixels.
2. Test hamburger navigation, modal open/close, scorecard dates, current RSS episodes and responsive layouts.
3. Test lead submission with an agreed test contact; check both Google Sheet and Slack. Due to `no-cors`, a sent request doesn't prove backend receipt.
4. Check autoplay and the Loom/Riverside booking links on mobile Safari.
5. After approval only, back up production and copy `index.html`, `podcast/index.html`, `css/`, `js/`, `assets/` to the GitHub Pages root. **Preserve the existing CNAME file.**

**Verification limits:** JavaScript passed `node --check` and static-file structure checks. This environment blocked browser navigation, so pixel-perfect equivalence, mobile Safari behavior, external RSS and Google Apps Script live effects were not verified. The original error message referring to email, all monetary copy and all external endpoint URLs are deliberately unchanged.

## Preview after uploading to GitHub review branch

Temporary homepage preview: https://raw.githack.com/brandonsday/choose-effective-growth/review/index.html

Temporary podcast preview: https://raw.githack.com/brandonsday/choose-effective-growth/review/podcast/index.html

These links will work only once all review files are uploaded. RawGitHack may display a one-time safety confirmation before serving HTML. This public third-party preview is for visual testing, not production hosting. Do not submit the live lead form during casual testing. GitHub Pages must remain on main.
