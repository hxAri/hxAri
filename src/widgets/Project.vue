
<script>
	export default {
		props: {
			image: {
				type: Object
			},
			projects: {
				type: [ Array, Object ]
			}
		}
	};
</script>

<template>
	<div class="projects">
		<div class="project rd-square" v-for="project in projects" v-scroll-reveal="{ delay: 600 }">
			<div class="project-body">
				<div class="project-avatar avatar-wrapper flex flex-center">
					<img class="avatar-image" :title="project.name" :alt="project.full_name" :data-src="image.project[project.name.toLowerCase()]" v-lazyload />
					<div class="avatar-cover"></div>
				</div>
				<div class="project-language">
					<div class="project-language-avatar-wrapper avatar-wrapper">
						<img class="avatar-image" :title="project.name" :alt="project.language ?? 'JavaScript'" :data-src="image.language[( project.language ? project.language.toLowerCase() : 'js' )]" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
				</div>
				<div class="project-label flex flex-left pd-14">
					<a class="title" :href="project.html_url">{{ project.name }}</a>
				</div>
			</div>
			<div class="project-footer pd-14">
				<p class="text">{{ project.description ?? "Description is unavailable" }}</p>
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
				.project-avatar.avatar-wrapper {
					width: auto;
					height: 100%;
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