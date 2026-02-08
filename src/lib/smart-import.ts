/**
 * Generates a mega-prompt for the AI IDE to scan an existing codebase
 * and produce all RAP Manager markdown files in one shot.
 */
export function generateSmartImportPrompt(opts: {
	projectName: string;
	description: string;
	repoPath?: string;
	journeyHints?: string[];
}): string {
	const { projectName, description, repoPath, journeyHints } = opts;

	const repoContext = repoPath
		? `The codebase is located at: ${repoPath}\nScan the codebase to understand its structure, routes, components, and features.\n`
		: '';

	const journeySection =
		journeyHints && journeyHints.length > 0
			? `\nThe following user journeys have been identified:\n${journeyHints.map((j) => `- ${j}`).join('\n')}\n\nFor EACH journey above, generate all three files (journey-idea, journey-wbs, journey-journal placeholder).`
			: `\nAnalyze the project and identify 3-5 key user journeys based on the description${repoPath ? ' and codebase' : ''}. For EACH journey, generate all three files (journey-idea, journey-wbs, journey-journal placeholder).`;

	const ts = new Date().toISOString();

	return `# Smart Import: Generate RAP Manager Documentation

You are bootstrapping documentation for the project **"${projectName}"** into the RAP Manager system.

## Project Description
${description}

${repoContext}
## Your Task

Generate the following markdown files inside the \`DevDocs/${projectName}/\` directory. Each file MUST have YAML frontmatter exactly as specified.

---

### File 1: Initial Idea
**Filename:** \`DevDocs/${projectName}/initial-idea.md\`

\`\`\`markdown
---
type: project-scope
subtype: initial-idea
title: "${projectName} - Initial Idea"
createdAt: "${ts}"
---
\`\`\`

Write a comprehensive description of the project: core concept, problem being solved, target users, high-level goals, and key differentiators. Base this on the project description provided${repoPath ? ' and what you find in the codebase' : ''}.

---

### File 2: Competitor Analysis
**Filename:** \`DevDocs/${projectName}/competitor-features.md\`

\`\`\`markdown
---
type: project-scope
subtype: competitor-features
title: "${projectName} - Competitor Analysis"
createdAt: "${ts}"
---
\`\`\`

Identify 2-3 closest competitors. For each: list key features, strengths, weaknesses, and how ${projectName} differentiates.

---

### File 3: MVP Work Breakdown Structure
**Filename:** \`DevDocs/${projectName}/mvp-wbs.md\`

\`\`\`markdown
---
type: project-scope
subtype: mvp-wbs
title: "${projectName} - MVP WBS"
createdAt: "${ts}"
---
\`\`\`

Break down the MVP into phases with features, tasks, estimated effort, and dependencies.

---

### User Journey Files
${journeySection}

For each journey, generate THREE files:

**File A: Journey Idea**
\`\`\`markdown
---
type: user-journey
subtype: journey-idea
title: "[Journey Name]"
journey: "[journey-slug]"
createdAt: "${ts}"
---
\`\`\`
Describe the user, their goal, and the expected flow.

**File B: Journey WBS**
\`\`\`markdown
---
type: user-journey
subtype: journey-wbs
title: "[Journey Name] - WBS"
journey: "[journey-slug]"
createdAt: "${ts}"
---
\`\`\`
Break down into implementable tasks with acceptance criteria and dependencies.

**File C: Journey Journal (placeholder)**
\`\`\`markdown
---
type: user-journey
subtype: journey-journal
title: "[Journey Name] - Journal"
journey: "[journey-slug]"
createdAt: "${ts}"
---
\`\`\`
Create a placeholder journal with a "No entries yet" message and a template for future entries.

---

### Mental Snapshot
**Filename:** \`DevDocs/${projectName}/import-snapshot.md\`

\`\`\`markdown
---
type: mental-snapshot
subtype: snapshot
title: "Project Import - ${projectName}"
createdAt: "${ts}"
---
\`\`\`

Summarize what was just generated, the current state of the project, and what the developer should focus on first.

---

## Rules
- Use the \`journey\` slug format: lowercase, hyphens instead of spaces (e.g., "login-flow")
- Every file MUST have valid YAML frontmatter with all required fields
- Place ALL files in \`DevDocs/${projectName}/\`
- Generate ALL files listed above — do not skip any`;
}
