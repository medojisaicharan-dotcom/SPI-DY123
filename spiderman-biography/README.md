# SPIDER-MAN: THREE GENERATIONS

A cinematic, interactive biography website celebrating the three major live-action Spider-Men: Tobey Maguire, Andrew Garfield, and Tom Holland.

## Features

- Cinematic intro screen and animated hero section
- Dark superhero theme with red/blue accents
- Interactive Spider-Man cards and Spider-Verse selector
- Biography sections for all three actors and Peter Parker versions
- Suit evolution gallery and movie timeline
- Comparison table, villain gallery, and power cards
- Search, theme switch, sound toggle, and back-to-top button
- Responsive layout for mobile and desktop

## Files

- `index.html` – page structure
- `style.css` – visual design and animations
- `script.js` – content rendering and interactivity

## Run locally

Open `index.html` directly in a browser, or serve the folder with a simple local server:

```bash
cd spiderman-biography
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- All sound effects are generated with the Web Audio API to avoid large external audio dependencies.
- The project uses no broken external image links and keeps all content self-contained.
