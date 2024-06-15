<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import BarsSolid from 'svelte-awesome-icons/BarsSolid.svelte';

	export let isOpen = false;

	onMount(async () => {});

	afterUpdate(async () => {});

	function toggleOpen() {
		isOpen = !isOpen;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class=" md:relative"
	class:fixed={isOpen}
	class:inset-0={isOpen}
	on:click={() => (isOpen = false)}
>
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
	<slot />
</div>

<style>
</style>
