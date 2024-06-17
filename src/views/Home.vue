
<script>
	
	import { mapGetters, mapState } from "vuex";
	import { RouterLink } from "vue-router";
	
	// Import Scripts.
	import Type from "/src/scripts/Type.js";
	import Value from "/src/scripts/logics/Value.js";
	
	// Import Widgets.
	import Avatar from "/src/widgets/Avatar.vue";
	import Certificate from "/src/widgets/Certificate.vue";
	import Experience from "/src/widgets/Experience.vue";
	import Project from "/src/widgets/Project.vue";
	import Skill from "/src/widgets/Skill.vue";
	
	export default {
		data: () => ({
			tabs: [
				{
					hash: "#about",
					text: "Abouts",
					icon: {
						active: [ "bx", "bxs-info-circle" ],
						default: [ "bx", "bx-info-circle" ]
					}
				},
				{
					hash: "#skill",
					text: "Skills",
					icon: {
						default: [ "bx", "bxs-hot" ]
					}
				},
				{
					hash: "#project",
					text: "Projects",
					icon: {
						active: [ "bx", "bxs-flag" ],
						default: [ "bx", "bx-flag" ]
					}
				},
				{
					hash: "#experience",
					text: "Experiences",
					icon: {
						active: [ "bx", "bxs-star" ],
						default: [ "bx", "bx-star" ]
					}
				},
				{
					hash: "#certificate",
					text: "Certificates",
					icon: {
						default: [ "bx", "bx-check-double" ]
					}
				}
			]
		}),
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri";
				}
			}
		},
		computed: {
			...mapState([
				"error",
				"loading",
				"configs",
				"profile",
				"organizations"
			]),
			...mapGetters([
				"hasConfig",
				"hasProfile",
				"hasOrganization"
			])
		},
		created: async function() {
			
			// Send request if the request has not been sent,
			// Or if something wrong when sending request.
			if( this.hasConfig === false ||
				this.hasProfile === false ||
				this.error ) {
				
				// Dispatch for priority targets.
				await this.$store.dispatch( "priority" );
			}
			
			// Send request if the organization doest not available.
			if( this.hasOrganization === false &&
				this.error === false ) {
				
				// Dispatch for organization.
				await this.$store.dispatch( "organization" );
			}
		},
		methods: {
			
			/**
			 * Return if hash is active for tab.
			 *
			 * @params String hash
			 *
			 * @return Array|String
			 */
			active: function( hash ) {
				if( Value.isNotEmpty( this.$route.hash ) ) {
					return this.$route.hash === hash ? [ "tab-single", "active" ] : "tab-single";
				}
				return hash === this.tabs[0].hash ? [ "tab-single", "active" ] : "tab-single";
			},
			
			/**
			 * Return icon class for tab.
			 *
			 * @params Object tab
			 *
			 * @return Array
			 */
			iconic: function( tab ) {
				if( Type( this.active( tab.hash ), Array ) ) {
					return [ "tab-icon", "mg-right-14", ...Type( tab.icon.active, Array, () => tab.icon.active, () => tab.icon.default ) ];
				}
				return [ "tab-icon", "mg-right-14", ...tab.icon.default ];
			}
		},
		components: {
			Avatar,
			Certificate,
			Experience,
			Project,
			Skill
		}
	};
	
</script>

