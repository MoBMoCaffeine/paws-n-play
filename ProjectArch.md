# Paws n' Play #

/paws-n-play
│
├── /assets                      # Static files
│   ├── /images                  # (e.g., dog-hero.jpg, shop-kibble.png)
│   ├── /icons                   # (e.g., heart.svg, cart.svg, logo.svg)
│   └── /fonts                   # Local fonts if not using Google Fonts
│
├── /css                         # Styling (Modular CSS)
│   ├── root.css                 # Global variables (Colors, Typography)
│   ├── reset.css                # Base reset (Box-sizing, Margins)
│   ├── layout.css               # Grid/Flex systems, Navbar, Footer, Drawers
│   ├── components.css           # Reusable UI (Cards, Buttons, Inputs)
│   ├── animations.css           # Keyframes (FadeIn, Slide-up)
│   └── pages.css                # Specific styles for (Shop, Vet, Dashboard)
│
├── /data                        # Your "Mock Database" (JSON files)
│   ├── products.json            # Shop item details
│   ├── vets.json                # Veterinarians details
│   └── users.json               # Mock users for login testing
│
├── /js                          # Logic (ES6 Modules)
│   ├── /auth                    # Authentication logic
│   │   ├── authService.js       # Register/Login functions
│   │   └── session.js           # Manage JWT/User session in LocalStorage
│   ├── /services                # Data management
│   │   ├── api.js               # Central fetch function for JSON files
│   │   └── storage.js           # Cart & Favorites logic (LocalStorage)
│   ├── /renderers               # Injecting JSON data into HTML
│   │   ├── shopRenderer.js      # Map products.json to Shop Grid
│   │   ├── vetRenderer.js       # Map vets.json to Vets list
│   │   └── cartRenderer.js      # Render items in Cart Table
│   ├── /ui                      # UI Interactions
│   │   ├── drawer.js            # Open/Close Favorites Drawer logic
│   │   └── theme.js             # Toggle Dark/Light mode
│   ├── /utils                   # Helper functions
│   │   ├── helpers.js           # Format currency, generate unique IDs
│   │   └── router.js            # Auth Guard (Protect pages if not logged in)
│   └── app.js                   # Main entry point (Runs on every page)
│
├── /pages                       # HTML Structure
│   ├── login-register.html      # Authentication Page
│   ├── vets.html                # All Vets View
│   ├── vet-details.html         # Single Vet View
│   ├── shop.html                # Product Grid & Sidebar Filters
│   ├── cart.html                # Shopping Cart Table
│   └── user-dashboard.html      # User Profile & Bookings
├── index.html                   # Main Landing Page
└── README.md                    # Project overview and setup instructions
