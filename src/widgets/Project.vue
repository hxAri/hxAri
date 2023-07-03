
<script>
	
	import { RouterLink } from "vue-router";
	
	// Import Scripts
	import Not from "/src/scripts/logics/Not.js";
	
	export default {
		data: () => ({
			active: null
		}),
		props: {
			projects: {
				type: [ Array, Object ],
				require: true
			}
		},
		methods: {
			
			display: function( project )
			{
				this.active = project;
				
				// Check if project does not have previous request.
				if( Not( this.$store.state.projects[project.endpoint], Object ) )
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
				return this.projects.filter( project => project.include );
			}
			
		}
	};
	
</script>

<template>
	<div class="projects">
		<div :class="[ 'modal', 'modal', 'flex', 'flex-center', active ? 'active' : '' ]">
			<div class="modal-exit" @click="active = null"></div>
			<div :class="[ 'modal-main', 'rd-square', active ? 'active' : '' ]">
				<div class="" v-if="active">
					<div class="" v-if="active.loading">
						Loading
					</div>
					<div class="" v-else>
					</div>
				</div>
			</div>
		</div>
		<div class="project rd-square" v-for="project in filter()" v-scroll-reveal="{ delay: 600 }">
			<div class="project-body" v-scroll-reveal="{ delay: 600 }">
				<div class="project-avatar avatar-wrapper flex flex-center" @click="display( project )">
					<img class="avatar-image" :title="project.name" :alt="project.name" :data-src="project.tumbnail" v-lazyload />
					<div class="avatar-cover"></div>
				</div>
				<!--
				<div class="project-language" v-if="$store.state.projects[project.endpoint]">
					<div class="project-language-avatar-wrapper avatar-wrapper">
						<img class="avatar-image" :title="project.name" :alt="project.language ?? 'Language'" :data-src="$store.state.projects[project.endpoint]" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
				</div>
				-->
				<div class="project-label flex flex-left pd-14">
					<RouterLink class="title" :to="{ path: '/projects/' + project.name, query: {} }">
						{{ project.name }}
					</RouterLink>
				</div>
			</div>
			<!--
			<div class="project-footer pd-14">
				<p class="text">Click for more information</p>
			</div>
			-->
			<!--
			<div class="project-body">
				<div class="project-language">
					<div class="project-language-avatar-wrapper avatar-wrapper">
						<img class="avatar-image" :title="project.name" :alt="project.language ?? 'JavaScript'" :data-src="image.language[( project.language ? project.language.toLowerCase() : 'js' )]" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
				</div>
			</div>
			-->
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
		.project {
			width: 100%;
			height: auto;
			overflow: hidden;
			transition: border .3s;
			border: 1px solid var(--border-1);
		}
		.project:hover {
			border-color: var(--border-2);
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
	@media (max-width: 750px) {
		.projects {
			grid-template-columns: repeat( 1, 1fr );
		}
			.project-body {
				height: 350px;
			}
	}
	
</style>