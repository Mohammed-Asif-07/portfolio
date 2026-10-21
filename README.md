# Mohammed Asif — Personal Portfolio

A lightweight, responsive personal portfolio for Mohammed Asif, a B.Tech Artificial Intelligence & Data Science student at Madras Engineering College who is building web applications and exploring practical AI.

## Design

- Dark, futuristic visual language with CSS-generated orbital/3D-inspired artwork.
- Responsive layout across desktop, tablet and mobile.
- Minimal motion, no animation libraries, and support for `prefers-reduced-motion`.
- Semantic sections for selected work, about, toolkit, journey and contact.
- Accessible navigation, visible keyboard focus, and a skip-to-content link.

## Stack

- HTML
- CSS (custom responsive design system; no CSS framework)
- Vanilla JavaScript
- EmailJS Browser SDK for the contact form

## Files

- `index.html` — page structure, SEO metadata and portfolio content
- `style.css` — theme, responsive layouts, artwork and reduced-motion support
- `script.js` — mobile navigation, lightweight reveal behavior and EmailJS contact form

## Contact form

The contact form uses the existing EmailJS public configuration and template in `script.js`. Keep the EmailJS public key in mind as a client-side public key, and manage allowed origins and template settings from the EmailJS dashboard. If sending fails, the page displays the direct contact email as a fallback.

## SEO and domain

The page preserves the Google site-verification meta tag and canonical URL for [mohammedaasif.in](https://mohammedaasif.in/). The design branch does not change DNS, hosting configuration, the production domain, or deployment settings.

## Local preview

Open `index.html` directly in a browser or use VS Code Live Server. The EmailJS contact form requires internet access to load the EmailJS Browser SDK.

## Project focus

This is a personal portfolio first. ZNova appears only as supporting co-founder experience. Project descriptions are intentionally concise and should be updated as each project becomes public and its features are verified.
