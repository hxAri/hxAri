
<script>
	
	import { mapState } from "vuex";
	import { RouterLink } from "vue-router";
	
	// Import Routes
	import Routes from "/src/routing/routes.js";
	
	// Import Scripts
	import Eremento from "/src/scripts/Eremento.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Mapper from "/src/scripts/Mapper.js";
	import Not from "/src/scripts/logics/Not.js";
	import Type from "/src/scripts/Type.js";
	import Value from "/src/scripts/logics/Value.js";
	
	export default {
		data: () => ({
			format: {
				groups: Eremento.arrange({
					name: "div",
					attributes: {
						class: "sidebar-single",
						innerHTML: [
							{
								name: "div",
								attributes: {
									class: "sidebar-single sidebar-single-dropdown flex flex-left",
									innerHTML: [
										{
											name: "i",
											attributes: {
												":class": "{icon}"
											}
										},
										{
											name: "RouterLink",
											attributes: {
												to: "{path}",
												class: "sidebar-route",
												"@click": "$emit( 'close' )",
												innerHTML: "{name}",
												"exact-path": null
											}
										},
										{
											name: "i",
											attributes: {
												":class": "[ 'sidebar-icon', 'sidebar-dropdown-icon', 'bx', actives['{ uniq }'] ? 'bx-chevron-up' : 'bx-chevron-down' ]",
												"@click": "dropdown",
												dataset: {
													"uniq": "{ uniq }"
												}
											}
										}
									]
								}
							},
							{
								name: "div",
								attributes: {
									ref: "{uniq}",
									class: "dropdown-display",
									innerHTML: {
										name: "div",
										attributes: {
											class: "sidebar-group sidebar-group-dropdown scroll-y scroll-hidden",
											innerHTML: "{iter}"
										}
									}
								}
							}
						]
					}
				}),
				single: Eremento.arrange({
					name: "div",
					attributes: {
						class: "sidebar-single flex flex-left",
						innerHTML: [
							{
								name: "i",
								attributes: {
									":class": "{}"
								}
							},
							{
								name: "RouterLink",
								attributes: {
									to: "{}",
									class: "sidebar-route",
									"@click": "$emit( 'close' )",
									innerHTML: "{}",
									"exact-path": null
								}
							}
						]
					}
				})
			},
			project: null,
			document: null,
			regexp: /^\/projects\/(?<project>[^\/]+)\/*/i
		}),
		watch: {
			
			/*
			 * Watch for handle when route has changed.
			 *
			 * @params String to,
			 *
			 * @return Void
			 */
			"$route.path": function( to )
			{
				if( this.isDocument() )
				{
					this.project = null;
					this.request();
				}
			}
		},
		computed: {
			
			// Mapping data from store.
			...mapState([
				"configs",
				"projects",
				"documents"
			]),
			
			/*
			 * Render default sidebar menu.
			 *
			 * @return Object
			 *  Component object
			 */
			default: function()
			{
				// Copy routes.
				var routes = [ ...Routes ];
				
				// Find projects name.
				for( let i in routes )
				{
					// Check if route is project.
					if( routes[i].name.toLowerCase() === "projects" )
					{
						// Check if project does not have children.
						if( Value.isEmpty( routes[i].children ) )
						{
							// Resolve if chidlren is not array.
							routes[i].children = [];
							
							for( let u in this.configs.projects )
							{
								// If project has documentation.
								if( this.configs.projects[u].include )
								{
									routes[i].children.push({
										path: this.configs.projects[u].endpoint.split( "/" ).pop(),
										name: this.configs.projects[u].name
									});
								};
							}
						}
					}
				}
				return({
					data: () => ({ actives: {} }),
					methods: {
						
						/*
						 * Handle dropdown display.
						 *
						 * @params Event e
						 *
						 * @return Void
						 */
						dropdown: function( e )
						{
							// Get unique id code.
							var uniqid = e.target.dataset.uniq;
							
							// Set element as active dropdown.
							this.actives[uniqid] = this.actives[uniqid] === true ? false : true;
							
							// Set element class list toggle.
							this.$refs[uniqid].classList.toggle( "active" );
						}
					},
					template: Fmt( "<div class=\"sidebar-group scroll-y scroll-hidden\">{}</div>", this.iterator( routes ) )
				});
			},
			
			/*
			 * Render project sidebar menu.
			 *
			 * @return Object
			 *  Component object
			 */
			projectMenu: function()
			{
				var project = null;
				var component = {
					data: () => ({
						actives: {}
					}),
					computed: mapState([
						"configs",
						"projects",
						"documents"
					]),
					methods: {
						
						/*
						 * Handle dropdown display.
						 *
						 * @params Event e
						 *
						 * @return Void
						 */
						dropdown: function( e )
						{
							// Get unique id code.
							var uniqid = e.target.dataset.uniq;
							
							// Set element as active dropdown.
							this.actives[uniqid] = this.actives[uniqid] === true ? false : true;
							
							// Set element class list toggle.
							this.$refs[uniqid].classList.toggle( "active" );
						}
					},
					template: "<div class=\"sidebar-group scroll-y scroll-hidden\">{}</div>"
				};
				
				for( let i in this.configs.projects )
				{
					// Get project info.
					project = this.configs.projects[i];
					
					// Check if project name is equal,
					// And if project has documentation.
					if( project.include && ( project.name.toLowerCase() === this.$route.params.project.toLowerCase() || project.endpoint.split( "/" ).pop().toLowerCase() === this.$route.params.project.toLowerCase() ) )
					{
						// Check if project documentation is available.
						if( Type( this.document, Object ) )
						{
							component.template = Fmt( component.template, this.iterator( this.document.routes ) );
							component.data = () => ({
								actives: {},
								project: project,
								document: this.document
							});
						}
						else {
							component.template = Fmt( component.template, "*" );//this.iterator([ ...Routes ]) );
						}
						break;
					}
				}
				return( component );
			}
		},
		created: function()
		{
			// This must be handle, because the watch only triggered when path has changed.
			if( this.isDocument() ) this.request();
		},
		methods: {
			
			/*
			 * Re-emit from dynamic component.
			 *
			 * @return Void
			 */
			close: function()
			{
				this.$emit( "close" );
			},
			
			/*
			 * Create icon binding.
			 *
			 * @params Object list
			 *
			 * @return String
			 */
			icon: function( list )
			{
				if( Type( list.icon, Object ) )
				{
					return( Fmt( "[ 'sidebar-icon', $route.path === '{}' ? '{}' : '{}' ]", ...[
						list.path,
						list.icon.active.join( "\x20" ),
						list.icon.default.join( "\x20" )
					]));
				}
				return( Fmt( "[ 'sidebar-icon', 'bx', $route.path === '{}' ? 'bx-chevrons-right' : 'bx-chevron-right' ]", list.path ) );
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
			 * Create sidebar lists.
			 *
			 * @params Array lists
			 *
			 * @return String
			 */
			iterator: function( lists )
			{
				var stack = "";
				var self = this;
				
				// Mapping routes.
				Mapper( lists, function( i, list )
				{
					// Check if route is not visible.
					if( Type( list.visible, Boolean ) && list.visible === false ) return;
					
					// Check if route has children paths.
					// And if path is readable.
					if( Type( list.children, Array ) && list.readable === true )
					{
						// Create unique id.
						var uniq = btoa( list.path ).replaceAll( /\=|\-|\/|\+/g, "" );
						
						// Build dropdown menu template.
						stack += Fmt( self.format.groups, {
							icon: self.icon( list ),
							path: list.path,
							name: list.name,
							uniq: uniq,
							iter: self.iterator( Mapper( list.children,
								
								/*
								 * Resolve children routes.
								 *
								 * @params Number u
								 * @params Object children
								 *
								 * @return Object
								 */
								function( u, children )
								{
									return({
										path: Fmt( "{}/{}", list.path, children.path ),
										name: children.name,
										icon: children.icon,
										readable: children.readable,
										children: children.children,
										component: children.component
									});
								})
							)
						});
					}
					else {
						stack += Fmt( self.format.single, self.icon( list ), list.path, list.name );
					}
				});
				return( stack );
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
						name === project.endpoint.toLowerCase().split( "/" ).pop() )
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
						}
						return;
					}
				}
				this.$router.push({ name: "none", query: { from: this.$route.path, message: "No Project Named\x20" + this.$route.params.project } });
			}
		}
	};
	
