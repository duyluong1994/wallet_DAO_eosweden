<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import MiniMenu from './MiniMenu.svelte';

	let isOpen = false;

	onMount(async () => {});

	afterUpdate(async () => {});
</script>

<MiniMenu bind:isOpen>
	{#if isOpen}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div
			class="fixed left-0 top-[58px] h-full w-48 bg-background-default shadow-lg"
			on:click|stopPropagation={() => {}}
		>
			<ul
				in:slide={{ axis: 'x', delay: 0, duration: 350 }}
				out:slide={{ axis: 'x', delay: 0, duration: 450 }}
				class={isOpen
					? ' list-none divide-y divide-dashed border-r border-gray-600 bg-background-default shadow-lg  md:hidden'
					: 'hidden'}
			>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="block"
					on:click={() => {
						console.log('Menu');
					}}
				>
					<div class={`cursor-pointer px-4 py-2`}>Tokens</div>
				</li>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<li
					class="block"
					on:click={() => {
						console.log('Menu');
					}}
				>
					<div class={`cursor-pointer px-4 py-2`}>Dao Candidate</div>
				</li>
			</ul>
		</div>
	{/if}
</MiniMenu>

<style>
</style>
