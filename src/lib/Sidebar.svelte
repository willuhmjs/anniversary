<script lang="ts">
    let sidebar: HTMLDivElement;
    let toggleButton: HTMLButtonElement;
    function toggleMenu() {
        if (sidebar) {
            sidebar.classList.toggle('minimized');
            sidebar.classList.toggle('maximized');
            toggleButton.innerText = sidebar.classList.contains('minimized') ? '☰' : 'X';
        }
    }
</script>
<div bind:this={sidebar} class="maximized">
<button id="toggleMenuButton" bind:this={toggleButton} on:click={toggleMenu}>X</button>
</div>
<style>
    div {
        min-height: 100vh;
        background-color: #f5f5f5;
        border-right: 2px solid #cacaca;
        padding: 8px;
    }

    .maximized {
        width: 320px;
    }

    :global(.minimized) {
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #toggleMenuButton {
        border-radius: 10px;
        height: 40px;
        width: 40px;
        font-size: 30px;
        border: 1px solid #cacaca;
    }
</style>