<template>
	<div class="banner">
		<div class="banner-group">
			<div class="banner-album"></div>
			<div class="banner-cover"></div>
		</div>
	</div>
	<div class="home dp-flex">
		<div class="home-profile">
			<div class="profile-common">
				<div class="profile-picture flex flex-center rd-circle">
					<div class="profile-picture-border flex flex-center rd-circle">
						<div class="profile-picture-spaces flex flex-center rd-circle">
							<!--<Avatar :attrs="{ avatar: 'profile-avatar', wrapper: [ 'profile-avatar-wrapper', 'rd-circle' ] }" title="Ari Setiawan" alt="Ari Setiawan (hxAri)" src="https://avatars.githubusercontent.com/u/90847846?v=4" />-->
							<div class="avatar flex flex-center profile-avatar">
								<div class="avatar-wrapper flex flex-center profile-avatar-wrapper rd-circle">
									<img class="avatar-image lazy" title="Ari Setiawan" alt="Ari Setiawan (hxAri)" :data-src="profile.avatar_url" v-lazyload />
									<div class="avatar-cover"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="profile-common-info mg-top-20">
					<p class="title fs-20 fb-45 mg-0 fullname">{{ configs.author.name ?? profile.name }}</p>
					<p class="text fs-14 fb-35 mg-0 biography">{{ profile.bio ?? "Self expansion infinite void" }}</p>
				</div>
			</div>
			<div class="profile-about pd-20">
				<ul class="bx-ul mg-bottom-14">
					<li class="flex flex-left mg-bottom-4">
						<i class="bx bx-map"></i>{{ configs.author.address.universe ?? profile.location ?? "Milky Way" }}
					</li>
					<li class="flex flex-left mg-bottom-4">
						<i class="bx bx-buildings"></i>{{ configs.author.company ?? profile.company ?? "Freelance" }}
					</li>
					<li class="flex flex-left mg-bottom-4">
						<i class="bx bxl-whatsapp"></i>
						<a class="sub-title" :href="'https://wa.me/' + configs.author.contact.phone.replaceAll( /\-|\+|\s/g, '' ) " target="_blank" rel="noopener noreferrer">
							{{ configs.author.contact.phone }}
						</a>
					</li>
					<li class="flex flex-left">
						<i class="bx bx-mail-send"></i>
						<a class="sub-title" :href="'mailto:' + configs.author.contact.email ?? profile.email ?? 'hxari@proton.me'" target="_blank" rel="noopener noreferrer">
							{{ configs.author.contact.email ?? profile.email ?? "hxari@proton.me" }}
						</a>
					</li>
				</ul>
				<a :href="configs.resume.png" target="_blank" rel="noopener noreferrer">
					<button class="button button-resume mg-bottom-14 pd-14">
						<span class="title fb-45">View Resume</span>
					</button>
				</a>
				<hr class="hr mg-bottom-14" />
				<div class="organization" v-if="hasOrganization">
					<div class="mg-bottom-14 mg-lc-bottom flex flex-left" v-for="organization in organizations">
						<a class="flex flex-left" :href="organization.html_url" target="_blank" rel="noopener noreferrer">
							<div class="avatar mg-right-14">
								<div class="avatar-wrapper flex flex-center organization-avatar-wrapper rd-circle">
									<img class="avatar-image" :title="organization.name" :alt="organization.login" :data-src="organization.avatar_url" v-lazyload />
									<div class="avatar-cover"></div>
								</div>
							</div>
							<p class="title">{{ organization.name }}</p>
						</a>
					</div>
				</div>
				<div class="organization" v-else>
					<div class="organization-loading mg-bottom-14 mg-lc-bottom flex flex-left" v-for="i in configs.organizations">
						<div class="flex flex-left">
							<div class="avatar mg-right-14">
								<div class="avatar-wrapper flex flex-center organization-avatar-wrapper rd-circle">
								</div>
							</div>
							<p class="title"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="home-contents">
			<div class="tabs flex flex-center scroll-hidden">
				<div :class="active( tab.hash )" @click="$router.push({ hash: tab.hash })" v-for="tab in tabs">
					<div class="tab-inner flex flex-center pd-left-14 pd-right-14">
						<span :class="iconic( tab )"></span>
						<span class="tab-text">{{ tab.text }}</span>
					</div>
				</div>
			</div>
			<div class="content-groups pd-14">
				<div class="content-single pd-14" id="about" v-scroll-reveal="{ delay: 650 }">
					<h2 class="title">
						<RouterLink class="title flex flex-left" to="#about">
							<i class="bx bxs-info-circle mg-right-14"></i>
							<span class="text-wrap">Abouts</span>
						</RouterLink>
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text mg-bottom-14 mg-lc-bottom" v-for="about in configs.author.abouts" v-scroll-reveal="{ delay: 650 }">{{ about }}</p>
				</div>
				<div class="content-single pd-14" id="skill" v-scroll-reveal="{ delay: 650 }">
					<h2 class="title">
						<RouterLink class="title flex flex-left" to="#skill">
							<i class="bx bxs-hot mg-right-14"></i>
							<span class="text-wrap">Skills</span>
						</RouterLink>
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text"></p>
					<Skill />
				</div>
				<div class="content-single pd-14" id="project" v-scroll-reveal="{ delay: 650 }">
					<h2 class="title">
						<RouterLink class="title flex flex-left" to="#project">
							<i class="bx bxs-flag mg-right-14"></i>
							<span class="text-wrap">Projects</span>
						</RouterLink>
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text"></p>
					<Project />
				</div>
				<div class="content-single pd-14" id="experience" v-scroll-reveal="{ delay: 650 }">
					<h2 class="title">
						<RouterLink class="title flex flex-left" to="#experience">
							<i class="bx bxs-star mg-right-14"></i>
							<span class="text-wrap">Experiences</span>
						</RouterLink>
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text"></p>
					<Experience />
				</div>
				<div class="content-single pd-14" id="certificate" v-scroll-reveal="{ delay: 650 }">
					<h2 class="title">
						<RouterLink class="title flex flex-left" to="#certificate">
							<i class="bx bx-check-double mg-right-14"></i>
							<span class="text-wrap">Certificates</span>
						</RouterLink>
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text"></p>
					<Certificate />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Banner Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.banner {
		width: 100vw;
		height: 300px;
		background-color: var(--background-2);
	}
		.banner-group {
			width: auto;
			height: 100%;
			position: relative;
		}
			.banner-album {
				width: 900px;
				height: 100%;
				margin: auto;
				background-color: var(--background-1);
				background-image: url(https://raw.githubusercontent.com/hxAri/hxAri/main/public/images/1677866924;deVw5x2Uzx.png);
				background-position: center;
				background-size: cover;
			}
			.banner-cover {
				top: 0;
				width: 100%;
				height: 100%;
				position: absolute;
				background: rgba(0,0,0,.4);
			}
			[data-theme="dark"] .banner-cover {
				background: rgba(0,0,0,.2);
			}
	@media( max-width: 1920px ) {
		.banner {
			height: 420px;
		}
			.banner-album {
				width: 70%;
			}
	}
	@media( max-width: 1080px ) {
		.banner {
			height: 400px;
		}
			.banner-album {
				width: 70%;
			}
	}
	@media( max-width: 850px ) {
		.banner {
			height: 292px;
		}
			.banner-album {
				width: 72%;
			}
	}
	@media( max-width: 750px ) {
		.banner {
			height: 300px;
		}
			.banner-album {
				width: 100%;
			}
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Home Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.home {
		width: 100vw;
		height: auto;
		background: var(--background-1);
	}
		.home-profile {
			top: 0;
			width: 30%;
			height: fit-content;
			z-index: 99999;
			position: -webkit-sticky;
			position: sticky;
			background: var(--background-1);
		}
			.profile-common {
				padding: 20px;
				padding-bottom: 0;
			}
				.profile-picture-border {
					padding: 3px;
					background: linear-gradient( 
						95deg, 
						rgb( 0, 143, 104 ), 
						rgb( 250, 224, 66 ) 
					);
				}
					.profile-picture-spaces {
						padding: 3px;
						background: var(--background-1);
					}
						.profile-avatar-wrapper {
							width: 245px;
							height: 245px;
						}
				.profile-common-info {
					text-align: center;
				}
			.profile-about {
			}
				.button-resume {
					width: 100%;
					border: 1px solid var(--border-4);
					background: var(--background-2);
				}
				.organization {
					display: block;
				}
					.organization-loading > .flex.flex-left {
					}
						.organization-loading > .flex.flex-left > .avatar {
						}
							.organization-loading > .flex.flex-left > .avatar > .avatar-wrapper {
								animation: blinking 2s linear infinite;
							}
							.organization-loading > .flex.flex-left > .title {
								width: 199px;
								height: 40px;
								border-radius: 3px;
								background: var(--background-2);
								animation: blinking 2s linear infinite;
							}
							@media ( max-width: 750px ) {
								.organization-loading > .flex.flex-left > .title {
									width: 278px;
								}
							}
					.organization-avatar-wrapper {
						background: var(--background-2);
					}
		.home-contents {
			width: 70%;
			height: fit-content;
		}
			.tabs {
				top: 0;
				width: 100%;
				z-index: 99999;
				position: -webkit-sticky;
				position: sticky;
				overflow-y: scroll;
				background: var(--background-1);
			}
				.tab-single {
					border-bottom: 2.4px solid var(--border-3);
					background: var(--background-1);
				}
				.tab-single.active {
					border-color: orange;
				}
					.tab-inner {
						width: auto;
						height: 68px;
					}
						.tab-single.active .tab-icon {
							color: var(--icon-1);
						}
						.tab-single.active .tab-text {
							color: var(--color-1);
						}
			.content-groups {
				background: var(--background-1);
				border-left: 1px solid var(--border-3);
			}
				.content-single {
					border-bottom: 1px solid var(--border-3);
				}
				.content-single:last-child {
					border-bottom: 0;
				}
	@media( max-width: 850px ) {
		.profile-avatar-wrapper {
			width: 200px;
			height: 200px;
		}
	}
	@media( max-width: 750px ) {
		.home {
			display: block;
		}
			.home-profile {
				top: auto;
				margin: 0;
				padding: 0;
				position: static;
			}
				.profile-common {
					top: 0;
					display: flex;
					align-items: center;
					z-index: 99999;
					margin: 0;
					padding: 14px;
					padding-bottom: 0;
					position: -webkit-sticky;
					position: sticky;
					background: var(--background-1);
				}
					.profile-picture {
						width: fit-content;
						margin-right: 14px;
					}
						.profile-picture-border {
							padding: 2px;
						}
							.profile-avatar-wrapper {
								width: 75px;
								height: 75px;
							}
					.profile-common-info {
						margin: 0;
						text-align: left;
					}
						.profile-common-info .fullname {
							font-size: 18px;
						}
				.profile-about {
					padding: 14px;
				}
			.home-profile,
			.home-contents {
				width: 100%;
				height: auto;
			}
				.tabs {
					justify-content: flex-start;
				}
				.content-groups {
					/** padding: 0; **/
					background: var(--background-2);
				}
					.content-single {
						margin-bottom: 14px;
						border-radius: 4px;
						background: var(--background-1);
						border: 1px solid transparent;
						box-shadow: 0 0 4px rgba(0,0,0,.1);
					}
					.content-single:last-child {
						margin-bottom: 0;
						border: 1px solid transparent;
					}
	}
	@media( max-width: 150px ) {
		.profile-common {
			display: block;
		}
	}
	.profile-about .hr,
	.home-contents .hr {
		width: 100%;
	}
	
</style>
