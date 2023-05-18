<script lang="ts">
	import { onMount } from 'svelte';
	import events from '$lib/Events';
	import type { Page } from '$lib/Page';
	let selectedicon = '';
	let title: string, date: Date;
	export let page: Page;
	let activeButton;

	function handleiconClick(event) {
		const button = event.target;
		selectedicon = button.value;

		if (activeButton) {
			activeButton.classList.remove('activeicon');
		}

		button.classList.add('activeicon');
		activeButton = button;
	}

	function getMaxDate() {
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate());
		return currentDate.toISOString().substring(0, 10);
	}

	onMount(() => {
		const buttons = document.querySelectorAll('.icon-box button');
		buttons.forEach((button, index) => {
			if (index === 0) {
				button.classList.add('activeicon');
				activeButton = button;
				selectedicon = button.value;
			}
			button.addEventListener('click', handleiconClick);
		});
	});

	let submitForm = (event: Event) => {
		$events = [
			...$events,
			{
				id: $events.length + 1,
				title,
				date,
				icon: selectedicon
			}
		];
		page = $events.length;
		if (event.target instanceof HTMLFormElement) event.target.reset();
	};
</script>

<svelte:head>
	<title>Add Anniversary</title>
</svelte:head>

<div class="wrapper">
	<form on:submit|preventDefault={submitForm}>
		<div class="input-group">
			<label for="name">Anniversary Name</label>
			<input type="text" bind:value={title} placeholder="Wedding Day" required />
		</div>
		<div class="input-group">
			<label for="date">Anniversary Date</label>
			<input type="date" bind:value={date} id="date" max={getMaxDate()} required />
		</div>
		<!--
		<div class="input-group">
			<label for="description">Anniversary Description</label>
			<input type="text" id="description" placeholder={`You will be married for {timeTotal} in {timeTill}`}/>
		</div>
		-->
		<div class="input-group">
			<label for="icon">Anniversary Icon</label>
			<div class="icon-box">
				<button type="button" value="fa-heart"><i class="fa-solid fa-heart" /></button>
				<button type="button" value="fa-cake-candles"><i class="fa-solid fa-cake-candles" /></button
				>
				<button type="button" value="fa-baby-carriage"
					><i class="fa-solid fa-baby-carriage" /></button
				>
				<button type="button" value="fa-champagne-glasses"
					><i class="fa-solid fa-champagne-glasses" /></button
				>
				<button type="button" value="fa-gift"><i class="fa-solid fa-gift" /></button>
				<button type="button" value="fa-clock"><i class="fa-solid fa-clock" /></button>
				<button type="button" value="fa-graduation-cap"
					><i class="fa-solid fa-graduation-cap" /></button
				>
				<button type="button" value="fa-star"><i class="fa-solid fa-star" /></button>
				<button type="button" value="fa-plane-departure"
					><i class="fa-solid fa-plane-departure" /></button
				>
				<button type="button" value="fa-umbrella-beach"
					><i class="fa-solid fa-umbrella-beach" /></button
				>
			</div>

			<input
				type="hidden"
				id="selected-icon"
				name="selected-icon"
				bind:value={selectedicon}
				required
			/>
		</div>
		<input type="submit" value="Add Anniversary" />
	</form>
</div>

<style>
	.wrapper {
		flex: 1;
		min-width: 0;
		min-height: 100vh;
		background-color: #fafafa;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 100%;
		max-width: 400px;
		padding: 16px;
	}

	input {
		padding: 8px;
		border: 1px solid #cacaca;
		border-radius: 4px;
		width: 100%;
	}

	.input-group {
		width: 100%;
		margin: 8px 0;
	}

	input,
	.icon-box {
		margin-top: 8px;
	}

	input[type='submit'] {
		background-color: #ff1744;
		color: #fff;
		border: 0;
		border-radius: 4px;
		cursor: pointer;
	}

	.icon-box {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
		grid-gap: 2px;
		padding: 5px;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 100%;
	}

	.icon-box button {
		padding: 8px 10px;
		border: none;
		background-color: transparent;
		font-size: 22px;
		cursor: pointer;
	}

	.icon-box button i {
		pointer-events: none;
	}

	.icon-box button:hover {
		background-color: #f2f2f2;
	}

	:global(.activeicon) {
		background-color: #e6e6e6 !important;
	}
</style>
