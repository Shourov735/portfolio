# Md. Shourov Portfolio

A modern, content-driven developer portfolio built with plain HTML, CSS, and vanilla JavaScript. The frontend is still static and GitHub Pages friendly, while the contact form can use a Vercel serverless function when deployed on Vercel.

## Features

- Responsive portfolio layout for mobile, tablet, and desktop
- Dark/light theme with `localStorage`
- JSON-driven projects, notes, stats, skills, timeline, education, achievements, and testimonials
- Project search and category filters
- Learning notes/blog placeholder section
- Now learning/currently working section
- Featured project spotlight
- Downloadable resume draft
- Scroll reveal animations with reduced-motion support
- SEO, Open Graph, favicon, and preview metadata
- Contact form with Vercel API endpoint and GitHub Pages mail fallback

## Project Structure

```text
.
├── api/contact.js                  # Vercel serverless contact endpoint
├── assets/images/                  # Profile and project images
├── assets/resume/                  # Downloadable resume draft
├── data/content.json               # Main portfolio content source
├── index.html                      # Static page shell
├── script.js                       # Rendering and interactions
├── style.css                       # Responsive design system
└── package.json                    # Local preview scripts
```

## Run Locally

Use a local server so `fetch("data/content.json")` works correctly:

```bash
npm start
```

Then open:

```text
http://localhost:5173
```

If you do not want to use npm, run:

```bash
python3 -m http.server 5173
```

## Update Content

Most portfolio content lives in `data/content.json`.

Edit that file to update:

- Projects and project tags
- Featured project
- Blog/notes placeholders
- Skills and levels
- Stats
- Now learning items
- Timeline
- Education
- Achievements
- Testimonials

Replace `assets/resume/Md-Shourov-Resume.txt` with a PDF later if you want a polished resume. If you rename it, update the two resume links in `index.html`.

## Contact Form

The frontend first tries to submit to:

```text
/api/contact
```

On GitHub Pages, that endpoint does not exist, so the form opens a prepared email using `mailto:`.

On Vercel, `api/contact.js` can forward submissions to a Discord webhook or a general JSON webhook. Set this environment variable in Vercel:

```text
CONTACT_WEBHOOK_URL=https://your-webhook-url.example
```

For Discord, create a private channel, open Channel Settings > Integrations > Webhooks, create a webhook, then paste the copied Discord webhook URL as the value. Keep that URL private because anyone with it can post to the channel.

Good simple webhook options include a Discord webhook, Make/Zapier webhook, or a small Google Apps Script endpoint.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open repository Settings.
3. Go to Pages.
4. Set Source to `Deploy from a branch`.
5. Choose your main branch and root folder.
6. Save.

GitHub Pages will serve the static frontend. The contact form will use the email fallback.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Keep the default static project settings.
3. Add `CONTACT_WEBHOOK_URL` in Project Settings > Environment Variables.
4. Deploy.

Vercel will serve the static frontend and the `/api/contact` serverless endpoint together.

## Future Improvements

- Replace the text resume with a designed PDF.
- Add real blog post pages using Markdown.
- Connect GitHub or Codeforces stats through a small scheduled API.
- Add a real testimonials/recommendations section after collecting feedback.
- Add analytics with a privacy-friendly tool such as Plausible.
