---
type: user-journey
subtype: journey-idea
title: "Smart Import"
journey: "smart-import"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Smart Import Journey

## User Profile
A developer who has an existing codebase and wants to onboard it into RAP Manager quickly, without manually creating each markdown file one by one.

## Goal
Generate a single comprehensive prompt that, when pasted into an AI IDE, produces all required RAP Manager documentation files for an existing project in one shot.

## Expected Flow

1. **Navigate to Smart Import** — User clicks "⚡ Smart Import" in the sidebar
2. **Describe the project** — User types a brief description of what the project does
3. **Provide codebase path** (optional) — User enters the local path or repo URL so the AI IDE can scan the code
4. **List key journeys** (optional) — User types known user journeys, one per line; or leaves blank for auto-detection
5. **Generate mega-prompt** — User clicks "Generate Import Prompt" → a comprehensive prompt appears
6. **Copy to clipboard** — User clicks "Copy to Clipboard"
7. **Paste into AI IDE** — User pastes the prompt into their AI IDE (Windsurf, Cursor, etc.)
8. **AI generates all files** — The IDE creates all markdown files with proper frontmatter in `DevDocs/{projectName}/`
9. **Verify in dashboard** — User goes to any tab and hits "Refresh" to see all generated docs

## Current Codebase State
- Smart Import page exists at `src/routes/[projectId]/import/+page.svelte`
- Mega-prompt generator exists at `src/lib/smart-import.ts`
- Sidebar has "⚡ Smart Import" link with emerald active state
- Feature is fully functional in the current build
