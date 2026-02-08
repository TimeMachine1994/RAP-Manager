<script lang="ts">
	import { generateSmartImportPrompt } from '$lib/smart-import';

	let { data } = $props();

	let description = $state('');
	let repoPath = $state('');
	let journeyInput = $state('');
	let copied = $state(false);
	let generatedPrompt = $state('');

	const journeyHints = $derived(
		journeyInput
			.split('\n')
			.map((l) => l.trim())
			.filter(Boolean)
	);

	function generate() {
		generatedPrompt = generateSmartImportPrompt({
			projectName: data.project.name,
			description,
			repoPath: repoPath.trim() || undefined,
			journeyHints: journeyHints.length > 0 ? journeyHints : undefined
		});
	}

	async function copyToClipboard() {
		await navigator.clipboard.writeText(generatedPrompt);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}
</script>

<div class="mx-auto max-w-2xl space-y-8">
	<div>
		<h2 class="text-xl font-semibold text-gray-900">Smart Import</h2>
		<p class="mt-1 text-sm text-gray-500">
			Describe your project and we'll generate a mega-prompt for your AI IDE to bootstrap all
			documentation at once.
		</p>
	</div>

	<!-- Step 1: Description -->
	<div class="space-y-2">
		<label for="description" class="block text-sm font-medium text-gray-700">
			Project Description <span class="text-red-400">*</span>
		</label>
		<textarea
			id="description"
			bind:value={description}
			rows="5"
			placeholder="Describe what this project does, who it's for, what problem it solves..."
			class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
		></textarea>
	</div>

	<!-- Step 2: Repo Path (optional) -->
	<div class="space-y-2">
		<label for="repoPath" class="block text-sm font-medium text-gray-700">
			Codebase Path <span class="text-xs text-gray-400">(optional)</span>
		</label>
		<input
			id="repoPath"
			type="text"
			bind:value={repoPath}
			placeholder="C:\Users\you\projects\my-app or https://github.com/user/repo"
			class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
		/>
		<p class="text-xs text-gray-400">
			If provided, the AI IDE will scan the codebase for additional context.
		</p>
	</div>

	<!-- Step 3: Journey Hints (optional) -->
	<div class="space-y-2">
		<label for="journeys" class="block text-sm font-medium text-gray-700">
			User Journeys <span class="text-xs text-gray-400">(optional, one per line)</span>
		</label>
		<textarea
			id="journeys"
			bind:value={journeyInput}
			rows="3"
			placeholder={"Login Flow\nDashboard View\nExport Report"}
			class="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
		></textarea>
		<p class="text-xs text-gray-400">
			Leave blank to let the AI IDE identify journeys automatically.
		</p>
	</div>

	<!-- Generate Button -->
	<button
		onclick={generate}
		disabled={!description.trim()}
		class="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
	>
		Generate Import Prompt
	</button>

	<!-- Generated Prompt Output -->
	{#if generatedPrompt}
		<div class="space-y-3 rounded-xl border border-gray-200 bg-white shadow-sm">
			<div class="flex items-center justify-between border-b border-gray-100 px-5 py-3">
				<h3 class="text-sm font-semibold text-gray-700">Generated Mega-Prompt</h3>
				<button
					onclick={copyToClipboard}
					class="rounded-lg bg-blue-50 px-4 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
				>
					{copied ? '✓ Copied!' : 'Copy to Clipboard'}
				</button>
			</div>
			<div class="max-h-96 overflow-y-auto px-5 py-4">
				<pre class="whitespace-pre-wrap text-xs leading-relaxed text-gray-600">{generatedPrompt}</pre>
			</div>
		</div>

		<div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
			<p class="text-sm text-amber-800">
				<strong>Next step:</strong> Copy the prompt above and paste it into your AI IDE. Once the
				files are generated, go to
				<a
					href="/{data.project.id}/project-scope"
					class="font-medium text-amber-900 underline hover:text-amber-700"
				>
					Project Scope
				</a>
				and hit Refresh to see them.
			</p>
		</div>
	{/if}
</div>
