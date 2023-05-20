<script lang="ts">
	import type { Page } from '$lib/Page';
	import events from '$lib/Events';
	import moment from 'moment';

	// External functions
	function calculateAnniversary(
		startDate: Date,
		endDate: Date
	): {
		nextOccurrence: Date;
		duration: string;
		timeUntilNext: string;
		anniversaryNumber: string;
	} {
		const today = moment(startDate);
		const nextOccurrence = moment(endDate).add(1, 'day');

		// Check if one full year has passed
		const oneYearPassed = today.diff(endDate, 'years') >= 1;

		// Calculate the next occurrence of the anniversary
		if (!oneYearPassed) {
			while (nextOccurrence.isBefore(today)) {
				nextOccurrence.add(1, 'month');
			}
		} else {
			while (nextOccurrence.isBefore(today)) {
				nextOccurrence.add(1, 'year');
			}
		}

		// Calculate the duration since the past event
		const duration = calculateDuration(startDate, endDate);

		// Calculate the time until the next occurrence
		const timeUntilNext = calculateDuration(today.toDate(), nextOccurrence.toDate());

		// Calculate the anniversary number
		const anniversaryNumber = calculateAnniversaryNumber(startDate, endDate, oneYearPassed);

		return { nextOccurrence: nextOccurrence.toDate(), duration, timeUntilNext, anniversaryNumber };
	}

	function calculateDuration(startDate: Date, endDate: Date): string {
		const currentDate = moment(startDate);
		const remainingDuration = moment.duration(currentDate.diff(endDate));
		console.log(remainingDuration.asDays());
		let years = remainingDuration.years();
		let months = remainingDuration.months();
		let days = remainingDuration.days();

		if (remainingDuration.asDays() <= -1) {
			years *= -1;
			months *= -1;
			days *= -1;
		}

		let duration = '';

		if (years > 0) {
			duration += `${years} ${years === 1 ? 'year' : 'years'}`;
		}

		if (months > 0) {
			duration += `${duration ? ', ' : ''}${months} ${months === 1 ? 'month' : 'months'}`;
		}

		if (days > 0) {
			duration += `${duration ? ' and ' : ''}${days} ${days === 1 ? 'day' : 'days'}`;
		}

		return duration;
	}

	function calculateAnniversaryNumber(
		startDate: Date,
		endDate: Date,
		oneYearPassed: boolean
	): string {
		const today = moment(startDate);

		if (oneYearPassed) {
			const yearsPassed = today.diff(endDate, 'years') + 1;
			return `${yearsPassed} year`;
		} else {
			const monthsPassed = today.diff(endDate, 'months') + 1;
			return `${monthsPassed} month`;
		}
	}

	export let page: Page;
	// This page won't be rendered unless page is a number
	// So this error can be safely ignored
	// @ts-ignore
	$: associated = $events[page - 1];
	$: calculated = calculateAnniversary(new Date(), new Date(associated.date));
</script>

<svelte:head>
	<title>{associated.title}</title>
</svelte:head>

<div class="wrapper">
	<div class="center">
		<h1>{calculated.timeUntilNext ? calculated.timeUntilNext : "It's today!"}</h1>
		<p>
			The {calculated.anniversaryNumber} anniversary of <b>{associated.title}</b> is on:
			<br />
			<i
				>{calculated.nextOccurrence.toLocaleDateString(undefined, {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})}.</i
			>
		</p>
		<p>This event was {calculated.duration ? `${calculated.duration} ago.` : 'today!'}</p>
	</div>
</div>

<style>
	.wrapper {
		min-height: 100vh;
		background-color: #fafafa;
		flex: 1;
		display: flex;
		align-items: center;
	}

	.center {
		max-width: 50vw;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.center h1 {
		font-size: 3rem;
		line-height: 1.5;
		color: #333;
	}

	.center p {
		font-size: 1.5rem;
		line-height: 1.5;
		color: #333;
	}

	.center p {
		word-wrap: break-word;
	}
</style>
