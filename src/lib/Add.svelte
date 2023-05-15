<script>
	import { onMount } from 'svelte';

	let selectedEmoji = '';
	let activeButton;

	function handleEmojiClick(event) {
		const button = event.target;
		selectedEmoji = button.value;

		if (activeButton) {
			activeButton.classList.remove('activeEmoji');
		}

		button.classList.add('activeEmoji');
		activeButton = button;
	}

	onMount(() => {
		const buttons = document.querySelectorAll('.emoji-box button');
		buttons.forEach((button, index) => {
			if (index === 0) {
				button.classList.add('activeEmoji');
				activeButton = button;
				selectedEmoji = button.value;
			}
			button.addEventListener('click', handleEmojiClick);
		});
	});
</script>

<svelte:head>
	<title>Add Anniversary</title>
</svelte:head>

<div class="wrapper">
	<form>
		<input type="text" placeholder="Name" required />
		<input type="date" required />
		<div class="emoji-box">
			<button type="button" value="fa-heart"><i class="fa-solid fa-heart"></i></button>
			<button type="button" value="fa-cake-candles"><i class="fa-solid fa-cake-candles"></i></button>
			<button type="button" value="fa-baby"><i class="fa-solid fa-baby"></i></button>
			<button type="button" value="fa-champagne-glasses"><i class="fa-solid fa-champagne-glasses"></i></button>
			<button type="button" value="fa-gift"><i class="fa-solid fa-gift"></i></button>
            <button type="button" value="fa-clock"><i class="fa-solid fa-clock"></i></button>
            <button type="button" value="fa-graduation-cap"><i class="fa-solid fa-graduation-cap"></i></button>
            <button type="button" value="fa-star"><i class="fa-solid fa-star"></i></button>
            <button type="button" value="fa-plane-departure"><i class="fa-solid fa-plane-departure"></i></button>
            <button type="button" value="fa-umbrella-beach"><i class="fa-solid fa-umbrella-beach"></i></button>  
		</div>

		<input
			type="hidden"
			id="selected-emoji"
			name="selected-emoji"
			bind:value={selectedEmoji}
			required
		/>
		<input type="submit" value="Add Anniversary" />
	</form>
</div>

<style>
	.wrapper {
		flex: 3;
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
		max-width: 320px;
		padding: 16px;
	}

	input {
		margin: 8px 0;
		padding: 8px;
		border: 1px solid #cacaca;
		border-radius: 4px;
		width: 100%;
		max-width: 320px;
	}

	input[type='submit'] {
		background-color: #ff1744;
		color: #fff;
		border: 0;
		border-radius: 4px;
		cursor: pointer;
	}

    .emoji-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
    grid-gap: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 320px;
  }

	.emoji-box button {
		padding: 5px 10px;
		border: none;
		background-color: transparent;
		font-size: 24px;
		cursor: pointer;
	}

	.emoji-box button:hover {
		background-color: #f2f2f2;
	}

	:global(.activeEmoji) {
		background-color: #e6e6e6 !important;
	}
</style>
