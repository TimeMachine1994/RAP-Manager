import { getProjectMarkdownFiles, filterByType } from '$lib/server/markdown';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { project } = await parent();
	const allFiles = getProjectMarkdownFiles(project.name);
	const snapshots = filterByType(allFiles, 'mental-snapshot').sort(
		(a, b) =>
			new Date(b.frontmatter.createdAt).getTime() - new Date(a.frontmatter.createdAt).getTime()
	);

	return { snapshots };
};
