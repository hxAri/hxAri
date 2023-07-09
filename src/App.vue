
<script>
	
	import { mapGetters, mapState } from "vuex";
	import { RouterLink, RouterView } from "vue-router";
	
	// Import Scripts.
	import Datime from "/src/scripts/Datime.js";
	import Type from "/src/scripts/Type.js";
	
	// Import Widgets.
	import Avatar from "/src/widgets/Avatar.vue";
	import Error from "/src/widgets/Error.vue";
	import Sidebar from "/src/widgets/Sidebar.vue";
	
	export default {
		data: () => ({
			date: new Datime(),
			dateFormat: null,
			themeColor: null,
			footer: [
				{
					path: "/",
					text: "Home"
				},
				{
					path: "/about",
					text: "About"
				},
				{
					path: "/contact",
					text: "Contact"
				},
				{
					path: "/privacy",
					text: "Privacy"
				},
				{
					path: "/sitemap",
					text: "Sitemap"
				}
			],
			icons: {
				instagram: "bx bxl-instagram",
				facebook: "bx bxl-facebook",
				linkedin: "bx bxl-linkedin",
				twitter: "bx bxl-twitter",
				github: "bx bxl-github",
				tiktok: "bx bxl-tiktok"
			}
		}),
		computed: {
			...mapState([
				"error",
				"theme",
				"configs",
				"loading"
			]),
			...mapGetters([
				"hasConfig"
			])
		},
		created: async function()
		{
			// Check if configuration does not requested.
			if( this.hasConfig === false )
			{
				// Trying to get configuration.
				await this.$store.dispatch( "priority" );
			}
			this.dateFormat = this.date.format( "2021 - %Y" );
			this.themeColor = this.theme.get();
		},
		methods: {
			
			/*
			 * Show/ hidden sidebar menu.
			 *
			 * @return Void
			 */
			buttonBurgerHandle: function()
			{
				this.$refs.burger.classList.toggle( "burger-active" );
				this.$refs.sidebar.classList.toggle( "sidebar-active" );
				this.$refs.sidebarMain.classList.toggle( "sidebar-active" );
			},
			
			/*
			 * Switch theme color.
			 *
			 * @return Void
			 */
			buttonSwitchTheme: function()
			{
				this.theme.set( this.themeColor = this.themeColor !== "dark" ? "dark" : "light" );
			}
		},
		components: {
			Avatar,
			Error,
			Sidebar
		}
	}
	
</script>

