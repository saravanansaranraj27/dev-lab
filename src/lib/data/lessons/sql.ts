import type { Lesson } from './types';

export const sqlLessons: Lesson[] = [
	{
		id: 'sql-select',
		title: 'SQL SELECT & Filtering',
		area: 'SQL',
		level: 'Beginner',
		time: '20 min',
		desc: 'Retrieve rows, select columns, filter records, sort results, and limit output.',
		topics: ['SELECT', 'WHERE', 'ORDER BY', 'LIMIT'],
		concept:
			'A SELECT statement describes the result set you want. WHERE filters rows before ordering and limiting the final result.',
		example: 'SELECT id, total\nFROM orders\nWHERE total >= 100\nORDER BY total DESC\nLIMIT 10;',
		runnable: true,
		playgroundMode: 'SQL'
	},
	{
		id: 'sql-aggregates',
		title: 'SQL Aggregation',
		area: 'SQL',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Summarize rows with COUNT, SUM, AVG, MIN, and MAX using the practice database.',
		topics: ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX'],
		concept:
			'Aggregate functions reduce a set of rows to a summary value. The practice runner supports COUNT, SUM, AVG, MIN, and MAX.',
		example: 'SELECT COUNT(*)\nFROM users;',
		runnable: true,
		playgroundMode: 'SQL'
	},
	{
		id: 'sql-joins',
		title: 'SQL JOINs',
		area: 'SQL',
		level: 'Intermediate',
		time: '26 min',
		desc: 'Combine related tables with INNER JOIN and LEFT JOIN while keeping join conditions explicit.',
		topics: ['INNER JOIN', 'LEFT JOIN', 'keys', 'cardinality'],
		concept:
			'A join combines rows according to a relationship. The join condition should connect compatible keys and match the intended cardinality.',
		example:
			'SELECT users.id, orders.total\nFROM users\nINNER JOIN orders ON orders.user_id = users.id;',
		runnable: false
	}
];
