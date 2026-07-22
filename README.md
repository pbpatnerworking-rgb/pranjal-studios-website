# PRANJAL STUDIOS - Developer Website

Official developer website for **PRANJAL STUDIOS** (Developer: **Pranjal Tiwari**), built exclusively with **HTML5, Vanilla CSS3, and Vanilla JavaScript**.

This website is designed for ultra-fast load speeds, high Lighthouse performance scores, mobile-first responsiveness, and full compatibility with **Google Play Console**, **Google Search Console**, and **Cloudflare Pages**.

---

## Developer Information

- **Studio Name**: PRANJAL STUDIOS
- **Lead Developer**: Pranjal Tiwari
- **Support Email**: [stdhelp.support@gmail.com](mailto:stdhelp.support@gmail.com)
- **Website Purpose**: Official developer portfolio & showcase for Android Applications and Games.

---

## File Structure

```text
pranjal-studios-website/
├── index.html                  # Premium Hero, Featured Apps/Games, Stats, CTA, Footer
├── apps.html                   # Android Apps Showcase with filter & search
├── games.html                  # Android Games Showcase with feature highlights
├── about.html                  # Developer Story (Pranjal Tiwari) & Tech Stack
├── support.html                # Support Desk, FAQ accordion, Bug Report & Feature Request forms
├── privacy-policy.html         # Google Play Console compliant Privacy Policy (COPPA compliant)
├── terms.html                  # Professional Terms & Conditions
├── contact.html                # Contact Form & Studio details
├── 404.html                    # Custom Glassmorphic 404 Error Page
├── style.css                   # Glassmorphism UI Design System & CSS Variables
├── script.js                   # Dark/Light theme toggle, mobile drawer, search & filter logic
├── robots.txt                  # Search engine crawler directives
├── sitemap.xml                 # XML sitemap for Search Engine Indexing
├── google-site-verification.html # Google Search Console HTML verification file placeholder
├── assets/                     # Custom vector icons & brand graphics
│   └── icons/
│       ├── logo.svg
│       ├── kids-learning.svg
│       ├── stdhelp-study.svg
│       ├── dimag-quiz.svg
│       ├── policy-connect.svg
│       ├── scanmaster-ai.svg
│       ├── bubble-galaxy.svg
│       └── coloring-games.svg
└── README.md                   # Cloudflare Pages deployment guide & documentation
```

---

## Applications & Games Included

### Featured Android Apps
1. **Kids Learning Games** - Early education app with ABC phonics, numbers, and shapes (COPPA Compliant).
2. **STDHELP Smart Study** - Comprehensive study notes, exam revision tracker, and practice quizzes.
3. **Dimag Ka Dahi Quiz** - Brain-teasing trivia, riddles, and competitive general knowledge challenges.
4. **Policy Connect Pro** - Professional document management and policy update utility.
5. **ScanMaster AI** - AI-powered document scanner with OCR text recognition and PDF generator.

### Featured Android Games
1. **Bubble Galaxy Legends** - Cosmic space arcade bubble shooter with 500+ stages.
2. **Coloring Games: Color & Paint** - Creative digital art canvas with neon brushes and relaxing coloring pages.

---

## Cloudflare Pages Deployment Guide

This project contains zero external build step dependencies and is 100% production-ready for Cloudflare Pages.

### Option A: Direct Folder Upload (Easiest)
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
3. Set your project name as `pranjal-studios` (or your custom domain).
4. Drag and drop the entire contents of this directory into the upload area.
5. Click **Deploy Site**.

### Option B: Git Integration (Automatic CI/CD)
1. Push this directory to your GitHub or GitLab repository.
2. In Cloudflare Pages, select **Connect to Git**.
3. Choose the repository and set the **Build output directory** to `/`.
4. Click **Save and Deploy**.

---

## Google Search Console Setup

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your domain (e.g., `pranjalstudios.com`).
3. Choose **HTML verification file** and replace `google-site-verification.html` with your downloaded file name OR update the meta tag in `index.html`:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_TOKEN" />
   ```
4. Submit your sitemap URL: `https://pranjalstudios.com/sitemap.xml`.

---

## Copyright & License

&copy; 2026 **PRANJAL STUDIOS**. All Rights Reserved.  
Developer: **Pranjal Tiwari**  
Support: [stdhelp.support@gmail.com](mailto:stdhelp.support@gmail.com)
