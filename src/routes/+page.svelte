<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import Home from '$lib/Home.svelte';
	import Add from '$lib/Add.svelte';
	import type { Page } from '$lib/Page';

	let page: Page = "calendar";
    let state = 'maximized';
	let innerWidth = 0;

</script>
<svelte:window bind:innerWidth></svelte:window>

<main>
	<Sidebar bind:page bind:state />
	{#if state === 'minimized' || (state === 'maximized' && innerWidth >= 500)}
		{#if page === "calendar"}
			<Home />
		{:else if page === "create"}
			<Add />
		{:else if page === "view"}
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
