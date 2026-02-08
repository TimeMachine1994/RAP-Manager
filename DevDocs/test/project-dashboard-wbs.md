---
type: user-journey
subtype: journey-wbs
title: "Project Dashboard - WBS"
journey: "project-dashboard"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Project Dashboard — Work Breakdown Structure

## 1. Dashboard Route Setup

### 1.1 Create dashboard page
- **Task:** Create `src/routes/[projectId]/+page.svelte` and `+page.server.ts` as the project landing page
- **Acceptance Criteria:** Navigating to `/{projectId}` renders the dashboard (currently redirects to project-scope)
- **Dependencies:** None

### 1.2 Update project links
- **Task:** Change project list links from `/{id}/project-scope` to `/{id}`
- **Acceptance Criteria:** Clicking a project goes to the dashboard, not directly to Project Scope
- **Dependencies:** 1.1

---

## 2. Dashboard Server Loader

### 2.1 Aggregate all markdown data
- **Task:** In `+page.server.ts`, call `getProjectMarkdownFiles()` and compute summary stats
- **Acceptance Criteria:** Returns counts and existence flags for all document types
- **Dependencies:** 1.1

### 2.2 Compute completeness
- **Task:** Calculate completion percentages for each pillar:
  - Project Scope: 0/3, 1/3, 2/3, 3/3 documents
  - User Journeys: for each journey, which of the 3 subtypes exist
  - Mental Snapshots: total count + most recent
- **Acceptance Criteria:** Percentages are accurate and update when files are added
- **Dependencies:** 2.1

---

## 3. Dashboard UI

### 3.1 Project Scope summary card
- **Task:** Show 3 checkmarks/items (Initial Idea ✓/✗, Competitors ✓/✗, MVP WBS ✓/✗)
- **Acceptance Criteria:** Visual indicators match actual file existence; links to Project Scope tab
- **Dependencies:** 2.2

### 3.2 User Journeys summary card
- **Task:** Show journey count and per-journey completion (e.g., "Login Flow: 2/3 docs")
- **Acceptance Criteria:** Accurate counts; links to User Journeys tab
- **Dependencies:** 2.2

### 3.3 Mental Snapshots summary card
- **Task:** Show total snapshot count + most recent snapshot title and date
- **Acceptance Criteria:** Displays latest snapshot; links to Mental Snapshots tab
- **Dependencies:** 2.2

### 3.4 Suggested next action
- **Task:** Analyze gaps and display the most important missing document with a "Copy Prompt" button
- **Acceptance Criteria:** Correctly identifies highest-priority gap; prompt copies to clipboard
- **Dependencies:** 3.1, 3.2, 3.3

---

## 4. Sidebar Update

### 4.1 Add Dashboard link
- **Task:** Add "Dashboard" as the first item in the sidebar, above Project Scope
- **Acceptance Criteria:** Active state highlights correctly; navigates to `/{projectId}`
- **Dependencies:** 1.1

---

## Estimated Effort

| Task | Estimate |
|---|---|
| 1. Route setup | ~15 min |
| 2. Server loader | ~20 min |
| 3. Dashboard UI | ~45 min |
| 4. Sidebar update | ~5 min |
| **Total** | **~1.5 hours** |
