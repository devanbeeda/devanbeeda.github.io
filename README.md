# Devan's Portfolio (React + Vite)

Animated portfolio intro and home screen.

## See it right now (no install)
Double-click **PREVIEW.html**. It opens in your browser and plays the full intro and home screen (you need internet only for the Google Fonts).

After you change any code, refresh PREVIEW.html by running `npm run build:single` (it rebuilds the file in this folder).

## Run locally
```bash
npm install
npm run dev
```

## Build for publishing
```bash
npm run build
```
This creates a `dist/` folder. Upload that folder to any static host.

## Publish on GitHub Pages (free)
1. Create a **public** repository named `devanbeeda.github.io` on GitHub and upload this whole folder to it (keep the hidden `.github` folder).
2. In the repository open **Settings > Pages** and set **Source** to **GitHub Actions**.
3. The file `.github/workflows/deploy.yml` builds and publishes the site on every push. After a minute or two it is live at `https://devanbeeda.github.io/`.

## Other ways to publish
- **Netlify**: drag and drop the `dist/` folder at app.netlify.com/drop, or connect your Git repo (build command `npm run build`, publish directory `dist`).
- **Vercel**: import the repo. It detects Vite automatically.
- **GitHub Pages**: push the repo, then upload the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` package).

## Edit your content
All resume content (about, skills, projects, experience, education, certifications, contact) is in `src/data/content.js`.
Skill logos are SVG files in `src/assets/skills/`. To add one, drop in `name.svg` and use `logo: 'name'` in `content.js`.

- Text and timings: `src/data/profile.js`
- Photo: replace `src/assets/devan.webp` (transparent background cut-out, portrait). If its width/height ratio is not about 0.6185, update `--ar` in `src/styles/home.css`.
- Colours and fonts: `src/styles/global.css`
- Intro animation: `src/styles/intro.css`, home animation: `src/styles/home.css`

## Add projects later
Projects live in `src/data/content.js` under `projectGroups`. Add a project to a group, or add a whole new group
(for example `Data Analytics`). Each project has a GitHub link (`repo`) that shows a "View on GitHub" button.

## Structure
```
index.html
vite.config.js
package.json
public/favicon.svg
src/
  main.jsx            entry
  App.jsx             intro -> home sequence
  data/profile.js     your text + timings
  hooks/              useTypewriter, useParallax
  components/         Background, Scene3D (3D), Spotlight, ScrollProgress, Tilt, Intro, Home, Nav, Site, Reveal, ProjectVisual
  components/sections About, Skills, Projects, Experience, Education, Contact
  styles/             global, background, intro, home
  assets/devan.webp   your cut-out photo
```
