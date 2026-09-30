# Antonio “Tonio” Ellison, MS, CLC

Photography-led personal website with a continuous black/charcoal narrative and two restrained ivory breaks. Plain HTML, CSS and JavaScript; no runtime dependencies or animation libraries.

Live site: https://tonio-ellison.aellison2920.workers.dev/
Repository: https://github.com/lauraxtina05-star/tonio-ellison

## Develop and deploy

- `npm run dev` serves source from public/ on localhost:4173.
- `npm run check` checks all JavaScript syntax.
- `npm test` checks scroll bounds, offscreen cleanup and reduced-motion behavior.
- `npm run build` creates dist/ and renders centralized event copy into HTML for non-JavaScript readers.
- Cloudflare's connected main branch runs `npx wrangler deploy`. The checked-in wrangler.jsonc invokes the production build and publishes dist/ as static assets to the existing tonio-ellison Worker.
- No secrets, environment variables, DNS edits or custom-domain changes are needed for this revision.

## Editing map

- public/index.html: page structure, natural biography, booking fields, contact links, inline reusable ArrowIcon symbol.
- public/styles.css: editorial layout, theme, responsive forms and motion/reduced-motion styles.
- public/content.js: the only source for Chocolate City Talks recurrence, description, registration link and integration settings.
- public/app.js: navigation, content rendering, inquiry preselection and form requests.
- public/motion.js: scoped IntersectionObservers and requestAnimationFrame hero updates.
- public/assets/: original supplied portrait, stage photo and event flyer.
- scripts/build.mjs: dependency-free static build.
- tests/motion.test.mjs: reduced-motion and scroll lifecycle checks.
- wrangler.jsonc: existing Cloudflare Worker deployment configuration.

## Hero motion

Desktop/tablet: portrait scales by at most 3.5% and moves 18px; headline moves up at most 24px; dark hero scales down proportionally by at most 1.4% as the dark personal introduction enters normal document flow. No sticky or pinned scroll. Only one queued frame per scroll; scroll listeners detach when the hero is offscreen.

At 700px and below: no portrait or section transformation, only up to 6px of text translation and 6% fade. Reduced-motion disables all scroll transforms, section reveals, hover transforms and smooth scrolling, including when the preference changes during a visit. Two chosen text blocks and a full-width stage photograph reveal on entry; content remains visible without JavaScript.

## Mobile booking form fix

The previous max-width:600px rule overrode the tablet's single-column grid with two columns. Combined with implicit minimum grid-track sizing and native select/date control widths, this caused overlap on narrow viewports. The fix uses minmax(0,1fr) tracks, min-width:0 on controls and grid children, width/max-width:100%, and one column below 700px. Controls use 16px text and at least 48px height.

Manually inspected the full form at 320, 360, 375, 390 and 430px. Labels, selects, date input, textarea and submit button fit without overlapping or horizontal scrolling.

## Formspree

Endpoint: https://formspree.io/f/xwlpzole. Preserve notification recipient **aellison2920@gmail.com**. Do not switch it to the public business address. Public contact email stays releasewithtonio@gmail.com.

The form uses POST, JSON Accept header, required/email validation, loading/success/error states and the `_gotcha` honeypot. No private keys. Native POST remains available without JavaScript. The earlier labeled integration test was received in Formspree Inbox. This visual revision preserves the request handler and endpoint.

## MailerLite and future content

Newsletter integration structure remains intact and visibly disabled until configured. Use an approved MailerLite embed or a secure server adapter; never expose a private API key. Empty experience/community collections remain hidden until verified material is supplied. Set creatorUrl when ONYX Creatrix's approved URL is available.

The September 2026 flyer is explicitly past-event collateral. The primary event display is the recurring schedule; no old date is presented as upcoming. Future event details belong in content.js.

## September 2026 narrative refinement

Replaced repeated slogan sections with a personal introduction, first-person story, full-width stage photograph, four-row work index and expanded community advocacy section. Workshops now lives in the work index; speaking, Chocolate City and private conversations retain direct anchors. Newsreader regular is self-hosted (109 KB) with font-display:swap and its SIL Open Font License in public/assets/fonts/OFL.txt; body text uses Arial/Helvetica. Font source: https://github.com/productiontype/Newsreader.

Browser geometry checks passed at 320, 360, 375, 390, 430, 768, 1024 and 1440px: no horizontal overflow, intersecting form labels or controls outside the viewport. Ivory section height ranges from approximately 13% desktop to 16% narrow mobile; remaining backgrounds are black/charcoal with sparse gold details. Existing Formspree handler and recipient settings were not changed.

## Wide portrait and professional identity update

The supplied Antonio.png appears as public/assets/tonio-speaking-wide.png after About, before the work index. Desktop and tablet preserve its full 1672:941 composition. Mobile uses a left-aligned square crop that retains Tonio and his microphone, with no text overlay. The hero identifies his life-coach, speaker, host, activist and facilitator roles; community and private-conversation copy expands the relevant work without medical claims. Formal MS, CLC credentials remain in About rather than repeating in contact/footer. Existing contact details, Formspree, event schedule and motion are preserved.
