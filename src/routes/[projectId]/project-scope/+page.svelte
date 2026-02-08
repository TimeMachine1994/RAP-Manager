<script lang="ts">
	import { PROMPT_TEMPLATES } from '$lib/prompts';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	let copiedSlot = $state<string | null>(null);

	const slots = $derived([
		{
			key: 'initial-idea',
			label: PROMPT_TEMPLATES['project-scope']['initial-idea'].label,
			prompt: PROMPT_TEMPLATES['project-scope']['initial-idea'].prompt,
			file: data.initialIdea
		},
		{
			key: 'competitor-features',
			label: PROMPT_TEMPLATES['project-scope']['competitor-features'].label,
			prompt: PROMPT_TEMPLATES['project-scope']['competitor-features'].prompt,
			file: data.competitorFeatures
		},
		{
			key: 'mvp-wbs',
			label: PROMPT_TEMPLATES['project-scope']['mvp-wbs'].label,
			prompt: PROMPT_TEMPLATES['project-scope']['mvp-wbs'].prompt,
			file: data.mvpWbs
		}
	]);

	async function copyPrompt(prompt: string, key: string) {
		await navigator.clipboard.writeText(prompt);
		copiedSlot = key;
		setTimeout(() => (copiedSlot = null), 2000);
	}

	function refresh() {
		invalidateAll();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<h2 class="text-xl font-semibold text-gray-900">Project Scope</h2>
		<button
			onclick={refresh}
			class="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm transition hover:bg-gray-50"
		>
			↻ Refresh
		</button>
	</div>

	<div class="grid gap-6">
		{#each slots as slot (slot.key)}
			<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
				<div class="border-b border-gray-100 px-5 py-3">
					<h3 class="text-sm font-semibold text-gray-700">{slot.label}</h3>
				</div>

				{#if slot.file}
					<div class="prose prose-sm max-w-none px-5 py-4">
						{@html slot.file.html}
					</div>
				{:else}
					<div class="flex flex-col items-center gap-3 px-5 py-8 text-center">
						<p class="text-sm text-gray-400">
							No document yet. Copy the prompt below into your AI IDE to generate it.
						</p>
						<button
							onclick={() => copyPrompt(slot.prompt, slot.key)}
							class="rounded-lg bg-blue-50 px-4 py-2 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
						>
							{copiedSlot === slot.key ? '✓ Copied!' : 'Copy Prompt'}
						</button>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
