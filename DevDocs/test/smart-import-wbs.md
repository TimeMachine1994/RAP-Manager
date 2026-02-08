---
type: user-journey
subtype: journey-wbs
title: "Smart Import - WBS"
journey: "smart-import"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Smart Import — Work Breakdown Structure

## 1. Mega-Prompt Generator (Completed)

### 1.1 Prompt template engine
- **Task:** Create `src/lib/smart-import.ts` with `generateSmartImportPrompt()` function
- **Acceptance Criteria:** Generates a structured prompt with all file specifications, frontmatter templates, and rules
- **Status:** Done

### 1.2 Dynamic context injection
- **Task:** Inject project name, description, repo path, and journey hints into the prompt template
- **Acceptance Criteria:** Each field correctly populates the template; optional fields are handled gracefully
- **Status:** Done

---

## 2. Smart Import UI (Completed)

### 2.1 Import page route
- **Task:** Create `src/routes/[projectId]/import/+page.svelte`
- **Acceptance Criteria:** Page renders at `/{projectId}/import`
- **Status:** Done

### 2.2 Form inputs
- **Task:** Project description (required textarea), codebase path (optional input), user journeys (optional textarea, one per line)
- **Acceptance Criteria:** Generate button disabled until description is filled; journey hints parsed from newlines
- **Status:** Done

### 2.3 Prompt output display
- **Task:** Show generated prompt in a scrollable pre-formatted block with "Copy to Clipboard" button
- **Acceptance Criteria:** Prompt renders correctly; clipboard copy works; "Copied!" feedback shown
- **Status:** Done

### 2.4 Next step guidance
- **Task:** Amber callout box explaining what to do after copying the prompt
- **Acceptance Criteria:** Links to Project Scope page; clear instructions
- **Status:** Done

---

## 3. Sidebar Integration (Completed)

### 3.1 Add Smart Import link
- **Task:** Add "⚡ Smart Import" to sidebar below main tabs, separated by a divider
- **Acceptance Criteria:** Emerald highlight when active; renders on all project pages
- **Status:** Done

---

## 4. Future Enhancements (Pending)

### 4.1 Re-import detection
- **Task:** Detect if files already exist and warn before overwriting
- **Acceptance Criteria:** Warning shown if any target files already exist in `DevDocs/{projectName}/`
- **Effort:** ~20 min

### 4.2 Selective import
- **Task:** Allow user to check/uncheck which file types to include in the prompt
- **Acceptance Criteria:** Prompt only includes selected file types
- **Effort:** ~30 min

### 4.3 Import history
- **Task:** Store import attempts in DB with timestamp and prompt used
- **Acceptance Criteria:** Can view past imports and re-run them
- **Effort:** ~45 min

---

## Estimated Effort

| Task | Estimate | Status |
|---|---|---|
| 1. Mega-prompt generator | ~20 min | Done |
| 2. Smart Import UI | ~30 min | Done |
| 3. Sidebar integration | ~5 min | Done |
| 4. Future enhancements | ~1.5 hours | Pending |
| **Total** | **~2.25 hours** | **~75% complete** |
