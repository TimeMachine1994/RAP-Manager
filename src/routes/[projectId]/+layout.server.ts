import { db } from '$lib/server/db';
import { devdocsProject } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const [project] = await db
		.select()
		.from(devdocsProject)
		.where(eq(devdocsProject.id, params.projectId))
		.limit(1);

	if (!project) {
		error(404, 'Project not found');
	}

	return { project };
};
