# Civix Greece — landing page

Static showcase site for [Civix](https://github.com/Kosto679/civix-monorepo): Greek legislation summaries in plain language.

## Live site

After GitHub Pages is enabled, the site is published at:

**https://kosto679.github.io/Kosto679.github.io-civix/**

## GitHub Pages setup

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Choose branch **`main`**, folder **`/ (root)`**, then **Save**.

Changes pushed to `main` are usually live within a minute or two.

## Local preview

```bash
python -m http.server 8765
```

Open http://localhost:8765

## Refresh app screenshots

With the Expo app running at `http://127.0.0.1:8081` and Playwright installed locally:

```bash
npm install playwright
node scripts/capture-screenshots.mjs <bill-uuid>
```

Commit updated files under `assets/screenshots/`.
