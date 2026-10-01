export type PlaygroundMode = 'JavaScript' | 'TypeScript' | 'HTML' | 'CSS' | 'JSON' | 'SQL';

export const playgroundModes: PlaygroundMode[] = [
	'JavaScript',
	'TypeScript',
	'HTML',
	'CSS',
	'JSON',
	'SQL'
];

export const starterJavaScript = `const numbers = [2, 4, 6, 8];

const doubled = numbers.map((number) => number * 2);

console.log(doubled);`;

export const starterTypeScript = `type User = {
  name: string;
  role: 'admin' | 'member';
};

const user: User = {
  name: 'user_001',
  role: 'admin'
};

console.log(user);`;

export const starterHtml = `<main class="card">
  <span class="eyebrow">DEVLAB</span>
  <h1>Hello, web.</h1>
  <p>Edit this HTML and watch the preview update.</p>
  <button type="button">Try it</button>
</main>`;

export const starterCss = `.card {
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
}`;

export const starterSql = `SELECT username, email
FROM users
WHERE department_id = 2
ORDER BY username;`;

export const starterJson = `{
  "name": "DevLab",
  "type": "learning",
  "topics": ["JavaScript", "TypeScript", "HTML", "CSS"]
}`;
