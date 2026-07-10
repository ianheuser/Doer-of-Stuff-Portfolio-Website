<script>
	import { asset } from '$app/paths';

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
		if (variant === 'bubbles') {
			const size = rand(4, 40);
			// Bigger bubbles read as "closer", so let them move a touch faster
			const duration = rand(38, 75) - size * 0.35;
			return {
				size,
				left: rand(-1, 100),
				opacity: rand(0.35, 0.95),
				duration,
				delay: -rand(0, duration), // negative delay pre-populates the field
				sway: rand(4, 7),
				swayDist: rand(6, 22),
				blur: 0,
				z: null,
				restY: rand(2, 96) // resting spot when reduced motion is on
			};
		}

		// Stars: mostly tiny and distant, drifting very slowly. Size drives the
		// depth of field — small = far (dim, slow, soft), big = near (bright).
		const size = 2 + 14 * Math.pow(Math.random(), 2.2);
		const depth = size / 16; // 0 = far, 1 = near
		const duration = rand(130, 220) + (1 - depth) * 90;
		// A few stars ride in front of the wave layers (z 2/4 sits between
		// them) so they seem to drift up from between the crests.
		const roll = Math.random();
		const z = roll > 0.88 ? 4 : roll > 0.72 ? 2 : null;
		return {
			size,
			left: rand(-1, 100),
			opacity: 0.15 + depth * 0.7 + rand(0, 0.1),
			duration,
			delay: -rand(0, duration),
			sway: rand(10, 18),
			swayDist: rand(1, 3),
			blur: size < 3.5 ? 0.8 : size > 11 ? 1.4 : 0,
			z,
			restY: rand(2, 96)
		};
	});
</script>

<div
	class="field"
	aria-hidden="true"
	bind:clientHeight={height}
	style="--rise: {height + 200}px"
>
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
				--blur: {p.blur}px;
				--rest-y: {p.restY}%;
				{p.z !== null ? `z-index: ${p.z};` : ''}
			"
		>
			<!-- background-image is inline so its relative URL resolves against
			     the document, not the compiled stylesheet (subpath-safe) -->
			<span
				class="body {variant}"
				style={variant === 'bubbles' ? `background-image: url('${asset('/images/bubble.svg')}')` : ''}
			></span>
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
		/* Glow scales with the star instead of a fixed 50px halo */
		box-shadow:
			0 0 calc(var(--size) * 1.2) calc(var(--size) * 0.15) rgba(255, 255, 255, 0.85),
			0 0 calc(var(--size) * 4) rgba(255, 255, 255, 0.3);
		filter: blur(var(--blur, 0px));
	}

	.body.bubbles {
		background-position: center;
		background-size: 100% 100%;
		background-repeat: no-repeat;
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
