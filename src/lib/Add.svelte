<script>
	import { onMount } from 'svelte';

	let selectedicon = '';
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
</script>

<svelte:head>
	<title>Add Anniversary</title>
</svelte:head>

<div class="wrapper">
	<form>
        <div class="input-group">
            <label for="name">Event Name</label>
            <input type="text" id="name" placeholder="Wedding Day" required />
		</div>
        <div class="input-group">
            <label for="date">Event Date</label>
            <input type="date" id="date" required />
        </div>
        <div class="input-group">
            <label for="icon">Event icon</label>
            <div class="icon-box">
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

    input, .icon-box {
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

	.icon-box button:hover {
		background-color: #f2f2f2;
	}

	:global(.activeicon) {
		background-color: #e6e6e6 !important;
	}

    button i {
        pointer-events: none;
    }
</style>
