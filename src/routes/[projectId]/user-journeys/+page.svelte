<script lang="ts">
	import { PROMPT_TEMPLATES } from '$lib/prompts';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	let copiedKey = $state<string | null>(null);
	let expandedJourneys = $state<Record<string, boolean>>({});

	const journeyEntries = $derived(Object.entries(data.journeyGroups));

	const subtypeLabels: Record<string, string> = {
		'journey-idea': 'Initial Idea',
		'journey-wbs': 'Work Breakdown Structure',
		'journey-journal': 'Journal'
	};

	const subtypeOrder = ['journey-idea', 'journey-wbs', 'journey-journal'] as const;

	function toggleJourney(key: string) {
		expandedJourneys = { ...expandedJourneys, [key]: !expandedJourneys[key] };
	}

	function getPrompt(subtype: string, journeyName: string): string {
		const template =
			PROMPT_TEMPLATES['user-journey'][subtype as keyof typeof PROMPT_TEMPLATES['user-journey']];
		if (!template) return '';
		return typeof template.prompt === 'function' ? template.prompt(journeyName) : template.prompt;
	}

	async function copyPrompt(prompt: string, key: string) {
		await navigator.clipboard.writeText(prompt);
		copiedKey = key;
		setTimeout(() => (copiedKey = null), 2000);
	}

	function refresh() {
		invalidateAll();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">User Journeys</h2>
		<button
			onclick={refresh}
			class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
		>
			↻ Refresh
		</button>
	</div>

	{#if journeyEntries.length === 0}
		<div class="rounded-xl border border-dashed border-gray-300 bg-white px-5 py-12 text-center">
			<p class="text-sm text-gray-400">
				No journeys yet. Use the prompt below in your AI IDE to create your first journey.
			</p>
			<button
				onclick={() => copyPrompt(getPrompt('journey-idea', 'My First Journey'), 'new-journey')}
				class="mt-3 rounded-lg bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
			>
				{copiedKey === 'new-journey' ? '✓ Copied!' : 'Copy Journey Idea Prompt'}
			</button>
		</div>
	{:else}
		<div class="space-y-4">
			{#each journeyEntries as [journeySlug, files] (journeySlug)}
				{@const journeyTitle = files[0]?.frontmatter.journey || journeySlug}
				{@const isExpanded = expandedJourneys[journeySlug] !== false}

				<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
					<button
						onclick={() => toggleJourney(journeySlug)}
						class="flex w-full items-center justify-between border-b border-gray-100 px-5 py-3 text-left"
					>
						<h3 class="text-sm font-semibold text-gray-700 capitalize">
							{journeyTitle.replace(/-/g, ' ')}
						</h3>
						<span class="text-xs text-gray-400">{isExpanded ? '▾' : '▸'}</span>
					</button>

					{#if isExpanded}
						<div class="divide-y divide-gray-50 px-5 py-3">
							{#each subtypeOrder as subtype (subtype)}
								{@const file = files.find((f) => f.frontmatter.subtype === subtype)}
								{@const copyKey = `${journeySlug}-${subtype}`}

								<div class="py-3">
									<h4 class="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
										{subtypeLabels[subtype]}
									</h4>

									{#if file}
										<div class="prose prose-sm max-w-none">
											{@html file.html}
										</div>
									{:else}
										<div class="flex items-center gap-3">
											<p class="text-xs text-gray-400">Not generated yet.</p>
											<button
												onclick={() =>
													copyPrompt(getPrompt(subtype, journeyTitle), copyKey)}
												class="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
											>
												{copiedKey === copyKey ? '✓ Copied!' : 'Copy Prompt'}
											</button>
										</div>
									{/if}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
