<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import Home from '$lib/Home.svelte';
	import Add from '$lib/Add.svelte';
	import { Page } from '$lib/Page';

	let page: Page = Page.Calendar;
    let state = 'maximized';
	let innerWidth = 0;

</script>
<svelte:window bind:innerWidth></svelte:window>

<main>
	<Sidebar bind:page bind:state />
	{#if state === 'minimized' || (state === 'maximized' && innerWidth > 500)}
		{#if page === Page.Calendar}
			<Home />
		{:else if page === Page.Create}
			<Add />
		{:else if page === Page.View}
			<h1>View</h1>
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
