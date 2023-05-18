<svelte:head>
    <title>{associated.title}</title>
</svelte:head>

<script lang="ts">
    import type { Page } from "$lib/Page";
    import events from "$lib/Events";

    // External functions
    function calculateAnniversary(startDate: Date, endDate: Date): { nextOccurrence: Date, duration: string, timeUntilNext: string } {
        const today = startDate;
        const nextOccurrence = new Date(endDate);
        nextOccurrence.setDate(nextOccurrence.getDate() + 1);
        // Check if one full year has passed
        const oneYearPassed = (today.getTime() - endDate.getTime()) >= 31536000000; // 1 year = 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

        // Calculate the next occurrence of the anniversary
        if (!oneYearPassed) {
            while (nextOccurrence < today) {
                nextOccurrence.setMonth(nextOccurrence.getMonth() + 1);
            }
        } else {
            while (nextOccurrence < today) {
                nextOccurrence.setFullYear(nextOccurrence.getFullYear() + 1);
            }
        }

        // Calculate the duration since the past event
        const duration = calculateDuration(startDate, endDate);

        // Calculate the time until the next occurrence
        const timeUntilNext = calculateDuration(today, nextOccurrence);

        return { nextOccurrence, duration, timeUntilNext };
    }

    function calculateDuration(startDate: Date, endDate: Date): string {
        const currentDate = new Date(); // Get the current date
        if (endDate.getTime() > currentDate.getTime()) {
            // Calculate the remaining time until the end date
            const remainingTime = endDate.getTime() - currentDate.getTime();

            const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
            const remainingYears = Math.floor(remainingDays / 365);
            const remainingMonths = Math.floor((remainingDays % 365) / 30);
            const remainingDaysOfMonth = Math.floor((remainingDays % 365) % 30);

            let duration = '';

            if (remainingYears > 0) {
                duration += `${remainingYears} ${remainingYears === 1 ? 'year' : 'years'}`;
            }

            if (remainingMonths > 0) {
                duration += `${duration ? ', ' : ''}${remainingMonths} ${
                    remainingMonths === 1 ? 'month' : 'months'
                }`;
            }

            if (remainingDaysOfMonth > 0) {
                duration += `${duration ? ', ' : ''}${remainingDaysOfMonth} ${
                    remainingDaysOfMonth === 1 ? 'day' : 'days'
                }`;
            }
            if (duration === "0 days") return "It's today!";
            return duration;
        } else {
            // Calculate the duration between the start date and end date
            const daysSince = Math.floor((startDate.getTime() - endDate.getTime()) / (24 * 60 * 60 * 1000));
            const years = Math.floor(daysSince / 365);
            const months = Math.floor((daysSince % 365) / 30);
            const days = Math.floor((daysSince % 365) % 30);

            let duration = '';

            if (years > 0) {
                duration += `${years} ${years === 1 ? 'year' : 'years'}`;
            }

            if (months > 0) {
                duration += `${duration ? ', ' : ''}${months} ${months === 1 ? 'month' : 'months'}`;
            }

            if (days >= 0) {
                duration += `${duration ? ', ' : ''}${days} ${days === 1 ? 'day' : 'days'}`;
            }
            console.log(duration);
            if (duration === "0 days") return "It's today!";

            return duration;
        }
    }

    export let page: Page;
    // This page won't be rendered unless page is a number
    // So this error can be safely ignored
    // @ts-ignore
    $: associated = $events[page - 1];
</script>

<div class="wrapper">
    {calculateAnniversary(new Date(), new Date(associated.date)).duration}
    <br />
    Next Occurrence: {calculateAnniversary(new Date(), new Date(associated.date)).nextOccurrence.toDateString()}
    <br />
    Time Until Next: {calculateAnniversary(new Date(), new Date(associated.date)).timeUntilNext}
</div>

<style>
    .wrapper {
        min-height: 100vh;
        background-color: #fafafa;
        flex: 1;
    }
</style>
