<script>
	import { asset } from '$app/paths';
	import Nav from '$lib/components/Nav.svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import DefinitionCard from '$lib/components/DefinitionCard.svelte';
	import WaveDivider from '$lib/components/WaveDivider.svelte';
	import ProjectShowcase from '$lib/components/ProjectShowcase.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>The Doer of Stuff — Ian McCarthy</title>
</svelte:head>

<Nav />

<main>
	<!-- ============ SPACE: hero, definition cards, astronaut ============ -->
	<section class="top" aria-label="Introduction">
		<ParticleField variant="stars" count={32} />

		<div class="space-head">
			<h1>Welcome, to the portfolio of Ian&nbsp;McCarthy, otherwise known as The&nbsp;Doer&nbsp;of&nbsp;Stuff</h1>
		</div>

		<div class="astronaut">
			<img src={asset('/images/astronaut.webp')} alt="An astronaut floating in space, wearing glasses, with the DO logo on his suit" />
		</div>

		<div class="space-cards">
			<div class="cards">
				<div class="card doer">
					<DefinitionCard word="doer" phonetic="doo-er">
						<p>
							<b>1)</b> a person or thing that does something, especially when done with vigor and
							efficiency
						</p>
					</DefinitionCard>
				</div>
				<div class="card stuff">
					<DefinitionCard word="stuff" phonetic="st-uf">
						<ol>
							<li>Front End Web Development</li>
							<li>Full Stack Web Development</li>
							<li>User Interface Design</li>
							<li>User Experience Design</li>
							<li>Graphic Design</li>
							<li>Rapid AI Assisted Prototyping</li>
							<li>AI Training</li>
							<li>Prompt Engineering</li>
						</ol>
					</DefinitionCard>
				</div>
			</div>
		</div>

		<WaveDivider />
	</section>

	<!-- ============ UNDERWATER: recent and notable stuff ============ -->
	<section class="ocean" id="stuff" aria-label="Recent and notable projects">
		<ParticleField variant="bubbles" count={20} />

		<div class="ocean-content">
			<h2>Recent and Notable Stuff</h2>
			<ProjectShowcase />
		</div>

		<Footer />
	</section>
</main>

<style>
	/* ------------------------------------------------------------ space */
	.top {
		position: relative;
		background: linear-gradient(to bottom, var(--c-space-top) 0px, var(--c-space-bottom) 580px);
		overflow: hidden;
	}

	.space-head,
	.space-cards {
		position: relative;
		z-index: 6;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.space-head {
		padding-top: calc(var(--nav-height) + clamp(60px, 9.5vw, 144px));
	}

	h1 {
		max-width: 735px;
		margin-left: auto;
		text-align: right;
		font-weight: 600;
		font-size: clamp(24px, 3.4vw, 52px);
		line-height: 1.4;
		text-shadow: 0 3px 13px rgba(255, 255, 255, 0.85);
	}

	.cards {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		gap: clamp(24px, 3.3vw, 50px);
		margin-top: clamp(40px, 4.6vw, 70px);
	}

	.card {
		flex: 0 1 433px;
		min-width: 0;
	}

	.card.doer {
		margin-top: 120px;
	}

	/* Cards dip into the waves like the mock */
	.space-cards {
		margin-bottom: -130px;
	}

	/* Astronaut spans from the hero down into the waves; z-index 3 tucks him
	   between the light-pink (2) and dark-pink (4) wave layers */
	.astronaut {
		position: absolute;
		z-index: 3;
		top: calc(var(--nav-height) + 34px);
		left: 3vw;
		width: min(40vw, 604px);
		aspect-ratio: 599 / 1591;
		overflow: hidden;
		transform: rotate(0.54deg);
		pointer-events: none;
	}

	.astronaut img {
		position: absolute;
		max-width: none;
		width: 156.9%;
		height: 101.86%;
		left: -27.15%;
		top: 0;
		object-fit: cover;
	}

	/* ------------------------------------------------------------ ocean */
	.ocean {
		position: relative;
		background: var(--c-ocean);
		overflow: hidden;
	}

	.ocean-content {
		position: relative;
		z-index: 1;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: clamp(40px, 6vw, 96px) var(--gutter) clamp(48px, 6vw, 110px);
	}

	h2 {
		font-weight: 600;
		font-size: clamp(30px, 3.2vw, 48px);
		line-height: 1.35;
		text-shadow: 0 3px 13px rgba(255, 255, 255, 0.85);
		margin-bottom: clamp(36px, 5vw, 90px);
	}

	/* ------------------------------------------------------- responsive */
	@media (max-width: 900px) {
		.space-head {
			padding-top: calc(var(--nav-height) + 44px);
		}

		h1 {
			text-align: center;
			margin: 0 auto;
			max-width: 22em;
		}

		/* Astronaut joins the normal flow between headline and cards */
		.astronaut {
			position: relative;
			z-index: 0;
			top: auto;
			left: auto;
			width: min(304px, 72vw);
			aspect-ratio: 10 / 17;
			margin: 28px 0 0 8%;
		}

		.astronaut img {
			width: 151%;
			height: 155.25%;
			left: -26.1%;
			top: -10.4%;
		}

		.cards {
			flex-direction: column;
			align-items: stretch;
			gap: 32px;
			/* Cards overlap the astronaut's lower half like the mobile mock */
			margin-top: -70px;
		}

		.card,
		.card.doer {
			margin-top: 0;
			flex-basis: auto;
		}

		.space-cards {
			margin-bottom: -60px;
		}

		h2 {
			text-align: center;
		}
	}
</style>
