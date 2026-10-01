import { SvelteSet } from 'svelte/reactivity';
import { lessons } from '$lib/data/lessons';

export class LearnPageState {
	search = $state('');
	area = $state('All');
	selected = $state(lessons[0].id);
	showConcept = $state(false);
	areas = ['All', ...new SvelteSet(lessons.map((lesson) => lesson.area))];

	setArea(area: string) {
		if (!this.areas.includes(area)) return;
		this.area = area;
		this.showConcept = false;
		const next = lessons.find((lesson) => {
			const matchesArea = area === 'All' || lesson.area === area;
			const q = this.search.trim().toLowerCase();
			return (
				matchesArea &&
				(!q ||
					`${lesson.title} ${lesson.desc} ${lesson.topics.join(' ')}`.toLowerCase().includes(q))
			);
		});
		if (next) this.selected = next.id;
	}
	visible = $derived(
		lessons.filter((lesson) => {
			const matchesArea = this.area === 'All' || lesson.area === this.area;
			const q = this.search.trim().toLowerCase();
			return (
				matchesArea &&
				(!q ||
					`${lesson.title} ${lesson.desc} ${lesson.topics.join(' ')}`.toLowerCase().includes(q))
			);
		})
	);
	active = $derived(
		this.visible.find((lesson) => lesson.id === this.selected) ?? this.visible[0] ?? lessons[0]
	);
}
