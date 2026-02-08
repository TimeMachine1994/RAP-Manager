---
type: project-scope
subtype: competitor-features
title: "test - Competitor Analysis"
createdAt: "2026-02-08T01:36:21.062Z"
---

# Competitor Feature Analysis

## 1. Notion

### Key Features
- Rich document editing with blocks (text, tables, databases, embeds)
- Project management (kanban boards, timelines, sprints)
- Team collaboration with real-time editing
- Templates for recurring document types
- API for integrations

### Strengths
- Extremely flexible — can model almost any workflow
- Strong collaboration features for teams
- Large template ecosystem

### Weaknesses
- **Not IDE-integrated** — requires manual copy/paste between IDE and Notion
- **Write-first** — expects users to author content in Notion, not elsewhere
- **Overhead** — too much flexibility leads to setup paralysis
- **No prompt guidance** — doesn't tell you what to write next
- **SaaS dependency** — data lives on Notion's servers

### How RAP Manager Differentiates
RAP Manager is read-only and IDE-first. Content is generated where you code. No context-switching to a separate writing tool.

---

## 2. Obsidian

### Key Features
- Markdown-native local-first note-taking
- Bidirectional linking and graph view
- Plugin ecosystem (500+ community plugins)
- Vault-based file organization
- Templates and daily notes

### Strengths
- Markdown files on disk — great for version control
- Local-first, no cloud dependency
- Highly extensible via plugins
- Developer-friendly

### Weaknesses
- **No structured workflow** — it's a blank canvas with no guided process
- **Write-focused** — expects you to author content manually
- **No AI IDE integration** — no concept of prompts that generate files
- **No project dashboard** — you see individual notes, not a structured overview
- **Requires curation** — without discipline, vaults become messy

### How RAP Manager Differentiates
RAP Manager enforces a structured 3-pillar workflow (Scope → Journeys → Snapshots) with guided prompts. Obsidian is a general note tool; RAP Manager is purpose-built for AI-assisted development.

---

## 3. Linear / GitHub Projects

### Key Features
- Issue tracking and project boards
- Sprint planning and cycles
- Roadmap visualization
- Git integration (auto-close issues on merge)

### Strengths
- Tight integration with development workflow
- Clean, fast UI
- Good for team coordination

### Weaknesses
- **Issue-centric, not document-centric** — tracks tasks, not ideas/WBS/journals
- **No markdown file integration** — doesn't read files from your repo
- **No AI prompt guidance** — no concept of iterative prompt-driven development
- **No mental snapshots** — no way to capture context for resuming work

### How RAP Manager Differentiates
RAP Manager operates at the documentation layer, not the issue layer. It surfaces the *thinking* behind the code (ideas, breakdowns, journals, snapshots) rather than tracking individual tasks.

---

## Summary Matrix

| Feature | Notion | Obsidian | Linear | **RAP Manager** |
|---|---|---|---|---|
| Read-only dashboard | ✗ | ✗ | ✗ | **✓** |
| Markdown-native | ✗ | ✓ | ✗ | **✓** |
| AI IDE prompt guidance | ✗ | ✗ | ✗ | **✓** |
| Structured workflow | Partial | ✗ | Partial | **✓** |
| Mental snapshots | ✗ | ✗ | ✗ | **✓** |
| Smart Import | ✗ | ✗ | ✗ | **✓** |
| Local-first | ✗ | ✓ | ✗ | **✓** |
