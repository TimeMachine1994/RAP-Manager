export const PROMPT_TEMPLATES = {
	'project-scope': {
		'initial-idea': {
			label: 'Initial Idea',
			prompt: `Create a markdown file with the following frontmatter and content about our project's initial idea:

---
type: project-scope
subtype: initial-idea
title: "[Project Name] Initial Idea"
createdAt: "${new Date().toISOString()}"
---

Describe the core concept, problem being solved, target users, and high-level goals of the project.`
		},
		'competitor-features': {
			label: 'Closest Competitor Features',
			prompt: `Create a markdown file analyzing the closest competitor's features:

---
type: project-scope
subtype: competitor-features
title: "Competitor Feature Analysis"
createdAt: "${new Date().toISOString()}"
---

List the closest competitor(s), their key features, strengths, weaknesses, and how our project differentiates.`
		},
		'mvp-wbs': {
			label: 'MVP Work Breakdown Structure',
			prompt: `Create a markdown file with a work breakdown structure for our MVP:

---
type: project-scope
subtype: mvp-wbs
title: "MVP Work Breakdown Structure"
createdAt: "${new Date().toISOString()}"
---

Break down the MVP into phases, features, and tasks with estimated effort and dependencies.`
		}
	},
	'user-journey': {
		'journey-idea': {
			label: 'Journey Idea',
			prompt: (journeyName: string) =>
				`Create a markdown file for a new user journey idea:

---
type: user-journey
subtype: journey-idea
title: "${journeyName}"
journey: "${journeyName.toLowerCase().replace(/\s+/g, '-')}"
createdAt: "${new Date().toISOString()}"
---

Describe the user journey: who the user is, what they want to accomplish, and the expected flow.`
		},
		'journey-wbs': {
			label: 'Journey WBS',
			prompt: (journeyName: string) =>
				`Create a markdown file with a detailed WBS for the "${journeyName}" user journey:

---
type: user-journey
subtype: journey-wbs
title: "${journeyName} - WBS"
journey: "${journeyName.toLowerCase().replace(/\s+/g, '-')}"
createdAt: "${new Date().toISOString()}"
---

Break down the journey into implementable tasks, acceptance criteria, and dependencies.`
		},
		'journey-journal': {
			label: 'Journey Journal',
			prompt: (journeyName: string) =>
				`Create a markdown file as a development journal for the "${journeyName}" journey:

---
type: user-journey
subtype: journey-journal
title: "${journeyName} - Journal"
journey: "${journeyName.toLowerCase().replace(/\s+/g, '-')}"
createdAt: "${new Date().toISOString()}"
---

Document progress, decisions made, blockers encountered, and lessons learned while implementing this journey.`
		}
	},
	'mental-snapshot': {
		snapshot: {
			label: 'Mental Snapshot',
			prompt: `Create a markdown file capturing your current mental state before stepping away:

---
type: mental-snapshot
subtype: snapshot
title: "Snapshot - [Brief Description]"
createdAt: "${new Date().toISOString()}"
---

Document: what you were working on, what's done, what's in progress, what's next, any blockers or open questions, and context needed to resume.`
		}
	}
} as const;
