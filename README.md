# BlogSpace — Modern Responsive Blog Application

A complete, modern, responsive Blog Application built from scratch using **HTML5, CSS3, and Vanilla JavaScript**. Designed with a minimalist, premium user experience, this project demonstrates real-world frontend architecture, client-side data persistence with `localStorage`, form validation, responsive layouts, and interactive content authoring.

---

## 🌟 Key Features

### 1. Home Page (`index.html`)
- **Modern Hero Section**: Editorial typography, compelling call-to-actions ("Explore Blogs" & "Start Writing"), live counters, and featured article spotlight.
- **Dynamic Post Explorer**:
  - Real-time search by article title, excerpt, tags, or author without reloading.
  - Category pill filters (All, Technology, Programming, Artificial Intelligence, Productivity, Lifestyle, Education).
  - Multi-criteria sorting (Newest, Oldest, Most Viewed, Most Liked).
- **Rich Sample Content**: Pre-loaded with realistic, high-quality articles across multiple genres with high-resolution imagery and fallback support.
- **Interactive Newsletter**: Client-side validated subscription form with instant feedback toast notifications.
- **Responsive Navigation**: Adaptive mobile drawer navigation, sticky glassmorphic header, and dynamic authentication status.

### 2. Authentication System (`login.html` & `register.html`)
- **Clean Auth Cards**: Centered, elevated card designs with clear focus states.
- **Real-Time Validation**: Email regex format checking, password minimum length verification, matching password confirmation, and terms acceptance.
- **Interactive Password Controls**: Password show/hide toggle buttons and live password strength indicator.
- **Demonstration Session Management**: Seamless local authentication flow with a built-in "Auto-fill Demo Credentials" button for instant testing (`alex@blogspace.io` / `alex123`).
- **Protected Routing**: Automatic redirection for unauthenticated visitors attempting to access the author dashboard or blog editor.

### 3. Author Dashboard (`dashboard.html`)
- **Author Overview**: Displaying user profile avatar, name, and email.
- **Dynamic Performance Metrics**: Real-time calculated counters for **Total Blogs**, **Published Articles**, **Draft Articles**, and **Total Views**.
- **Article Management Table**:
  - Filter posts by publication status (**All**, **Published**, **Drafts**).
  - In-dashboard real-time search and category filtering.
  - One-click draft publishing.
  - Direct links to read, edit, or delete articles.
- **Safe Deletion**: Custom modal dialog with confirmation safeguard before removing articles from storage.

### 4. Rich Blog Editor (`create-blog.html`)
- **Formatting Toolbar**: Semantic text formatting including **Bold**, *Italic*, Strikethrough, Heading 2, Heading 3, Bullet Lists, Numbered Lists, Blockquotes, and Hyperlink insertion.
- **Real-Time Live Preview**: One-click toggle between writing mode and a full preview of the article.
- **Thumbnail Image Picker**: Preset royalty-free Unsplash photography buttons (Tech, Code, AI, Productivity, Nature, Education) plus custom image URL support with a live thumbnail preview box.
- **Interactive Tag Input**: Dynamic chip tags that can be added via `Enter` or commas and dismissed with a click.
- **Draft & Publish Workflows**: Save incomplete work as drafts or publish instantly to the homepage feed.
- **Full Editing Support**: Supports editing existing articles via the URL parameter `create-blog.html?id=...`.

### 5. Dedicated Article Reading View (`post.html`)
- **Reading Progress Bar**: Dynamic top progress bar indicating how far the reader has scrolled.
- **Author Metadata**: Publication date, calculated reading time, and view counter.
- **Interactive Engagement**:
  - Like button with persistent like state and counter.
  - Social sharing links for Twitter/X, LinkedIn, and one-click "Copy URL to Clipboard".
- **Reader Comments Section**: Interactive comment form allowing readers to submit thoughts that persist locally.
- **Related Articles**: Contextual suggestions for further reading.

---

## 📁 Project Structure

```
Codomax-internship-Task-1/
│
├── index.html              # Homepage with hero, search, category filters, and blog grid
├── login.html              # Demo login page with validation and auto-fill helper
├── register.html           # Registration page with password strength meter
├── dashboard.html          # Author dashboard with metrics and post management
├── create-blog.html        # Rich-text blog editor with live preview and preset images
├── post.html               # Dedicated reading view with likes, comments, and share tools
│
├── css/
│   └── style.css           # Complete design system, CSS variables, and responsive layout
│
├── js/
│   ├── data.js             # Seed data, localStorage manager, CRUD helpers, XSS sanitizer
│   ├── auth.js             # Demo authentication, session guard, password toggles
│   ├── blog.js             # Blog rendering engine, card generation, and filter logic
│   ├── dashboard.js        # Dashboard state, metrics computation, and delete modals
│   └── main.js             # Global navbar, mobile drawer, search input, and newsletter
│
├── assets/
│   └── images/
│       └── placeholder.svg # Fallback SVG image asset
│
└── README.md               # Project documentation and learning guide
```

