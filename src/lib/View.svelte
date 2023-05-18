<script lang="ts">
	import type { Page } from '$lib/Page';
	import events from '$lib/Events';
  
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
  
	  // Calculate the anniversary number
	  const anniversaryNumber = calculateAnniversaryNumber(startDate, endDate, oneYearPassed);
  
	  return { nextOccurrence, duration, timeUntilNext, anniversaryNumber };
	}
  
	function calculateDuration(startDate: Date, endDate: Date): string {
	  const currentDate = startDate;
  
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
		  duration += `${duration ? ' and ' : ''}${remainingDaysOfMonth} ${
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
		if (days > 0 && years == 0) {
		  duration += `${duration ? ' and ' : ''}${days} ${days === 1 ? 'day' : 'days'}`;
		} else if (days > 0) {
			duration += `, and ${days} ${days === 1 ? 'day' : 'days'}`;
		}
  
		return duration;
	  }
	}
  
	function calculateAnniversaryNumber(startDate: Date, endDate: Date, oneYearPassed: boolean): string {
	  const today = startDate;
	  
	  if (oneYearPassed) {
		const yearsPassed = (today.getFullYear() - endDate.getFullYear()) + 1;
		return `${yearsPassed} year`;
	  } else {
		const monthsPassed = (today.getFullYear() - endDate.getFullYear()) * 12 + (today.getMonth() - endDate.getMonth()) + 1;
		return `${monthsPassed} month`;
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
	<div class="center">
	  <h2>{calculateAnniversary(new Date(), new Date(associated.date)).timeUntilNext}</h2>
	  <p>The {calculateAnniversary(new Date(), new Date(associated.date)).anniversaryNumber} anniversary of <b>{associated.title}</b> is on {calculateAnniversary(
		new Date(),
		new Date(associated.date)
	  ).nextOccurrence.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}.</p>
	  <p>This event was {calculateAnniversary(new Date(), new Date(associated.date)).duration} ago.</p>
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
	  max-width: 100%;
	  margin: 0 auto;
	  padding: 0 1rem;
	  text-align: center;
	}

	.center p {
		word-wrap: break-word;
	}
  </style>
  