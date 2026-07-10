<script>
	import { asset } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { projects } from '$lib/data/projects.js';

	const CYCLE_MS = 8000;

	let selected = $state(0);
	let paused = $state(false);

	const project = $derived(projects[selected]);

	/** @param {number} index */
	function select(index) {
		selected = index;
		restart();
	}

	// Slowly cycle through the projects; clicking a thumbnail restarts the
	// timer, hovering the showcase pauses it, reduced-motion disables it.
	let timer;

	function restart() {
		clearInterval(timer);
		if (typeof window === 'undefined') return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		timer = setInterval(() => {
			if (!paused) selected = (selected + 1) % projects.length;
		}, CYCLE_MS);
	}

	$effect(() => {
		restart();
		return () => clearInterval(timer);
	});
</script>

<div
	class="showcase"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
	role="group"
	aria-label="Featured projects"
>
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
				<img src={asset(project.image)} alt="Screenshot of {project.title}" />
			</div>
		</article>
	{/key}

	<!-- All projects, two rows of four -->
	<ul class="thumbs">
		{#each projects as p, index (p.id)}
			<li>
				<button
					class="thumb"
					class:active={index === selected}
					onclick={() => select(index)}
					aria-label="View project: {p.title}"
					aria-current={index === selected}
				>
					<img src={asset(p.thumb)} alt="" loading="lazy" />
				</button>
			</li>
		{/each}
	</ul>
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

	.thumbs {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(10px, 2.4vw, 36px);
		margin: 0;
		padding: 0;
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
