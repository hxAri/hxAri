
<script>
	
	import { RouterLink } from "vue-router";
	
	// Import Scripts.
	import Fmt from "../scripts/Fmt.js";
	import Image from "../scripts/Image.js";
	import Json from "../scripts/Json.js";
	import Mapper from "../scripts/Mapper.js";
	import MultiRequest from "../scripts/MultiRequest.js";
	import Request from "../scripts/Request.js";
	import Type from "../scripts/Type.js";
	import Value from "../scripts/logics/Value.js";
	
	// Import Widgets.
	import Avatar from "../widgets/Avatar.vue";
	import Project from "../widgets/Project.vue";
	import Skill from "../widgets/Skill.vue";
	
	export default {
		data: () => ({
			tabs: [
				{
					hash: "#about",
					text: "Abouts",
					icon: {
						active: [
							"bx",
							"bxs-info-circle"
						],
						default: [
							"bx",
							"bx-info-circle"
						]
					}
				},
				{
					hash: "#skill",
					text: "Skills",
					icon: {
						default: [
							"bx",
							"bxs-hot"
						]
					}
				},
				{
					hash: "#project",
					text: "Projects",
					icon: {
						active: [
							"bx",
							"bxs-flag"
						],
						default: [
							"bx",
							"bx-flag"
						]
					}
				},
				{
					hash: "#experience",
					text: "Experience",
					icon: {
						active: [
							"bx",
							"bxs-star"
						],
						default: [
							"bx",
							"bx-star"
						]
					}
				},
				{
					hash: "#certificate",
					text: "Certificate",
					icon: {
						default: [
							"bx",
							"bx-check-double"
						]
					}
				}
			],
			contents: {
				abouts: {
					class: [ "text", "mg-bottom-14", "mg-lc-bottom" ],
					inner: [
						"Hello, introduce my name is Ari Setiawan",
						"I am a Full Stack Developer from Indonesia who likes to drink Chocolate coffee while thinking of crazy ideas to build programs that can benefit everyone",
						"I have been writing code from 2019 to be precise when I was in junior high school until now I like to write code, but apart from that all my family doesn't care about it",
						"I prefer to work independently or alone but apart from that I can also work well in a team"
					]
				}
			},
			image: Image,
			error: false,
			loading: true,
			requests: [],
			projects: [],
			responses: {},
			organization: []
		}),
		mounted: async function()
		{
			// Copy object instance.
			var self = this;
			
			// Request targets.
			var requests = [
				{
					method: "GET",
					name: "organization",
					url: "https://raw.githubusercontent.com/hxAri/hxAri/main/organizations.json"
				},
				{
					method: "GET",
					name: "projects",
					url: "https://raw.githubusercontent.com/hxAri/hxAri/main/projects.json"
				},
				{
					method: "GET",
					name: "profile",
					url: "https://api.github.com/users/hxAri"
				}
			];
			
			// Create multiple requests.
			await MultiRequest( requests )
			
			// Handle all request responses.
			.then( r =>
			{
				// Mapping request reponses.
				Mapper( r, async function( i, request )
				{
					// Push request.
					self.requests.push( request );
					
					// Check if response status code is ok.
					if( request.status === 200 )
					{
						// Decode json response.
						var response = Json.decode( request.response );
						
						// Push request response.
						self.responses[requests[i].name] = response;
						
						// If request type is profile.
						if( requests[i].name === "profile" )
						{
							self.profile = response;
						}
					}
					else {
						self.error = Request.StatusText( request.status );
					}
				});
			})
			.catch( e => self.error = Type( e, XMLHttpRequest, () => "No Internet Connection", () => e ) );
			
			// Mapping organizations.
			for( let u in self.responses.organization )
			{
				// Get organization name.
				var name = self.responses.organization[u];
				
				// Get all organization profile.
				await Request( "GET", Fmt( "https://api.github.com/orgs/{}", name ) )
					
				// Handle all request responses.
				.then( r =>
				{
					// Push request.
					self.requests.push( r );
					
					// Check if response status code is ok.
					if( r.status === 200 )
					{
						self.organization.push( self.responses[name] = Json.decode( r.response ) );
					}
					else {
						self.error = Request.StatusText( r.status );
					}
				})
				.catch( e => self.error = Type( e, XMLHttpRequest, () => "No Internet Connection", () => e ) );
			}
			
			// Mapping projects.
			for( let i in self.responses.projects )
			{
				// Get all organization profile.
				await Request( "GET", Fmt( "https://api.github.com/repos/{}", self.responses.projects[i] ) )
					
				// Handle all request responses.
				.then( r =>
				{
					// Push request.
					self.requests.push( r );
					
					// Check if response status code is ok.
					if( r.status === 200 )
					{
						// Decode response.
						var response = Json.decode( r.response );
						
						// Push response.
						self.responses[response.name] = response
						self.projects.push( response );
					}
					else {
						self.error = Request.StatusText( r.status );
					}
				})
				.catch( e => self.error = Type( e, XMLHttpRequest, () => "No Internet Connection", () => e ) );
			}
			self.loading = false;
		},
		methods: {
			
			/*
			 * Return if hash is active for tab.
			 *
			 * @params String hash
			 *
			 * @return Array|String
			 */
			active: function( hash )
			{
				// Check  if current route has hash.
				if( Value.isNotEmpty( this.$route.hash ) )
				{
					return( this.$route.hash === hash ? [ "tab-single", "active" ] : "tab-single" );
				}
				return( hash === this.tabs[0].hash ? [ "tab-single", "active" ] : "tab-single" );
			},
			
			/*
			 * Return icon class for tab.
			 *
			 * @params Object tab
			 *
			 * @return Array
			 */
			iconic: function( tab )
			{
				// Check if current route hash is valid.
				if( Type( this.active( tab.hash ), Array ) )
				{
					return([ "tab-icon", "mg-right-14", ...Type( tab.icon.active, Array, () => tab.icon.active, () => tab.icon.default ) ]);
				}
				return([ "tab-icon", "mg-right-14", ...tab.icon.default ]);
			}
		},
		components: {
			Avatar,
			Project,
			Skill
		}
	};
	
