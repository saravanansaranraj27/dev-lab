export class ApiPageState {
	method = $state('GET');
	url = $state('https://jsonplaceholder.typicode.com/todos/1');
	body = $state(`{
  "title": "DevLab"
}`);
	headers = $state(`{
  "Accept": "application/json"
}`);
	response = $state('');
	status = $state('');
	duration = $state('');
	contentType = $state('');
	error = $state('');
	loading = $state(false);
	copied = $state(false);

	async sendRequest() {
		this.loading = true;
		this.error = '';
		this.copied = false;
		this.response = '';
		this.status = '';
		this.duration = '';
		this.contentType = '';
		const started = performance.now();

		try {
			const init: RequestInit = { method: this.method };
			const parsedHeaders = this.headers.trim() ? JSON.parse(this.headers) : {};
			if (typeof parsedHeaders !== 'object' || Array.isArray(parsedHeaders)) {
				throw new Error('Headers must be a JSON object.');
			}

			init.headers = parsedHeaders as Record<string, string>;
			if (['POST', 'PUT', 'PATCH'].includes(this.method)) {
				init.headers = {
					'Content-Type': 'application/json',
					...(parsedHeaders as Record<string, string>)
				};
				init.body = this.body;
			}

			const result = await fetch(this.url, init);
			const text = await result.text();
			this.duration = `${Math.round(performance.now() - started)} ms`;
			this.status = `${result.status} ${result.statusText}`;
			this.contentType = result.headers.get('content-type') ?? 'unknown';

			try {
				this.response = JSON.stringify(JSON.parse(text), null, 2);
			} catch {
				this.response = text;
			}
		} catch (caught) {
			this.error = caught instanceof Error ? caught.message : String(caught);
			this.response = 'Request failed. Check the URL and browser network policy.';
		} finally {
			this.loading = false;
		}
	}

	async copyResponse() {
		if (!this.response) return;
		await navigator.clipboard.writeText(this.response);
		this.copied = true;
		window.setTimeout(() => (this.copied = false), 1200);
	}
}
