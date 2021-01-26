<template>
	<div id="app">
		<div id="nav">
			<p>
				Créé par
				<a href="https://arthurfontaine.fr">Arthur Fontaine</a> avec
				Vue.js
				<!-- | <router-link to="/about" class="router-link">About</router-link> -->
			</p>
		</div>
		<router-view />
	</div>
</template>

<style lang="scss">
#app {
	font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
		Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #000;
}

#nav {
	padding: 1rem;
	text-align: right;

	p,
	.router-link {
		color: #464646;
		font-size: 0.8rem;
	}

	a {
		color: #000;
	}
}
</style>
