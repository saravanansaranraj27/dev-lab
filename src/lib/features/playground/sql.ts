export type SqlRow = Record<string, string | number | null>;

type SqlResult = { output: string; error: string; status: string };

export const getPracticeTables = (): Record<string, SqlRow[]> => ({
	users: [
		{ id: 1, username: 'user_001', email: 'user_001@example.test', department_id: 1 },
		{ id: 2, username: 'user_002', email: 'user_002@example.test', department_id: 2 },
		{ id: 3, username: 'user_003', email: 'user_003@example.test', department_id: 2 },
		{ id: 4, username: 'user_004', email: 'user_004@example.test', department_id: 3 }
	],
	departments: [
		{ id: 1, name: 'Engineering' },
		{ id: 2, name: 'Design' },
		{ id: 3, name: 'Operations' }
	],
	products: [
		{ id: 1, name: 'Product A', price: 29 },
		{ id: 2, name: 'Product B', price: 49 },
		{ id: 3, name: 'Product C', price: 79 }
	],
	orders: [
		{ id: 101, user_id: 1, total: 78, order_date: '2026-01-12' },
		{ id: 102, user_id: 2, total: 129, order_date: '2026-02-03' },
		{ id: 103, user_id: 2, total: 49, order_date: '2026-02-21' },
		{ id: 104, user_id: 3, total: 199, order_date: '2026-03-08' }
	]
});

const splitSql = (value: string) =>
	value
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean);

const sqlValue = (value: string, row: SqlRow) => {
	const key = value.trim().toLowerCase();
	if (Object.prototype.hasOwnProperty.call(row, key)) return row[key];
	if (/^'.*'$/.test(value.trim())) return value.trim().slice(1, -1).replace(/''/g, "'");
	if (/^-?\d+(\.\d+)?$/.test(value.trim())) return Number(value.trim());
	if (value.trim().toUpperCase() === 'NULL') return null;
	return value.trim();
};

const sqlCondition = (expression: string, row: SqlRow) => {
	const match = expression.trim().match(/^([\w.]+)\s*(=|!=|<>|>=|<=|>|<|LIKE)\s*(.+)$/i);
	if (!match) throw new Error(`Unsupported WHERE condition: ${expression}`);
	const left = sqlValue(match[1], row);
	const right = sqlValue(match[3], row);
	if (match[2].toUpperCase() === 'LIKE') {
		const pattern = String(right)
			.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			.replace(/%/g, '.*')
			.replace(/_/g, '.');
		return new RegExp(`^${pattern}$`, 'i').test(String(left ?? ''));
	}
	if (match[2] === '=') return left === right;
	if (match[2] === '!=' || match[2] === '<>') return left !== right;
	if (match[2] === '>') return Number(left) > Number(right);
	if (match[2] === '<') return Number(left) < Number(right);
	if (match[2] === '>=') return Number(left) >= Number(right);
	return Number(left) <= Number(right);
};

export const runSqlQuery = (code: string): SqlResult => {
	const source = code.trim().replace(/;\s*$/, '');
	if (!source)
		return { output: 'SQL query is empty.', error: 'Enter a SQL query.', status: 'SQL error' };
	try {
		const database = getPracticeTables();
		const select = source.match(
			/^SELECT\s+(.+?)\s+FROM\s+([\w]+)(?:\s+WHERE\s+(.+?))?(?:\s+GROUP\s+BY\s+(.+?))?(?:\s+ORDER\s+BY\s+([\w]+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/is
		);
		if (!select)
			throw new Error(
				'Supported SQL flow: SELECT ... FROM ... with optional WHERE, GROUP BY, ORDER BY, and LIMIT.'
			);
		const columns = select[1].trim();
		const tableName = select[2].toLowerCase();
		if (!database[tableName]) throw new Error(`Table "${tableName}" does not exist.`);
		let rows = database[tableName].map((row) => ({ ...row }));
		if (select[3]) rows = rows.filter((row) => sqlCondition(select[3], row));
		if (select[4]) {
			const groupKey = select[4].trim().toLowerCase();
			const groups = new Map<string, SqlRow>();
			for (const row of rows) {
				const key = String(row[groupKey]);
				if (!groups.has(key)) groups.set(key, { ...row });
			}
			rows = [...groups.values()];
		}
		if (select[5]) {
			const orderKey = select[5].toLowerCase();
			const direction = select[6]?.toUpperCase() === 'DESC' ? -1 : 1;
			rows.sort((a, b) => {
				const av = a[orderKey];
				const bv = b[orderKey];
				if (av === bv) return 0;
				if (av === null) return -1 * direction;
				if (bv === null) return 1 * direction;
				return (av < bv ? -1 : 1) * direction;
			});
		}
		if (select[7]) rows = rows.slice(0, Number(select[7]));
		const aggregate = columns.match(/^(COUNT|SUM|AVG|MIN|MAX)\s*\(\s*([\w*]+)\s*\)$/i);
		let result: SqlRow[];
		if (aggregate) {
			const fn = aggregate[1].toUpperCase();
			const key = aggregate[2].toLowerCase();
			const values =
				key === '*'
					? rows
					: rows.map((row) => row[key]).filter((value) => value !== null && value !== undefined);
			const numeric = values.map(Number);
			const value =
				fn === 'COUNT'
					? values.length
					: fn === 'SUM'
						? numeric.reduce((a, b) => a + b, 0)
						: fn === 'AVG'
							? numeric.reduce((a, b) => a + b, 0) / Math.max(numeric.length, 1)
							: fn === 'MIN'
								? Math.min(...numeric)
								: Math.max(...numeric);
			result = [{ [`${fn.toLowerCase()}(${aggregate[2]})`]: value }];
		} else if (columns === '*') {
			result = rows;
		} else {
			const fields = splitSql(columns).map((field) => field.split(/\s+AS\s+/i));
			result = rows.map((row) =>
				Object.fromEntries(
					fields.map(([field, alias]) => [
						alias?.trim() || field.trim(),
						sqlValue(field.trim(), row)
					])
				)
			);
		}
		const keys = Object.keys(result[0] ?? {});
		const lines = [
			keys.join(' | '),
			keys.map(() => '---').join(' | '),
			...result.map((row) => keys.map((key) => String(row[key] ?? 'NULL')).join(' | '))
		];
		const countLabel = `${result.length} row${result.length === 1 ? '' : 's'}`;
		return {
			output: `${lines.join('\n')}\n\n${countLabel}`,
			error: '',
			status: `Query complete · ${countLabel}`
		};
	} catch (error) {
		return {
			output: 'SQL execution failed.',
			error: error instanceof Error ? error.message : String(error),
			status: 'SQL error'
		};
	}
};
