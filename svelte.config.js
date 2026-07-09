import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: undefined
		}),
		paths: {
			// Set by the GitHub Actions workflow so the site works from
			// username.github.io/<repo-name>. Empty locally.
			base: process.env.BASE_PATH || ''
		}
	}
};

export default config;
