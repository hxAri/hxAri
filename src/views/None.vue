
<script>
	
	import { RouterLink } from "vue-router";
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "Page Not Found";
				}
			}
		}
	};
	
</script>

<template>
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404 flex flex-center">
				<i class="notfound-icon bx bx-sad"></i>
			</div>
			<h1 class="title">404</h1>
			<h3 class="sub-title mg-bottom-14">Oops! {{ $route.query.message ? $route.query.message : "Page Not Found" }}</h3>
			<p class="text">
				Sorry but the page you are looking for does not exist, have been removed.
				Name changed or is temporarily unavailable
			</p>
			<RouterLink to="/">
				Back to homepage
			</RouterLink>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * 404 Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	#notfound {
		position: relative;
		height: 100vh;
		background: var(--background-1);
	}
		.notfound {
			position: absolute;
			left: 50%;
			top: 50%;
			-webkit-transform: translate(-50%,-50%);
			-ms-transform: translate(-50%,-50%);
			transform: translate(-50%,-50%)
		}
		.notfound {
			max-width: 560px;
			width: 100%;
			padding-left: 160px;
			line-height: 1.1
		}
			.notfound-404 {
				position: absolute;
				left: 0;
				top: 0;
				width: 140px;
				height: 140px;
			}
			.notfound-404:before {
				content: '';
				position: absolute;
				width: 100%;
				height: 100%;
				-webkit-transform: scale(2.4);
				-ms-transform: scale(2.4);
				transform: scale(2.4);
				border-radius: 50%;
				background: var(--background-2);
				z-index: -1
			}
				.notfound-icon {
					font-size: 120px;
				}
			.sub-title {
				text-transform: uppercase;
			}
	@media only screen and (max-width: 767px) {
		.notfound {
			padding-left: 15px;
			padding-right: 15px;
			padding-top: 110px;
		}
			.notfound-404 {
				width: 110px;
				height: 110px;
			}
			.title {
				margin-top: 14px;
			}
	}
	
</style>