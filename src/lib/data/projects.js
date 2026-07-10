/**
 * Recent and Notable Stuff.
 *
 * The first entry is real (from the Figma mock). The rest are placeholders —
 * swap in your actual projects, images, and copy. Images live in /static/images.
 *
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} role
 * @property {string} tools
 * @property {string} description
 * @property {string} image  Large featured image
 * @property {string} thumb  Thumbnail image
 */

/** @type {Project[]} */
export const projects = [
	{
		id: 'clinical-trial-savings-calculator',
		title: 'Clinical Trial Savings Calculator',
		role: 'Designer and Developer',
		tools: 'Adobe Illustrator, Adobe Flash, ActionScript',
		description:
			'While at Biomedical Systems, our sales men and women had a series of calculations that they made inside of excel files to get ballpark estimations of how much their prospective clients could save if they ran their trials with us. My marketing director at the time came to me with the challenge of making an application that took in that same data, and presented graphs and charts, and was also something nice that the clients could see as well.',
		image: '/images/project-calc-main.webp',
		thumb: '/images/project-calc-main.webp'
	},
	// --- Placeholders below: replace with real projects -------------------
	{
		id: 'corporate-intranet',
		title: 'Corporate Intranet Redesign',
		role: 'UI Designer and Front End Developer',
		tools: 'Figma, HTML, CSS, JavaScript',
		description:
			'Placeholder — a full redesign of a corporate intranet, from stakeholder interviews and Figma mockups through a fully responsive front end build. Replace this copy with the real story.',
		image: '/images/project-thumb-7.webp',
		thumb: '/images/project-thumb-7.webp'
	},
	{
		id: 'touchscreen-kiosk',
		title: 'Touch Screen Kiosk Experience',
		role: 'Interactive Designer and Developer',
		tools: 'Photoshop, Illustrator, ActionScript',
		description:
			'Placeholder — an interactive touch screen kiosk designed for walk-up use, with large tap targets, an attract loop, and a simple wayfinding flow. Replace this copy with the real story.',
		image: '/images/project-thumb-11.webp',
		thumb: '/images/project-thumb-11.webp'
	},
	{
		id: 'elearning-platform',
		title: 'eLearning Course Platform',
		role: 'Designer and Developer',
		tools: 'Adobe Flash, ActionScript, Illustrator',
		description:
			'Placeholder — a series of interactive eLearning programs with animated lessons, quizzes, and progress tracking. Replace this copy with the real story.',
		image: '/images/project-thumb-7.webp',
		thumb: '/images/project-thumb-7.webp'
	},
	{
		id: 'marketing-website',
		title: 'Forward Facing Marketing Website',
		role: 'Full Stack Developer',
		tools: 'Svelte, SvelteKit, Node',
		description:
			'Placeholder — a fully responsive marketing website built in SvelteKit, connected to backend APIs, with a CMS-driven content model. Replace this copy with the real story.',
		image: '/images/project-thumb-11.webp',
		thumb: '/images/project-thumb-11.webp'
	},
	{
		id: 'data-dashboard',
		title: 'Enterprise Data Dashboard',
		role: 'Front End Developer',
		tools: 'JavaScript, DataTables.js, jQuery, T-SQL',
		description:
			'Placeholder — a dense, filterable reporting dashboard handling large datasets with server-side processing. Replace this copy with the real story.',
		image: '/images/project-calc-main.webp',
		thumb: '/images/project-calc-main.webp'
	},
	{
		id: 'brand-identity',
		title: 'Brand Identity & Logo Suite',
		role: 'Graphic Designer',
		tools: 'Illustrator, Photoshop',
		description:
			'Placeholder — a full identity package: logo, business cards, stationery, and brand guidelines. Replace this copy with the real story.',
		image: '/images/project-thumb-7.webp',
		thumb: '/images/project-thumb-7.webp'
	},
	{
		id: 'ai-prototype',
		title: 'AI Assisted Rapid Prototype',
		role: 'Designer and Prompt Engineer',
		tools: 'MidJourney, Framer, Figma',
		description:
			'Placeholder — a concept-to-clickable prototype built in days using AI-assisted asset generation and rapid iteration. Replace this copy with the real story.',
		image: '/images/project-thumb-11.webp',
		thumb: '/images/project-thumb-11.webp'
	}
];
