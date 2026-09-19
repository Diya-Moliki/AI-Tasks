# Trailmarks

A small practice-test platform for Sewa, built from the 5th grade Math, Science,
and Social Studies Year-at-a-Glance plans. Same shape as the Class Companion
assignments Sewa already uses — short-answer questions, multiple attempts,
per-question scoring and feedback — but self-hosted and content you control.

No build step, no backend. It's four files: `index.html`, `styles.css`,
`app.js`, and `questions.js` (the question bank). Progress is saved to the
browser's local storage under the key `trailmarks_state_v1`, so it lives on
whatever device/browser Sewa answers on.

## Run it locally

Just open `index.html` in a browser — everything is static.

## Launch it on GitHub Pages

1. Create a new GitHub repo (e.g. `trailmarks`) and push these four files
   (plus this README) to the root of the `main` branch.

   ```bash
   git init
   git add .
   git commit -m "Trailmarks v1"
   git branch -M main
   git remote add origin https://github.com/<your-username>/trailmarks.git
   git push -u origin main
   ```

2. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**,
   choose **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.

3. GitHub gives you a URL like
   `https://<your-username>.github.io/trailmarks/` within a minute or two.
   That's the link Sewa opens to take the practice sets.

## Adding or editing questions

Everything content-related lives in `questions.js`. Each subject has a list
of units, and each unit has a list of questions:

```js
{
  id: "m1q4",                 // unique — keep the subject/unit prefix
  prompt: "…the question text…",
  rubric: [
    {
      criteria: "…what earns the points…",
      points: 3,
      keywords: ["keyword1", "keyword2"],   // any one match = credit
      hint: "…shown if the criterion is missed, to guide a resubmit…"
    }
  ]
}
```

Scoring adds up rubric points where at least one keyword appears in the
answer (case-insensitive). It's a rough auto-grader meant for quick, private
practice — not a stand-in for a teacher's read of the work. `MAX_ATTEMPTS`
in `app.js` (currently 3) controls how many tries each question allows.

## What's loaded so far

- **Math** — Unit 1 (Place Value) and Unit 2 (Add/Subtract Whole Numbers &
  Decimals), from the 2026–27 Math YAG.
- **Science** — Unit 1 (Forces and Motion) and Unit 3 (Matter and Its
  Properties), from the 5th Grade Science YAG.
- **Social Studies** — Unit 1 (Exploration and Colonization) and Unit 2
  (American Revolution), from the 5th Grade U.S. History YAG.

Each subject's remaining units from the YAG docs can be added the same way —
just extend the `units` array for that subject in `questions.js`.

## Possible next steps

- Swap local storage for a small cloud sync (e.g. JSONBin.io) if you want
  Sewa's progress to follow across devices.
- Add a scheduled email digest of scores (e.g. via Zapier/Make.com) if you
  want a weekly summary without checking the site yourself.
