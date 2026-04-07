# Negotiable Instruments Study Game
**Business Law · Chapter 13 · Business 201**

A self-contained, zero-dependency HTML/CSS/JS study game covering negotiable instruments terms, concepts, and question bank scenarios. Designed for community college students.

---

## Game Modes

| Mode | Description | Content |
|---|---|---|
| **Flashcards** | Click to flip; filter by category; mark known | 39 terms across 6 categories |
| **Match** | Match 8 random terms to definitions; timed | Randomized from the full deck |
| **Quiz** | 20 multiple-choice questions with instant feedback | Shuffled; review missed items |
| **Scenario** | 12 QB-style fact patterns with answer explanations | Aligned to QB items |

---

## How to Put This in Canvas

### Option A — External URL (simplest, no GitHub needed)

1. In Canvas, go to your Module and click **+ Add Item**
2. Select **External URL**
3. Paste the live URL: `https://www.perplexity.ai/computer/a/ni-study-game-business-law-cha-XslwazxzQXOpnOSaNPP8Nw`
4. Check **Load in a new tab** → Save
5. Students click the link and the game opens in their browser

### Option B — Embed in a Canvas Page (iFrame)

1. Create a new Canvas Page
2. Click the **HTML Editor** (`<>`) button in the toolbar
3. Paste this code:

```html
<iframe
  src="https://www.perplexity.ai/computer/a/ni-study-game-business-law-cha-XslwazxzQXOpnOSaNPP8Nw"
  width="100%"
  height="700"
  style="border:none; border-radius:8px;"
  title="Negotiable Instruments Study Game"
  allow="fullscreen">
</iframe>
```

4. Save the page — the game will be embedded directly in Canvas.

> **Note:** Some Canvas instances restrict iFrames from external domains. If the embed is blocked, use Option A (External URL) instead.

### Option C — GitHub Pages (self-hosted, permanent)

1. Create a free account at [github.com](https://github.com)
2. Click **New Repository** → name it `ni-study-game` → set it to **Public**
3. Upload all four files from this folder:
   - `index.html`
   - `style.css`
   - `app.js`
   - `data.js`
4. Go to **Settings → Pages**
5. Under "Branch," select `main` → folder `/root` → click **Save**
6. GitHub will give you a URL like `https://yourusername.github.io/ni-study-game/`
7. Use that URL in Option A or Option B above

GitHub Pages is free and permanent — your URL will not expire.

---

## File Structure

```
negotiable-instruments-game/
├── index.html   ← page structure and layout
├── style.css    ← design tokens, dark mode, all component styles
├── data.js      ← all 39 flashcard terms + 20 quiz questions + 12 scenarios
└── app.js       ← game logic for all 4 modes
```

To add or edit terms: open `data.js` and follow the existing structure.  
To add quiz questions: add an object to the `QUIZ_QUESTIONS` array.  
To add scenarios: add an object to the `SCENARIOS` array.

---

## Content Coverage

| Category | Cards | QB Alignment |
|---|---|---|
| Parties & Roles | 8 | QB 64–68, 72 |
| Formation Requirements | 10 | QB 1, 3–16, 36–48 |
| Transfer & Indorsements | 7 | QB 17–22, 49–54 |
| Holder in Due Course | 4 | QB 23–26, 55–63 |
| Liability | 4 | QB 27, 31–33 |
| Defenses | 6 | QB 34–35, 69–71 |
