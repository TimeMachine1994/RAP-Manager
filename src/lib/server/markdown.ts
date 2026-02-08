import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface MarkdownFile {
	slug: string;
	frontmatter: {
		type: string;
		subtype: string;
		title: string;
		journey?: string;
		createdAt: string;
	};
	html: string;
	rawContent: string;
}

/**
 * Recursively find all .md files in a directory.
 */
function findMarkdownFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) return [];

	const results: string[] = [];
	const entries = fs.readdirSync(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			results.push(...findMarkdownFiles(fullPath));
		} else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'MARKDOWN_SCHEMA.md') {
			results.push(fullPath);
		}
	}

	return results;
}

/**
 * Parse a single markdown file, extracting frontmatter and rendering HTML.
 */
function parseMarkdownFile(filePath: string): MarkdownFile | null {
	try {
		const raw = fs.readFileSync(filePath, 'utf-8');
		const { data, content } = matter(raw);

		if (!data.type || !data.subtype || !data.title) {
			return null;
		}

		const html = marked.parse(content, { async: false }) as string;

		return {
			slug: path.basename(filePath, '.md'),
			frontmatter: {
				type: data.type,
				subtype: data.subtype,
				title: data.title,
				journey: data.journey,
				createdAt: data.createdAt || new Date().toISOString()
			},
			html,
			rawContent: content
		};
	} catch {
		return null;
	}
}

/**
 * Get all parsed markdown files from a project's DevDocs directory.
 */
export function getProjectMarkdownFiles(projectName: string): MarkdownFile[] {
	const projectDir = path.resolve('DevDocs', projectName);
	const filePaths = findMarkdownFiles(projectDir);

	return filePaths
		.map(parseMarkdownFile)
		.filter((f): f is MarkdownFile => f !== null);
}

/**
 * Filter markdown files by type.
 */
export function filterByType(files: MarkdownFile[], type: string): MarkdownFile[] {
	return files.filter((f) => f.frontmatter.type === type);
}

/**
 * Filter markdown files by type and subtype.
 */
export function filterByTypeAndSubtype(
	files: MarkdownFile[],
	type: string,
	subtype: string
): MarkdownFile | undefined {
	return files.find((f) => f.frontmatter.type === type && f.frontmatter.subtype === subtype);
}

/**
 * Group user journey files by journey slug.
 */
export function groupByJourney(
	files: MarkdownFile[]
): Record<string, MarkdownFile[]> {
	const journeyFiles = filterByType(files, 'user-journey');
	const groups: Record<string, MarkdownFile[]> = {};

	for (const file of journeyFiles) {
		const key = file.frontmatter.journey || 'ungrouped';
		if (!groups[key]) groups[key] = [];
		groups[key].push(file);
	}

	// Sort each group by subtype order
	const subtypeOrder = ['journey-idea', 'journey-wbs', 'journey-journal'];
	for (const key of Object.keys(groups)) {
		groups[key].sort(
			(a, b) =>
				subtypeOrder.indexOf(a.frontmatter.subtype) -
				subtypeOrder.indexOf(b.frontmatter.subtype)
		);
	}

	return groups;
}
