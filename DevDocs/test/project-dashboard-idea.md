---
type: user-journey
subtype: journey-idea
title: "Project Dashboard"
journey: "project-dashboard"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Project Dashboard Journey

## User Profile
A developer who has created a project in RAP Manager and wants to see a high-level overview of their documentation status — what's been generated, what's missing, and what to work on next.

## Goal
Provide a unified dashboard view when entering a project that shows documentation completeness at a glance, without needing to click into each tab individually.

## Expected Flow

1. **Enter project** — User clicks a project from the project list
2. **See overview** — Dashboard shows a summary of all three pillars:
   - **Project Scope:** Which of the 3 documents exist (initial idea, competitors, MVP WBS)
   - **User Journeys:** How many journeys exist, and their completion status (idea only? WBS done? Journal started?)
   - **Mental Snapshots:** Most recent snapshot with date and title
3. **Quick navigation** — Each summary card links to the full tab for that pillar
4. **Progress indicators** — Visual progress bars or checkmarks showing documentation completeness
5. **Suggested next action** — The dashboard highlights what should be generated next based on gaps

## Current Codebase State
- Project layout exists with sidebar navigation to all 3 tabs
- Each tab has its own page with server loaders that read markdown files
- No unified dashboard/overview page exists yet — entering a project goes straight to Project Scope
- The `getProjectMarkdownFiles()` utility already fetches all files, which could power a dashboard summary
