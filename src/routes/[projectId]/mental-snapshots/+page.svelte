<script lang="ts">
	import { PROMPT_TEMPLATES } from '$lib/prompts';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	let copiedKey = $state<string | null>(null);
	let expandedSnapshots = $state<Record<string, boolean>>({});

	function toggleSnapshot(slug: string) {
		expandedSnapshots = { ...expandedSnapshots, [slug]: !expandedSnapshots[slug] };
	}

	async function copyPrompt(key: string) {
		await navigator.clipboard.writeText(PROMPT_TEMPLATES['mental-snapshot'].snapshot.prompt);
		copiedKey = key;
		setTimeout(() => (copiedKey = null), 2000);
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function refresh() {
		invalidateAll();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">Mental Snapshots</h2>
		<div class="flex items-center gap-2">
			<button
				onclick={() => copyPrompt('new-snapshot')}
				class="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-100"
			>
				{copiedKey === 'new-snapshot' ? '✓ Copied!' : 'Copy Snapshot Prompt'}
			</button>
			<button
				onclick={refresh}
				class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
			>
				↻ Refresh
			</button>
		</div>
	</div>

	{#if data.snapshots.length === 0}
		<div class="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
			<p class="text-sm text-gray-400">
				No snapshots yet. When you need to step away, copy the prompt above into your AI IDE to
				capture your mental state.
			</p>
		</div>
	{:else}
		<div class="space-y-3">
			{#each data.snapshots as snapshot (snapshot.slug)}
				{@const isExpanded = expandedSnapshots[snapshot.slug] ?? false}

				<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
					<button
						onclick={() => toggleSnapshot(snapshot.slug)}
						class="flex w-full items-center justify-between px-5 py-3 text-left"
					>
						<div>
							<h3 class="text-sm font-semibold text-gray-700">
								{snapshot.frontmatter.title}
							</h3>
							<p class="text-xs text-gray-400">
								{formatDate(snapshot.frontmatter.createdAt)}
							</p>
						</div>
						<span class="text-xs text-gray-400">{isExpanded ? '▾' : '▸'}</span>
					</button>

					{#if isExpanded}
						<div class="border-t border-gray-100 px-5 py-4">
							<div class="prose prose-sm max-w-none">
								{@html snapshot.html}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
