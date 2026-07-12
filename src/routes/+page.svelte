<script>
	import { asset } from '$app/paths';
	import Header from '$lib/components/Header.svelte';
	import ParticleField from '$lib/components/ParticleField.svelte';
	import DefinitionCard from '$lib/components/DefinitionCard.svelte';
	import WaveDivider from '$lib/components/WaveDivider.svelte';
	import ProjectShowcase from '$lib/components/ProjectShowcase.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Web Portfolio - The Doer of Stuff</title>
</svelte:head>

<Header />

<main>
	<!-- ============ SPACE: hero, definition cards, astronaut ============ -->
	<section class="top" aria-label="Introduction">
		<ParticleField variant="stars" count={48} />

		<div class="space-head">
			<h1>
				<span class="h-desktop">Hello, I am The&nbsp;Doer&nbsp;of&nbsp;Stuff.<br />Welcome to my portfolio.</span>
				<span class="h-phone">Hello, I am The&nbsp;Doer&nbsp;of&nbsp;Stuff, and this is my portfolio.</span>
			</h1>
		</div>

		<div class="astronaut">
			<img
				src={asset('/images/astronaut2.webp')}
				alt="An astronaut in a knit beanie with the DO logo, helmet tucked under his arm"
			/>
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

	<!-- ============ UNDERWATER: stuff I done did already ============ -->
	<section class="ocean" id="stuff" aria-label="Recent and notable projects">
		<ParticleField variant="bubbles" count={20} />

		<div class="ocean-content">
			<h2>Stuff I Done Did Already</h2>
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
		z-index: 7;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: 0 var(--gutter);
	}

	.space-head {
		padding-top: calc(var(--nav-height) + clamp(56px, 8.5vw, 125px));
	}

	h1 {
		max-width: 855px;
		margin-left: auto;
		text-align: right;
		font-weight: 600;
		font-size: clamp(24px, 3vw, 52px);
		line-height: 1.55;
		text-shadow: 0 3px 13px rgba(255, 255, 255, 0.85);
	}

	.h-phone {
		display: none;
	}

	.cards {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		gap: 26px;
		margin-top: clamp(28px, 3.5vw, 54px);
	}

	.card {
		flex: 0 1 366px;
		min-width: 0;
	}

	/* Cards dip into the waves */
	.space-cards {
		margin-bottom: clamp(-90px, -4vw, -30px);
	}

	/* Astronaut spans from below the nav down into the waves; z-index 4
	   tucks him between the light-pink (3) and dark-pink (5) wave layers */
	.astronaut {
		position: absolute;
		z-index: 4;
		top: var(--nav-height);
		left: max(calc(50vw - 760px), -6vw);
		width: clamp(560px, 63vw, 800px);
		aspect-ratio: 2 / 3;
		pointer-events: none;
	}

	.astronaut img {
		width: 100%;
		height: 100%;
		object-fit: contain;
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
		font-size: clamp(30px, 3.2vw, 56px);
		line-height: 1.4;
		text-shadow: 0 3px 13px rgba(255, 255, 255, 0.85);
		margin-bottom: clamp(36px, 5vw, 80px);
	}

	/* ---------------------------------------------- tablet (601–1100px) */
	@media (max-width: 1100px) and (min-width: 601px) {
		/* Cards stack in a right-hand column beside the astronaut */
		.cards {
			flex-direction: column;
			align-items: flex-end;
			gap: 18px;
			margin-top: clamp(20px, 3vw, 40px);
		}

		.card {
			flex-basis: auto;
			width: min(366px, 52vw);
		}

		.astronaut {
			left: -6vw;
			width: clamp(420px, 66vw, 620px);
		}

		.space-cards {
			margin-bottom: -160px;
		}

		h1 {
			max-width: 62vw;
			font-size: clamp(26px, 3.9vw, 38px);
		}
	}

	/* -------------------------------------------------- phone (≤600px) */
	@media (max-width: 600px) {
		.space-head {
			padding-top: calc(var(--nav-height) + 40px);
		}

		h1 {
			text-align: center;
			margin: 0 auto;
			max-width: 20em;
		}

		.h-desktop {
			display: none;
		}

		.h-phone {
			display: inline;
		}

		/* Astronaut joins the normal flow between headline and cards */
		.astronaut {
			position: relative;
			z-index: 4;
			top: auto;
			left: auto;
			width: min(300px, 66vw);
			margin: 20px auto 0;
		}

		.cards {
			flex-direction: column;
			align-items: stretch;
			gap: 28px;
			margin-top: 12px;
		}

		.card {
			flex-basis: auto;
			width: 100%;
		}

		.space-cards {
			margin-bottom: -50px;
		}

		h2 {
			text-align: center;
		}
	}
</style>
