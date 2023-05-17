<svelte:head>
	<title>{associated.title}</title>
</svelte:head>
<script lang="ts">
	import type { Page } from "$lib/Page";
    import events from "$lib/Events"

    function getNextDate(date: Date): Date {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        const nextBirthday = new Date(currentYear, date.getMonth(), date.getDate()+1);

        if (nextBirthday < currentDate) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        return nextBirthday;
    }

    export let page: Page;
    // This page won't be rendered unless page is a number
    // So this error can be safely ignored
    // @ts-ignore
    $: associated = $events[page- 1];
</script>
<div class="wrapper">
    {Math.floor((Date.now() - new Date(associated.date).getTime()) / (24 * 60 * 60 * 1000))-1}
    {getNextDate(new Date(associated.date)).toLocaleDateString()}
</div>
<style>
	.wrapper {
		min-height: 100vh;
		background-color: #fafafa;
		flex: 1;
	}
</style>
