# Be Craftee

A handmade-crochet shop-and-journal site for **Be Craftee**, built with plain
HTML, CSS and JavaScript — no frameworks, no build step, no backend required.
Made for the SEIT2270 (Web Application Development) final submission.

## What's inside

```
be-craftee/
├── index.html         Home — pinboard hero, featured makes, journal preview
├── shop.html           Full make/product grid
├── blog.html            Journal listing with search + category filter
├── post.html             Single journal entry (reads ?slug=... from data.js)
├── about.html             Maker's story
├── contact.html            Contact form (opens the visitor's email app)
├── 404.html                 Custom not-found page
├── css/style.css              All styles: tokens, layout, dark mode, motion
├── js/data.js                   Products + journal posts — edit content here
├── js/app.js                      Rendering, search/filter, theme, forms
└── assets/images/                  Logo + product photos you provided
```

Everything on the site — the "Fresh off the hook" grid, the full shop page,
and every journal entry — is rendered from the two arrays in `js/data.js`.
To add a new make or write a new journal entry, add an object to `PRODUCTS`
or `POSTS` in that file; no HTML needs to change.

## Running it locally

No install and no build step. Two options:

1. **Just open it.** Double-click `index.html`. Everything works except that
   some browsers restrict local `fetch`/module loading — this site doesn't
   use `fetch`, so this should work everywhere.
2. **Or serve it** (closer to how it'll behave live), e.g. with VS Code's
   "Live Server" extension, or `python3 -m http.server` from this folder.

## Publishing to GitHub Pages (for your submission)

1. Create a new repository on GitHub **using your personal email account**
   (per the submission note).
2. Push this folder's contents to the repository root:
   ```
   git init
   git add .
   git commit -m "Be Craftee — initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**, set **Source** to the `main`
   branch and `/ (root)` folder, then save.
4. Your live link will be `https://<your-username>.github.io/<repo-name>/`
   after a minute or two — that's the link to submit alongside the repo.

## Before you submit — a few placeholders to swap

- **Email address**: `hello@becraftee.example` appears in `contact.html`,
  `index.html`, and the footer of every page — search-and-replace it with
  your real address.
- **Instagram link**: every `href="https://instagram.com/"` is a
  placeholder — replace with your actual profile URL.
- **Newsletter signup**: the "Join the yarn club" form currently only shows
  a confirmation message — it isn't connected to a real mailing list. To
  make it live, sign up for a free tier of something like Mailchimp or
  Formspree and swap the form's behaviour in `initNewsletterForm()` inside
  `js/app.js` for a real submission to that service.
- **More products/photos**: add more entries to `PRODUCTS` in `js/data.js`
  and drop the matching images into `assets/images/`.

## Notes on the build

- **Theme**: light by default, with a dark "cozy" mode toggle (saved to
  `localStorage`, respects the visitor's OS preference on first visit).
- **Accessibility**: semantic landmarks, a skip link, visible focus states,
  and `prefers-reduced-motion` is respected (the hero's pin-drop animation
  is skipped for anyone who has that setting on).
- **No dependencies**: two Google Fonts (`Caveat` for headings, `Nunito`
  for body text) are the only external requests the site makes.
