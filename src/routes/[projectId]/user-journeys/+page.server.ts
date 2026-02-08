import { getProjectMarkdownFiles, groupByJourney } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { project } = await parent();
	const allFiles = getProjectMarkdownFiles(project.name);
	const journeyGroups = groupByJourney(allFiles);

	return { journeyGroups };
};
