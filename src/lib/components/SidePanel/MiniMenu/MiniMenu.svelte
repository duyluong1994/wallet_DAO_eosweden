<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { CoinsSolid, PeopleGroupSolid } from 'svelte-awesome-icons';
	import BarsSolid from 'svelte-awesome-icons/BarsSolid.svelte';
	import { slide } from 'svelte/transition';

	export let isOpen = false;
	let className;
	export { className as class };

	onMount(async () => {});

	afterUpdate(async () => {});

	function toggleOpen() {
		isOpen = !isOpen;
	}

	const menuItems = [
		{ id: 'tokens', icon: CoinsSolid, label: 'Tokens', logMessage: 'Tokens' },
		{ id: 'dao', icon: PeopleGroupSolid, label: 'Dao Candidate', logMessage: 'Dao Candidate' }
	];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={className}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<p class="hidden text-center text-2xl underline underline-offset-4 md:block">Menu</p>
	<!-- Mobile view: Toggle button -->
	<button
		class="fixed right-3 top-20 flex flex-row items-center md:hidden"
		on:click|stopPropagation={toggleOpen}
	>
		<BarsSolid class="pointer-events-none h-5 w-5" />
		<span class="ml-1">Menu</span>
	</button>
	{#if isOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="md:relative"
			class:fixed={isOpen}
			class:inset-0={isOpen}
			on:click={() => (isOpen = false)}
		>
			<div
				class="fixed left-0 top-[58px] h-full w-48 border-r border-gray-600 bg-background-default shadow-lg"
				on:click|stopPropagation={() => {}}
			>
				<ul
					in:slide={{ axis: 'x', delay: 0, duration: 350 }}
					out:slide={{ axis: 'x', delay: 0, duration: 450 }}
					class={isOpen ? 'list-none divide-y divide-dashed md:hidden' : 'hidden'}
				>
					{#each menuItems as { id, icon: Icon, label, logMessage }}
						<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
						<li
							class="flex cursor-pointer flex-row items-center px-4 py-2"
							on:click={() => {
								console.log(logMessage);
							}}
						>
							<svelte:component this={Icon} />
							<div class="ml-2">{label}</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}

	<div class="mt-5 hidden cursor-pointer p-2 md:flex">
		<ul class="w-full list-none">
			{#each menuItems as { id, icon: Icon, label, logMessage }}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="flex flex-row items-center px-4 py-2"
					on:click={() => {
						console.log(logMessage);
					}}
				>
					<svelte:component this={Icon} />
					<div class="ml-2">{label}</div>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
</style>
