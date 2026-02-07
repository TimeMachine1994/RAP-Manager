<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	const projectId = $derived(data.project.id);

	const tabs = $derived([
		{ label: 'Project Scope', href: `/${projectId}/project-scope` },
		{ label: 'User Journeys', href: `/${projectId}/user-journeys` },
		{ label: 'Mental Snapshots', href: `/${projectId}/mental-snapshots` }
	]);

	const currentPath = $derived(page.url.pathname);
</script>

<div class="flex min-h-screen flex-col bg-gray-50">
	<!-- Top Navbar -->
	<header class="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
		<div class="flex items-center gap-4">
			<a href="/" class="text-sm font-medium text-gray-500 hover:text-blue-600 transition">
				&larr; Projects
			</a>
			<span class="text-gray-300">/</span>
			<h1 class="text-lg font-semibold text-gray-900">{data.project.name}</h1>
		</div>
	</header>

	<div class="flex flex-1">
		<!-- Sidebar -->
		<aside class="flex w-56 flex-col border-r border-gray-200 bg-white">
			<nav class="flex flex-col gap-1 p-4">
				{#each tabs as tab (tab.label)}
					<a
						href={tab.href}
						class="rounded-md px-3 py-2 text-sm font-medium transition {currentPath === tab.href
							? 'bg-blue-50 text-blue-700'
							: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}"
					>
						{tab.label}
					</a>
				{/each}
			</nav>
		</aside>

		<!-- Main content area -->
		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
</div>
