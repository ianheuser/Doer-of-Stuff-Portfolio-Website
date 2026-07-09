<script>
	/**
	 * Slowly-rising background particles.
	 * variant="stars"   → glowing white circles (space)
	 * variant="bubbles" → ringed bubbles (underwater)
	 *
	 * Fills its nearest positioned ancestor. Purely decorative (aria-hidden).
	 */
	let { variant = 'stars', count = 26 } = $props();

	let height = $state(0);

	function rand(min, max) {
		return min + Math.random() * (max - min);
	}

	const particles = Array.from({ length: count }, () => {
		const size = rand(4, 40);
		// Bigger particles read as "closer", so let them move a touch faster
		const duration = rand(38, 75) - size * 0.35;
		return {
			size,
			left: rand(-1, 100),
			opacity: variant === 'stars' ? rand(0.18, 0.96) : rand(0.35, 0.95),
			duration,
			delay: -rand(0, duration), // negative delay pre-populates the field
			sway: rand(4, 7),
			swayDist: variant === 'bubbles' ? rand(6, 22) : rand(2, 6),
			restY: rand(2, 96) // resting spot when reduced motion is on
		};
	});
</script>

<div class="field" aria-hidden="true" bind:clientHeight={height} style="--rise: {height + 200}px">
	{#each particles as p}
		<span
			class="particle"
			style="
				left: {p.left}%;
				--size: {p.size}px;
				--o: {p.opacity};
				--dur: {p.duration}s;
				--delay: {p.delay}s;
				--sway-dur: {p.sway}s;
				--sway-dist: {p.swayDist}px;
				--rest-y: {p.restY}%;
			"
		>
			<span class="body {variant}"></span>
		</span>
	{/each}
</div>

<style>
	.field {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		bottom: calc(-1 * var(--size) - 60px);
		width: var(--size);
		height: var(--size);
		will-change: transform;
		animation: rise var(--dur) linear var(--delay) infinite;
	}

	.body {
		display: block;
		width: 100%;
		height: 100%;
		opacity: var(--o);
		animation: sway var(--sway-dur) ease-in-out var(--delay) infinite alternate;
	}

	.body.stars {
		background: rgba(255, 255, 255, 0.96);
		border-radius: 50%;
		box-shadow:
			0 0 8px 2px rgba(255, 255, 255, 0.8),
			0 0 50px 0 #fff;
	}

	.body.bubbles {
		background: url('/images/bubble.svg') center / 100% 100% no-repeat;
		filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.55));
	}

	@keyframes rise {
		to {
			transform: translateY(calc(-1 * var(--rise)));
		}
	}

	@keyframes sway {
		from {
			transform: translateX(calc(-1 * var(--sway-dist)));
		}
		to {
			transform: translateX(var(--sway-dist));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.particle {
			animation: none;
			bottom: auto;
			top: var(--rest-y);
		}

		.body {
			animation: none;
		}
	}
</style>
