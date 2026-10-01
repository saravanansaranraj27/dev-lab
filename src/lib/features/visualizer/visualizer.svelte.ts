import { algorithms, algorithmInfo, type Algorithm } from './algorithms/catalog';
import { buildAlgorithmSteps } from './algorithms/engine';

const makeArray = (size: number) =>
	Array.from({ length: size }, () => Math.floor(Math.random() * 88) + 12);

export class VisualizerPageState {
	algorithm = $state<Algorithm>('Bubble sort');
	size = $state(12);
	speed = $state(320);
	values = $state<number[]>(makeArray(12));
	stepIndex = $state(0);
	playing = $state(false);
	timer: ReturnType<typeof setTimeout> | undefined;
	steps = $derived(buildAlgorithmSteps(this.values, this.algorithm));
	current = $derived(
		this.steps[Math.min(this.stepIndex, Math.max(this.steps.length - 1, 0))] ?? {
			values: [],
			active: [],
			label: 'Generate an input',
			comparisons: 0,
			swaps: 0
		}
	);

	get algorithmOptions() {
		return algorithms;
	}
	get currentInfo() {
		return algorithmInfo[this.algorithm];
	}
	get speedLabel() {
		return this.speed <= 150
			? 'Fast'
			: this.speed <= 300
				? 'Balanced'
				: this.speed <= 500
					? 'Slow'
					: 'Very slow';
	}
	randomArray() {
		this.stop();
		this.values = makeArray(this.size);
		this.stepIndex = 0;
	}
	changeSize() {
		this.randomArray();
	}
	setAlgorithm(value: string) {
		if (!algorithms.includes(value as Algorithm)) return;
		this.stop();
		this.algorithm = value as Algorithm;
		this.stepIndex = 0;
	}
	changeSpeed() {
		if (this.playing) {
			this.stop();
			this.play();
		}
	}
	next() {
		if (this.stepIndex < this.steps.length - 1) this.stepIndex += 1;
		else this.stop();
	}
	previous() {
		this.stop();
		this.stepIndex = Math.max(0, this.stepIndex - 1);
	}
	play() {
		if (this.playing) {
			this.stop();
			return;
		}
		if (this.stepIndex >= this.steps.length - 1) this.stepIndex = 0;
		this.playing = true;
		this.scheduleNext();
	}
	private scheduleNext() {
		if (!this.playing) return;
		this.timer = setTimeout(() => {
			if (this.stepIndex >= this.steps.length - 1) {
				this.stop();
				return;
			}
			this.stepIndex += 1;
			this.scheduleNext();
		}, this.speed);
	}
	stop() {
		this.playing = false;
		if (this.timer) clearTimeout(this.timer);
		this.timer = undefined;
	}
}
