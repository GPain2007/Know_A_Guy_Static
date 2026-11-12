# Oh..I KNOW A GUY! LLC: Lawn Service Website

This is a functioning website for **Oh..I KNOW A GUY! LLC**, a small lawn care and landscaping business serving the Austin, Texas area. The single-page site introduces the business and lists its commercial, residential and landscape services. It shows customer reviews and lets visitors request a free estimate, which is delivered straight to the owner's email.

[![CI](https://github.com/GPain2007/Know_A_Guy_Static/actions/workflows/ci.yml/badge.svg)](https://github.com/GPain2007/Know_A_Guy_Static/actions/workflows/ci.yml)

## What's on the site

| Section | What it does |
| --- | --- |
| Intro video | Short splash video on first load, with a **Skip** button. Closes on its own when the video ends, after 6 seconds at most |
| Header | Logo, business name, tap-to-call phone number, email link and a **Get a Free Estimate** button that jumps to the form |
| What We Do | Service cards for **Commercial** (maintenance, city and small-business contracts), **Residential** (mowing, leaf and debris clean-up, edging) and **Landscape** (bush trimming, flower bed renovation and installation, mulch) |
| Reviews | Two scrolling strips: one with service highlights and one with five-star customer reviews (pauses on hover) |
| Free estimate form | Name, email, phone, one-time or long-term service (weekly / bi-weekly / monthly) and project details. Submissions are emailed through [EmailJS](https://www.emailjs.com/) |

**Contact:** (737) 259-5124 · [oiknowaguy@gmail.com](mailto:oiknowaguy@gmail.com)

## Tech stack

- [React 19](https://react.dev/), bootstrapped with [Create React App](https://create-react-app.dev/) (`react-scripts` 5)
- Plain CSS per component
- [EmailJS](https://www.emailjs.com/) (`emailjs-com`) to send estimate requests without a backend
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) for tests
- GitHub Actions for CI

## Getting started

Requires **Node.js 20 or newer**.

```bash
git clone https://github.com/GPain2007/Know_A_Guy_Static.git
cd Know_A_Guy_Static
npm install
npm start          # http://localhost:3000
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Run the site locally with hot reload |
| `npm test` | Run tests in watch mode |
| `npm run test:ci` | Run all tests once (what CI runs) |
| `npm run build` | Build the production site into `build/` |

## Project structure

```
├── public/
│   ├── index.html            # Page shell, title, loading spinner
│   ├── splash.webm           # Intro video
│   └── manifest.json, favicon.ico, logo192.png, logo512.png
├── src/
│   ├── App.js                # Splash → Header → Services → Form
│   ├── Logo_2.png            # Business logo
│   ├── components/
│   │   ├── Splash/           # Intro video overlay
│   │   ├── Header/           # Logo, name, phone, email, CTA
│   │   ├── Service/          # Service cards + review carousels
│   │   │   ├── serviceData.js    # ← edit services here
│   │   │   └── carouselData.js   # ← edit highlights and reviews here
│   │   └── Form/             # Estimate form, validation, EmailJS send
│   └── __tests__/            # Jest + Testing Library tests
└── .github/workflows/ci.yml  # Tests and build on GitHub Actions
```

### Updating content

- **Services:** edit `src/components/Service/serviceData.js` (icon, title, description).
- **Reviews:** add or edit entries in `CAROUSEL_RIGHT` in `src/components/Service/carouselData.js`.
- **Phone and email:** `src/components/Header/Header.jsx`.
- **Intro video:** replace `public/splash.webm`. Add `public/splash.mp4` too for older Safari.

### Estimate form email (EmailJS)

Form submissions go to the owner's inbox through an EmailJS service and template. The service ID, template ID and public key are currently written into `src/components/Form/Form.jsx`. The template uses these fields: `name`, `email`, `phone`, `message`, `serviceType`, `Frequency` and `time`.

## Testing and CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and pull request to `main`. It also runs on a **weekly schedule (Mondays)**, so a broken dependency or an expired service shows up even when nobody is pushing code. Each run:

1. Installs dependencies (`npm install` until the lockfile is regenerated, then `npm ci`)
2. Runs all tests once (`npm run test:ci`)
3. Builds the production site and uploads it as an artifact

If the weekly run fails, the workflow opens a "Weekly CI check failed" issue so it doesn't go unnoticed.

The tests cover the header contact links, the service cards and reviews, the intro video's Skip button, and the estimate form. They check that it validates input, shows the frequency picker for long-term service, and sends the right fields to EmailJS. EmailJS is mocked in tests, so no real emails are sent.

## Deployment

`npm run build` creates a static site in `build/` that can be hosted on Netlify, Vercel, GitHub Pages or any static host. There's no backend; EmailJS handles the form.

## Roadmap

Once enough clients sign long-term contracts, the plan is to add a database for price tracking and live lawn maintenance schedules, so clients can see up-to-date service information.

## Known issues

Open problems are tracked in [GitHub Issues](https://github.com/GPain2007/Know_A_Guy_Static/issues). The most important right now:

- The estimate form shows "Message sent!" immediately, even if EmailJS fails, so a customer may think they reached you when they didn't.
- The compiled `build/` folder is committed to the repo and is out of date with the source.

## Recent changes

<!-- Maintained by the weekly review task. Newest first. -->
- **2026-11-12:** Rewrote README; replaced the default CRA test with real tests; added a GitHub Actions workflow (push, PR and weekly schedule).
