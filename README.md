# BeeMoji — The Hive Game 🐝
One codebase, three doors: **web (beemoji.app) · iOS app · Supabase backend**

## 1) Go live on GitHub Pages (one time, ~5 min)
1. Create repo `beemoji` on github.com → upload these files (or `git push`).
2. Repo **Settings → Pages** → Source: `main` branch, `/ (root)` → Save.
3. **Custom domain**: it reads the `CNAME` file (beemoji.app) automatically.
4. At your domain registrar add DNS:
   - 4 × **A records** @ → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** `www` → `<your-github-username>.github.io`
5. Back in Settings → Pages: check **Enforce HTTPS** once the cert appears
   (.app domains REQUIRE https — the site will not load before the padlock).

## 2) Ship an update
Replace `index.html`, commit, push. Live in ~60 seconds. From Claude Code:
`git add index.html && git commit -m "v17.44" && git push`

## 3) Turn on real ad revenue
1. Apply for **AdSense → H5 Games Ads** (google.com/adsense, then the H5 beta form).
2. On approval, in `index.html`: set `ADS_CLIENT="ca-pub-XXXX"` and add the
   adsbygoogle `<script>` tag (template is in the head comment).
3. The Courier Bee then serves REAL rewarded video; with no fill or no client id
   it falls back to the built-in simulator, so the game never breaks.

## 4) Database (Supabase) — from the v18 scaffold
Run the scaffold's SQL migrations + deploy its edge functions, then point
`api.js` at your project URL. Same repo, `/supabase` folder when wired.

## 5) iOS App (Capacitor → TestFlight)
`npm i @capacitor/core @capacitor/cli @capacitor/ios`
`npx cap init && npx cap add ios && npx cap open ios` → Archive → TestFlight.
Same index.html ships inside the app — players choose web or App Store.
