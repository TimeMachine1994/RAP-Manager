import { getProjectMarkdownFiles, filterByTypeAndSubtype } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { project } = await parent();
	const allFiles = getProjectMarkdownFiles(project.name);

	const initialIdea = filterByTypeAndSubtype(allFiles, 'project-scope', 'initial-idea') ?? null;
	const competitorFeatures =
		filterByTypeAndSubtype(allFiles, 'project-scope', 'competitor-features') ?? null;
	const mvpWbs = filterByTypeAndSubtype(allFiles, 'project-scope', 'mvp-wbs') ?? null;

	return {
		initialIdea,
		competitorFeatures,
		mvpWbs
	};
};