---

## 🚀 How to Run Locally

Because this application is built entirely with pure client-side **HTML5, CSS3, and Vanilla JavaScript**, no build steps, bundlers, or package installations are required!

### Option 1: VS Code Live Server (Recommended)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*) if you haven't already.
3. Right-click `index.html` in the file explorer and select **"Open with Live Server"**.
4. The application will launch in your default browser at `http://127.0.0.1:5500/index.html`.

### Option 2: Python Simple HTTP Server
If you have Python installed, open your terminal in the project directory and run:
```bash
# Python 3
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Option 3: Direct Browser File Access
You can also directly double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari. All features (localStorage, navigation, and styling) work directly!

---

## 🔑 Demo Credentials

To test the authenticated experience immediately:
- **Email:** `alex@blogspace.io`
- **Password:** `alex123`
*(Or click the green **"Auto-fill"** link on the login page!)*

You can also register any new test account on `register.html`.

---

## 💡 Important Frontend Concepts Used

### 1. Semantic HTML5
- Utilized `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` elements for clean document hierarchy and accessibility.
- Implemented accessible form controls with explicit `<label for="...">` associations and `aria-*` tags for screen readers.

### 2. CSS3 Design System & Responsive Layouts
- **CSS Custom Properties (Variables)**: Centralized design tokens for colors, shadows, border-radii, transitions, and typography.
- **CSS Grid & Flexbox**: Created responsive multi-column layouts that gracefully adapt from 375px mobile screens to 1440px+ ultra-wide desktops.
- **Modern Aesthetics**: Utilized gentle gradients, glassmorphism (`backdrop-filter`), micro-animations on hover, and custom badge color variants for each article category.
- **Mobile First Media Queries**: Smooth drawer menu transformation on screens below 768px.

### 3. Vanilla JavaScript Architecture
- **Revealing Module Pattern**: Organized code into focused namespaces (`Auth`, `Blog`, `STORAGE_KEYS`) to keep global scope clean and prevent naming collisions.
- **Client-Side Data Layer**: Implemented structured data persistence using `localStorage.setItem` and `localStorage.getItem` with defensive `try...catch` error handling.
- **DOM Manipulation & Event Delegation**: Dynamic rendering of cards, table rows, and comment bubbles using native DOM APIs and modern array methods (`map`, `filter`, `reduce`, `find`).
- **Security & XSS Mitigation**: Created an HTML sanitizer (`sanitizeHTML`) to ensure user-inputted strings are escaped before rendering in the document.

---

## 🛡️ Note on Client-Side vs. Production Authentication

> [!NOTE]
> **Educational Disclaimer**: This application uses browser `localStorage` to demonstrate the user flow of registration, login, and authorization. 
> In a production environment:
> 1. Passwords must never be stored in plain text or client-side storage; they must be hashed using a cryptographic algorithm like **bcrypt** or **Argon2** on a backend server.
> 2. Authentication tokens (e.g., JWT) should be stored in secure, **HTTP-only cookies** to prevent XSS exfiltration.
> 3. Database operations, authorization checks, and data validation must be enforced on a secure backend API.

---

## 📋 Verification Checklist

- [x] Homepage with hero, statistics, featured card, and responsive blog grid
- [x] Search by keyword across titles, summaries, tags, and authors
- [x] Category filtering with responsive category pills
- [x] Multi-option sorting (Newest, Oldest, Views, Likes)
- [x] Functional Login page with validation and password toggle
- [x] Functional Registration page with strength meter and matching checks
- [x] Author Dashboard with dynamic metric cards (Total, Published, Drafts, Views)
- [x] Blog management table with edit, delete (with modal), preview, and quick publish
- [x] Blog creation and editing page with rich formatting toolbar
- [x] Preset royalty-free thumbnail selectors and custom image preview
- [x] Interactive tag management with chip pills
- [x] Dedicated reading page (`post.html`) with progress bar, likes, and comments
- [x] Tested across mobile and desktop viewport widths
