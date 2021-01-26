<template>
	<div class="home">
		<h1>Dimension Meme Pack</h1>
		<p class="download_pack">
			<a
				target="_blank"
				href="https://www.mediafire.com/file/epja1hnzy44y6sx/DIMENSION_MEME_PACK_2021.rar/file"
				>Télécharger le pack</a
			>
		</p>
		<img
			class="logo"
			src="../assets/logo.png"
			alt="Dimension Logo"
			@click="open_dim_yt"
		/>
		<div class="search-wrapper">
			<input
				type="text"
				@input="searchUpdate"
				placeholder="Rechercher un meme..."
				class="search"
				:class="{ 'not-empty': search !== '' }"
			/>
		</div>
		<div class="wrapper">
			<div
				class="meme"
				v-for="meme in results.slice(0, maxshow - 1)"
				:key="meme[0]"
			>
				<a :href="`DIMENSION MEME PACK 2021/${meme[1].dir}`">
					<video
						v-if="meme[1].dir.split('/')[1] == 'Vidéos'"
						:src="`DIMENSION MEME PACK 2021/${meme[1].dir}`"
						:alt="meme[0]"
					/>
					<div
						v-else
						:style="{
							backgroundImage: `url(&quot;DIMENSION MEME PACK 2021/${meme[1].dir}&quot;)`,
						}"
						:alt="meme[0]"
						class="img"
					></div>
					<p>{{ meme[0] }}</p>
				</a>
			</div>
			<p
				v-if="results.length === 0 || results.length === undefined"
				class="no-meme"
			>
				Aucun meme trouvé...
			</p>
		</div>
	</div>
</template>

<script>
import paths from '/public/DIMENSION MEME PACK 2021/paths.json';

export default {
	name: 'Home',
	data() {
		return {
			paths,
			search: '',
			lastInput: 0,
			loading: false,
			results: [],
			maxshow: 10,
		};
	},
	methods: {
		open_dim_yt() {
			window.open(
				'https://www.youtube.com/channel/UCiw_8x43hludK0PhuN9AJGg',
				'_blank'
			);
		},
		async searchUpdate(event) {
			this.search = event.target.value;
			if (new Date().getTime() - this.lastInput >= 750) {
				// const apiUrl = 'http://192.168.27.48:3000';
				const apiUrl = '';
				this.results = (
					await this.axios.get(
						`${apiUrl}/meme/?search=${encodeURIComponent(
							this.search
						)}`
					)
				).data;
				this.loading = false;
			} else {
				this.loading = true;
			}
			this.lastInput = new Date();
		},
	},
	mounted() {
		document.querySelector('.search').value = '';

		setInterval(() => {
			console.log(window.scrollY + window.innerHeight);
			console.log(
				(document.querySelector('.home').offsetTop +
					document.querySelector('.home').offsetHeight) *
					0.9
			);
			console.log(
				window.scrollY + window.innerHeight >=
					(document.querySelector('.home').offsetTop +
						document.querySelector('.home').offsetHeight) *
						0.9 && window.scrollY > window.innerHeight
			);
			if (
				window.scrollY + window.innerHeight >=
					(document.querySelector('.home').offsetTop +
						document.querySelector('.home').offsetHeight) *
						0.9 &&
				window.scrollY > document.querySelector('.home').offsetTop
			) {
				this.maxshow += 10;
			}
		}, 750);
	},
};
</script>

<style lang="scss">
html {
	background-color: #fcfcfc;
}

h1 {
	margin: 1.3rem;
	margin-bottom: 0.1rem;
}

.download_pack {
	margin: 1.3rem;
	margin-top: 0;
	font-size: 0.8rem;

	a {
		color: #000;
	}
}

img.logo {
	width: 10rem;
	margin: 2rem;
	cursor: pointer;
}

.search-wrapper {
	width: 70%;
	margin: 1.3rem auto;

	@media (max-width: 481px) {
		width: 90%;
	}

	input {
		font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI',
			Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		background-color: rgb(249, 250, 251);
		width: calc(100% - 2rem);
		max-width: 35rem;
		padding: 0.5rem 1rem;
		border: rgb(229, 231, 235) solid 1px;
		color: rgb(156, 163, 175);
		font-size: 1.1rem;
		border-radius: 0.75rem;
		outline: none;
		transition: 0.2s;

		&:hover,
		&:active,
		&:focus,
		&.not-empty {
			color: rgb(17, 24, 39);
			border-color: rgb(17, 24, 39);
			transition: 0.2s;

			&::placeholder {
				color: rgb(17, 24, 39);
				transition: 0.2s;
			}
		}

		&::placeholder {
			color: rgb(156, 163, 175);
			transition: 0.2s;
		}
	}
}

.wrapper {
	width: 70%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	margin: auto;
	margin-top: 3rem;
	margin-bottom: 3rem;

	@media (max-width: 481px) {
		width: 100%;
	}

	.meme {
		width: 20vw;
		height: 30vw;

		@media (max-width: 481px) {
			width: 40vw;
			height: 60vw;
		}

		color: #000;
		margin: 0.5rem;
		display: flex;

		.img {
			width: 100%;
			background-position: center;
			background-size: cover;
			flex-grow: 1;
		}

		video {
			flex-grow: 1;
			width: 100%;
		}

		a {
			color: #000;
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		p {
			font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI',
				Roboto, Oxygen, Cantarell, 'Open Sans', 'Helvetica Neue',
				sans-serif;
			font-weight: 500;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
}

.no-meme {
	color: rgb(156, 163, 175);
	font-size: 0.8rem;
}
</style>
