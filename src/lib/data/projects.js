/**
 * Recent and Notable Stuff.
 *
 * Roles and tools come from your Behance projects. Descriptions marked TODO
 * need your voice — the BMS Cost Calculator copy is from the Figma mock.
 *
 * Web-optimized images live in /static/images/projects/ (featured = the
 * project's image_01, thumb = its Behance cover). The full originals for
 * every project — including per-project image_NN sets for a future
 * click-through gallery — are in /design-assets-originals/<folder>/, with
 * manifest.json mapping folders to titles and image lists.
 *
 * @typedef {Object} Project
 * @property {string} id      Matches the folder name in design-assets-originals
 * @property {string} title
 * @property {string} role
 * @property {string} tools
 * @property {string} description
 * @property {string} image   Large featured image
 * @property {string} thumb   Thumbnail image
 * @property {string} behance Link to the Behance gallery
 */

/** @type {Project[]} */
export const projects = [
	{
		id: 'bms-cost-calculator',
		title: 'BMS Cost Calculator',
		role: 'Sole Designer and Developer',
		tools: 'Photoshop, Flash, ActionScript 2',
		description:
			'While at Biomedical Systems, our sales men and women had a series of calculations that they made inside of excel files to get ballpark estimations of how much their prospective clients could save if they ran their trials with us. My marketing director at the time came to me with the challenge of making an application that took in that same data, and presented graphs and charts, and was also something nice that the clients could see as well.',
		image: '/images/projects/bms-cost-calculator.webp',
		thumb: '/images/projects/bms-cost-calculator-thumb.webp',
		behance: 'https://www.behance.net/gallery/8868925/BMS-Cost-Calculator'
	},
	{
		id: 'knicks-kiosk',
		title: 'Knicks Kiosk',
		role: 'UI Designer and Flash Animator',
		tools: 'Photoshop, Flash',
		description:
			'TODO — an interactive touch screen kiosk experience built for the New York Knicks. Add the story: the client, the ask, and what you delivered.',
		image: '/images/projects/knicks-kiosk.webp',
		thumb: '/images/projects/knicks-kiosk-thumb.webp',
		behance: 'https://www.behance.net/gallery/8868737/Knicks-Kiosk'
	},
	{
		id: 'rangers-kiosk',
		title: 'Rangers Kiosk',
		role: 'Designer and Flash Animator',
		tools: 'Photoshop, Flash, ActionScript 2',
		description:
			'TODO — an interactive touch screen kiosk experience built for the New York Rangers. Add the story: the client, the ask, and what you delivered.',
		image: '/images/projects/rangers-kiosk.webp',
		thumb: '/images/projects/rangers-kiosk-thumb.webp',
		behance: 'https://www.behance.net/gallery/8868765/Rangers-Kiosk'
	},
	{
		id: 'bms-virtual-tour',
		title: 'BMS Virtual Tour',
		role: 'Designer and Developer',
		tools: 'Photoshop, Flash, ActionScript 2',
		description:
			'TODO — a virtual tour application for Biomedical Systems. Add the story.',
		image: '/images/projects/bms-virtual-tour.webp',
		thumb: '/images/projects/bms-virtual-tour-thumb.webp',
		behance: 'https://www.behance.net/gallery/8874367/BMS-Virtual-Tour'
	},
	{
		id: 'medical-clinics-100',
		title: 'Medical Clinics 100',
		role: 'Designer and Front-End Developer',
		tools: 'Photoshop, Illustrator, Coda',
		description:
			'TODO — a responsive website for a network of medical clinics. Add the story.',
		image: '/images/projects/medical-clinics-100.webp',
		thumb: '/images/projects/medical-clinics-100-thumb.webp',
		behance: 'https://www.behance.net/gallery/36286247/Medical-Clinics-100'
	},
	{
		id: 'ipad-web-app',
		title: 'iPad Web App',
		role: 'UI Designer and Front End Developer',
		tools: 'HTML, CSS, jQuery, Photoshop',
		description:
			'TODO — a touch-first web application designed and built for the iPad. Add the story.',
		image: '/images/projects/ipad-web-app.webp',
		thumb: '/images/projects/ipad-web-app-thumb.webp',
		behance: 'https://www.behance.net/gallery/8863841/iPAD-Web-App'
	},
	{
		id: 'masterkey-interactive-flash-presentation',
		title: 'Masterkey Interactive Sales Presentation',
		role: 'Art Director, Graphic Designer, Animator, Developer',
		tools: 'Photoshop, Flash',
		description:
			'TODO — an interactive Flash sales presentation for Masterkey. Add the story.',
		image: '/images/projects/masterkey-interactive-flash-presentation.webp',
		thumb: '/images/projects/masterkey-interactive-flash-presentation-thumb.webp',
		behance: 'https://www.behance.net/gallery/36289453/Masterkey-Interactive-Flash-Presentation'
	},
	{
		id: 'vertegy-consultants-website',
		title: 'Vertegy Consultants Website',
		role: 'Sole Designer and Front-End Developer',
		tools: 'Photoshop, jQuery, HTML, CSS',
		description:
			'TODO — the full design and front end build of the Vertegy Consultants website. Add the story.',
		image: '/images/projects/vertegy-consultants-website.webp',
		thumb: '/images/projects/vertegy-consultants-website-thumb.webp',
		behance: 'https://www.behance.net/gallery/13797729/Vertegy-Consultants-Website'
	}
];
