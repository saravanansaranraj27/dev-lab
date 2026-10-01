import type { Lesson } from './types';

export const securityLessons: Lesson[] = [
	{
		id: 'security-xss',
		title: 'Web Security: XSS Basics',
		area: 'Security',
		level: 'Intermediate',
		time: '24 min',
		desc: 'Understand why untrusted HTML is dangerous and how escaping, sanitization, and safe DOM APIs reduce risk.',
		topics: ['XSS', 'escaping', 'sanitization', 'DOM APIs'],
		concept:
			'Treat external input as data. Avoid inserting untrusted strings as executable HTML or script content.',
		example:
			'<p id="output"></p>\n<script>\n  const output = document.querySelector("#output");\n  const message = "<img src=x onerror=alert(1)>";\n  if (output) output.textContent = message;\n</script>',
		runnable: true,
		playgroundMode: 'HTML'
	}
];
