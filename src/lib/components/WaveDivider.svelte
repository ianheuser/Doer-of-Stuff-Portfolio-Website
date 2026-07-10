<script>
	import { asset } from '$app/paths';

	/**
	 * The space → underwater transition. Four stacked wave layers, each a
	 * repeating tileable crest SVG with a solid body below it. The astronaut
	 * (rendered by the parent) sinks between the light-pink and dark-pink
	 * layers via z-index.
	 *
	 * Note: background-image is set inline (not via CSS custom properties)
	 * because relative url()s inside custom properties resolve against the
	 * compiled stylesheet's URL in Chromium, which 404s when the site is
	 * served from a subpath (e.g. GitHub Pages project sites). Inline style
	 * URLs always resolve against the document.
	 */
	const layers = [
		{ name: 'white', img: asset('/images/wave-white.svg') },
		{ name: 'lightpink', img: asset('/images/wave-lightpink.svg') },
		{ name: 'pink', img: asset('/images/wave-pink.svg') },
		{ name: 'front', img: asset('/images/wave-bluepink.svg') }
	];
</script>

<div class="waves" aria-hidden="true">
	{#each layers as layer (layer.name)}
		<div class="layer {layer.name}">
			<div class="crest" style="background-image: url('{layer.img}')"></div>
			<div class="body"></div>
		</div>
	{/each}
</div>

<style>
	.waves {
		/* Layer geometry: top offsets of each colored layer as multiples of
		   the crest height. Overridden at ≥1240px so the colored waves ride
		   higher and the astronaut nests between them. */
		--crest-h: clamp(106px, 15vw, 226px);
		--tile-w: clamp(200px, 28vw, 428px);
		--at-lightpink: 1.27;
		--at-pink: 1.67;
		--at-front: 2.4;
		--total: 3.4;
		position: relative;
		height: calc(var(--crest-h) * var(--total));
	}

	@media (min-width: 1240px) {
		.waves {
			--at-lightpink: 0.9;
			--at-pink: 1.25;
			--at-front: 2;
			--total: 3;
		}
	}

	.layer {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.crest {
		height: var(--crest-h);
		flex-shrink: 0;
		background-repeat: repeat-x;
		background-size: var(--tile-w) 100%;
		animation: drift 26s linear infinite;
	}

	.body {
		flex: 1;
	}

	.layer.white {
		top: 0;
		z-index: 1;
		opacity: 0.24;
	}

	.layer.white .body {
		background: rgba(255, 255, 255, 0.7);
	}

	.layer.lightpink {
		top: calc(var(--crest-h) * var(--at-lightpink));
		z-index: 2;
	}

	.layer.lightpink .crest {
		animation-duration: 34s;
		animation-direction: reverse;
	}

	.layer.lightpink .body {
		background: var(--c-pink);
	}

	.layer.pink {
		top: calc(var(--crest-h) * var(--at-pink));
		z-index: 4;
	}

	.layer.pink .crest {
		animation-duration: 42s;
	}

	.layer.pink .body {
		background: var(--c-accent);
	}

	.layer.front {
		top: calc(var(--crest-h) * var(--at-front));
		z-index: 5;
	}

	.layer.front .crest {
		animation-duration: 52s;
		animation-direction: reverse;
	}

	.layer.front .body {
		background: var(--c-ocean);
	}

	@keyframes drift {
		to {
			background-position-x: var(--tile-w);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crest {
			animation: none;
		}
	}
</style>
