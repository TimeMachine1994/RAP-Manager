---
type: project-scope
subtype: mvp-wbs
title: "test - MVP WBS"
createdAt: "2026-02-08T01:36:21.062Z"
---

# RAP Manager — MVP Work Breakdown Structure

## Phase 1: Foundation (Completed)

### 1.1 Project scaffolding
- **Task:** SvelteKit project with Tailwind CSS v4, Drizzle ORM, SQLite
- **Status:** Done
- **Effort:** ~1 hour

### 1.2 Database schema
- **Task:** `devdocs_project` table with id, name, createdAt
- **Status:** Done
- **Effort:** ~15 min

### 1.3 Project list page
- **Task:** Create/delete projects at `/`, links into `/{projectId}/project-scope`
- **Status:** Done
- **Effort:** ~30 min

### 1.4 Project layout with sidebar
- **Task:** Top navbar + left sidebar with 3 tabs (Project Scope, User Journeys, Mental Snapshots)
- **Status:** Done
- **Effort:** ~30 min

---

## Phase 2: Markdown Infrastructure (Completed)

### 2.1 Frontmatter schema
- **Task:** Define YAML frontmatter contract (type, subtype, title, journey, createdAt)
- **Status:** Done — documented in `DevDocs/MARKDOWN_SCHEMA.md`
- **Effort:** ~15 min

### 2.2 Server-side markdown utilities
- **Task:** `src/lib/server/markdown.ts` — file discovery, parsing (gray-matter), rendering (marked), filtering, grouping
- **Status:** Done
- **Effort:** ~30 min

### 2.3 Prompt templates
- **Task:** `src/lib/prompts.ts` — copy-pasteable prompts for each card slot
- **Status:** Done
- **Effort:** ~20 min

---

## Phase 3: Dashboard Pages (Completed)

### 3.1 Project Scope page
- **Task:** 3 card slots (Initial Idea, Competitor Features, MVP WBS) with rendered markdown or empty-state + "Copy Prompt"
- **Status:** Done
- **Effort:** ~30 min

### 3.2 User Journeys page
- **Task:** Collapsible journey groups, each with 3 sub-cards (idea → WBS → journal), empty-state prompts
- **Status:** Done
- **Effort:** ~45 min

### 3.3 Mental Snapshots page
- **Task:** Expandable snapshot cards sorted by date, "Copy Snapshot Prompt" button
- **Status:** Done
- **Effort:** ~30 min

---

## Phase 4: Smart Import (Completed)

### 4.1 Mega-prompt generator
- **Task:** `src/lib/smart-import.ts` — generates a comprehensive prompt for the AI IDE to bootstrap all docs
- **Status:** Done
- **Effort:** ~20 min

### 4.2 Smart Import UI
- **Task:** `/[projectId]/import` page with description, repo path, journey hints inputs + generated prompt output
- **Status:** Done
- **Effort:** ~30 min

---

## Phase 5: Authentication (Pending)

### 5.1 Login page UI
- **Task:** Create `/login` route with email/password form + OAuth buttons
- **Acceptance Criteria:** Renders at `/login`, responsive layout, client-side validation
- **Effort:** ~45 min
- **Dependencies:** None

### 5.2 Server-side auth handlers
- **Task:** Login action, OAuth callback handling, session middleware
- **Acceptance Criteria:** Valid credentials set session cookie; OAuth flow completes
- **Effort:** ~30 min
- **Dependencies:** 5.1

### 5.3 Route protection
- **Task:** Redirect unauthenticated users to `/login` for protected routes
- **Acceptance Criteria:** All project routes require auth; `/login` is public
- **Effort:** ~20 min
- **Dependencies:** 5.2

### 5.4 Logout
- **Task:** Logout action + UI button in navbar with confirmation
- **Acceptance Criteria:** Session cleared, redirect to `/login`
- **Effort:** ~15 min
- **Dependencies:** 5.2

---

## Phase 6: Polish & Testing (Pending)

### 6.1 Auto-refresh polling
- **Task:** Optional client-side interval that calls `invalidateAll()` to re-read files
- **Effort:** ~15 min

### 6.2 E2E tests
- **Task:** Playwright tests for project CRUD, page navigation, markdown rendering, auth flow
- **Effort:** ~1 hour

### 6.3 Error handling
- **Task:** Graceful handling of missing directories, malformed frontmatter, empty projects
- **Effort:** ~30 min

---

## Total Estimated Effort

| Phase | Estimate | Status |
|---|---|---|
| 1. Foundation | ~2 hours | Done |
| 2. Markdown Infrastructure | ~1 hour | Done |
| 3. Dashboard Pages | ~1.75 hours | Done |
| 4. Smart Import | ~50 min | Done |
| 5. Authentication | ~1.75 hours | Pending |
| 6. Polish & Testing | ~1.75 hours | Pending |
| **Total** | **~9 hours** | **~60% complete** |
