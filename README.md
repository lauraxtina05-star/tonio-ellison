# Antonio “Tonio” Ellison, MS, CLC

Dark editorial personal-brand V1. Dependency-free HTML, CSS and JavaScript; prepared for Cloudflare Pages.

## Local development and build
- `npm run dev`: serve public/ on localhost:4173.
- `npm run check`: JavaScript syntax checks.
- `npm run build`: copy public/ into clean dist/.

## Files
- public/index.html — semantic page sections, contact form, accessible navigation, SEO metadata.
- public/styles.css — responsive design and form styling.
- public/content.js — centralized event information and integration settings.
- public/app.js — menu, content rendering, inquiry preselection and form request states.
- public/assets/ — three supplied photographs/flyer and lettermark favicon.
- public/robots.txt, public/sitemap.xml — production indexing for tonioellison.com.
- scripts/build.mjs — zero-dependency production build.

## Formspree
Endpoint: https://formspree.io/f/xwlpzole. Uses POST, JSON Accept header, HTML validation, loading/success/error states and `_gotcha` spam honeypot. No private keys are required. The form also supports regular POST without JavaScript.

On September 30, the existing workflow notified aellison2920@gmail.com. Added releasewithtonio@gmail.com as a linked email; verification is pending. After verification, select that address under Inquiry Form → Workflow → Email → Settings. Verify inbox delivery with a clearly labeled test inquiry.

## MailerLite
The supplied logged-in dashboard currently fails to render (axios is not defined). Signup remains disabled with an honest notice. Create/select “Tonio Website Community,” create an embedded form with first name and email, then replace the newsletter form with the approved MailerLite embed and test confirmation/group membership. Never paste private API credentials into frontend code. The current generic newsletterEndpoint setting is for a secure JSON adapter only, not a MailerLite API key or arbitrary embed action.

## Cloudflare Pages
Connect GitHub repository lauraxtina05-star/tonio-ellison. Production branch: main. Framework: None. Build command: npm run build. Output directory: dist. Root directory: repository root. No environment variables or secrets are required.

The existing account requires GitHub identity verification/installation access before the Git-connected Pages setup can continue. Grant only this repository. After deployment, open Pages → Custom domains → Set up a custom domain → tonioellison.com. Review DNS changes and preserve unrelated records. Do not point the domain at the older private Sites preview.

## Content maintenance
The supplied September 24, 2026 gathering is now historical, so it is labeled “Featured gathering,” not “next.” Update date/time centrally in content.js when a new event is confirmed. Tonio is the recurring host/emcee; no ownership claims are made. No invented endorsements or clinical credentials. Empty communityHighlights/experience collections are hidden until verified material is supplied. Add the ONYX Creatrix URL to creatorUrl when confirmed.

## Phase two
Complete MailerLite and notification routing; add approved media/partnerships, analytics with appropriate consent, a downloadable speaker bio, and event updates.
