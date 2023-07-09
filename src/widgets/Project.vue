
<script>
	
	import { mapState } from "vuex";
	import { RouterLink } from "vue-router";
	
	// Import Scripts
	import Datime from "/src/scripts/Datime.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Not from "/src/scripts/logics/Not.js";
	
	export default {
		data: () => ({
			active: null
		}),
		computed: {
			...mapState([
				"configs",
				"projects"
			])
		},
		methods: {
			
			/*
			 * Return new Datime instance.
			 *
			 * @params Number|String datetime
			 *
			 * @return Datime
			 */
			datetime: datetime => new Datime( datetime ),
			
			/*
			 * Display more information of project.
			 *
			 * @params Object project
			 *
			 * @return Void
			 */
			display: function( project )
			{
				// Set project as active.
				this.active = project;
				
				// Check if project does not have previous request.
				if( Not( this.projects[project.endpoint], Object ) )
				{
					this.$store.dispatch( "project", project );
				}
			},
			
			/*
			 * Return filtered projects.
			 *
			 * @return Array
			 */
			filter: function()
			{
				return this.configs.projects.filter( project => project.include );
			},
			
			/*
			 * Return language logo based on language name.
			 *
			 * @params String language
			 *  Language name e.g java, js, etc
			 *
			 * @return String
			 *  Url of language logo
			 */
			language: function( language )
			{
				return Fmt( "{}/{}", this.configs.image.source, this.configs.image.images.language[language.toLowerCase()] )
			}
		}
	};
	
</script>

