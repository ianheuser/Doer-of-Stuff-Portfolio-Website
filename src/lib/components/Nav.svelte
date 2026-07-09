<script>
	let open = $state(false);

	const links = [
		{ label: 'Stuff', href: '#stuff', soon: false },
		{ label: 'Blog', href: null, soon: true },
		{ label: 'Experiments', href: null, soon: true }
	];

	function close() {
		open = false;
	}
</script>

<header class="nav">
	<a class="logo" href="/" aria-label="The Doer of Stuff — home">
		<img src="/images/do-logo.svg" alt="" width="42" height="26" />
	</a>

	<button
		class="hamburger"
		class:open
		aria-expanded={open}
		aria-controls="site-menu"
		onclick={() => (open = !open)}
	>
		<span class="visually-hidden">Menu</span>
		<span class="bar"></span>
		<span class="bar"></span>
		<span class="bar"></span>
	</button>

	<nav id="site-menu" class="menu" class:open aria-label="Site">
		<ul>
			{#each links as link}
				<li>
					{#if link.soon}
						<span class="soon">{link.label} <em>coming soon</em></span>
					{:else}
						<a href={link.href} onclick={close}>{link.label}</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</header>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 100;
		height: var(--nav-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 clamp(16px, 3vw, 44px);
		background: rgba(8, 20, 32, 0.55);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border-bottom: 7px solid var(--c-accent);
		box-shadow: 0 2px 1px 0 #93002b;
	}

	.logo img {
		height: 30px;
		width: auto;
		filter: drop-shadow(0 2px 1px #93002b);
	}

	.hamburger {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 8px;
	}

	.bar {
		width: 30px;
		height: 4px;
		border-radius: 2px;
		background: var(--c-pink);
		transition: transform 0.25s ease, opacity 0.25s ease;
	}

	.hamburger.open .bar:nth-child(2) {
		transform: translateY(10px) rotate(45deg);
	}

	.hamburger.open .bar:nth-child(3) {
		opacity: 0;
	}

	.hamburger.open .bar:nth-child(4) {
		transform: translateY(-10px) rotate(-45deg);
	}

	.menu {
		position: absolute;
		top: calc(100% + 7px);
		right: 0;
		min-width: 240px;
		background: var(--c-card-solid);
		border-bottom: 7px solid var(--c-accent);
		border-radius: 0 0 0 5px;
		box-shadow: -10px 30px 60px rgba(8, 20, 32, 0.5);
		transform: translateY(-12px);
		opacity: 0;
		visibility: hidden;
		transition: transform 0.25s ease, opacity 0.25s ease, visibility 0.25s;
	}

	.menu.open {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}

	.menu ul {
		list-style: none;
		margin: 0;
		padding: 12px 0;
	}

	.menu li a,
	.menu li .soon {
		display: block;
		padding: 12px 24px;
		font-family: var(--font-nunito);
		font-weight: 700;
		font-size: 18px;
		color: #fff;
		text-decoration: none;
	}

	.menu li a:hover,
	.menu li a:focus-visible {
		background: rgba(252, 55, 112, 0.15);
		color: var(--c-pink);
	}

	.soon {
		opacity: 0.45;
		cursor: default;
	}

	.soon em {
		font-style: normal;
		font-size: 12px;
		font-weight: 400;
		margin-left: 6px;
	}
</style>
