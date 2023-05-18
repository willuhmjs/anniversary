<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import Calendar from '$lib/Calendar.svelte';
	import Add from '$lib/Add.svelte';
	import type { Page } from '$lib/Page';
	import View from '$lib/View.svelte';

	let page: Page = 'calendar';
	let state = 'maximized';
	let innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<main>
	<Sidebar bind:page bind:state />
	{#if state === 'minimized' || (state === 'maximized' && innerWidth >= 500)}
		{#if page === 'calendar'}
			<Calendar />
		{:else if page === 'add'}
			<Add bind:page />
		{:else if typeof page === 'number'}
			<View {page} />
		{/if}
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: row;
		width: 100%;
		background-color: #f5f5f5;
	}
</style>
