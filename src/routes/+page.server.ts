import { db } from '$lib/server/db';
import { devdocsProject } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await db
		.select()
		.from(devdocsProject)
		.orderBy(devdocsProject.createdAt);

	return { projects };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString().trim();

		if (!name) {
			return fail(400, { error: 'Project name is required' });
		}

		const [project] = await db
			.insert(devdocsProject)
			.values({ name })
			.returning();

		redirect(303, `/${project.id}/project-scope`);
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id')?.toString();

		if (!id) {
			return fail(400, { error: 'Project ID is required' });
		}

		await db.delete(devdocsProject).where(eq(devdocsProject.id, id));

		return { success: true };
	}
};
