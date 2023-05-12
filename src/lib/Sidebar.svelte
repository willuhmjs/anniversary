<script lang="ts">
    let sidebar: HTMLDivElement;
    let toggleButton: HTMLButtonElement;
    function toggleMenu() {
        if (sidebar) {
            sidebar.classList.toggle('minimized');
            sidebar.classList.toggle('maximized');
            // todo dont use innerhtml lol
        }
    }
</script>
<div bind:this={sidebar} class="maximized">
<button class="menuButton" bind:this={toggleButton} on:click={toggleMenu}>
    <i class="fa-solid fa-compress maximizedIcon"></i>
    <i class="fa-solid fa-bars minimizedIcon"></i>
    <p>Minimize Menu</p>
</button>
<button class="menuButton">
    <i class="fa-solid fa-calendar-plus"></i>
    <p>Add Anniversary</p>
</button>
</div>
<style>
    div {
        min-height: 100vh;
        background-color: #f5f5f5;
        border-right: 2px solid #cacaca;
    }

    .maximized {
        width: 320px;
    }

    .maximized .menuButton {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .minimized .menuButton p, .minimized .menuButton .maximizedIcon, .maximized .menuButton .minimizedIcon{
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
        height: 40px;
        width: 100%;
        font-size: 20px;
        border: 0;
        border-bottom: 2px solid #cacaca;
    }

    :global(.maximized .menuButton *) {
        margin: 0 8px;
    }

    .menuButton:hover, .menuButton:focus {
        background-color: #e5e5e5;
    }

    .menuButton:active {
        background-color: #d5d5d5;
    }
</style>

