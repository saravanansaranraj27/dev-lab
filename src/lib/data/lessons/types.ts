export type LessonArea =
	| 'JavaScript'
	| 'TypeScript'
	| 'HTML'
	| 'CSS'
	| 'Web'
	| 'SQL'
	| 'Algorithms'
	| 'Tooling'
	| 'Security';

export type Lesson = {
	id: string;
	title: string;
	area: LessonArea;
	level: 'Beginner' | 'Intermediate' | 'Advanced';
	time: string;
	desc: string;
	topics: string[];
	concept: string;
	example: string;
	runnable: boolean;
	playgroundMode?: 'JavaScript' | 'TypeScript' | 'HTML' | 'CSS' | 'JSON' | 'SQL';
};
