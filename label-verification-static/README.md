# Alcohol Label Verification — Static Version (GitHub Pages)

A fully **client-side** version of the Alcohol Label Verification prototype.
Runs continuously for free on **GitHub Pages** — no server, no backend, no
hosting costs, no uptime limits.

## How it's different from the FastAPI version

| | FastAPI version | Static version (this one) |
|---|---|---|
| OCR | Tesseract (Python, server-side) | **Tesseract.js** (runs in the browser via WebAssembly) |
| Matching logic | Python (`main.py`) | Same logic, ported to JavaScript (inline in `index.html`) |
| Hosting | Requires a running server (Render/Railway/Docker) | **Static files only** — GitHub Pages, Netlify, Vercel, S3, anywhere |
| Data | Sent to a backend for processing | **Never leaves the browser** |
| Continuous uptime | Depends on free-tier server staying awake | Always on — GitHub Pages has no sleep/spin-down |

This is a single self-contained `index.html` file. There is no `main.py`, no
`requirements.txt`, no Dockerfile, and nothing to install to run it.

## File structure

```
.
├── index.html              ← the entire app (HTML + CSS + JS, OCR via Tesseract.js CDN)
├── test_label_pass.png     ← sample label (all fields match)
├── test_label_fail.png     ← sample label (3 intentional mismatches)
├── .github/
│   └── workflows/
│       └── deploy.yml      ← GitHub Actions workflow that publishes to GitHub Pages
└── README.md
```

## Deploy to GitHub Pages (continuous, free)

1. Create a new GitHub repo (or use an existing one) and push these files to
   the `main` branch:

```bash
git init
git add .
git commit -m "Static label verification app"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push to `main` (or it'll run automatically on the first push) — the
   included workflow (`.github/workflows/deploy.yml`) builds and deploys
   automatically.
5. After the workflow finishes (check the **Actions** tab), your app is live
   at:

```
https://<your-username>.github.io/<your-repo-name>/
```

It will redeploy automatically every time you push to `main` — no manual
steps needed, and no server to keep running.

## Run it locally first (optional)

Because it's just static files, you don't need Python or any install step.
Any static file server works:

```bash
# Option 1: Python's built-in server
python3 -m http.server 8000

# Option 2: Node's http-server
npx http-server -p 8000
```

Then open `http://localhost:8000`.

You can even just double-click `index.html` to open it directly in a
browser — it works without any server at all (Tesseract.js loads from a CDN).

## How to use

Same as the FastAPI version's UI:

- **Single Label tab**: upload one label image, enter expected Brand Name,
  Class/Type, Alcohol Content, and Net Contents, click **Verify Label**.
- **Batch tab**: select multiple label images + paste a JSON array of
  expected applications (matched by filename), click **Verify Batch**.

Test with `test_label_pass.png` and `test_label_fail.png` using the same
sample values described in the main project README.

## How it works

- **OCR**: [Tesseract.js](https://github.com/naptha/tesseract.js) loads a
  WebAssembly build of Tesseract OCR directly in the browser from a CDN
  (`cdn.jsdelivr.net`). The first scan downloads the OCR engine and language
  data (~a few MB), so it's slower on first use; subsequent scans are faster
  because the browser caches it.
- **Matching logic**: the same rules as the Python backend — fuzzy matching
  for brand name/class-type (handles case differences like
  `"STONE'S THROW"` vs `"Stone's Throw"`), numeric tolerance matching for ABV,
  unit-aware matching for net contents, and a strict check that the
  `"GOVERNMENT WARNING:"` header is present in ALL CAPS with the required
  wording.
- **No backend**: everything — image upload, OCR, and field comparison —
  happens in the user's browser. Nothing is uploaded or transmitted anywhere.

## Limitations of the static version

- **First-run delay**: loading the Tesseract.js engine and English language
  data takes a few seconds on the first scan (cached afterward).
- **Client device performance**: OCR speed depends on the user's device —
  older/low-power devices will be slower than a server doing the same work.
- **CDN dependency**: requires `cdn.jsdelivr.net` to be reachable to load
  Tesseract.js. If this needs to work fully offline or behind a firewall that
  blocks CDNs, the Tesseract.js library and `eng.traineddata` file would need
  to be bundled locally instead of loaded from the CDN.
- **No batch concurrency**: batch mode processes images one at a time
  (sequential), since Tesseract.js OCR is CPU-intensive in the browser.

## Relationship to the FastAPI prototype

This static version is a **parallel implementation** of the same matching
logic described in the main project's `README.md`, intended for free,
always-on hosting via GitHub Pages where a Python backend isn't an option.
The FastAPI version remains useful for scenarios requiring server-side
processing, integration with internal systems, or deployment behind a
firewall where CDN access is restricted.
