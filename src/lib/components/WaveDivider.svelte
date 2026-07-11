<script>
	import { asset } from '$app/paths';

	/**
	 * The space → underwater transition. Four stacked wave layers with a
	 * glowing sun setting between the white and light-pink crests. The
	 * astronaut (rendered by the parent at z-index 4) sits between the
	 * light-pink (3) and dark-pink (5) layers.
	 *
	 * Geometry from the updated Figma frames (constant from tablet up,
	 * scaling down on phones): white crest 255px tall, light-pink at
	 * +0.63×, pink at +0.95×, front at +1.2×, ocean floor at 2.06×.
	 *
	 * Note: background-image is set inline (not via CSS custom properties)
	 * because relative url()s inside custom properties resolve against the
	 * compiled stylesheet's URL in Chromium, which 404s when the site is
	 * served from a subpath (e.g. GitHub Pages project sites).
	 */
	const layers = [
		{ name: 'white', img: asset('/images/wave-white.svg') },
		{ name: 'lightpink', img: asset('/images/wave-lightpink.svg') },
		{ name: 'pink', img: asset('/images/wave-pink.svg') },
		{ name: 'front', img: asset('/images/wave-bluepink.svg') }
	];

	const sun = asset('/images/sun.svg');
</script>

<div class="waves" aria-hidden="true">
	<div class="layer white">
		<div class="crest" style="background-image: url('{layers[0].img}')"></div>
		<div class="body"></div>
	</div>

	<div class="sun">
		<img src={sun} alt="" />
	</div>

	<div class="layer lightpink">
		<div class="crest" style="background-image: url('{layers[1].img}')"></div>
		<div class="body"></div>
	</div>
	<div class="layer pink">
		<div class="crest" style="background-image: url('{layers[2].img}')"></div>
		<div class="body"></div>
	</div>
	<div class="layer front">
		<div class="crest" style="background-image: url('{layers[3].img}')"></div>
		<div class="body"></div>
	</div>
</div>

<style>
	.waves {
		--crest-h: clamp(140px, 27vw, 255px);
		position: relative;
		height: calc(var(--crest-h) * 2.06);
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
		--tile: calc(var(--crest-h) * 1.45);
		height: var(--crest-h);
		flex-shrink: 0;
		background-repeat: repeat-x;
		background-size: var(--tile) 100%;
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

	/* The setting sun peeks over the light-pink crest */
	.sun {
		position: absolute;
		z-index: 2;
		top: calc(var(--crest-h) * 0.24);
		left: calc(50% + clamp(40px, 7.6vw, 95px));
		width: clamp(180px, 29vw, 361px);
		aspect-ratio: 1;
		transform: translateX(-50%);
		pointer-events: none;
	}

	.sun img {
		position: absolute;
		max-width: none;
		width: 124.8%;
		height: 124.8%;
		left: -12.4%;
		top: -12.4%;
	}

	.layer.lightpink {
		top: calc(var(--crest-h) * 0.63);
		z-index: 3;
	}

	.layer.lightpink .crest {
		--tile: calc(var(--crest-h) * 1.73);
		height: calc(var(--crest-h) * 0.87);
		animation-duration: 34s;
		animation-direction: reverse;
	}

	.layer.lightpink .body {
		background: var(--c-pink);
	}

	.layer.pink {
		top: calc(var(--crest-h) * 0.95);
		z-index: 5;
	}

	.layer.pink .crest {
		--tile: calc(var(--crest-h) * 2);
		height: calc(var(--crest-h) * 0.92);
		animation-duration: 42s;
	}

	.layer.pink .body {
		background: var(--c-accent);
	}

	.layer.front {
		top: calc(var(--crest-h) * 1.2);
		z-index: 6;
	}

	.layer.front .crest {
		--tile: calc(var(--crest-h) * 1.94);
		height: calc(var(--crest-h) * 0.86);
		animation-duration: 52s;
		animation-direction: reverse;
	}

	.layer.front .body {
		background: var(--c-ocean);
	}

	@keyframes drift {
		to {
			background-position-x: var(--tile);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.crest {
			animation: none;
		}
	}
</style>