<template>
	<div class="template">
		<div :class="[ 'modal', 'modal', 'flex', 'flex-center', active ? 'active' : '' ]">
			<div class="modal-exit" @click="active = null"></div>
			<div :class="[ 'modal-main', 'rd-square', active ? 'active' : '' ]">
				<div class="project-modal scroll-x" v-if="active">
					<div class="project-modal-single pd-14" v-if="active.loading">
						<div class="project-modal-avatar-fixed flex flex-center">
							<div class="project-modal-avatar-wrapper avatar-wrapper bg-4 blinking rd-square"></div>
							<div class="project-language">
								<div class="project-language-avatar-wrapper avatar-wrapper bg-2 rd-circle blinking"></div>
							</div>
						</div>
						<div class="pd-14 blinking rd-square bg-4 mg-top-14 mg-bottom-14">
							<div class="pd-6 rd-square bg-3 mg-bottom-14 mg-lc-bottom" v-for="i in 4"></div>
						</div>
						<div class="pd-14 blinking rd-square bg-4 mg-bottom-14" v-for="i in 3"></div>
						<div class="flex flex-left">
							<div class="pd-8 blinking rd-circle bg-3 mg-right-14 mg-lc-right" v-for="i in 4"></div>
						</div>
					</div>
					<div class="project-modal-single pd-14" v-else-if="active.error">
						<div class="alert-single error">
							<div class="alert-slot">
								{{ active.error }}
							</div>
							<button class="alert-close" @click="[ active.error = false, display( active ) ]">
								<i class="bx bx-reset"></i>
							</button>
						</div>
					</div>
					<div class="project-modal-single pd-14" v-else>
						<div class="project-modal-avatar-fixed flex flex-center">
							<div class="project-modal-avatar-wrapper avatar-wrapper">
								<img class="avatar-image lazy" :title="active.name" :alt="active.name" :data-src="active.tumbnail" v-lazyload />
								<div class="avatar-cover"></div>
							</div>
							<div class="project-language">
								<div class="project-language-avatar-wrapper avatar-wrapper">
									<img class="avatar-image" :title="active.name" alt="Language" :data-src="language( projects[active.endpoint].language )" v-lazyload />
									<div class="avatar-cover"></div>
								</div>
							</div>
						</div>
						<h3 class="title center mg-bottom-24" data-title="name">{{ active.name }}</h3>
						<p class="text mg-bottom-14">
							{{ projects[active.endpoint].description }}
						</p>
						<h6 class="title mg-0">License</h6>
						<p class="sub-title mg-bottom-14">
							{{ projects[active.endpoint].license.name }}
						</p>
						<p class="text mg-bottom-14">
							<RouterLink class="dp-block" :to="{ path: '/projects/' + active.endpoint.split( '/' ).pop(), query: {} }">
								{{ projects[active.endpoint].homepage }}
							</RouterLink>
							<a class="dp-block" :href="projects[active.endpoint].html_url" target="_blank" rel="noopener noreferrer">{{ projects[active.endpoint].html_url }}</a>
						</p>
						<div class="text mg-bottom-14 datetime">
							<p class="sub-title pd-14 rd-square bg-1 mg-bottom-14">
								<i class="bx bx-time-five mg-right-12"></i>
								Created {{ datetime( projects[active.endpoint].created_at ).format( "%A, %b %d %Y" ) }}
							</p>
							<p class="sub-title pd-14 rd-square bg-1 mg-bottom-14">
								<i class="bx bx-check-double mg-right-12"></i>
								Updated {{ datetime( projects[active.endpoint].updated_at ).format( "%A, %b %d %Y" ) }}
							</p>
							<p class="sub-title pd-14 rd-square bg-3">
								<i class="bx bx-git-commit mg-right-12"></i>
								Pushed {{ datetime( projects[active.endpoint].pushed_at ).format( "%A, %b %d %Y" ) }}
							</p>
						</div>
						<p class="text">
							<span class="sub-title mg-right-6">
								<i class="bx bxs-star"></i>
								{{ projects[active.endpoint].stargazers_count }}
							</span>
							<span class="sub-title mg-right-6">
								<i class="bx bx-git-repo-forked"></i>
								{{ projects[active.endpoint].forks_count }}
							</span>
							<span class="sub-title mg-right-6">
								<i class="bx bxs-show"></i>
								{{ projects[active.endpoint].watchers_count }}
							</span>
							<span class="sub-title">
								<i class="bx bxs-bug"></i>
								{{ projects[active.endpoint].open_issues_count }}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="projects">
			<div class="project rd-square" v-for="project in filter()" v-scroll-reveal="{ delay: 600 }">
				<div class="project-body" v-scroll-reveal="{ delay: 600 }">
					<div class="project-avatar avatar-wrapper flex flex-center" @click="display( project )">
						<img class="avatar-image" :title="project.name" :alt="project.name" :data-src="project.tumbnail" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
					<div class="project-language" v-if="$store.state.projects[project.endpoint]">
						<div class="project-language-avatar-wrapper avatar-wrapper">
							<img class="avatar-image" :title="project.name" alt="Language" :data-src="language( projects[project.endpoint].language )" v-lazyload />
							<div class="avatar-cover"></div>
						</div>
					</div>
					<div class="project-label flex flex-left pd-14">
						<RouterLink class="title" :to="{ path: '/projects/' + project.endpoint.split( '/' ).pop(), query: {} }">
							{{ project.name }}
						</RouterLink>
					</div>
				</div>
				<div class="project-footer pd-14">
					<a :href="project.homepage" target="_blank" rel="noopener noreferrer">Visit Repository</a><br/>
					<RouterLink :to="{ path: '/projects/' + project.endpoint.split( '/' ).pop(), query: {} }">
						View Documentation
					</RouterLink>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Projects Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.projects {
		display: grid;
		height: auto;
		gap: 14px;
		grid-template-columns: repeat( 2, 1fr );
	}
		.project-modal {
			width: auto;
			height: 100%;
		}
			.project-modal-single {
			}
				.project-modal-avatar-fixed {
					width: 100%;
					height: 300px;
					position: relative;
					/** background: red; **/
				}
				@media( max-width: 750px ) {
					.project-modal-avatar-fixed {
					}
				}
					.project-modal-avatar-wrapper {
						width: 276px;
						height: 276px;
						/** background: teal; **/
					}
					@media( max-width: 750px ) {
						.project-modal-avatar-wrapper {
							width: 300px;
							height: 100%;
						}
					}
					@media( max-width: 360px ) {
						.project-modal-avatar-wrapper {
							width: 100%;
							height: 100%;
						}
					}
				.project-modal-single > .datetime > p {
					border: 1px solid var(--border-3);
				}
				.project-modal-single > .title.center {
					text-align: center;
				}
		.project {
			width: 100%;
			height: auto;
			overflow: hidden;
			transition: border .3s;
			border: 1px solid var(--border-3);
		}
		.project:hover {
			border-color: var(--border-3);
		}
			.project-body {
				width: auto;
				height: 300px;
				position: relative;
				background: var(--background-2);
			}
				.project-avatar.avatar-wrapper,
				.project-avatar.avatar-cover {
					width: auto;
					height: 100%;
				}
				.project-avatar.avatar-cover {
					position: absolute;
				}
				.project-language {
					top: 14px;
					left: 14px;
					position: absolute;
				}
					.project-language-avatar-wrapper {
						width: 30px;
						height: 30px;
					}
				.project-label {
					width: 100%;
					height: auto;
					bottom: 0;
					background: rgba(166,166,237,.2);
					position: absolute;
				}
			.project-footer {
				height: 100%;
				background: var(--background-1);
			}
	@media( max-width: 750px ) {
		.projects {
			grid-template-columns: repeat( 1, 1fr );
		}
			.project-body {
				height: 350px;
			}
	}
	
</style>