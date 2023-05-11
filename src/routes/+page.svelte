<script lang="ts">
    import Sidebar from '$lib/Sidebar.svelte';
    import Content from '$lib/Content.svelte';
</script>
<main>
    <Sidebar/>
    <Content/>
</main>
<style>
    main {
        display: flex;
        flex-direction: row;
        width: 100%;
        background-color: #f5f5f5;
    }
</style>