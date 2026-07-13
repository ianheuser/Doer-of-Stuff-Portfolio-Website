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

	/** @param {(typeof allProjects)[number]} project */
	function open(project) {
		selected = project;
		dialog.showModal();
		document.body.style.overflow = 'hidden';
	}

	function onClose() {
		selected = null;
		document.body.style.overflow = '';
	}

	function onDialogClick(e) {
		// A click on the backdrop registers on the <dialog> itself
		if (e.target === dialog) dialog.close();
	}
</script>

<ul class="grid">
	{#each allProjects as project (project.id)}
		<li>
			<button class="tile" onclick={() => open(project)} aria-haspopup="dialog">
				<img src={asset(project.thumb)} alt="" loading="lazy" />
				<span class="tile-title">{project.title}</span>
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

			<img class="hero" src={asset(selected.image)} alt="Screenshot of {selected.title}" />

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
				<a class="behance" href={selected.behance} target="_blank" rel="noopener noreferrer">
					View on Behance
				</a>
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
		grid-template-columns: repeat(auto-fill, minmax(min(220px, 40vw), 1fr));
		gap: clamp(14px, 2.4vw, 32px);
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

	.tile-title {
		display: block;
		margin-top: 10px;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: 15px;
		line-height: 1.3;
		color: var(--c-text);
		opacity: 0.85;
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
		width: min(880px, calc(100vw - 32px));
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
		max-height: 52vh;
		object-fit: cover;
		object-position: top;
		display: block;
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

	.behance {
		display: inline-block;
		margin-top: 22px;
		padding: 10px 22px;
		font-family: var(--font-nunito);
		font-weight: 700;
		font-size: 15px;
		color: #fff;
		text-decoration: none;
		border-radius: 100px;
		background: var(--c-accent);
		transition: background 0.2s ease, box-shadow 0.2s ease;
	}

	.behance:hover,
	.behance:focus-visible {
		background: var(--c-pink);
		box-shadow: 0 0 17px rgba(252, 55, 112, 0.6);
	}

	@media (prefers-reduced-motion: reduce) {
		dialog[open] {
			animation: none;
		}
	}
</style>
