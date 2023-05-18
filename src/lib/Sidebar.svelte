<script lang="ts">
	import type { Page } from '$lib/Page';
	import events from '$lib/Events';
	let sidebar: HTMLDivElement;
	export let state = '';
	function toggleMenu() {
		if (sidebar) {
			sidebar.classList.toggle('minimized');
			sidebar.classList.toggle('maximized');
			state = sidebar.classList.contains('minimized') ? 'minimized' : 'maximized';
		}
	}
	export let page: Page;
</script>

<div bind:this={sidebar} class="maximized">
	<button class="menuButton" on:click={toggleMenu}>
		<i class="fa-solid fa-compress maximizedIcon" />
		<i class="fa-solid fa-bars minimizedIcon" />
		<p>Minimize Menu</p>
	</button>
	<button
		class="menuButton {page == 'calendar' ? 'active' : ''}"
		on:click={() => (page = 'calendar')}
	>
		<i class="fa-solid fa-calendar" />
		<p>Anniversary Calendar</p>
	</button>
	<button class="menuButton {page == 'add' ? 'active' : ''}" on:click={() => (page = 'add')}>
		<i class="fa-solid fa-calendar-plus" />
		<p>Add Anniversary</p>
	</button>
	{#each $events as event}
		<button
			class="menuButton {page === event.id ? 'active' : ''}"
			on:click={() => (page = event.id)}
			><i class="fa-solid {event.icon}" />
			<p>{event.title}</p></button
		>
	{/each}
</div>

<style>
	div {
		min-height: 100vh;
		background-color: #f5f5f5;
		border-right: 2px solid #cacaca;
	}

	:global(.active) {
		background-color: #ff1744;
		color: white;
	}

	.maximized {
		width: 20rem;
	}

	.maximized .menuButton {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.menuButton p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.minimized .menuButton p,
	.minimized .menuButton .maximizedIcon,
	.maximized .menuButton .minimizedIcon {
		display: none;
	}

	:global(.minimized) {
		width: 60px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.menuButton:first-child {
		border: 0;
		border-top: 1px solid #cacaca;
		border-bottom: 2px solid #cacaca;
	}

	.menuButton {
		min-height: 50px;
		width: 100%;
		font-size: 20px;
		border: 0;
		border-bottom: 2px solid #cacaca;
	}

	:global(.maximized .menuButton *) {
		margin: 0 8px;
	}

	.menuButton:hover:not(.active),
	.menuButton:focus:not(.active) {
		background-color: #e0e0e0;
		cursor: pointer;
	}
</style>
