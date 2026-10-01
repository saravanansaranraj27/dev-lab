<script lang="ts">
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import Topbar from '$lib/components/layout/Topbar.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import ConsoleOutput from '$lib/components/ui/ConsoleOutput.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { ApiPageState } from '$lib/features/api/api.svelte';

	const apiState = new ApiPageState();
	const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
	let copied = $state(false);
	async function copyRequest() {
		const headers = (() => {
			try {
				return apiState.headers ? JSON.parse(apiState.headers) : {};
			} catch {
				return apiState.headers;
			}
		})();
		const request = JSON.stringify(
			{ method: apiState.method, url: apiState.url, headers, body: apiState.body || undefined },
			null,
			2
		);
		await navigator.clipboard.writeText(request);
		copied = true;
		window.setTimeout(() => (copied = false), 1200);
	}
</script>

<Sidebar active="api" />
<main class="page-shell page-api page-playground">
	<Topbar
		title="API Lab"
		subtitle="Compose an HTTP request and inspect the response like a developer."
	/>

	<section class="playground-toolbar glass">
		<div class="field mode-field">
			<Select
				value={apiState.method}
				options={methods}
				label="Method"
				ariaLabel="HTTP method"
				onchange={(value) => (apiState.method = value)}
			/>
		</div>
		<div class="playground-context">
			<span class="eyebrow">HTTP · SANDBOXED</span>
			<strong>API request playground</strong>
			<p>Compose a request in the left panel and inspect the response in the right console.</p>
		</div>
		<div class="actions">
			<button
				class="button"
				type="button"
				onclick={() => {
					apiState.response = '';
					apiState.error = '';
					apiState.status = '';
					apiState.duration = '';
					apiState.contentType = '';
				}}
			>
				Reset
			</button>
			<button
				class="button primary"
				type="button"
				onclick={() => apiState.sendRequest()}
				disabled={apiState.loading}
			>
				{apiState.loading ? 'Sending…' : 'Run ▶'}
			</button>
		</div>
	</section>

	<section class="editor-grid api-playground-grid">
		<article class="editor-panel glass api-editor">
			<div class="panel-bar">
				<span class="file-label"><span class="file-dot"></span>request.json</span>
				<span class="panel-bar-end"
					><span>{apiState.loading ? 'Running…' : 'Ready'}</span><button
						class="icon-button"
						type="button"
						aria-label="Copy request"
						title={copied ? 'Copied' : 'Copy request'}
						onclick={copyRequest}><Icon name={copied ? 'check' : 'copy'} size={16} /></button
					></span
				>
			</div>

			<div class="request-line api-request-line">
				<Select
					value={apiState.method}
					options={methods}
					ariaLabel="HTTP method"
					onchange={(value) => (apiState.method = value)}
				/>
				<input bind:value={apiState.url} aria-label="Request URL" />
			</div>

			<label class="field api-field">
				<span>Headers · JSON</span>
				<textarea class="headers" bind:value={apiState.headers} spellcheck="false"></textarea>
			</label>

			<label class="field api-field">
				<span>JSON body</span>
				<textarea
					bind:value={apiState.body}
					disabled={!['POST', 'PUT', 'PATCH'].includes(apiState.method)}
					spellcheck="false"></textarea>
			</label>

			<div class="editor-footer"><span>HTTP request</span></div>
		</article>

		<article class="output-panel api-output">
			<ConsoleOutput
				label="Console"
				output={apiState.response}
				error={apiState.error}
				onClear={() => {
					apiState.response = '';
					apiState.error = '';
				}}
			/>
		</article>
	</section>

	<section class="api-result-strip">
		<div class="glass result-meta">
			<span
				>STATUS <strong class:success={apiState.status.startsWith('2')}
					>{apiState.status || '—'}</strong
				></span
			>
			<span>TIME <strong>{apiState.duration || '—'}</strong></span>
			<span>TYPE <strong>{apiState.contentType || '—'}</strong></span>
		</div>
		<div class="result-actions">
			<button
				class="button response-copy"
				type="button"
				onclick={() => apiState.copyResponse()}
				disabled={!apiState.response}
				aria-label={apiState.copied ? 'Response copied' : 'Copy response'}
			>
				<span>{apiState.copied ? 'Copied' : 'Copy response'}</span>
				<Icon name={apiState.copied ? 'check' : 'copy'} size={16} />
			</button>
		</div>
	</section>

	<section class="http-grid">
		<article class="glass info">
			<strong>GET</strong>
			<p>Read a resource without sending a request body.</p>
		</article>
		<article class="glass info">
			<strong>POST</strong>
			<p>Send data to create or trigger something on the server.</p>
		</article>
		<article class="glass info">
			<strong>STATUS CODES</strong>
			<p>2xx generally means success; 4xx points to a client-side request problem.</p>
		</article>
	</section>

	<section class="http-grid api-notes">
		<article class="glass info">
			<strong>HEADERS</strong>
			<p>
				Headers carry metadata such as content type, authorization, caching, and accepted formats.
			</p>
		</article>
		<article class="glass info">
			<strong>BODY</strong>
			<p>JSON request bodies should match the server contract and the selected HTTP method.</p>
		</article>
		<article class="glass info">
			<strong>DEBUGGING</strong>
			<p>
				Compare status, headers, response body, and elapsed time instead of treating every failure
				as a network problem.
			</p>
		</article>
	</section>

	<section class="page-bottom-section glass">
		<div class="bottom-section-head">
			<span class="eyebrow">API WORKFLOW</span>
			<h2>Build the request, inspect the response, and learn from the contract.</h2>
		</div>
		<div class="bottom-section-grid">
			<article>
				<strong>Request</strong>
				<p>
					Choose an HTTP method, enter the endpoint, then shape headers and a JSON body when the
					method accepts one.
				</p>
			</article>
			<article>
				<strong>Response</strong>
				<p>
					Read status, response type, elapsed time, and the body together instead of treating the
					response as just a status code.
				</p>
			</article>
			<article>
				<strong>Formats</strong>
				<p>
					Practice HTTP, REST-style endpoints, headers, and JSON payloads in a browser-first
					workflow.
				</p>
			</article>
		</div>
	</section>
</main>
