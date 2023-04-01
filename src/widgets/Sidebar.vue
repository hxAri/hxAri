
<script>
	
	import { RouterLink } from "vue-router";
	
	// Import Routes
	import Routes from "../router/routes.js";
	
	// Import Scripts
	import Fmt from "../scripts/Fmt.js";
	import Mapper from "../scripts/Mapper.js";
	import Type from "../scripts/Type.js";
	
	export default {
		data: () => ({
			format: [
				"<div class=\"sidebar-single flex flex-left\">",
					"<i :class=\"{}\"></i>",
					"<RouterLink class=\"sidebar-route\" to=\"{}\">",
						"{}",
					"</RouterLink>",
				"</div>"
			].join( "" ),
			formatTree: [
				"<div class=\"sidebar-single\">",
					"<div class=\"sidebar-single sidebar-single-dropdown flex flex-left\">",
						"<i :class=\"{ icon }\"></i>",
						"<RouterLink class=\"sidebar-route\" to=\"{ path }\">",
							"{ name }",
						"</RouterLink>",
						"<i :class=\"[ 'sidebar-icon', 'sidebar-dropdown-icon', 'bx', actives['{ uniq }'] ? 'bx-chevron-up' : 'bx-chevron-down' ]\" data-uniq=\"{ uniq }\" @click=\"dropdown\"></i>",
					"</div>",
					"<div class=\"dropdown-display\" ref=\"{ uniq }\">",
						"<div class=\"sidebar-group sidebar-group-dropdown scroll-y scroll-hidden\">",
							"{ iter }",
						"</div>",
					"</div>",
				"</div>"
			].join( "" )
		}),
		computed: {
			
			/*
			 * Return component binding.
			 *
			 * @return Object
			 */
			binding: function()
			{
				return({
					data: () => ({
						actives: {
						}
					}),
					mounted: function()
					{
						//console.log( this.$refs );
					},
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
							this.actives[e.target.dataset.uniq] = this.actives[e.target.dataset.uniq] === true ? false : true;
							this.$refs[e.target.dataset.uniq].classList.toggle( "active" );
						}
					},
					template: Fmt( "<div class=\"sidebar-group scroll-y scroll-hidden\">{}</div>", this.iterator( Routes ) )
				});
			}
		},
		methods: {
			
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
				return( "[ 'sidebar-icon', 'bx', 'bx-right-arrow-alt' ]" );
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
							uniq = uniq[0].replace( /\d+/, "x" ) + uniq.slice( 1 );
						
						// Build dropdown menu template.
						stack += Fmt( self.formatTree, {
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
						stack += Fmt( self.format, self.icon( list ), list.path, list.name );
					}
				});
				return( stack );
			}
		}
	};
	
</script>

<template>
	<component v-bind:is="binding"></component>
</template>

<style>
	
	.sidebar-group {
		width: auto;
		padding: 14px;
	}
	.sidebar-group-dropdown {
		padding-left: 32px;
		padding-right: 0;
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