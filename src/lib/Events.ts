import { persisted } from 'svelte-local-storage-store';

interface Event {
	id: number;
	title: string;
	date: Date;
	icon: string;
}

export default persisted<Event[]>('events', []);
