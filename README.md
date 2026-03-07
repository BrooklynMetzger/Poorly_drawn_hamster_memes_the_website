# 🐹 Hamster Picture Picker

A fun, interactive web application that lets users get random hamster meme pictures, download their favorites, and confetti! 

## ✨ Features
* **Random Hamster Generator:** Click a button to instantly load a new, amazing, brillient, shining hamster picture.
* **Image Downloading:** Easily save your favorite hamster pictures directly to your device.
* **Confetti Animations:** Interactive button clicks trigger a fun canvas-confetti animation.
* **Dynamic Social Icons:** Reusable, hover-animated social media icons injected dynamically using JavaScript to keep the HTML clean.
* **Responsive Design:** Fully responsive layout built with Tailwind CSS thats usable on  both mobile and desktop.

## 🛠️ Tech Stack
* **Frontend:** HTML5, Vanilla JavaScript
* **Styling:** Tailwind CSS (compiled to `dist/output.css`), Custom CSS (`socialsIcon.css`)
* **Libraries:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) for particle effects

## 📁 Project Structure

```text
├── css/
│   ├── assets/            # Component styles (buttons.css, socialsIcon.css, stars.css)
│   ├── fontsStyle/        # Custom typography (array.css, comico.css, zina.css)
│   ├── input.css          # Tailwind base input file
│   └── theme.css          # Theme variables/configurations
├── dist/                  # Compiled output (Tailwind CSS)
├── fonts/                 # Local font files
├── scripts/               # JavaScript logic
│   ├── downloadImage.js   # Logic for the "Download Image" feature
│   ├── getLink.js         # Link handling utilities
│   ├── getSocials.js      # Script to fetch and inject social links
│   ├── randomHamster.js   # Logic for fetching random hamsters
│   └── script.js          # Main/Global script execution
├── .gitignore             # Git ignore rules
├── gallery.html           # Secondary page for viewing all hamsters photos
├── icons.html             # Reusable HTML snippet containing SVG social icons
├── index.html             # Main application entry point
├── package.json           # Node dependencies (Tailwind, Confetti, etc.)
└── stickers.json          # JSON data for images/stickers