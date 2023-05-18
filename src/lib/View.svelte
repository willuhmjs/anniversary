<script lang="ts">
	import type { Page } from '$lib/Page';
	import events from '$lib/Events';

	// External functions
	function calculateAnniversary(
		startDate: Date,
		endDate: Date
	): { nextOccurrence: Date; duration: string; timeUntilNext: string; oneYearPassed: boolean } {
		const today = startDate;
		const nextOccurrence = new Date(endDate);
		nextOccurrence.setDate(nextOccurrence.getDate() + 1);
		// Check if one full year has passed
		const oneYearPassed = today.getTime() - endDate.getTime() >= 31536000000; // 1 year = 365 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

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

		return { nextOccurrence, duration, timeUntilNext, oneYearPassed };
	}

	function calculateDuration(startDate: Date, endDate: Date): string {
		const currentDate = new Date();

		if (endDate.getTime() > currentDate.getTime()) {
			const remainingTime = endDate.getTime() - currentDate.getTime();
			const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));

			if (remainingDays === 0) {
				return "It's today!";
			}

			const remainingYears = Math.floor(remainingDays / 365);
			const remainingMonths = Math.floor((remainingDays % 365) / 30);
			const remainingDaysOfMonth = remainingDays % 30;

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

			return duration;
		} else {
			const daysSince = Math.floor(
				(currentDate.getTime() - endDate.getTime()) / (24 * 60 * 60 * 1000)
			);

			if (daysSince === 0) {
				return "It's today!";
			}

			const years = Math.floor(daysSince / 365);
			const months = Math.floor((daysSince % 365) / 30);
			const days = (daysSince % 365) % 30;

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

			return duration;
		}
	}

	export let page: Page;
	// This page won't be rendered unless page is a number
	// So this error can be safely ignored
	// @ts-ignore
	$: associated = $events[page - 1];
</script>

<svelte:head>
	<title>{associated.title}</title>
</svelte:head>

<div class="wrapper">
	Start Date: {calculateAnniversary(new Date(), new Date(associated.date)).duration}
	<br />
	Next Occurrence: {calculateAnniversary(
		new Date(),
		new Date(associated.date)
	).nextOccurrence.toDateString()}
	<br />
	Time Until Next: {calculateAnniversary(new Date(), new Date(associated.date)).timeUntilNext}
	<br />
	Anniversary Type: {calculateAnniversary(new Date(), new Date(associated.date)).oneYearPassed
		? 'Yearly'
		: 'Monthly'}
</div>

<style>
	.wrapper {
		min-height: 100vh;
		background-color: #fafafa;
		flex: 1;
	}
</style>
