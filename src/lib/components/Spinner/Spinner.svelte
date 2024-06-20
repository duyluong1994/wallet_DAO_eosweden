<script lang="ts">
	export let color: string = 'indigo';
	export let size: string = '8';
</script>

<div
	class={`h-${size} w-${size} animate-spin rounded-full border-b-4 border-t-4 border-${color}-500`}
></div>

<style></style>
