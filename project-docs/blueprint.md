# 🏗️ PrepForge Master Blueprint (Naksha)

**Role:** Senior Project Architect
**Objective:** Provide a Master Prompt and comprehensive blueprint to generate the entire full-stack PrepForge application code with Supabase integration.

---

## 1. Project Overview & Context
- **Project Name:** PrepForge
- **Goals:** A robust, student-focused platform dedicated to mastering Data Structures & Algorithms (DSA) and Full-Stack development.
- **Tech Stack:** 
  - **Frontend:** React, Tailwind CSS, Vite
  - **Backend / Database / Auth:** Supabase (PostgreSQL)
  - **Icons:** `lucide-react`
  - **Routing:** `react-router-dom`

---

## 2. Detailed Feature Specifications

### 2.1 User Authentication (Login/Signup)
- **Engine:** Supabase Auth (Email/Password).
- **Flow:** Users land on `/signup` or `/login`. Upon successful authentication, the session is stored, and the user is redirected to the `/dashboard`. 
- **State Management:** A global `AuthContext` to manage the user session and protect private routes.

### 2.2 Dashboard Page
- **Profile Section:** Displays user's name/email and a welcoming greeting.
- **Progress Metrics:**
  - **Streak Tracker:** Calculates consecutive days logged in.
  - **DSA Progress Chart:** Visual representation (progress bar/circle) showing solved problems out of the total curated list.
- **Active Roadmaps:** A "Continue Learning" card showing the current roadmap step and a resume button.

### 2.3 Practice Page (DSA Hub)
- **Features:** A curated list/table of 100+ DSA questions.
- **Interactivity:** Each question features a working checkmark button.
- **Database Integration:** Clicking the checkmark toggles a record in the Supabase database. The UI instantly updates to reflect the solved status.

### 2.4 Roadmaps Page
- **Features:** Visual paths for diverse careers (e.g., Java Full Stack Developer, Frontend Dev).
- **Structure:** Clicking a roadmap opens a detailed timeline with phases, topics, and completion toggles for each sequential step.

### 2.5 Project Hub
- **Features:** A grid displaying 12 projects ranging from Beginner to Advanced.
- **Design:** Cards include tech stack tags, difficulty badges, and open a modal with specific building instructions and resource links.

---

## 3. Database Schema (Supabase PostgreSQL)

**Table 1: `users`** (Public profile data, linked to `auth.users`)
- `id` (UUID, Primary Key, references `auth.users.id`)
- `email` (TEXT, Unique)
- `full_name` (TEXT, Nullable)
- `current_streak` (INTEGER, Default: 0)
- `last_active_date` (DATE, Nullable)
- `created_at` (TIMESTAMPTZ, Default: `now()`)

**Table 2: `solved_problems`** (Tracks DSA practice)
- `id` (UUID, Primary Key, Default: `uuid_generate_v4()`)
- `user_id` (UUID, Foreign Key references `users.id`, ON DELETE CASCADE)
- `problem_slug` (TEXT) - e.g., 'two-sum', 'reverse-linked-list'
- `solved_at` (TIMESTAMPTZ, Default: `now()`)
- *Unique Constraint:* `(user_id, problem_slug)` to prevent duplicate solves.

**Table 3: `roadmap_progress`** (Tracks learning milestones)
- `id` (UUID, Primary Key, Default: `uuid_generate_v4()`)
- `user_id` (UUID, Foreign Key references `users.id`, ON DELETE CASCADE)
- `roadmap_id` (TEXT)
- `step_id` (TEXT)
- `completed_at` (TIMESTAMPTZ, Default: `now()`)
- *Unique Constraint:* `(user_id, roadmap_id, step_id)`

*(Ensure Row Level Security (RLS) policies are active on all tables so users can only `SELECT`, `INSERT`, `UPDATE`, and `DELETE` rows matching their own `user_id`.)*

---

## 4. API Endpoints & Integration Plan

Because we are utilizing Supabase, we do not build traditional REST endpoints. Instead, the frontend directly interfaces with the database via the `@supabase/supabase-js` client.

### Integration Strategy:
1. **Supabase Client Setup (`src/lib/supabase.ts`):**
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
   ```

2. **Authentication Hooks:**
   - Use `supabase.auth.onAuthStateChange` inside an `AuthProvider` to globally track user sign-in status and store the session in state.

3. **Data Fetching (DSA Progress):**
   ```typescript
   // Fetch solved problems for the current user
   const { data } = await supabase.from('solved_problems').select('problem_slug').eq('user_id', currentUser.id);
   ```

4. **Data Mutation (Toggle Checkmark):**
   ```typescript
   // Insert a solved problem
   await supabase.from('solved_problems').insert({ user_id: currentUser.id, problem_slug: 'two-sum' });
   
   // Remove a solved problem (un-toggle)
   await supabase.from('solved_problems').delete().match({ user_id: currentUser.id, problem_slug: 'two-sum' });
   ```

---

## 5. Full-Stack Frontend File Structure

```text
prepforge/
├── .env                  # Supabase URL & Anon Key
├── index.html            
├── package.json          # Dependencies: react, react-router-dom, @supabase/supabase-js, lucide-react, tailwindcss
├── src/
│   ├── main.tsx          # App entry and Context Providers
│   ├── App.tsx           # Route declarations (Protected & Public)
│   ├── index.css         # Tailwind directives
│   ├── lib/
│   │   └── supabase.ts   # Supabase client initialization
│   ├── context/
│   │   └── AuthContext.tsx # Manages global user state and Supabase session
│   ├── components/
│   │   ├── Navbar.tsx    
│   │   ├── Footer.tsx    
│   │   └── ProtectedRoute.tsx # Wrapper to enforce authentication
│   ├── data/             # Static constants
│   │   ├── dsa_questions.ts   # Array of 100+ questions
│   │   ├── projects.ts        # Array of 12 projects
│   │   └── roadmaps.ts        # Roadmap phase definitions
│   └── pages/
│       ├── Landing.tsx   # Public marketing page
│       ├── Login.tsx     # Auth forms
│       ├── SignUp.tsx    # Auth forms
│       ├── Dashboard.tsx # Secure profile and stats metric
│       ├── Practice.tsx  # DSA checkmark list hitting Supabase
│       ├── Roadmaps.tsx  # Interactive pathways
│       └── Projects.tsx  # Project library
```

---

## 6. Execution Instructions for Code Generation

When passing this Master Prompt (Naksha) to an AI coding assistant, use the following sequence for flawless execution:

1. **Phase 1 (Foundation):** Setup `Vite`, Tailwind CSS, and `react-router-dom`. Create `App.tsx` and standard base layouts (`Navbar`, `Footer`, `index.css`).
2. **Phase 2 (Supabase & Auth):** Create `lib/supabase.ts`, implement `AuthContext.tsx`, and build functionality for `SignUp.tsx` and `Login.tsx`. Wrap private routes in `<ProtectedRoute />`.
3. **Phase 3 (Dashboard & Data):** Build `Dashboard.tsx`. Initialize Supabase queries inside `useEffect` to fetch user streak and solved DSA count.
4. **Phase 4 (Interactive Pages):** Construct `Practice.tsx` (the 100+ question array rendering with active Supabase insert/delete toggles). Construct `Roadmaps.tsx` and `Projects.tsx`. 
5. **Phase 5 (Polish):** Ensure all Tailwind designs strictly align with a consistent color palette (e.g., slate backgrounds, emerald-500 accents) and deploy the final build.