</script>

<template>
	<div class="dp-block">
		<div class="dp-block" v-if="isDocument() && project">
			<div class="pd-14" v-if="project.document_loading">
				<div class="pd-14 bg-3 blinking rd-square mg-bottom-14 mg-lc-bottom" v-for="i in 6"></div>
			</div>
			<component v-bind:is="default" @close="close" v-else-if="project.document_error"></component>
			<component v-bind:is="projectMenu" @close="close" v-else-if="document"></component>
		</div>
		<component v-bind:is="default" @close="close" v-else></component>
	</div>
</template>

<style>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Sidebar Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.sidebar-group {
		width: auto;
		padding: 14px;
	}
	.sidebar-group-dropdown {
		margin-top: 14px;
		padding-top: 0;
		padding-left: 26px;
		padding-right: 0;
		padding-bottom: 0;
	}
		.sidebar-single {
			position: relative;
			margin-bottom: 14px;
		}
		.sidebar-single:last-child,
		.sidebar-single-dropdown {
			margin-bottom: 0;
		}
			.sidebar-icon {
				font-size: 18px;
				margin-right: 14px;
			}
			.sidebar-dropdown-icon {
				right: 0;
				margin: 0;
				position: absolute;
			}
			.sidebar-route,
			.sidebar-route:focus,
			.sidebar-route:hover {
				color: var(--color-2);
				text-transform: capitalize;
			}
			.sidebar-route.router-link-active,
			.sidebar-route.router-link-exact-active {
				color: var(--link-1);
			}
	
</style>