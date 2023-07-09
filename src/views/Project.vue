
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts.
	import Fmt from "/src/scripts/Fmt.js";
	import Json from "/src/scripts/Json.js";
	import Type from "/src/scripts/Type.js";
	
	// Import Widgets.
	import Error from "/src/widgets/Error.vue";
	import Project from "/src/widgets/Project.vue";
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Projects";
				}
			}
		},
		computed: {
			...mapState([
				"error",
				"loading"
			])
		},
		components: {
			Error,
			Project
		}
	};
	
</script>

<template>
	<div class="loading flex flex-center pd-24" v-if="loading">
		<div class="animate">
			<div class="spinner"></div>
		</div>
	</div>
	<Error v-else-if="error">
		<h3 class="title">Something Wrong</h3>
		<p class="sub-title">{{ error }}</p>
	</Error>
	<div class="project flex flex-center" v-else>
		<div class="project-wrapper">
			<div class="project-groups pd-14">
				<div class="project-single pd-14">
					<h2 class="title">
						<i class="bx bxs-flag mg-right-14"></i>Projects
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<p class="text mg-bottom-14">
						Here are some of the projects I've created and are still developing. Every project is open source anyone can use it or contribute if interesting, don't forget to let others know if it's useful.
					</p>
					<Project />
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
	 * Project Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.project {
		width: 100vw;
		height: auto;
	}
	@media (max-width: 750px) {
		.project {
			display: block;
		}
	}
		.project-wrapper {
			width: 70%;
			height: fit-content;
		}
		@media (max-width: 750px) {
			.project-wrapper {
				width: 100%;
				height: auto;
			}
		}
			.project-groups {
				background: var(--background-2);
			}
			@media (max-width: 750px) {
				.project-single {
					border-radius: 4px;
					border: 1px solid var(--border-3);
				}
			}
	
	.hr {
		width: 100%;
	}
	
</style>