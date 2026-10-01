import { onMount } from 'svelte';
import { SvelteDate } from 'svelte/reactivity';

export const toolNames = ['JSON', 'Base64', 'URL', 'Timestamp', 'UUID', 'Regex'] as const;
export type ToolName = (typeof toolNames)[number];

export class ToolsPageState {
	tool = $state<ToolName>('JSON');
	input = $state('{"name":"DevLab","features":["learn","try","build"]}');
	output = $state('');
	hasRun = $state(false);
	error = $state('');
	copied = $state(false);
	regexFlags = $state('gi');
	regexTest = $state('DevLab makes developer concepts easier to practice.');
	regexPattern = $state('devlab');
	description = $derived(
		this.tool === 'JSON'
			? 'Validate and pretty-print JSON.'
			: this.tool === 'Base64'
				? 'Encode or decode text using Base64.'
				: this.tool === 'URL'
					? 'Encode or decode URL components.'
					: this.tool === 'Timestamp'
						? 'Convert dates and Unix timestamps.'
						: this.tool === 'UUID'
							? 'Generate browser-native UUIDs.'
							: 'Test a JavaScript regular expression against text.'
	);
	regexMatches = $derived.by(() => {
		if (!this.hasRun || this.tool !== 'Regex' || !this.regexPattern) return [];
		try {
			const flags = this.regexFlags.includes('g') ? this.regexFlags : `${this.regexFlags}g`;
			return Array.from(this.regexTest.matchAll(new RegExp(this.regexPattern, flags))).map(
				(match) => match[0]
			);
		} catch {
			return [];
		}
	});

	constructor() {
		onMount(() => {
			this.setTool(this.tool);
		});
	}

	process() {
		this.copied = false;
		this.error = '';
		this.hasRun = true;

		try {
			if (this.tool === 'JSON') {
				this.output = JSON.stringify(JSON.parse(this.input), null, 2);
			} else if (this.tool === 'Base64') {
				this.output = btoa(unescape(encodeURIComponent(this.input)));
			} else if (this.tool === 'URL') {
				this.output = encodeURIComponent(this.input);
			} else if (this.tool === 'Timestamp') {
				const raw = this.input.trim();
				const numeric = raw !== '' && /^-?\d+$/.test(raw) ? Number(raw) : NaN;
				const date = Number.isFinite(numeric)
					? new SvelteDate(Math.abs(numeric) < 10_000_000_000 ? numeric * 1000 : numeric)
					: new SvelteDate(raw || Date.now());
				if (Number.isNaN(date.getTime())) throw new Error('Enter a valid date or Unix timestamp.');
				this.output = JSON.stringify(
					{
						iso: date.toISOString(),
						unixSeconds: Math.floor(date.getTime() / 1000),
						unixMilliseconds: date.getTime()
					},
					null,
					2
				);
			} else if (this.tool === 'UUID') {
				this.output = crypto.randomUUID();
			} else {
				new RegExp(this.regexPattern, this.regexFlags);
				this.output = JSON.stringify(
					{ matches: this.regexMatches, count: this.regexMatches.length },
					null,
					2
				);
			}
		} catch (caught) {
			this.error = caught instanceof Error ? caught.message : String(caught);
			this.output = '';
		}
	}

	decodeBase64() {
		this.error = '';
		this.hasRun = true;
		try {
			this.output = decodeURIComponent(escape(atob(this.input)));
		} catch {
			this.error = 'The input is not valid Base64 text.';
			this.output = '';
		}
	}

	decodeUrl() {
		this.error = '';
		this.hasRun = true;
		try {
			this.output = decodeURIComponent(this.input);
		} catch {
			this.error = 'The input is not valid URL-encoded text.';
			this.output = '';
		}
	}

	async copyOutput() {
		if (!this.output) return;
		await navigator.clipboard.writeText(this.output);
		this.copied = true;
		window.setTimeout(() => (this.copied = false), 1400);
	}

	generate() {
		this.error = '';
		this.copied = false;
		this.hasRun = true;
		this.output = crypto.randomUUID();
	}

	setTool(name: ToolName) {
		this.tool = name;
		this.output = '';
		this.error = '';
		this.copied = false;
		this.hasRun = false;
		if (name === 'Timestamp') {
			this.input = '2026-01-15T12:00:00.000Z';
		} else if (name === 'JSON') {
			this.input = '{"name":"DevLab","features":["learn","try","build"]}';
		} else if (name === 'Base64') {
			this.input = 'DevLab is a practical developer lab.';
		} else if (name === 'URL') {
			this.input = 'DevLab & practice';
		} else if (name === 'Regex') {
			this.regexTest = 'DevLab makes developer concepts easier to practice.';
			this.regexPattern = 'devlab';
			this.regexFlags = 'gi';
			this.input = this.regexTest;
		} else {
			this.input = 'No input required — press Generate UUID.';
		}
	}
}
