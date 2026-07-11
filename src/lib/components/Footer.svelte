<script>
	import { asset, resolve } from '$app/paths';
</script>

<footer>
	<a href={resolve('/')} aria-label="The Doer of Stuff — back to top">
		<img src={asset('/images/do-logo.svg')} alt="" width="71" height="44" />
	</a>
	<p>©2026 The Doer of Stuff</p>
</footer>

<style>
	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: var(--content-max);
		margin: 0 auto;
		padding: clamp(32px, 5vw, 64px) var(--gutter);
	}

	p {
		margin: 0;
		font-family: var(--font-nunito);
		font-weight: 700;
		font-size: 18px;
		color: #fff;
	}
</style>
