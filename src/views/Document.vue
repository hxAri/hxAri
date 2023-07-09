
<script>
	
	import { mapState } from "vuex";
	
	// Import Routing
	import Routes from "/src/routing/routes.js";
	
	// Import Scripts
	import Eremento from "/src/scripts/Eremento.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Not from "/src/scripts/logics/Not.js";
	import Type from "/src/scripts/Type.js";
	import Value from "/src/scripts/logics/Value.js";
	
	// Import Widgets
	import Error from "/src/widgets/Error.vue";
	
	export default {
		data: () => ({
			regexp: /^\/projects\/(?<project>[^\/]+)\/*/i,
			project: null,
			document: null,
			component: null,
			count: 0
		}),
		watch: {
			
			/*
			 * Watch for handle when route has changed.
			 *
			 * @params String to,
			 *
			 * @return Void
			 */
			"$route.path": async function( to )
			{
				if( this.isDocument() )
				{
					this.project = null;
					this.document = null;
					this.component = null;
					
					await this.request();
				}
			}
		},
		computed: {
			
			// Mapping data from store.
			...mapState([
				"configs",
				"projects",
				"documents",
			]),
			
			/*
			 * Component binding.
			 *
			 * @return Object
			 *  Component object
			 */
			binding: function()
			{
				return({
					data: () => ({
						images: {},
						project: this.project,
						document: this.document,
						component: this.component
					}),
					computed: mapState([
						"configs",
						"projects",
						"documents"
					]),
					created: function()
					{
						this.images = this.configs.image.images;
					},
					mounted: function()
					{},
					methods: {
						
						/*
						 * Image url source formater.
						 *
						 * @params String source
						 *
						 * @return String
						 */
						isrc: function( source )
						{
							return([ this.configs.image.source, source ]).join( "/" );
						}
					},
					template: Eremento.arrange(
						this.component.template
					)
				});
			}
		},
		created: async function()
		{
			await this.request();
		},
		methods: {
			
			/*
			 * Find route component by current route path.
			 *
			 * @params Array routes
			 * @params String prefix
			 *  Prefix only usage when loop
			 *
			 * @return Object
			 *  Object of component
			 */
			finder: function( routes, prefix = null )
			{
				// Check if routes is iterable.
				if( Type( routes, Array ) )
				{
					for( let i in routes )
					{
						var path = routes[i].path;
						var route = routes[i];
						
						// If current iteration has prefix.
						if( Type( prefix, String ) ) path = Fmt( "{}/{}", prefix, path.trim( "/" ) );
						
						// Check if current route is match.
						if( this.$route.path.toLowerCase() === path.toLowerCase() ) return( route.component );
						
						// Check if current route has children.
						if( Type( route.children, Array ) )
						{
							var find = null;
							
							// If route found on children of current route iteration.
							if( Type( find = this.finder( route.children, path ), Object ) )
							{
								// Return returns.
								return( find );
							}
						}
					}
				}
			},
			
			/*
			 * Return if current path is project documentation.
			 *
			 * @return Boolean
			 */
			isDocument: function()
			{
				return( Value.isNotEmpty( this.$route.params.project ) );
			},
			
			/*
			 * Get current project documentation.
			 *
			 * @return Promise
			 */
			request: async function()
			{
				var name = this.$route.params.project.toLowerCase();
				var project = null;
				
				for( let i in this.configs.projects )
				{
					project = this.configs.projects[i];
					
					// Skip if project is not include.
					if( project.include === false ) continue;
					
					// If project name or project endpoint is equals with param.
					if( name === project.name.toLowerCase() ||
						name === project.endpoint.split( "/" ).pop().toLowerCase() )
					{
						// Set current project.
						this.project = project;
						
						// If current project is loading.
						if( project.document_loading ) await project.document_loading;
						
						// Check if document is not requested.
						if( Not( this.documents[project.endpoint], Object ) ) await this.$store.dispatch( "document", project );
						
						// If there are no error occured.
						if( project.document_error === false )
						{
							this.document = this.documents[project.endpoint];
							this.component = this.finder( this.document.routes );
						}
						return;
					}
				}
				this.$router.push({ name: "none", query: { from: this.$route.path, message: "No Project Named\x20" + this.$route.params.project } });
			}
		},
		components: {
			Error
		}
	};
	
</script>

<template>
	<div class="document flex flex-center">
		<div class="document-loading loading flex flex-center pd-24" v-if="project.document_loading">
			<div class="animate">
				<div class="spinner"></div>
			</div>
		</div>
		<div class="document-error" v-else-if="project.document_error">
			<Error>
				<h3 class="title">Something Wrong</h3>
				<p class="sub-title">{{ project.document_error }}</p>
			</Error>
		</div>
		<div class="document-display" v-else>
			<div class="document-content bg-2 pd-18" v-if="component">
				<component v-bind:is="binding"></component>
			</div>
			<div class="document-unavailable" v-else>
				<Error>
					<h3 class="title">Something Wrong</h3>
					<p class="sub-title">Page Not Found</p>
				</Error>
			</div>
		</div>
	</div>
</template>

<style>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Document Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.document {
		width: 100vw;
		margin: auto;
	}
	@media( max-width: 750px ) {
		.document {
			width: 100%;
			display: block;
		}
	}
		.document-error,
		.document-loading,
		.document-display {
			width: 65vw;
			display: block;
		}
		@media( max-width: 750px ) {
			.document-error,
			.document-loading,
			.document-display {
				width: 100%;
				display: 100%;
			}
		}
			.document-content {
				width: auto;
				height: auto;
			}
		
	
</style>