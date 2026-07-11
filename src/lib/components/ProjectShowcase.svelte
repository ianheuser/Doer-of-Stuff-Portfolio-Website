<script>
	import { asset } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { projects } from '$lib/data/projects.js';

	const CYCLE_MS = 8000;
	const PAGE_SIZE = 8; // thumbnails shown at a time (two rows of four)

	let selected = $state(0);
	let paused = $state(false);
	let page = $state(0);
	let expanded = $state(false);

	const project = $derived(projects[selected]);

	// Truncate long descriptions at a word boundary; READ MORE expands inline
	const TRUNCATE_AT = 220;
	const needsTruncation = $derived(project.description.length > TRUNCATE_AT + 40);
	const shortDescription = $derived(
		needsTruncation
			? project.description.slice(0, project.description.lastIndexOf(' ', TRUNCATE_AT))
			: project.description
	);
	const pageCount = $derived(Math.ceil(projects.length / PAGE_SIZE));
	const visible = $derived(projects.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE));

	/** @param {number} index */
	function select(index) {
		selected = index;
		page = Math.floor(index / PAGE_SIZE);
		expanded = false;
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
			if (!paused) {
				selected = (selected + 1) % projects.length;
				page = Math.floor(selected / PAGE_SIZE);
			}
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
				<p class="description">
					{#if needsTruncation && !expanded}
						{shortDescription}
						<button class="read-more" onclick={() => (expanded = true)}>READ MORE....</button>
					{:else}
						{project.description}
						{#if needsTruncation}
							<button class="read-more" onclick={() => (expanded = false)}>SHOW LESS</button>
						{/if}
					{/if}
				</p>
			</div>
			<div class="image">
				<img src={asset(project.image)} alt="Screenshot of {project.title}" />
			</div>
		</article>
	{/key}

	<!-- Thumbnails, two rows of four, paged when there are more than 8 -->
	<ul class="thumbs">
		{#each visible as p, i (p.id)}
			{@const index = page * PAGE_SIZE + i}
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

	{#if pageCount > 1}
		<div class="pager" role="tablist" aria-label="More projects">
			{#each Array(pageCount) as _, i}
				<button
					class="dot"
					class:active={i === page}
					onclick={() => (page = i)}
					aria-label="Projects page {i + 1} of {pageCount}"
					aria-selected={i === page}
					role="tab"
				></button>
			{/each}
		</div>
	{/if}
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
		font-size: clamp(15px, 1.4vw, 21px);
		line-height: 1.5;
	}

	.description {
		margin: 1.2em 0 0;
		font-size: clamp(15px, 1.4vw, 21px);
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
		border-radius: 5px;
		box-shadow: 0 7px 4.2px -5px #000;
		transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
	}

	.thumb img {
		width: 100%;
		aspect-ratio: 268 / 210;
		object-fit: cover;
		object-position: top;
		border-radius: 5px;
	}

	.thumb:hover,
	.thumb:focus-visible {
		transform: translateY(-4px);
		box-shadow: 0 14px 10px -6px rgba(0, 0, 0, 0.7);
	}

	/* The currently featured project dims, like in the mock */
	.thumb.active {
		opacity: 0.5;
		box-shadow: 0 21px 5.2px -5px #000;
	}

	.read-more {
		font: inherit;
		font-weight: 700;
		color: inherit;
		white-space: nowrap;
	}

	.read-more:hover,
	.read-more:focus-visible {
		color: var(--c-pink);
	}

	.pager {
		display: flex;
		justify-content: center;
		gap: 14px;
		margin-top: 28px;
	}

	.dot {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.25);
		border: 2px solid rgba(255, 255, 255, 0.5);
		transition: background 0.2s ease, box-shadow 0.2s ease;
	}

	.dot:hover,
	.dot:focus-visible {
		box-shadow: 0 0 17px rgba(255, 255, 255, 0.9);
	}

	.dot.active {
		background: var(--c-pink);
		border-color: var(--c-pink);
		box-shadow: 0 0 12px rgba(252, 55, 112, 0.7);
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
