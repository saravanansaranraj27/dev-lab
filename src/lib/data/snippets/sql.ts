export type Snippet = {
	id: string;
	title: string;
	language: string;
	category: string;
	description: string;
	code: string;
};

export const snippets: Snippet[] = [
	{
		id: 'sql-aggregate',
		title: 'Aggregate by department',
		language: 'SQL',
		category: 'SQL',
		description: 'Combine grouping and aggregation to count users in each department.',
		code: `SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
ORDER BY user_count DESC;`
	},
	{
		id: 'sql-join',
		title: 'Join related tables',
		language: 'SQL',
		category: 'SQL',
		description: 'Combine normalized records through their foreign-key relationship.',
		code: `SELECT u.username, o.total
FROM users AS u
JOIN orders AS o ON o.user_id = u.id;`
	},
	{
		id: 'sql-having',
		title: 'Filter groups',
		language: 'SQL',
		category: 'SQL',
		description: 'Use HAVING after GROUP BY when the condition depends on an aggregate.',
		code: `SELECT department_id, COUNT(*) AS user_count
FROM users
GROUP BY department_id
HAVING COUNT(*) >= 2;`
	},
	{
		id: 'sql-case',
		title: 'Conditional projection',
		language: 'SQL',
		category: 'SQL',
		description: 'Create derived labels from numeric values directly in the result set.',
		code: `SELECT name, CASE WHEN price >= 100 THEN 'premium' ELSE 'standard' END AS tier
FROM products;`
	},
	{
		id: 'sql-window',
		title: 'Window calculation',
		language: 'SQL',
		category: 'SQL',
		description: 'Number orders within each user without collapsing individual order rows.',
		code: `SELECT id, user_id, total,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) AS order_number
FROM orders;`
	}
];
