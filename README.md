# 🏆 EuphoriaSportz - Convertible Turf Platform

Here is the complete, finalized list of all the technologies you will be using to build your convertible multi-sport turf platform, categorized by their exact role in your architecture:

---

## 1. Frontend Framework & Core Engine

* **Next.js (App Router):** The main full-stack framework. It handles server components for fast, SEO-optimized pre-rendering of your marketing pages, handles client-side React components for your interactive sport-toggle and booking calendar, and manages your backend endpoints.
* **TypeScript:** Provides strict type safety. This is crucial for defining your multi-sport configuration objects (e.g., ensuring `football`, `cricket`, and `basketball` modes map to the correct pricing multipliers and court layouts without runtime errors).
* **Tailwind CSS:** For styling the modern, high-contrast dark theme. You will use it for smooth transitions when animating the court layout changes and creating sharp, neumorphic card UI elements.

---

## 2. Infrastructure & Hosting (The Edge)

* **Cloudflare Pages:** Where your entire Next.js application is built and hosted. It deploys your code onto Cloudflare's global CDN edge network, serving your static pages instantly with zero server management or hosting fees.
* **Cloudflare Workers:** (Handled automatically under the hood via the `@opennextjs/cloudflare` adapter). Runs your Next.js API routes at the network edge, ensuring sub-millisecond cold starts and execution speeds for your backend without an Express server.
* **Cloudflare Email Routing:** Handles your custom domain mail. It redirects professional business aliases (like `book@yourturf.com`) directly to your personal email inbox for management.

---

## 3. Database & Real-Time Sync

* **Supabase (PostgreSQL):** Your relational database. It stores tables for `turfs`, `bookings`, and `sport_modes`. Because you are running a convertible turf, Supabase will be the single source of truth—locking out a time slot for *all* sports the moment it is booked for one.
* **Supabase Row Level Security (RLS):** Built-in database security that allows your frontend to safely read real-time available time slots directly from the client without exposing admin-level write permissions.

---

## 4. Google Workspace & Automation Pipeline

* **Google Drive:** Your media storage host. Keeps your high-res turf images, highlight clips, and blueprint schematics out of your database storage limits, serving them via direct CDN URLs on your frontend.
* **Supabase Database Webhooks:** An automated database listener. The instant a new booking row is successfully inserted into Supabase, it triggers a background HTTP POST request over to your Google automation link.
* **Google Apps Script:** Your serverless JavaScript automation script. It receives the incoming database webhook payload, formats the customer information, writes it to your Google Sheet, and utilizes `MailApp` or `GmailApp` to fire receipt confirmation emails to both the client and turf manager.
* **Google Sheets:** The administrative control panel. Serves as a free, mobile-optimized database view for the turf owner to instantly see daily schedules, filter by sport mode, and track revenues on the go.

---

## 2. Core Features of the Turf Platform

* **Static Showcase Engine:** High-performance pre-rendering of turf amenities, rules, dimensions, pricing variants, and locations ensuring top Google ranking signals.
* **Dynamic Time-Slot Allocator:** A calendar interface that filters out taken slots, handles pricing rules (e.g., peak evening hours vs. cheaper morning hours), and prevents double bookings.
* **Zero-Password Booking Checkout:** Fast confirmation workflow where users book via a simple form, receiving a real-time DOM confirmation state.
* **Asynchronous Admin Syncing:** Behind-the-scenes event processing that updates the business owner's Google Sheets ledger immediately without delaying the user's booking success screen.
* **Custom Domain Routing:** Dedicated mail forwarding channels linked to your technical domain setup.

---

## 3. Project File Structure

A clean, modular structure optimized for Cloudflare compatibility:

```text
my-turf-platform/
├── app/
│   ├── layout.tsx         # Root entry: Global structural wrappers & fonts
│   ├── page.tsx           # Home Route: Static marketing & features overview
│   ├── turfs/
│   │   └── page.tsx       # Showcase Route: Media galleries & amenity listings
│   ├── book/
│   │   └── page.tsx       # Engine Route: Dynamic calendar booking client
│   └── api/
│       └── booking/
│           └── route.ts   # Edge Handler: Secure data insertion point
├── components/
│   ├── Navbar.tsx         # Persistent high-contrast navigational asset
│   ├── BookingCalendar.tsx# Dynamic interactive time-picker container
│   ├── NeumorphicCard.tsx # Reusable UI element for features & layouts
│   └── Footer.tsx         # Location metadata & contact listings
├── lib/
│   └── supabase.ts        # Client initialization file for data pipelines
└── next.config.js         # Optimization configuration layout
```

