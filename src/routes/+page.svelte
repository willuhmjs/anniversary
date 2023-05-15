<script lang="ts">
	import Sidebar from '$lib/Sidebar.svelte';
	import Home from '$lib/Home.svelte';
	import Add from '$lib/Add.svelte';
	import { Page } from '$lib/Page';

	let page: Page = Page.Calendar;
    let state = 'maximized';

</script>

<main>
	<Sidebar bind:page bind:state />
	{#if page === Page.Calendar}
		<Home />
	{:else if page === Page.Create}
		<Add />
	{:else if page === Page.View}
		<h1>View</h1>
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