</script>

<template>
	<div class="loading flex flex-center pd-24" v-if="loading">
		<div class="animate">
			<div class="spinner"></div>
		</div>
	</div>
	<div class="" v-else-if="error">
		{{ error }}
	</div>
	<div class="" v-else>
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
						<p class="title fs-20 fb-45 mg-0 fullname">{{ profile.name }}</p>
						<p class="text fs-14 fb-35 mg-0 biography">{{ profile.bio ?? "A Full Stack Developer" }}</p>
					</div>
				</div>
				<div class="profile-about pd-20">
					<ul class="bx-ul mg-bottom-14">
						<li class="flex flex-left mg-bottom-4">
							<i class="bx bxs-map"></i>{{ profile.location ?? "Milky Way" }}
						</li>
						<li class="flex flex-left mg-bottom-4">
							<i class="bx bxs-phone"></i>+62 8583-9211-030
						</li>
						<li class="flex flex-left">
							<i class="bx bx-mail-send"></i>{{ profile.email ?? "ari160824@gmail.com" }}
						</li>
					</ul>
					<a :href="image.resume" target="_blank" rel="noopener noreferrer">
						<button class="button button-resume mg-bottom-14 pd-14">
							<span class="title fb-45">View Resume</span>
						</button>
					</a>
					<hr class="hr" />
					<!--
					<div class="mg-top-14 mg-lc-top flex flex-left" v-for="org in organization">
						<a class="flex flex-left" :href="org.html_url" target="_blank" rel="noopener noreferrer">
							<div class="avatar mg-right-14">
								<div class="avatar-wrapper flex flex-center organization-avatar-wrapper rd-circle">
									<img class="avatar-image" :title="org.name" :alt="org.login" :data-src="org.avatar_url" v-lazyload />
									<div class="avatar-cover"></div>
								</div>
							</div>
							<p class="title">{{ org.name }}</p>
						</a>
					</div>
					-->
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
								<i class="bx bxs-info-circle mg-right-14"></i>Abouts
							</RouterLink>
						</h2>
						<hr class="hr mg-top-14 mg-bottom-14" />
						<p :class="contents.abouts.class" v-for="about in contents.abouts.inner" v-scroll-reveal="{ delay: 650 }">{{ about }}</p>
					</div>
					<div class="content-single pd-14" id="skill" v-scroll-reveal="{ delay: 650 }">
						<h2 class="title">
							<RouterLink class="title flex flex-left" to="#skill">
								<i class="bx bxs-hot mg-right-14"></i>Skills
							</RouterLink>
						</h2>
						<hr class="hr mg-top-14 mg-bottom-14" />
						<Skill :image="image" />
					</div>
					<div class="content-single pd-14" id="project" v-scroll-reveal="{ delay: 650 }">
						<h2 class="title">
							<RouterLink class="title flex flex-left" to="#project">
								<i class="bx bxs-flag mg-right-14"></i>Projects
							</RouterLink>
						</h2>
						<hr class="hr mg-top-14 mg-bottom-14" />
						<p class="text mg-bottom-14">
							Here are some of the projects I've created and are still developing. Every project is open source anyone can use it or contribute if interesting, don't forget to let others know if it's useful.
						</p>
						<Project :profile="profile" :projects="projects" :image="image" />
					</div>
					<div class="content-single pd-14" id="experience" v-scroll-reveal="{ delay: 650 }">
						<h2 class="title">
							<RouterLink class="title flex flex-left" to="#experience">
								<i class="bx bxs-star mg-right-14"></i>Experience
							</RouterLink>
						</h2>
						<hr class="hr mg-top-14 mg-bottom-14" />
						<h4 class="title">Industrial Work</h4>
						<p class="text mg-bottom-14">
							I have had work experience doing industrial work practices at <a href="https://www.darmajaya.ac.id/" target="_blank" rel="noopener noreferrer">The Darmajaya Institute of Informatics and Business Campus</a> to be precise in Bandar Lampung in the Computer Lab section as a Computer Service Technician for 4 months
						</p>
					</div>
					<div class="content-single pd-14" id="certificate" v-scroll-reveal="{ delay: 650 }">
						<h2 class="title">
							<RouterLink class="title flex flex-left" to="#certificate">
								<i class="bx bx-check-double mg-right-14"></i>Certificate
							</RouterLink>
						</h2>
						<hr class="hr mg-top-14 mg-bottom-14" />
						<p class="text">Unavailable</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
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
	 * Banner Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.banner {
		width: 100vw;
		height: 250px;
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
	@media (max-width: 750px) {
		.banner {
			height: 360px;
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
			border-right: 1px solid var(--border-4);
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
					background: var(--background-3);
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
				background: var(--background-2);
			}
				.content-single {
					border-bottom: 1px solid var(--border-1);
				}
				.content-single:last-child {
					border-bottom: 0;
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
				border: 0;
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
				.content-single {
					margin-bottom: 14px;
					border-radius: 4px;
					border: 1px solid var(--border-3);
				}
				.content-single:last-child {
					margin-bottom: 0;
					border: 1px solid var(--border-3);
				}
	}
	.profile-about .hr,
	.home-contents {
		width: 100%;
	}
	
</style>