---

## 4. Visual Aesthetic & Page Breakdown

The UI features a **modern, minimalist, high-contrast dark theme**. Deep charcoal backgrounds provide contrast against high-visibility neon accents (like electric green or cyber yellow), reflecting the energy of a sports complex illuminated under stadium floodlights. Interface elements utilize sharp borders mixed with subtle, soft-shadowed neumorphic depths to make actionable elements feel physically tactile.

### Homepage (`/`)

* **Visual Layout:** A dominant hero image showing a dramatic wide-angle shot of the turf lit up at night. Minimalist typography overlays a bold call to action.
* **Content:** Smooth-scrolling sections highlighting your turf's key specs (e.g., FIFA-grade synthetic grass, 7-v-7 dimensions, parking capacity) separated by clean dividers.

### Turf Showcase (`/turfs`)

* **Visual Layout:** A grid layout made up of sleek cards. Each card features subtle inner shadows and high-contrast text tags for pricing.
* **Content:** Media galleries displaying images pulled straight from your Google Drive. Includes quick-view feature labels (such as "Rain-Proof Drainage", "LED Lighting", "Locker Rooms").

### Booking Engine (`/book`)

* **Visual Layout:** A focused, two-column interface. The left pane holds a clean calendar date-picker, while the right displays grid buttons representing available hourly intervals.
* **Content:** Fully interactive DOM elements. Available hours stand out with high-visibility neon borders, while booked hours fade back as disabled, flat-gray boxes. Clicking a slot pulls up a sleek overlay form asking for basic contact info to lock in the booking.

### Interactive Mode-Switcher & Line-Layer Visualization

The Interactive Mode-Switcher is a prominent toggle switch or dashboard control at the top of the site letting users flip between modes (e.g., `[ ⚽ Football Mode ]`, `[ 🏏 Cricket Mode ]`, or `[ 🏀 Box Hoop ]`).

* **Dynamic Line-Layer Visualization:** Clicking a mode triggers a smooth CSS transition that changes the background line guides of your venue map to show how the nets shift, boundary rings collapse, or goalposts slide into place.
* **Chassis Layer (The Ground):** Deep charcoal grey matte texture (`#121214`) representing premium shock-absorbing underlays.
* **⚽ Mode Alpha (Football):** Electric Neon Green accents (`#39FF14`). The page DOM highlights high-rebound side-walls and heavy weather-proof netting specs.
* **🏏 Mode Beta (Box Cricket):** High-visibility Cyber Yellow/Orange lines (`#FFD700`). The UI shifts focus to automated bowling machines, heavy-duty pitch turf density, and ceiling tension nets for overhead shots.

---

## 5. Updated Project File Structure (Multi-Sport Configurations)

To support multi-sport configurations cleanly without bloating your code, structure your database states inside a dedicated utility file:

```text
my-convertible-turf/
├── app/
│   ├── page.tsx            # Landing route containing the interactive chassis preview
│   └── book/
│       └── page.tsx        # Booking route where slot filters adapt to the selected sport configuration
├── components/
│   ├── SportToggle.tsx     # The primary controller asset switching global state variants
│   ├── InteractiveArena.tsx# Component rendering dynamic SVG boundary maps based on chosen mode
│   └── BlueprintCard.tsx   # Neumorphic info panels revealing mechanical specs of each configuration
└── utils/
    └── sportConfigs.ts     # Configuration tables defining layout parameters, rules, and pricing multipliers
```

---

## 6. Page Layout Architecture

### Landing Showcase (`/`)

* **The Hero Zone:** Reads a bold technical statement like: "ONE CHASSIS. INFINITE CONFIGURATIONS."
* **The Blueprint Section:** Instead of standard photo grids, you display clean, stylized mechanical schematics. Users see how a 7-v-7 football cage structurally transitions its boundary perimeters to host high-impact box cricket or basketball within seconds.

### The Booking Dashboard (`/book`)

* **Setup Selection:** The checkout process forces a configuration choice upfront: "Select Your Arena Setup".
* **State Blocking:** Once clicked, your `supabase.ts` pipeline cross-references available slots. If someone books a slot for Football at 7:00 PM, that hour is instantly locked out for Cricket and Basketball as well, since they share the same physical convertible foundation.
