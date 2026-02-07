<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let confirmDeleteId = $state<string | null>(null);
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<!-- Top bar -->
	<header class="flex h-14 items-center border-b border-gray-200 bg-white px-6 shadow-sm">
		<h1 class="text-lg font-semibold text-gray-900">DevDocs</h1>
	</header>

	<!-- Content -->
	<main class="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-10">
		<!-- Create new project -->
		<section>
			<h2 class="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase">New Project</h2>
			<form method="POST" action="?/create" use:enhance class="flex gap-3">
				<input
					type="text"
					name="name"
					placeholder="Project name…"
					required
					class="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
				<button
					type="submit"
					class="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40"
				>
					Create
				</button>
			</form>
		</section>

		<!-- Project list -->
		<section>
			<h2 class="mb-3 text-sm font-medium tracking-wide text-gray-500 uppercase">Projects</h2>
			{#if data.projects.length === 0}
				<p class="rounded-lg border border-dashed border-gray-300 py-12 text-center text-sm text-gray-400">
					No projects yet. Create one above to get started.
				</p>
			{:else}
				<ul class="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
					{#each data.projects as project (project.id)}
						<li class="flex items-center justify-between px-5 py-4">
							<a
								href="/{project.id}/project-scope"
								class="text-left text-sm font-medium text-gray-900 hover:text-blue-600 transition"
							>
								{project.name}
							</a>

							<div class="flex items-center gap-2">
								{#if confirmDeleteId === project.id}
									<span class="text-xs text-gray-500">Delete?</span>
									<form method="POST" action="?/delete" use:enhance>
										<input type="hidden" name="id" value={project.id} />
										<button
											type="submit"
											class="rounded bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
										>
											Yes
										</button>
									</form>
									<button
										onclick={() => (confirmDeleteId = null)}
										class="rounded bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300"
									>
										No
									</button>
								{:else}
									<button
										onclick={() => (confirmDeleteId = project.id)}
										class="rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 transition"
									>
										Delete
									</button>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</section>
	</main>
</div>
