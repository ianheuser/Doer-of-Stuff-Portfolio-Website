<script>
	import { asset } from '$app/paths';
	import { allProjects } from '$lib/data/projects-all.js';

	/**
	 * Alternate showcase: a big grid of every project; clicking a tile opens
	 * a modal with the details. Swappable with ProjectShowcase via the
	 * SHOWCASE_MODE flag in +page.svelte.
	 *
	 * Uses <dialog>, so Esc, focus containment, and top-layer stacking come
	 * from the platform.
	 */

	/** @type {HTMLDialogElement} */
	let dialog;
	let selected = $state(null);
	let activeImage = $state(0);

	/** @param {(typeof allProjects)[number]} project */
	function open(project) {
		selected = project;
		activeImage = 0;
		dialog.showModal();
		// Compensate for the vanishing scrollbar so the page doesn't shift
		const scrollbar = window.innerWidth - document.documentElement.clientWidth;
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = `${scrollbar}px`;
	}

	function onClose() {
		selected = null;
		document.body.style.overflow = '';
		document.body.style.paddingRight = '';
	}

	function onDialogClick(e) {
		// A click on the backdrop registers on the <dialog> itself
		if (e.target === dialog) dialog.close();
	}
</script>

<ul class="grid">
	{#each allProjects as project (project.id)}
		<li>
			<button class="tile" onclick={() => open(project)} aria-haspopup="dialog" aria-label={project.title}>
				<img src={asset(project.thumb)} alt="" loading="lazy" />
			</button>
		</li>
	{/each}
</ul>

<dialog bind:this={dialog} onclick={onDialogClick} onclose={onClose}>
	{#if selected}
		<article>
			<button class="close" onclick={() => dialog.close()} aria-label="Close">
				<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
					<line x1="5" y1="5" x2="19" y2="19" />
					<line x1="19" y1="5" x2="5" y2="19" />
				</svg>
			</button>

			<img class="hero" src={asset(selected.images[activeImage])} alt="Screenshot of {selected.title}" />

			{#if selected.images.length > 1}
				<div class="filmstrip" role="tablist" aria-label="Project images">
					{#each selected.images as image, i (image)}
						<button
							class="filmstrip-thumb"
							class:active={i === activeImage}
							role="tab"
							aria-selected={i === activeImage}
							aria-label="Image {i + 1} of {selected.images.length}"
							onclick={() => (activeImage = i)}
						>
							<img src={asset(image)} alt="" loading="lazy" />
						</button>
					{/each}
				</div>
			{/if}

			<div class="body">
				<h3>{selected.title}</h3>
				{#if selected.role}
					<p class="meta"><strong>Role:</strong> {selected.role}</p>
				{/if}
				{#if selected.tools}
					<p class="meta"><strong>Tools:</strong> {selected.tools}</p>
				{/if}
				{#if selected.description && !selected.description.startsWith('TODO')}
					<p class="description">{selected.description}</p>
				{/if}
			</div>
		</article>
	{/if}
</dialog>

<style>
	.grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: clamp(14px, 2.4vw, 32px);
	}

	@media (max-width: 640px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.tile {
		display: block;
		width: 100%;
		text-align: left;
		border-radius: 5px;
		transition: transform 0.2s ease;
	}

	.tile img {
		width: 100%;
		aspect-ratio: 268 / 210;
		object-fit: cover;
		object-position: top;
		border-radius: 5px;
		box-shadow: 0 7px 4.2px -5px #000;
		transition: box-shadow 0.2s ease;
	}

	.tile:hover,
	.tile:focus-visible {
		transform: translateY(-4px);
	}

	.tile:hover img,
	.tile:focus-visible img {
		box-shadow: 0 14px 12px -6px rgba(0, 0, 0, 0.7), 0 0 17px rgba(255, 255, 255, 0.35);
	}

	/* ------------------------------------------------------------ modal */
	dialog {
		padding: 0;
		border: none;
		border-radius: 5px 5px 0 0;
		border-bottom: 10px solid var(--c-accent);
		background: var(--c-card-solid);
		color: var(--c-text);
		/* 100% of the viewport excludes the scrollbar; 100vw does not and
		   overflows to the right when classic scrollbars are visible */
		width: min(880px, calc(100% - 32px));
		max-height: calc(100vh - 64px);
		box-shadow: -10px 50px 80px 0 rgba(8, 20, 32, 0.6);
	}

	dialog::backdrop {
		background: rgba(0, 12, 24, 0.7);
		backdrop-filter: blur(4px);
	}

	dialog[open] {
		animation: pop 0.25s ease;
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: translateY(16px) scale(0.98);
		}
	}

	article {
		position: relative;
	}

	.close {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 1;
		display: grid;
		place-items: center;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		color: #fff;
		background: rgba(8, 20, 32, 0.65);
		transition: background 0.2s ease, transform 0.2s ease;
	}

	.close:hover,
	.close:focus-visible {
		background: var(--c-accent);
		transform: scale(1.08);
	}

	.hero {
		width: 100%;
		height: 52vh;
		object-fit: contain;
		display: block;
		background: rgba(0, 12, 24, 0.45);
	}

	.body {
		padding: clamp(20px, 3vw, 32px) clamp(20px, 3.5vw, 40px) clamp(24px, 3vw, 36px);
	}

	h3 {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: clamp(22px, 2.4vw, 30px);
		line-height: 1.3;
		margin-bottom: 14px;
		text-shadow: 0 8px 23.9px rgba(75, 0, 34, 0.69);
	}

	.meta {
		margin: 0;
		font-size: clamp(15px, 1.3vw, 18px);
		line-height: 1.55;
	}

	.description {
		margin: 1em 0 0;
		font-size: clamp(15px, 1.3vw, 18px);
		line-height: 1.5;
	}

	.filmstrip {
		display: flex;
		gap: 10px;
		padding: 14px clamp(20px, 3.5vw, 40px) 0;
		overflow-x: auto;
	}

	.filmstrip-thumb {
		flex: 0 0 auto;
		width: 76px;
		border-radius: 4px;
		opacity: 0.55;
		outline: 2px solid transparent;
		outline-offset: 2px;
		transition: opacity 0.2s ease, outline-color 0.2s ease;
	}

	.filmstrip-thumb img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		object-position: top;
		border-radius: 4px;
	}

	.filmstrip-thumb:hover,
	.filmstrip-thumb:focus-visible {
		opacity: 1;
	}

	.filmstrip-thumb.active {
		opacity: 1;
		outline-color: var(--c-accent);
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
</style>
