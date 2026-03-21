# Lyra AI — Frontend

## Changelog

### v0.1.0 — Auth Pages (Login & Signup) --  16/03/2026

**What changed:**
- Scaffolded the project folder structure: `styles/`, `components/common/`, `components/layout/`, `features/auth/`, `pages/`
- Installed `react-router-dom` and `react-icons`
- Added Google Fonts (Inter) and Material Symbols to `index.html`

**Global Styles (`src/styles/`):**
- `_variables.scss` — Design tokens (colors, glass properties, spacing, breakpoints)
- `_mixins.scss` — Reusable SCSS mixins (glass-card, glass-input, glow effects, responsive breakpoints)
- `_global.scss` — Base reset, dark gradient background, typography, scrollbar, selection
- `index.scss` — Entry file that imports all partials

**Common Components (`src/components/common/`):**
- `GlassInput` — Input field with leading icon, label, password visibility toggle, glass styling
- `GlassButton` — CTA button with primary (gradient blue) and outline (glass) variants
- `SocialButton` — OAuth button for Google/GitHub/Apple with glass card styling
- `Divider` — Horizontal divider with centered text and gradient fading lines

**Auth Features (`src/features/auth/`):**
- `LoginForm` — Glass card with social logins, email/password inputs, forgot password link, Sign In button
- `SignupForm` — Glass card with name fields, email/password, terms checkbox, Create Account button, social logins
- `AuthHero` — Hero section with animated floating orbs, BETA ACCESS badge, gradient tagline, glass feature cards

**Layout (`src/components/layout/`):**
- `AuthNavbar` — Frosted glass navbar with logo, nav links, and dynamic CTA button

**Pages (`src/pages/`):**
- `LoginPage` — Split layout: AuthHero (left) + LoginForm (right) + footer
- `SignupPage` — Split layout: AuthHero (left) + SignupForm (right) + footer

**Routing (`src/app/App.jsx`):**
- `/login` → LoginPage
- `/signup` → SignupPage
- `*` → Redirects to `/signup`

**Design:**
**Responsive Improvements:**
- Modernized layout from fixed pixel dimensions to fluid maximums (`max-width: 480px`).
- Implemented automatic stacking for name input fields on mobile screens.
- Optimized padding across all auth components for better small-screen fit.
- Verified visual fidelity on mobile devices (tested at 412px viewport).
- **Architecture & Performance:**
  - Reorganized `features/auth` with a nested `components/` structure for better scalability.
  - Centralized API logic using a global Axios instance in `services/api.js`.
  - Enhanced `auth.slice.js` with `createAsyncThunk` for robust asynchronous state management.
- Responsive (hero hides on mobile, forms center)
- Animated floating orbs, hover effects, micro-animations

### v0.2.0 — Hook Integration & State Management -- 17/03/2026

**Authentication Connectivity:**
- **`useAuth` Hook**: Created a centralized hook to manage authentication logic (Login, Signup, GetMe).
- **Redux Integration**: Connected the hook to the `auth` slice using `useSelector` and `useDispatch`.
- **Form Linking**: Updated `LoginForm` and `SignupForm` to use the hook, removing inline console logs for real API connectivity.

**Handling & Feedback:**
- **Enhanced Validation Errors**: Updated Axios interceptors to extract specific validation messages from the backend's `errors` array for better user feedback.
- **Loading States**: Buttons now provide real-time feedback (e.g., "Signing In...") using the global loading state.
- **Destructuring**: Refactored component and hook logic to use modern ES6+ destructuring for cleaner, more readable code.
- **Status Tokens**: Added `$error`, `$success`, and `$warning` color variables to the design system for consistent UI messaging.

### v0.3.0 — Responsive Homepage & Liquid Glass UI -- 18/03/2026

**Responsive Layout Architecture:**
- **`HomePage`**: Assembled a complete, responsive landing page that adapts between Desktop and Mobile views.
- **`Sidebar` (Desktop)**: Left-aligned navigation with a "Pro Plan" glassmorphism upgrade card and interactive menu items.
- **`MobileLayout` & `BottomNav`**: Implemented a mobile-first navigation strategy featuring a persistent bottom bar with a central Floating Action Button (FAB).
- **`Navbar`**: Dedicated desktop header for high-level site navigation (Models, Pricing, Docs).

