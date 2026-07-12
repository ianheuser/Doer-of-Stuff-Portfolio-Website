<script>
	import { asset } from '$app/paths';
	/**
	 * Dictionary-style definition card ("doer", "stuff").
	 * The speaker icon pronounces the word via SpeechSynthesis when available.
	 */
	let { word, phonetic, children } = $props();

	let canSpeak = $state(false);

	$effect(() => {
		canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
	});

	function speak() {
		if (!canSpeak) return;
		window.speechSynthesis.cancel();
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
	}
</script>

<article class="card">
	<header>
		<h3>
			<span class="word">{word}</span>
			<span class="phonetic">[ {phonetic} ]</span>
		</h3>
		{#if canSpeak}
			<button class="speaker" onclick={speak} aria-label="Pronounce “{word}”">
				<img src="{asset('/images/speaker-1.svg')}" alt="Speaker Icon" width="26" height="24" />
			</button>
		{:else}
			<img class="speaker-static" src="{asset('/images/speaker-1.svg')}" alt="" width="26" height="24" />
		{/if}
	</header>

	<div class="definition">
		{@render children()}
	</div>
</article>

<style>
	.card {
		position: relative;
		width: min(366px, 100%);
		padding: clamp(20px, 2vw, 26px) clamp(22px, 2.4vw, 31px) clamp(24px, 2.4vw, 30px);
		background: var(--c-card);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 10px solid var(--c-accent);
		border-radius: 5px 5px 0 0;
		box-shadow: -10px 50px 80px 0 rgba(8, 20, 32, 0.3);
	}

	header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: clamp(12px, 1.6vw, 22px);
	}

	h3 {
		font-family: var(--font-body);
		font-weight: 700;
		font-size: clamp(24px, 2vw, 28px);
		line-height: 1.15;
		color: #fff;
		display: flex;
		flex-direction: column;
	}

	.speaker {
		flex-shrink: 0;
		margin-top: 6px;
		transition: transform 0.2s ease;
	}

	.speaker:hover,
	.speaker:focus-visible {
		transform: scale(1.15);
	}

	.speaker-static {
		flex-shrink: 0;
		margin-top: 6px;
		opacity: 0.3;
	}

	.definition {
		font-size: clamp(14px, 1.15vw, 16px);
		line-height: 1.45;
		color: var(--c-text);
	}

	.definition :global(p) {
		margin: 0;
	}

	.definition :global(ol) {
		margin: 0;
		padding-left: 27px;
		font-weight: 700;
	}

	.definition :global(li) {
		margin-bottom: 2px;
	}

	.definition :global(b) {
		font-weight: 700;
	}
</style>
