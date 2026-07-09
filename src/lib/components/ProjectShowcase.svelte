<script>
	import { fade } from 'svelte/transition';
	import { projects } from '$lib/data/projects.js';

	const VISIBLE = 4;
	const n = projects.length;

	let selected = $state(0);
	let windowStart = $state(0);

	/** Indices of the thumbnails currently in view (wraps around the list). */
	const visible = $derived(Array.from({ length: Math.min(VISIBLE, n) }, (_, i) => (windowStart + i) % n));

	const project = $derived(projects[selected]);

	function next() {
		selected = (selected + 1) % n;
		if (!visible.includes(selected)) windowStart = (windowStart + 1) % n;
	}

	function prev() {
		selected = (selected - 1 + n) % n;
		if (!visible.includes(selected)) windowStart = (windowStart - 1 + n) % n;
	}

	/** @param {number} index */
	function select(index) {
		selected = index;
	}
</script>

<div class="showcase">
	<!-- Featured project -->
	{#key selected}
		<article class="featured" in:fade={{ duration: 350 }}>
			<div class="details">
				<h3>{project.title}</h3>
				<p class="meta"><strong>Role:</strong> {project.role}</p>
				<p class="meta"><strong>Tools:</strong> {project.tools}</p>
				<p class="description">{project.description}</p>
			</div>
			<div class="image">
				<img src={project.image} alt="Screenshot of {project.title}" />
			</div>
		</article>
	{/key}

	<!-- Thumbnail carousel -->
	<div class="carousel">
		<button class="arrow" onclick={prev} aria-label="Previous project">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<polyline points="15 4 7 12 15 20" />
			</svg>
		</button>

		<ul class="thumbs">
			{#each visible as index (index)}
				<li>
					<button
						class="thumb"
						class:active={index === selected}
						onclick={() => select(index)}
						aria-label="View project: {projects[index].title}"
						aria-current={index === selected}
					>
						<img src={projects[index].thumb} alt="" loading="lazy" />
					</button>
				</li>
			{/each}
		</ul>

		<button class="arrow" onclick={next} aria-label="Next project">
			<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<polyline points="9 4 17 12 9 20" />
			</svg>
		</button>
	</div>

	<p class="count" aria-live="polite">
		Project {selected + 1} of {n}
	</p>
</div>

<style>
	.featured {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
		gap: clamp(28px, 5vw, 74px);
		align-items: start;
		margin-bottom: clamp(48px, 6vw, 96px);
	}

	h3 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(20px, 2.2vw, 32px);
		line-height: 1.4;
		text-shadow: 0 8px 23.9px rgba(75, 0, 34, 0.69);
		margin-bottom: clamp(18px, 2.5vw, 40px);
	}

	.meta {
		margin: 0;
		font-size: clamp(15px, 1.5vw, 24px);
		line-height: 1.5;
	}

	.description {
		margin: 1.2em 0 0;
		font-size: clamp(15px, 1.5vw, 24px);
		line-height: 1.45;
	}

	.image img {
		width: 100%;
		aspect-ratio: 632 / 494;
		object-fit: cover;
		object-position: top;
		border-radius: 6px;
	}

	.carousel {
		display: flex;
		align-items: center;
		gap: clamp(12px, 2vw, 32px);
	}

	.thumbs {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(10px, 2vw, 72px);
		margin: 0;
		padding: 0;
		flex: 1;
		min-width: 0;
	}

	.thumb {
		display: block;
		width: 100%;
		border-radius: 6px;
		opacity: 0.7;
		transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
	}

	.thumb img {
		width: 100%;
		aspect-ratio: 260 / 204;
		object-fit: cover;
		object-position: top;
		border-radius: 6px;
	}

	.thumb:hover,
	.thumb:focus-visible {
		opacity: 1;
		transform: translateY(-4px);
	}

	.thumb.active {
		opacity: 1;
		box-shadow: 0 0 0 3px var(--c-pink), 0 0 24px rgba(252, 55, 112, 0.5);
	}

	.arrow {
		flex-shrink: 0;
		display: grid;
		place-items: center;
		width: clamp(40px, 4vw, 52px);
		height: clamp(40px, 4vw, 52px);
		border-radius: 50%;
		color: #fff;
		background: rgba(255, 255, 255, 0.08);
		border: 2px solid rgba(255, 255, 255, 0.55);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		transition: box-shadow 0.2s ease, background 0.2s ease, transform 0.2s ease;
	}

	.arrow:hover,
	.arrow:focus-visible {
		background: rgba(255, 255, 255, 0.18);
		box-shadow: 0 0 17px rgba(255, 255, 255, 0.9); /* "bubblefade" glow from the mock */
		transform: scale(1.06);
	}

	.arrow:active {
		transform: scale(0.96);
	}

	.count {
		margin: 18px 0 0;
		text-align: center;
		font-size: 14px;
		opacity: 0.6;
	}

	@media (max-width: 820px) {
		.featured {
			grid-template-columns: 1fr;
			gap: 28px;
		}

		/* Mobile mock shows the image above the project details */
		.image {
			order: -1;
		}
	}
</style>