**Design System & Aesthetics:**
- **Liquid Glass Effect**: Upgraded the design tokens in `_variables.scss` to include multi-layered backdrop filters, specular highlights, and saturation enhancements for a premium "liquid" look.
- **`Hero` Section**: Interactive search bar with heavy glass blur (50px) and gradient highlights.
- **`AIModelCards`**: Grid-based display for core AI tools featuring hover-triggered glows and smooth transitions.

**Content & Assets:**
- **Generated AI Assets**: Created and integrated high-fidelity custom images for "Deep Research", "Code Assistant", and "Neural Canvas" features.
- **`Capabilities` (Mobile)**: Optimized list of AI features for small screens with interactive "chevron" exploration.
- **Global Footer**: Responsive footer with legal links and copyright information.

- Set `HomePage` as the default index route (`/`).
- Updated `App.jsx` to support the new page structure.

### v0.4.0 — Security & Architecture Optimization -- 19/03/2026

**Protected Routing & Security:**
- **`ProtectedRoute`**: Implemented a higher-order component to ensure the `HomePage` is only accessible to authorized users. Unauthorized access now triggers an automatic redirect to `/login`.
- **Loading UI**: Added a global loading state handler within `ProtectedRoute` to manage the initial authentication check seamlessly.

**Architecture & Developer Experience:**
- **Vite Path Aliases**: Configured advanced path mapping in `vite.config.js`. You can now use `@components`, `@features`, `@hooks`, `@services`, `@pages`, and `@styles` to avoid complex relative paths (e.g., `../../../../`).
- **Feature Modularity**: Refactored `src/features/auth` to group internal components (`LoginForm`, `SignupForm`, `AuthHero`) into a dedicated `components/` sub-folder, following industry best practices for feature-based architecture.
- **Import Migration**: Updated all frontend `.jsx`, `.js`, and `.scss` files to utilize the new alias system for cleaner and more maintainable code.
### v0.5.0 — Real-time Communication (Socket.io) -- 19/03/2026

**Socket Integration:**
- **`initializeSocketConnection`**: Created a centralized socket service for the frontend using `socket.io-client`.
- **`useChat` Hook**: Implemented a custom hook to manage socket initialization and lifecycle.
- **`HomePage` Connectivity**: Integrated the chat hook into the main dashboard to establish real-time connection on load.
- **Backend Sync**: Coordinated with the backend's new HTTP server and socket server instance for seamless cross-origin connectivity.

### v0.6.0 — Chat Management & Persistence -- 20/03/2026

**Thread Discovery & Control:**
- **`Sidebar` Upgrade**: Transformed the static sidebar into a dynamic thread manager. It now fetches and displays the user's real chat history from the backend.
- **Thread Switching**: Integrated the `handleGetMessages` logic to allow instant switching between active conversations.
- **New Chat Flow**: Added a dedicated "New Chat" action that resets the `currentChatId`, enabling seamless transitions to fresh research sessions.
- **Destructive Actions**: Implemented thread deletion with a built-in browser confirmation dialog for safety.

### v0.7.0 — Architectural Refactor (Clean Code) -- 20/03/2026

**Professional State Management:**
- **Redux Thunks**: Migrated all chat logic (`fetchChats`, `sendMessage`, `removeChat`) to `createAsyncThunk`. This centralizes API orchestration and state transitions.
- **Automated Lifecycle**: Extra reducers now handle `pending`, `fulfilled`, and `rejected` states automatically, removing manual loading/error boilerplate.
- **Memoized Selection**: Created a library of selectors (e.g., `selectCurrentChat`, `selectSortedChats`) to optimize re-renders and keep components "dumb" and performant.

### v0.8.0 — Mobile-First Evolution & AI Brain -- 20/03/2026

**Responsive Excellence:**
- **`MobileNav`**: Launched a bottom-docked navigation system for touch devices, providing quick access to Home, Explore, and Library.
- **Enhanced Chat UI**: Refined all chat components (Input, Messages, Header) with responsive breakpoints to ensure a premium experience on any screen size.
- **Refractive Design**: Applied "Lyra AI" branding and consistent blue glow aesthetics across the entire feature set.
### v0.9.0 — Mistral AI & Research Integration -- 21/03/2026

**AI Brain Transition:**
- **Gemini to Mistral**: Migrated the core AI engine from Google Gemini to Mistral AI for superior research synthesis and reasoning.
- **Tavily Integration**: Connected the AI agent to Tavily for real-time web research, enabling hit-accurate, cited insights directly in the chat interface.
- **Enhanced Formatting**: Improved Markdown rendering for deep-research responses, including tables, lists, and insights.
