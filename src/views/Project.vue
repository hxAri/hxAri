
<script>
	
	// Import Scripts.
	import Fmt from "/src/scripts/Fmt.js";
	import Image from "/src/scripts/Image.js";
	import Json from "/src/scripts/Json.js";
	import Mapper from "/src/scripts/Mapper.js";
	import MultiRequest from "/src/scripts/MultiRequest.js";
	import Request from "/src/scripts/Request.js";
	import Type from "/src/scripts/Type.js";
	
	// Import Widgets.
	import Error from "/src/widgets/Error.vue";
	import Project from "/src/widgets/Project.vue";
	
	export default {
		data: () => ({
			image: Image,
			error: false,
			loading: true,
			requests: [],
			projects: [],
			responses: {}
		}),
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Projects";
				}
			}
		},
		mounted: async function()
		{
			// Copy object instance.
			var self = this;
			
			// Request targets.
			var requests = [
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
					<Project :profile="profile" :projects="projects" :image="image" />
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
