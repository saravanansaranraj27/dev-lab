import{$ as e,E as t,H as n,I as r,S as i,T as a,U as o,V as s,W as c,Y as l,Z as u,b as d,c as f,ct as p,f as m,g as h,k as g,l as _,lt as v,nt as y,rt as b,u as x,v as S,y as C}from"../chunks/DMk5LJc6.js";import"../chunks/xihTtKlq.js";import{t as w}from"../chunks/D3IWj61p.js";import{n as T,t as E}from"../chunks/CZiqLibq.js";var D=[{id:`fetch-json`,title:`Fetch JSON safely`,language:`JavaScript`,category:`HTTP`,description:`Validate status before parsing a JSON response.`,code:"const response = await fetch('/api/data');\nif (!response.ok) throw new Error(`Request failed: ${response.status}`);\nconst data = await response.json();"},{id:`debounce`,title:`Debounce an input`,language:`JavaScript`,category:`Browser`,description:`Delay repeated work until input settles, cancelling the previous timer before scheduling the next callback.`,code:`let timer;
const schedule = (callback, delay = 250) => {
  clearTimeout(timer);
  timer = setTimeout(callback, delay);
};`},{id:`throttle`,title:`Throttle a callback`,language:`JavaScript`,category:`Browser`,description:`Limit how often a frequently fired event can trigger work.`,code:`let ready = true;
const throttled = () => {
  if (!ready) return;
  ready = false;
  requestAnimationFrame(() => { ready = true; });
};`},{id:`safe-json`,title:`Parse JSON with a guard`,language:`JavaScript`,category:`Data`,description:`Turn malformed external JSON into a controlled null result instead of letting parsing errors escape.`,code:`const parseJson = (value) => {
  try { return JSON.parse(value); } catch { return null; }
};`},{id:`event-delegation`,title:`Event delegation`,language:`JavaScript`,category:`DOM`,description:`Handle interactions from many child elements through one listener on their stable parent.`,code:`list.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target.closest('[data-action]') : null;
  if (!target) return;
  handleAction(target.getAttribute('data-action'));
});`}],O=[{id:`group-by-key`,title:`Group items by key`,language:`TypeScript`,category:`Data`,description:`Build an index in one pass so later lookups can jump directly to each category.`,code:`type Item = { category: string; name: string };
const items: Item[] = [{ category: 'fruit', name: 'Apple' }, { category: 'veg', name: 'Carrot' }];
const grouped = items.reduce<Record<string, Item[]>>((result, item) => {
  (result[item.category] ??= []).push(item);
  return result;
}, {});`},{id:`type-guard`,title:`Narrow with a type guard`,language:`TypeScript`,category:`Types`,description:`Move runtime checks into reusable type predicates.`,code:`const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;`},{id:`exhaustive-switch`,title:`Exhaustive switch`,language:`TypeScript`,category:`Types`,description:`Make union changes fail at compile time when a branch is missing.`,code:"const assertNever = (value: never): never => { throw new Error(`Unexpected value: ${value}`); };\nswitch (kind) { case 'a': return 1; case 'b': return 2; default: return assertNever(kind); }"},{id:`result-type`,title:`Result type`,language:`TypeScript`,category:`Error handling`,description:`Model success and failure explicitly so callers must handle both outcomes.`,code:`type Result<T> = { ok: true; value: T } | { ok: false; error: Error };
const result: Result<string> = Math.random() > 0.5
  ? { ok: true, value: 'ready' }
  : { ok: false, error: new Error('Not ready') };
console.log(result);`},{id:`utility-types`,title:`Utility types`,language:`TypeScript`,category:`Types`,description:`Derive smaller API shapes from a shared model instead of repeating property definitions.`,code:`type User = { id: string; name: string; email: string };
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
type UserPreview = Pick<User, 'id' | 'name'>;`}],k=[{id:`abort-fetch`,title:`Abort a request`,language:`Web`,category:`HTTP`,description:`Cancel a request that is no longer needed, such as a stale search or navigation.`,code:`const controller = new AbortController();
const request = fetch('/api/data', { signal: controller.signal });
controller.abort();

try {
  await request;
} catch (error) {
  if (error.name !== 'AbortError') throw error;
}`},{id:`url-search-params`,title:`Build query parameters`,language:`Web`,category:`HTTP`,description:`Encode query values without manual string concatenation.`,code:"const params = new URLSearchParams({ query, page: String(page) });\nconst url = `/search?${params}`;"},{id:`local-storage`,title:`Safe local storage`,language:`Web`,category:`Browser`,description:`Persist small non-sensitive preferences with JSON serialization.`,code:`localStorage.setItem('settings', JSON.stringify(settings));
const saved = JSON.parse(localStorage.getItem('settings') ?? 'null');`},{id:`custom-event`,title:`Custom event`,language:`Web`,category:`Browser`,description:`Decouple small browser components with typed custom events.`,code:`const event = new CustomEvent('devlab:refresh', { detail: { source: 'toolbar' } });
window.dispatchEvent(event);`},{id:`intersection-observer`,title:`Intersection observer`,language:`Web`,category:`Browser`,description:`React to visibility changes without continuously polling scroll position.`,code:`const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) loadMore();
});
observer.observe(target);`}],A=[{id:`css-grid`,title:`Responsive grid`,language:`CSS`,category:`Layout`,description:`Let cards wrap naturally without device-specific breakpoints.`,code:`.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}`},{id:`flex-center`,title:`Flex centering`,language:`CSS`,category:`Layout`,description:`Center content on both axes with a minimal layout rule.`,code:`.center {
  display: flex;
  align-items: center;
  justify-content: center;
}`},{id:`fluid-type`,title:`Fluid typography`,language:`CSS`,category:`Typography`,description:`Scale headings smoothly between viewport sizes.`,code:`h1 {
  font-size: clamp(2rem, 5vw, 4rem);
}`},{id:`focus-visible`,title:`Accessible focus`,language:`CSS`,category:`Accessibility`,description:`Show keyboard focus without adding persistent outlines for pointer users.`,code:`button:focus-visible, a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}`},{id:`responsive-stack`,title:`Responsive stack`,language:`CSS`,category:`Responsive`,description:`Stack a row naturally when the available width becomes constrained.`,code:`.layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  gap: 1rem;
}`}],j=[{id:`sql-aggregate`,title:`Aggregate by department`,language:`SQL`,category:`SQL`,description:`Combine grouping and aggregation to count users in each department.`,code:`SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
ORDER BY user_count DESC;`},{id:`sql-join`,title:`Join related tables`,language:`SQL`,category:`SQL`,description:`Combine normalized records through their foreign-key relationship.`,code:`SELECT u.username, o.total
FROM users AS u
JOIN orders AS o ON o.user_id = u.id;`},{id:`sql-having`,title:`Filter groups`,language:`SQL`,category:`SQL`,description:`Use HAVING after GROUP BY when the condition depends on an aggregate.`,code:`SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
HAVING COUNT(*) >= 2;`},{id:`sql-case`,title:`Conditional projection`,language:`SQL`,category:`SQL`,description:`Create derived labels from numeric values directly in the result set.`,code:`SELECT name, CASE WHEN price >= 100 THEN 'premium' ELSE 'standard' END AS tier
FROM products;`},{id:`sql-window`,title:`Window calculation`,language:`SQL`,category:`SQL`,description:`Number orders within each user without collapsing individual order rows.`,code:`SELECT id, user_id, total,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS order_number
FROM orders;`}],M=[...D,...O,...k,...A,...j],N=i(`<button type="button"> </button>`),P=i(`<article class="glass library-card"><div class="card-meta"><span> </span><span> </span></div> <h3> </h3> <p> </p> <div class="pattern-section"><strong>Example</strong> <div class="snippet-code"><pre><code> </code></pre> <button class="icon-button copy-button" type="button"><!></button></div></div> <div class="pattern-section"><strong>Watch for</strong> <ul><li>Copying the example without adapting its inputs and error path.</li> <li>Skipping the constraint that makes the technique useful.</li></ul></div></article>`),F=i(`<div class="glass empty-library">No snippets match this filter.</div>`),I=i(`<!> <main class="page-shell page-library"><!> <section class="library-hero glass"><span class="eyebrow">REFERENCE LIBRARY</span> <h2>Copy the shape, then adapt it.</h2> <p>These snippets focus on small, production-minded techniques. Read the constraint before
			copying the implementation.</p></section> <section class="library-toolbar glass"><div class="search-control"><span class="search-icon"><!></span> <input aria-label="Search snippets" placeholder="Search snippets"/></div> <div class="chip-row"></div></section> <section class="library-grid"></section> <!></main>`,1);function L(i,a){b(a,!0);let D=u(``),O=u(`All`),k=u(``),A=[`All`,...new Set(M.map(e=>e.language))];async function j(e,t){try{await navigator.clipboard.writeText(t),l(k,e,!0),window.setTimeout(()=>{g(k)===e&&l(k,``)},1200)}catch{l(k,``)}}let L=e(()=>M.filter(e=>{let t=g(D).trim().toLowerCase();return(!t||`${e.title} ${e.description} ${e.category}`.toLowerCase().includes(t))&&(g(O)===`All`||e.language===g(O))}));var R=I(),z=n(R);T(z,{active:`snippets`});var B=c(z,2),V=s(B);E(V,{title:`Snippets`,subtitle:`Reusable implementation patterns for everyday development.`});var H=c(V,4),U=s(H),W=s(U),G=s(W);w(G,{name:`search`,size:16}),v(W);var K=c(W,2);_(K),v(U);var q=c(U,2);h(q,20,()=>A,e=>e,(e,n)=>{var i=N();let a;var s=o(i,!0);r(()=>{a=m(i,1,``,null,a,{active:g(O)===n}),C(s,n)}),t(`click`,i,()=>l(O,n,!0)),d(e,i)}),v(q),v(H);var J=c(H,2);h(J,21,()=>g(L),e=>e.id,(n,i)=>{var a=P(),l=s(a),u=s(l),f=o(u,!0),m=c(u),h=o(m,!0);v(l);var _=c(l,2),y=o(_,!0),b=c(_,2),S=o(b,!0),T=c(b,2),E=c(s(T),2),D=s(E),O=s(D),A=o(O,!0);v(D);var M=c(D,2),N=s(M);{let t=e(()=>g(k)===g(i).id?`check`:`copy`);w(N,{get name(){return g(t)},size:16})}v(M),v(E),v(T),p(2),v(a),r(()=>{C(f,g(i).language),C(h,g(i).category),C(y,g(i).title),C(S,g(i).description),C(A,g(i).code),x(M,`aria-label`,g(k)===g(i).id?`Code copied`:`Copy code`),x(M,`title`,g(k)===g(i).id?`Code copied`:`Copy code`)}),t(`click`,M,()=>j(g(i).id,g(i).code)),d(n,a)}),v(J);var Y=c(J,2),X=e=>{var t=F();d(e,t)};S(Y,e=>{g(L).length||e(X)}),v(B),f(K,()=>g(D),e=>l(D,e)),d(i,R),y()}a([`click`]);export{L as component};