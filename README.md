# 💌 Nos Casamos — Wedding Invitation Template

A modern and mobile-friendly **digital wedding invitation** built with **React + Vite**.  
This template lets you customize names, date, venue, RSVP, Add-to-Calendar button, music, and photos.

---

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open localhost.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## 🧩 Customization

### Names and Date
Edit your hero component (in `src/hero/`):
```jsx
<h1>Flor</h1>
<span>&</span>
<h1>Nico</h1>
<p>November 20, 2025</p>
```

### RSVP Button
Update the link inside `src/Confirmation/`:
```jsx
<a
  href="https://forms.gle/your-google-form"
  target="_blank"
  rel="noopener noreferrer"
>
  RSVP
</a>
```

### Add to Calendar
Option A — Use the `public/events.ics` file:
```jsx
<a href="/events.ics" download>
  Add to Calendar
</a>
```

Option B — Google Calendar template:
```jsx
<a
  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Flor+%26+Nico+Wedding&dates=20251120T210000Z/20251121T030000Z&details=Join+us!&location=Your+Venue"
  target="_blank"
  rel="noopener noreferrer"
>
  Add to Google Calendar
</a>
```

### Background Images
Add images in `public/img/` and reference them:
```jsx
<img src="/img/4.jpg" alt="Couple" />
```

### Music (optional)
Put an `.mp3` file in `public/audio/` and add:
```jsx
<audio controls autoPlay loop>
  <source src="/audio/song.mp3" type="audio/mpeg" />
</audio>
```

---

## 📂 Key Folders
- `public/img/` → photos for hero or gallery  
- `public/audio/` → background music  
- `public/events.ics` → calendar invite file  
- `src/hero/` → landing section with couple’s names & date  
- `src/Confirmation/` → RSVP + Add-to-Calendar buttons  
- `src/story/` → optional story/gallery  

---

## ✅ To-Do Before Launch
- [ ] Update names, date, and venue.  
- [ ] Replace hero/galleries with your own images (`/public/img/`).  
- [ ] Add your RSVP form link.  
- [ ] Configure calendar button (Google or .ics).  
- [ ] Test on mobile + desktop.  
- [ ] Deploy to Vercel or Netlify.  

---

## 🚢 Deployment
**Vercel**:  
- Connect repo to Vercel → Framework: Vite  
- Build command: `npm run build`  
- Output dir: `dist`

**Netlify**:  
- New site → import repo → build: `npm run build`  
- Publish dir: `dist`

---

## 📝 License
Feel free to use, adapt, and share for your own events. ❤️