<template>
	<header class="header">
		<div class="header-banner flex flex-left pd-14">
			<Avatar :attrs="{ avatar: 'header-avatar', wrapper: 'rd-circle', route: [ 'header-avatar-route', 'mg-right-14' ] }" :route="{ path: '/' }" title="hxAri" alt="hxAri Avatar" src="https://raw.githubusercontent.com/hxAri/hxAri/main/public/images/1677866924;deVw5x2Uzx.png" />
			<button class="button burger" ref="burger" @click="buttonBurgerHandle">
				<span class="burger-line"></span>
				<span class="burger-line"></span>
				<span class="burger-line"></span>
			</button>
		</div>
	</header>
	<div class="breakr"></div>
	<main class="main">
		<div class="sidebar" ref="sidebar">
			<div class="sidebar-exit" @click="buttonBurgerHandle"></div>
			<div class="sidebar sidebar-main" ref="sidebarMain">
				<div class="sidebar-header flex flex-left">
					<h5 class="sidebar-title mg-0">
						<RouterLink to="/">
							hxAri
						</RouterLink>
					</h5>
					<button class="button sidebar-switch" @click="buttonSwitchTheme">
						<i :class="[ 'bx', 'fs-20', themeColor === 'dark' ? 'bx-sun' : 'bx-moon' ]"></i>
					</button>
				</div>
				<div class="sidebar-body scroll-x">
					<div class="list-group">
						<div class="pd-14 blinking" v-if="loading">
							<div class="pd-16 rd-square bg-4 mg-bottom-14 mg-lc-bottom" v-for="i in 6"></div>
						</div>
						<div class="" v-else-if="error">
						</div>
						<Sidebar @close="buttonBurgerHandle" v-else />
					</div>
				</div>
			</div>
		</div>
		<div class="loading flex flex-center pd-24" v-if="loading">
			<div class="animate">
				<div class="spinner"></div>
			</div>
		</div>
		<Error v-else-if="error">
			<h3 class="title">Something Wrong</h3>
			<p class="sub-title">{{ error }}</p>
		</Error>
		<Error v-else-if="configs.maintenance[$route.name]">
			<h3 class="title">Maintenance</h3>
			<p class="sub-title">Currently page is under Maintenance</p>
		</Error>
		<RouterView v-else />
	</main>
	<footer class="footer flex flex-center">
		<div class="footer-wrapper">
			<div class="footer-content dp-flex">
				<div class="footer-group pd-14">
					<h5 class="mg-bottom-8">Pages</h5>
					<p class="fc-1m">Some important pages.</p>
					<li class="li dp-inline-block mg-right-10" v-for="route in footer">
						<RouterLink :to="{ path: route.path }" class="fs-14">{{ route.text }}</RouterLink>
					</li>
				</div>
				<div class="footer-group pd-14">
					<h5 class="mg-bottom-8">Follow Me</h5>
					<p class="fc-1m">Stay connected with me.</p>
					<li class="li dp-inline-block mg-right-10" v-for="( link, social ) in configs.author.social" v-if="hasConfig">
						<a :href="link" target="_blank" rel="noopener noreferrer">
							<i :class="icons[social]"></i>
						</a>
					</li>
					<li class="li dp-inline-block mg-right-10" v-for="i in 4" v-else>
						<i class="bx bx-sync bx-spin"></i>
					</li>
				</div>
			</div>
			<div class="footer-single">
				<p class="title">&copy Ari Setiawan (hxAri) {{ dateFormat }}</p>
			</div>
		</div>
	</footer>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Header Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.header {
		top: 0;
		width: 100%;
		z-index: 999;
		position: fixed;
		background: var(--background-1);
		border-bottom: 1px solid var(--border-3);
		box-shadow: 0 2px 1.5px rgba(0,0,0,.1);
	}
		.header-banner {
			position: relative;
		}
			.header-banner .avatar .avatar-wrapper {
				background: transparent;
			}
			.header-banner .burger {
				right: 14px;
				border: 0;
				display: block;
				position: absolute;
				background: transparent;
			}
	.breakr {
		width: 100%;
		height: 69px;
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Sidebar Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.sidebar {
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		z-index: 999999;
		background: rgba( 0, 0, 0, .6 );
		position: fixed;
	}
		.sidebar-exit {
			width: 100%;
			height: 100%;
		}
		.sidebar.sidebar-main {
			width: 30%;
			background: var(--background-2);
			transition: all .4s;
		}
			.sidebar-header {
				width: auto;
				height: 69px;
				padding: 14px;
				position: relative;
				background: var(--background-1);
				border-bottom: 1px solid var(--border-3);
				box-shadow: 0 2px 1.5px rgba(0,0,0,.1);
			}
				.sidebar-title a {
					color: var(--color-1);
				}
				.sidebar-switch {
					right: 14px;
					position: absolute;
				}
				.sidebar-switch,
				.sidebar-switch:focus,
				.sidebar-switch:hover {
					border: 0;
					background: transparent;
				}
			.sidebar-body {
				height: 100%;
				overflow: scroll;
			}
	.sidebar.sidebar-active {
		left: 0 !Important;
	}
	@media (max-width: 750px) {
		.sidebar .sidebar.sidebar-main {
			width: 83%;
		}
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Loading Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.loading {
		width: 100vw;
		height: 100vh;
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Footer Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.footer {
		color: #e5e5e5;
		background: #282d32;
		flex-direction: column;
	}
		.footer a {
			color: #a4d1f5;
		}
		.footer i {
			color: #7a8ea1;
		}
		.footer h1,
		.footer h2,
		.footer h3,
		.footer h4,
		.footer h5,
		.footer h6 {
			color: #ffffff;
		}
		.footer .text {
			color: #cccccc;
		}
		.footer .title {
			color: #ffffff;
		}
		.footer .sub-title {
			color: #e5e5e5;
		}
		.footer-wrapper {
			width: 71.4%;
			margin: auto;
			margin-top: 140px;
			margin-bottom: 140px;
		}
			.footer-content {
			}
				.footer-group {
					width: 100%;
				}
			.footer-single {
				color: #ffffff;
				padding: 14px;
			}
				.footer-li {
					list-style-type: none;
				}
	@media (max-width: 750px) {
		.footer {
			flex-direction: column;
		}
			.footer-wrapper {
				width: 94%;
				margin: 0;
				margin-top: 80px;
				margin-bottom: 80px;
			}
				.footer-content {
					flex-wrap: wrap;
				}
					.footer-group {
						width: 100%;
					}
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Main Styleing
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.main {
	}
	
</style>