import{$ as e,E as t,G as n,H as r,I as i,S as a,T as o,U as s,V as c,W as l,Y as u,Z as d,_ as f,b as p,c as m,ct as h,et as g,g as _,k as v,lt as y,mt as b,n as x,nt as S,rt as C,u as w,ut as T,v as E,w as D,y as O}from"../chunks/DMk5LJc6.js";import"../chunks/xihTtKlq.js";import{t as k}from"../chunks/D3IWj61p.js";import{n as A,t as j}from"../chunks/CZiqLibq.js";import{t as M}from"../chunks/DCEfeLqu.js";import{t as N}from"../chunks/DzGBB59B.js";import{t as P}from"../chunks/HEuYPlnw.js";import{t as F}from"../chunks/Da2h0lfT.js";import{a as I,c as L,i as R,n as z,o as ee,r as B,s as V,t as H}from"../chunks/2nVLDp2m.js";var U=b(L(),1),W=[`JavaScript`,`TypeScript`,`HTML`,`CSS`,`JSON`,`SQL`],G=`const numbers = [2, 4, 6, 8];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);`,K=`type User = {
  name: string;
  role: 'admin' | 'member';
};

const user: User = {
  name: 'user_001',
  role: 'admin'
};

console.log(user);`,q=`<main class="card">
  <span class="eyebrow">DEVLAB</span>
  <h1>Hello, web.</h1>
  <p>Edit this HTML and watch the preview update.</p>
  <button type="button">Try it</button>
</main>`,J=`.card {
  max-width: 460px;
  margin: 40px auto;
  padding: 28px;
  border: 1px solid #ddd;
  border-radius: 18px;
  font-family: system-ui, sans-serif;
}

.eyebrow {
  color: #e94b0d;
  font-weight: 800;
  letter-spacing: 0.12em;
}

button {
  padding: 10px 16px;
  border: 0;
  border-radius: 10px;
  background: #e94b0d;
  color: white;
}`,Y=`SELECT username, email
FROM users
WHERE department_id = 2
ORDER BY username;`,X=`{
  "name": "DevLab",
  "type": "learning",
  "topics": ["JavaScript", "TypeScript", "HTML", "CSS"]
}`,Z=`
const entries = [];
const activeTimers = new Set();
const timerTokens = new Map();
const activeFetches = new Set();
const counts = new Map();
const timers = new Map();
const groups = [];
const originalSetTimeout = setTimeout;
const originalClearTimeout = clearTimeout;
const originalSetInterval = setInterval;
const originalClearInterval = clearInterval;
const originalFetch = typeof fetch === 'function' ? fetch.bind(self) : undefined;

const serialize = (value, seen = new WeakSet()) => {
  if (typeof value === 'undefined') return 'undefined';
  if (typeof value === 'bigint') return value.toString() + 'n';
  if (typeof value === 'symbol') return value.toString();

  if (typeof value === 'function') {
    return '[Function ' + (value.name || 'anonymous') + ']';
  }

  if (value instanceof Error) {
    return value.name + ': ' + value.message;
  }

  if (typeof value === 'number' && Number.isNaN(value)) {
    return 'NaN';
  }

  if (value === Infinity) return 'Infinity';
  if (value === -Infinity) return '-Infinity';

  if (typeof value === 'string') {
    return value;
  }

  if (value === null) {
    return 'null';
  }

  if (typeof value === 'object') {
    if (seen.has(value)) {
      return '[Circular]';
    }

    seen.add(value);

    if (Array.isArray(value)) {
      return '[' + value.map((item) => serialize(item, seen)).join(', ') + ']';
    }

    try {
      return JSON.stringify(
        value,
        (_, item) =>
          typeof item === 'bigint'
            ? item.toString() + 'n'
            : item,
        2
      );
    } catch {
      return String(value);
    }
  }

  return String(value);
};

const write = (level, values) => {
  entries.push({
    level,
    text: values.map((value) => serialize(value)).join(' ')
  });
};

const labelFor = (label) => String(label ?? 'default');

const fakeConsole = {
  log: (...values) => write('log', values),
  info: (...values) => write('info', values),
  warn: (...values) => write('warn', values),
  error: (...values) => write('error', values),
  debug: (...values) => write('debug', values),
  dir: (...values) => write('log', values),
  table: (...values) => write('log', values),

  assert: (condition, ...values) => {
    if (!condition) {
      write(
        'error',
        values.length ? values : ['Assertion failed']
      );
    }
  },

  count: (label = 'default') => {
    const key = labelFor(label);
    const value = (counts.get(key) || 0) + 1;

    counts.set(key, value);

    write('log', [key + ': ' + value]);
  },

  countReset: (label = 'default') => {
    counts.delete(labelFor(label));
  },

  time: (label = 'default') => {
    timers.set(labelFor(label), performance.now());
  },

  timeLog: (label = 'default', ...values) => {
    const key = labelFor(label);
    const started = timers.get(key);

    if (started === undefined) {
      write('warn', ['Timer ' + key + ' does not exist']);
      return;
    }

    write('log', [
      key + ': ' + Math.round(performance.now() - started) + 'ms',
      ...values
    ]);
  },

  timeEnd: (label = 'default') => {
    const key = labelFor(label);
    const started = timers.get(key);

    if (started === undefined) {
      write('warn', ['Timer ' + key + ' does not exist']);
      return;
    }

    write('log', [
      key + ': ' + Math.round(performance.now() - started) + 'ms'
    ]);

    timers.delete(key);
  },

  group: (...values) => {
    groups.push(
      values.map((value) => serialize(value)).join(' ')
    );

    write('log', [
      '▼ ' + groups[groups.length - 1]
    ]);
  },

  groupCollapsed: (...values) => {
    groups.push(
      values.map((value) => serialize(value)).join(' ')
    );

    write('log', [
      '▶ ' + groups[groups.length - 1]
    ]);
  },

  groupEnd: () => {
    if (groups.length) {
      groups.pop();
    }
  },

  trace: (...values) => {
    write(
      'debug',
      values.length ? values : ['Trace']
    );
  },

  clear: () => {
    entries.length = 0;
  }
};

const trackedSetTimeout = (callback, delay, ...args) => {
  const token = {};
  let handle;

  activeTimers.add(token);

  handle = originalSetTimeout(() => {
    try {
      callback(...args);
    } finally {
      activeTimers.delete(token);
      timerTokens.delete(handle);
    }
  }, Math.max(0, Number(delay) || 0));

  timerTokens.set(handle, token);

  return handle;
};

const trackedClearTimeout = (handle) => {
  const token = timerTokens.get(handle);

  if (token) {
    activeTimers.delete(token);
    timerTokens.delete(handle);
  }

  originalClearTimeout(handle);
};

const trackedFetch = (...args) => {
  if (!originalFetch) {
    throw new Error(
      'fetch is not available in this execution environment.'
    );
  }

  const token = {};

  activeFetches.add(token);

  const promise = originalFetch(...args);

  promise.then(
    () => activeFetches.delete(token),
    () => activeFetches.delete(token)
  );

  return promise;
};

const waitForAsyncActivity = async () => {
  let idlePasses = 0;

  while (idlePasses < 4) {
    if (
      activeTimers.size === 0 &&
      activeFetches.size === 0
    ) {
      idlePasses += 1;
    } else {
      idlePasses = 0;
    }

    await new Promise((resolve) =>
      originalSetTimeout(resolve, 0)
    );
  }
};

self.onmessage = async (event) => {
  const { code } = event.data;

  try {
    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;

    const execute = new AsyncFunction(
      'console',
      'setTimeout',
      'setInterval',
      'clearTimeout',
      'clearInterval',
      'fetch',
      'queueMicrotask',
      code
    );

    await execute(
      fakeConsole,
      trackedSetTimeout,
      originalSetInterval,
      trackedClearTimeout,
      originalClearInterval,
      trackedFetch,
      queueMicrotask
    );

    await waitForAsyncActivity();

    self.postMessage({
      type: 'success',
      entries,
      output: entries.length
        ? entries.map((entry) => entry.text).join('\\n')
        : 'Code ran successfully. No console output was produced.'
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      kind:
        error instanceof SyntaxError
          ? 'Syntax error'
          : 'Runtime error',
      entries,
      message:
        error instanceof Error
          ? error.stack || error.message
          : String(error),
      output: entries.length
        ? entries.map((entry) => entry.text).join('\\n')
        : 'Execution failed.'
    });
  }
};
`,te=class{#e=d(`JavaScript`);get mode(){return v(this.#e)}set mode(e){u(this.#e,e,!0)}#t=d(n(G));get code(){return v(this.#t)}set code(e){u(this.#t,e,!0)}#n=d(n(q));get html(){return v(this.#n)}set html(e){u(this.#n,e,!0)}#r=d(n(J));get css(){return v(this.#r)}set css(e){u(this.#r,e,!0)}#i=d(`Click Run to execute your code.`);get output(){return v(this.#i)}set output(e){u(this.#i,e,!0)}#a=d(``);get error(){return v(this.#a)}set error(e){u(this.#a,e,!0)}#o=d(!1);get running(){return v(this.#o)}set running(e){u(this.#o,e,!0)}#s=d(`Ready`);get status(){return v(this.#s)}set status(e){u(this.#s,e,!0)}#c=d(null);get duration(){return v(this.#c)}set duration(e){u(this.#c,e,!0)}#l=d(`JavaScript playground`);get lessonTitle(){return v(this.#l)}set lessonTitle(e){u(this.#l,e,!0)}#u=d(0);get previewKey(){return v(this.#u)}set previewKey(e){u(this.#u,e,!0)}#d=d(``);get formattedJson(){return v(this.#d)}set formattedJson(e){u(this.#d,e,!0)}#f=d(``);get minifiedJson(){return v(this.#f)}set minifiedJson(e){u(this.#f,e,!0)}#p=d(n([]));get diagnostics(){return v(this.#p)}set diagnostics(e){u(this.#p,e,!0)}#m=d(``);get lastCompiledCode(){return v(this.#m)}set lastCompiledCode(e){u(this.#m,e,!0)}worker;workerUrl;timeoutId;runToken=0;constructor(){x(()=>(this.loadLessonFromUrl(),()=>{this.disposeWorker()}))}get isWebPreview(){return this.mode===`HTML`||this.mode===`CSS`}get fileName(){return{JavaScript:`main.js`,TypeScript:`main.ts`,HTML:`index.html`,CSS:`styles.css`,JSON:`data.json`,SQL:`query.sql`}[this.mode]}get modeDescription(){return{JavaScript:`Run modern JavaScript in an isolated browser worker.`,TypeScript:`Compile TypeScript in the browser, then run the emitted JavaScript.`,HTML:`Edit HTML and render it immediately in an isolated preview.`,CSS:`Edit HTML and CSS together and render the result in an isolated preview.`,JSON:`Validate, format, and minify JSON with clear syntax errors.`,SQL:`Run SQL against a local in-browser practice database with schema and result feedback.`}[this.mode]}loadLessonFromUrl(){let e=new F(window.location.href).searchParams.get(`lesson`);if(!e)return;let t=M.find(t=>t.id===e);if(t){if(!z(t)){window.location.replace(`/learn`);return}this.mode=B(t),this.lessonTitle=t.title,this.error=``,this.status=`Ready`,this.diagnostics=[],this.formattedJson=``,this.minifiedJson=``,this.mode===`CSS`?(this.html=q,this.css=t.example):this.code=t.example,(this.mode===`HTML`||this.mode===`CSS`)&&(this.previewKey+=1),this.runCode()}}setMode(e){if(!W.includes(e))return;let t=e;t!==this.mode&&(this.disposeWorker(),this.mode=t,this.error=``,this.status=`Ready`,this.duration=null,this.diagnostics=[],this.formattedJson=``,this.minifiedJson=``,t===`JavaScript`&&(this.code=G,this.lessonTitle=`JavaScript playground`,this.output=`Click Run to execute your code.`),t===`TypeScript`&&(this.code=K,this.lessonTitle=`TypeScript playground`,this.output=`Click Run to compile and execute your TypeScript.`),t===`HTML`&&(this.code=q,this.lessonTitle=`HTML playground`,this.output=`Preview updates as you edit.`),t===`CSS`&&(this.html=q,this.code=J,this.lessonTitle=`CSS playground`,this.output=`Preview updates as you edit.`),t===`JSON`&&(this.code=X,this.lessonTitle=`JSON playground`,this.output=`Click Validate to inspect your JSON.`),t===`SQL`&&(this.code=Y,this.lessonTitle=`SQL playground`,this.output=`Click Run to execute the query against the local practice database.`),(t===`HTML`||t===`CSS`)&&(this.previewKey+=1))}get previewDocument(){let e=this.mode===`HTML`?this.code:this.html;return`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${this.mode===`CSS`?`<style>${this.css}</style>`:``}</head><body>${e}<script>(function(){document.addEventListener('click',function(event){const target=event.target instanceof Element?event.target.closest('a'):null;if(target){event.preventDefault();event.stopPropagation();}},true);document.addEventListener('submit',function(event){event.preventDefault();event.stopPropagation();},true);document.addEventListener('click',function(event){const target=event.target instanceof HTMLButtonElement?event.target:null;if(target&&target.type!=='button'){event.preventDefault();event.stopPropagation();}},true);})();<\/script></body></html>`}runCode(){if(this.diagnostics=[],this.mode===`HTML`){this.validateHtml(),this.hasErrors()||(this.previewKey+=1,this.status=`Live preview`);return}if(this.mode===`CSS`){this.validateCss(),this.hasErrors()||(this.previewKey+=1,this.status=`Live preview`);return}if(this.mode===`JSON`){this.validateJson();return}if(this.mode===`SQL`){this.runSql();return}if(this.running)return;let e=this.code;if(this.mode===`TypeScript`){let t=this.compileTypeScript(this.code);if(t===null)return;e=t}this.executeJavaScript(e)}compileTypeScript(e){let t=U.default.transpileModule(e,{reportDiagnostics:!0,fileName:`main.ts`,compilerOptions:{target:U.default.ScriptTarget.ES2020,module:U.default.ModuleKind.ES2020,moduleResolution:U.default.ModuleResolutionKind.Bundler,isolatedModules:!0,strict:!0,removeComments:!1,inlineSourceMap:!0,inlineSources:!0,esModuleInterop:!0,allowSyntheticDefaultImports:!0}}),n=t.diagnostics??[];return n.length?(this.status=`TypeScript error`,this.output=`Compilation stopped before execution.`,this.error=H(n),null):/^\s*(import|export)\s/m.test(t.outputText)?(this.status=`Module code not supported`,this.output=`Compilation stopped before execution.`,this.error=`Import/export syntax requires module loading. The isolated worker currently executes a single script file.`,null):(this.lastCompiledCode=t.outputText,t.outputText)}runSql(){let e=V(this.code);this.output=e.output,this.error=e.error,this.status=e.status}validateJson(){try{let e=JSON.parse(this.code);this.formattedJson=JSON.stringify(e,null,2),this.minifiedJson=JSON.stringify(e),this.output=this.formattedJson,this.error=``,this.status=`Valid JSON`,this.diagnostics=[]}catch(e){this.formattedJson=``,this.minifiedJson=``,this.output=`JSON validation failed.`,this.error=e instanceof Error?e.message:String(e),this.status=`Invalid JSON`,this.diagnostics=[{message:this.error,severity:`error`}]}}formatJson(){this.validateJson(),this.formattedJson&&(this.code=this.formattedJson)}minifyJson(){this.validateJson(),this.minifiedJson&&(this.code=this.minifiedJson)}validateHtml(){this.diagnostics=I(this.code),this.status=this.diagnostics.length?`HTML diagnostics`:`HTML valid`}validateCss(){this.diagnostics=R(this.css),this.status=this.diagnostics.length?`CSS diagnostics`:`CSS valid`}hasErrors(){return this.diagnostics.some(e=>e.severity===`error`)}executeJavaScript(e){this.disposeWorker(),this.running=!0,this.status=this.mode===`TypeScript`?`Running TypeScript…`:`Running…`,this.error=``,this.output=`Running…`,this.duration=null;let t=performance.now(),n=++this.runToken,r=URL.createObjectURL(new Blob([Z],{type:`text/javascript`})),i=new Worker(r);this.worker=i,this.workerUrl=r;let a=!1,o=e=>{a||n!==this.runToken||(a=!0,this.timeoutId!==void 0&&window.clearTimeout(this.timeoutId),this.timeoutId=void 0,this.duration=Math.round(performance.now()-t),i.terminate(),URL.revokeObjectURL(r),this.worker===i&&(this.worker=void 0),this.workerUrl===r&&(this.workerUrl=void 0),this.running=!1,e())};i.onmessage=e=>{if(e.data.type===`success`){o(()=>{this.status=`Ran successfully`,this.output=e.data.output});return}o(()=>{this.status=e.data.kind,this.output=e.data.output,this.error=e.data.message})},i.onerror=e=>{o(()=>{this.status=`Runtime error`,this.output=`Execution failed.`,this.error=e.message||`The worker could not execute this code.`})},i.postMessage({code:e}),this.timeoutId=window.setTimeout(()=>{o(()=>{this.status=`Timed out`,this.output=`Execution stopped after 4 seconds.`,this.error=`The code did not finish within the 4 second execution limit.`})},4e3)}reset(){this.disposeWorker(),this.error=``,this.status=`Ready`,this.duration=null,this.diagnostics=[],this.formattedJson=``,this.minifiedJson=``,this.mode===`JavaScript`&&(this.code=G),this.mode===`TypeScript`&&(this.code=K),this.mode===`HTML`&&(this.code=q),this.mode===`CSS`&&(this.html=q,this.code=J,this.css=J),this.mode===`JSON`&&(this.code=X),this.mode===`SQL`&&(this.code=Y),this.isWebPreview&&(this.previewKey+=1),this.output=this.isWebPreview?`Preview updates as you edit.`:this.mode===`JSON`?`Click Validate to inspect your JSON.`:`Click Run to execute your code.`}disposeWorker(){this.runToken+=1,this.timeoutId!==void 0&&window.clearTimeout(this.timeoutId),this.timeoutId=void 0,this.worker&&this.worker.terminate(),this.worker=void 0,this.workerUrl&&URL.revokeObjectURL(this.workerUrl),this.workerUrl=void 0,this.running=!1}},ne=a(`<section class="editor-grid web-editors"><article class="editor-panel glass"><div class="panel-bar"><span class="file-label"><span class="file-dot"></span>index.html</span><span class="panel-bar-end"><span>Live</span><button class="icon-button" type="button" aria-label="Copy HTML"><!></button></span></div> <textarea class="editor code" spellcheck="false" aria-label="HTML editor"></textarea></article> <article class="editor-panel glass"><div class="panel-bar"><span class="file-label"><span class="file-dot"></span>styles.css</span><span class="panel-bar-end"><span>Live</span><button class="icon-button" type="button" aria-label="Copy CSS"><!></button></span></div> <textarea class="editor code" spellcheck="false" aria-label="CSS editor"></textarea></article></section> <section class="preview-panel glass"><div class="panel-bar"><span class="file-label"><span class="console-dot"></span>Live preview</span><span> </span></div> <iframe title="CSS live preview" sandbox="allow-scripts"></iframe></section>`,1),re=a(`<section class="editor-grid"><article class="editor-panel glass"><div class="panel-bar"><span class="file-label"><span class="file-dot"></span>index.html</span><span> </span></div> <textarea class="editor code" spellcheck="false" aria-label="HTML editor"></textarea></article> <article class="preview-panel glass"><div class="panel-bar"><span class="file-label"><span class="console-dot"></span>Live preview</span><span>Isolated iframe</span></div> <iframe title="HTML live preview" sandbox="allow-scripts"></iframe></article></section>`),ie=a(`<div> </div>`),ae=a(`<div class="schema-table"><strong> </strong> <div class="schema-columns"> </div> <div class="schema-rows"></div></div>`),oe=a(`<section class="sql-layout"><article class="editor-panel glass"><div class="panel-bar"><span class="file-label"><span class="file-dot"></span>query.sql</span><span> </span></div> <textarea class="editor code sql-editor" spellcheck="false" aria-label="SQL editor"></textarea> <div class="editor-footer"><span>Local practice database</span></div></article> <article class="sql-schema glass"><div class="panel-bar"><span class="file-label"><span class="console-dot"></span>Schema</span><span>4 tables</span></div> <div class="schema-list"></div></article></section> <section class="sql-result"><!></section>`,1),se=a(`<section class="editor-grid"><article class="editor-panel glass"><div class="panel-bar"><span class="file-label"><span class="file-dot"></span> </span> <span class="panel-bar-end"><span> <!></span><button class="icon-button" type="button" aria-label="Copy code"><!></button></span></div> <textarea class="editor code" spellcheck="false"></textarea> <div class="editor-footer"><span> </span></div></article> <article class="output-panel"><!></article></section>`),ce=a(`<article class="glass tip"><span>JS</span> <div><strong>Runtime experiments</strong> <p>Test arrays, functions, promises, timers, console APIs, and runtime errors inside an
						isolated worker.</p></div></article> <article class="glass tip"><span>DEBUG</span> <div><strong>Read the output</strong> <p>Use the console output and error state to connect each code change with a concrete
						runtime result.</p></div></article>`,1),le=a(`<article class="glass tip"><span>TS</span> <div><strong>Types before runtime</strong> <p>Compile TypeScript in the browser and inspect diagnostics before the emitted JavaScript
						executes.</p></div></article> <article class="glass tip"><span>MODEL</span> <div><strong>Make contracts explicit</strong> <p>Practice unions, interfaces, generics, narrowing, and the boundary between static types
						and runtime values.</p></div></article>`,1),ue=a(`<article class="glass tip"><span>HTML</span> <div><strong>Document structure</strong> <p>Build semantic markup and see the document update immediately in an isolated preview.</p></div></article> <article class="glass tip"><span>WEB</span> <div><strong>Isolated preview</strong> <p>Links, forms, and scripts remain inside the sandboxed preview instead of navigating the
						DevLab shell.</p></div></article>`,1),de=a(`<article class="glass tip"><span>CSS</span> <div><strong>Layout experiments</strong> <p>Practice selectors, box model, grid, flexbox, spacing, and responsive behavior against
						the starter markup.</p></div></article> <article class="glass tip"><span>WEB</span> <div><strong>Style in isolation</strong> <p>HTML and CSS render together in a sandbox so malformed styles cannot affect the main
						application.</p></div></article>`,1),fe=a(`<article class="glass tip"><span>JSON</span> <div><strong>Validate data shape</strong> <p>Check syntax, format nested objects and arrays, and minify payloads before sending them
						across an API boundary.</p></div></article> <article class="glass tip"><span>DATA</span> <div><strong>Readable contracts</strong> <p>Use formatted JSON to inspect structure and compact JSON when you need a
						transport-friendly representation.</p></div></article>`,1),pe=a(`<article class="glass tip"><span>SQL</span> <div><strong>Interview-ready SQL</strong> <p>Practice SELECT, filtering, sorting, grouping, aggregates, and common query shapes
						against synthetic local data.</p></div></article> <article class="glass tip"><span>DATA</span> <div><strong>Think in result sets</strong> <p>Read the schema first, predict the rows, then use joins, grouping, and conditions to
						shape the final result.</p></div></article>`,1),me=a(`<!> <main class="page-shell page-playground"><!> <section class="playground-toolbar glass"><div class="field mode-field"><!></div> <div class="playground-context"><span class="eyebrow"> </span> <strong> </strong> <p> </p></div> <div class="actions"><button class="button" type="button">Reset</button> <button class="button primary" type="button"> </button></div></section> <!> <section class="content-strip"><!></section> <section class="tips"><article class="glass tip"><span>01</span> <div><strong>Learn → Playground</strong> <p>Lesson examples open here with the matching language and starting code.</p></div></article> <article class="glass tip"><span>02</span> <div><strong>Safe execution</strong> <p>JavaScript and TypeScript run inside a short-lived browser worker with a four-second
					limit.</p></div></article> <article class="glass tip"><span>03</span> <div><strong>Web preview</strong> <p>HTML and CSS render inside an isolated iframe so markup and styles stay separate from
					DevLab itself.</p></div></article></section> <section class="page-bottom-section glass"><div class="bottom-section-head"><span class="eyebrow">HOW TO USE THE PLAYGROUND</span> <h2>Write, run, inspect, and iterate in one place.</h2></div> <div class="bottom-section-grid"><article><strong>Languages</strong> <p>Svelte, TypeScript, JavaScript, HTML, CSS, JSON, and SQL workflows are supported across
					focused browser labs.</p></article> <article><strong>Experiment</strong> <p>Change a small piece of code, run it, inspect the result, and use the feedback to guide
					the next edit.</p></article> <article><strong>Practice loop</strong> <p>Move from a lesson example to a runnable experiment without leaving the DevLab workspace.</p></article></div></section></main>`,1);function Q(n,a){C(a,!0);let o=new te,b=[`JavaScript`,`TypeScript`,`HTML`,`CSS`,`JSON`,`SQL`],x=ee(),M=d(``);async function F(e,t){t&&(await navigator.clipboard.writeText(t),u(M,e,!0),window.setTimeout(()=>{v(M)===e&&u(M,``)},1200))}var I=me(),L=r(I);A(L,{active:`playground`});var R=l(L,2),z=c(R);j(z,{title:`Code Playground`,subtitle:`Practice JavaScript, TypeScript, HTML, CSS, JSON, and SQL in focused browser-based labs.`});var B=l(z,2),V=c(B),H=c(V);N(H,{get value(){return o.mode},get options(){return b},label:`Language`,ariaLabel:`Playground language`,onchange:e=>o.setMode(e)}),y(V);var U=l(V,2),W=c(U),G=s(W),K=l(W,2),q=s(K,!0),J=l(K,2),Y=s(J,!0);y(U);var X=l(U,2),Z=c(X),Q=l(Z,2),he=s(Q,!0);y(X),y(B);var $=l(B,2),ge=n=>{var a=ne(),u=r(a),d=c(u),f=c(d),h=l(c(f)),_=l(c(h)),b=c(_);{let t=e(()=>v(M)===`html-css`?`check`:`copy`);k(b,{get name(){return v(t)},size:16})}y(_),y(h),y(f);var x=l(f,2);g(x),y(d);var S=l(d,2),C=c(S),T=l(c(C)),E=l(c(T)),D=c(E);{let t=e(()=>v(M)===`css`?`check`:`copy`);k(D,{get name(){return v(t)},size:16})}y(E),y(T),y(C);var A=l(C,2);g(A),y(S),y(u);var j=l(u,2),N=c(j),P=l(c(N)),I=s(P,!0);y(N);var L=l(N,2);y(j),i(()=>{w(_,`title`,v(M)===`html-css`?`Copied`:`Copy HTML`),w(E,`title`,v(M)===`css`?`Copied`:`Copy CSS`),O(I,o.status),w(L,`srcdoc`,o.previewDocument)}),t(`click`,_,()=>F(`html-css`,o.html)),m(x,()=>o.html,e=>o.html=e),t(`click`,E,()=>F(`css`,o.css)),m(A,()=>o.css,e=>o.css=e),p(n,a)},_e=e=>{var t=re(),n=c(t),r=c(n),a=l(c(r)),u=s(a,!0);y(r);var d=l(r,2);g(d),y(n);var f=l(n,2),h=l(c(f),2);y(f),y(t),i(()=>{O(u,o.status),w(h,`srcdoc`,o.previewDocument)}),m(d,()=>o.code,e=>o.code=e),p(e,t)},ve=t=>{var n=oe(),a=r(n),u=c(a),d=c(u),b=l(c(d)),S=s(b,!0);y(d);var C=l(d,2);g(C),h(2),y(u);var w=l(u,2),E=l(c(w),2);_(E,21,()=>Object.entries(x),([e,t])=>e,(t,n)=>{var r=e(()=>T(v(n),2));let a=()=>v(r)[0],o=()=>v(r)[1];var u=ae(),d=c(u),m=s(d,!0),h=l(d,2),g=s(h,!0),b=l(h,2);_(b,21,o,f,(e,t)=>{var n=ie(),r=s(n,!0);i(e=>O(r,e),[()=>Object.values(v(t)).map(e=>e??`NULL`).join(` | `)]),p(e,n)}),y(b),y(u),i(e=>{O(m,a()),O(g,e)},[()=>Object.keys(o()[0]??{}).join(` · `)]),p(t,u)}),y(E),y(w),y(a);var D=l(a,2),k=c(D);P(k,{label:`Query result`,get output(){return o.output},get error(){return o.error},onClear:()=>o.output=``}),y(D),i(()=>O(S,o.status)),m(C,()=>o.code,e=>o.code=e),p(t,n)},ye=n=>{var r=se(),a=c(r),u=c(a),d=c(u),f=l(c(d),1,!0);y(d);var h=l(d,2),_=c(h),b=c(_,!0),x=l(b),S=e=>{var t=D();i(()=>O(t,`· ${o.duration??``} ms`)),p(e,t)};E(x,e=>{o.duration!==null&&e(S)}),y(_);var C=l(_),T=c(C);{let t=e(()=>v(M)===`code`?`check`:`copy`);k(T,{get name(){return v(t)},size:16})}y(C),y(h),y(u);var A=l(u,2);g(A);var j=l(A,2),N=c(j),I=s(N,!0);y(j),y(a);var L=l(a,2),R=c(L);{let t=e(()=>o.mode===`JSON`?`Formatted output`:`Console`);P(R,{get label(){return v(t)},get output(){return o.output},get error(){return o.error},onClear:()=>o.output=``})}y(L),y(r),i(()=>{O(f,o.fileName),O(b,o.status),w(C,`title`,v(M)===`code`?`Copied`:`Copy code`),w(A,`aria-label`,`${o.mode} editor`),O(I,o.mode)}),t(`click`,C,()=>F(`code`,o.code)),m(A,()=>o.code,e=>o.code=e),p(n,r)};E($,e=>{o.mode===`CSS`?e(ge):o.mode===`HTML`?e(_e,1):o.mode===`SQL`?e(ve,2):e(ye,-1)});var be=l($,2),xe=c(be),Se=e=>{var t=ce();h(2),p(e,t)},Ce=e=>{var t=le();h(2),p(e,t)},we=e=>{var t=ue();h(2),p(e,t)},Te=e=>{var t=de();h(2),p(e,t)},Ee=e=>{var t=fe();h(2),p(e,t)},De=e=>{var t=pe();h(2),p(e,t)};E(xe,e=>{o.mode===`JavaScript`?e(Se):o.mode===`TypeScript`?e(Ce,1):o.mode===`HTML`?e(we,2):o.mode===`CSS`?e(Te,3):o.mode===`JSON`?e(Ee,4):e(De,-1)}),y(be),h(4),y(R),i(()=>{O(G,`${o.mode??``} · SANDBOXED`),O(q,o.lessonTitle),O(Y,o.modeDescription),Q.disabled=o.running,O(he,o.mode===`JSON`?`Validate`:o.isWebPreview?`Refresh preview`:o.running?`Running…`:`Run ▶`)}),t(`click`,Z,()=>o.reset()),t(`click`,Q,()=>o.runCode()),p(n,I),S()}o([`click`]);export{Q as component};