<script>
	/**
	 * The space → underwater transition. Four stacked wave layers, each a
	 * repeating tileable crest SVG with a solid body below it. The astronaut
	 * (rendered by the parent) sinks between the light-pink and dark-pink
	 * layers via z-index.
	 */
</script>

<div class="waves" aria-hidden="true">
	<div class="layer white">
		<div class="crest"></div>
		<div class="body"></div>
	</div>
	<div class="layer lightpink">
		<div class="crest"></div>
		<div class="body"></div>
	</div>
	<div class="layer pink">
		<div class="crest"></div>
		<div class="body"></div>
	</div>
	<div class="layer front">
		<div class="crest"></div>
		<div class="body"></div>
	</div>
</div>

<style>
	.waves {
		/* Layer geometry (desktop), scaled down at the mobile breakpoint */
		--crest-h: clamp(106px, 15vw, 226px);
		--tile-w: clamp(200px, 28vw, 428px);
		position: relative;
		height: calc(var(--crest-h) * 3.4);
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

	.layer.white .crest {
		background-image: url('/images/wave-white.svg');
	}

	.layer.white .body {
		background: rgba(255, 255, 255, 0.7);
	}

	.layer.lightpink {
		top: calc(var(--crest-h) * 1.27);
		z-index: 2;
	}

	.layer.lightpink .crest {
		background-image: url('/images/wave-lightpink.svg');
		animation-duration: 34s;
		animation-direction: reverse;
	}

	.layer.lightpink .body {
		background: var(--c-pink);
	}

	.layer.pink {
		top: calc(var(--crest-h) * 1.67);
		z-index: 4;
	}

	.layer.pink .crest {
		background-image: url('/images/wave-pink.svg');
		animation-duration: 42s;
	}

	.layer.pink .body {
		background: var(--c-accent);
	}

	.layer.front {
		top: calc(var(--crest-h) * 2.4);
		z-index: 5;
	}

	.layer.front .crest {
		background-image: url('/images/wave-bluepink.svg');
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
