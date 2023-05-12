<script lang="ts">
    import Sidebar from '$lib/Sidebar.svelte';
    import Home from '$lib/Home.svelte';
    import Create from "$lib/Create.svelte";

    enum Page {
        Home,
        Create,
        View
    }

    let page: Page = Page.Create;
</script>
<main>
    <Sidebar bind:page={page}/>
    {#if page === Page.Home}
        <Home/>
    {:else if page === Page.Create}
        <Create/>
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