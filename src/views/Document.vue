
<script>
	
	import { mapState } from "vuex";
	
	import Eremento from "../scripts/eremento";
	import { Fmt } from "../scripts/formatter";
	import { Typed } from "../scripts/types";
	import { isNotEmpty, Not } from "../scripts/logics";
	
	import Error from "../widgets/Error.vue";
	
	export default {
		data: () => ({
			regexp: /^\/projects\/(?<project>[^\/]+)\/*/i,
			project: null,
			document: null,
			component: null,
			count: 0
		}),
		watch: {
			
			/**
			 * Watch for handle when route has changed.
			 *
			 * @param {String} to
			 * 
			 * @returns {Promise<void>}
			 *
			 */
			"$route.path": async function( to ) {
				if( this.isDocument() ) {
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
			
			/**
			 * Component binding.
			 *
			 * @returns {Object}
			 *  Component object
			 * 
			 */
			binding: function() {
				return {
					data: () => ({
						image: {},
						images: {},
						source: null,
						project: this.project,
						document: this.document,
						component: this.component
					}),
					computed: mapState([
						"configs",
						"projects",
						"documents"
					]),
					created: function() {
						this.images = this.configs.image.items;
						this.source = this.configs.image.source;
						if( process.env.NODE_ENV === "development" ) {
							this.source = "/public/images";
						}
					},
					mounted: function() {
					},
					methods: {
					},
					template: Eremento.arrange(
						this.component.template
					)
				};
			}
		},
		created: async function() {
			await this.request();
		},
		methods: {
			
			/**
			 * Find route component by current route path.
			 *
			 * @param {Array} routes
			 * @param {String} prefix
			 *  Prefix only usage when loop
			 *
			 * @returns {?Object}
			 *  Object of component
			 * 
			 */
			finder: function( routes, prefix = null ) {
				
				// Check if routes is iterable.
				if( Typed( routes, Array ) ) {
					for( let i in routes ) {
						var path = routes[i].path;
						var route = routes[i];
						
						// If current iteration has prefix.
						if( Typed( prefix, String ) ) path = Fmt( "{}/{}", prefix, path.trim( "/" ) );
						
						// Check if current route is match.
						if( this.$route.path.toLowerCase() === path.toLowerCase() ) return route.component;
						
						// Check if current route has children.
						if( Typed( route.children, Array ) ) {
							
							var find = null;
							
							// If route found on children of current route iteration.
							if( Typed( find = this.finder( route.children, path ), Object ) ) {
								
								// Return returns.
								return find;
							}
						}
					}
				}
			},
			
			/**
			 * Return if current path is project documentation.
			 *
			 * @returns {Boolean}
			 * 
			 */
			isDocument: function() {
				return isNotEmpty( this.$route.params.project );
			},
			
			/**
			 * Get current project documentation.
			 *
			 * @returns {Promise<void>}
			 * 
			 */
			request: async function() {
				var name = this.$route.params.project.toLowerCase();
				var project = null;
				for( let i in this.configs.project.includes ) {
					
					project = this.configs.project.includes[i];
					
					// Skip if project is not include.
					if( project.include === false ) continue;
					
					// If project name or project endpoint is equals with param.
					if( name === project.name.toLowerCase() ||
						name === project.endpoint.split( "/" ).pop().toLowerCase() ) {
						
						// Set current project.
						this.project = project;
						
						// If current project is loading.
						if( project.document_loading ) await project.document_loading;
						
						// Check if document is not requested.
						if( Not( this.documents[project.endpoint], Object ) ) await this.$store.dispatch( "document", project );
						
						// If there are no error occured.
						if( project.document_error === false ) {
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
				<keep-alive>
					<component :is="binding"></component>
				</keep-alive>
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
