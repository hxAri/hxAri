
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
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Sitemap";
				}
			}
		},
		computed: {
			
			...mapState([
				"configs"
			]),
			
			/*
			 * Return component binding.
			 *
			 * @return Object
			 */
			binding: function()
			{
				return({
					template: Fmt( "<ul class=\"sitemap-ul\">{}</ul>", this.iterator( Routes ) )
				});
			}
		},
		methods: {
			
			/*
			 * Create object to arrange with Eremento.
			 *
			 * @params Array<Object|String> contents
			 *
			 * @return Array<Object>
			 */
			create: function( contents )
			{
				var result = [];
				
				// Mapping contents.
				for( let content of contents )
				{
					// If content has option.
					if( Type( content, Object ) )
					{
						// If content is subtitle.
						// Multiline contents does not
						// Work with sub-title contents.
						if( content.subtitle )
						{
							result.push({
								name: "p",
								attributes: {
									class: "sub-title mg-bottom-14 mg-lc-bottom",
									innerHTML: this.paragraph( String( content.contents ) )
								}
							});
							continue;
						}
						
						// Normalize if value is Not Array.
						if( Not( content.contents, Array ) )
						{
							content.contents = [
								String( content.contents )
							];
						}
						result = [
							...result,
							...this.create( content.contents )
						];
					}
					else {
						result.push({
							name: "p",
							attributes: {
								class: "text mg-bottom-14 mg-lc-bottom",
								innerHTML: this.paragraph( String( content ) )
							}
						});
					}
				}
				return( result );
			},
			
			/*
			 * Create sitemap lists.
			 *
			 * @params Array lists
			 *
			 * @return String
			 */
			iterator: function( routes )
			{
				var self = this;
				var stack = "";
				var format = [
					 "<li class=\"sitemap-li li-type-none mg-bottom-10 mg-lc-bottom\" data-name=\"{name}\" data-path=\"{path}\">",
					 	"<RouterLink class=\"sitemap-route sub-title fb-45\" data-link=\"name\" to=\"{path}\">",
					 		"{name}",
					 	"</RouterLink>",
					 	"<br/>",
					 	"<RouterLink class=\"sitemap-route text\" data-link=\"path\" to=\"{path}\">",
					 		"{path}",
					 	"</RouterLink>",
					 "</li>"
				];
				
				// Mapping routes.
				Mapper( routes, function( i, route )
				{
					// Check if route is not visible.
					if( Type( route.visible, Boolean ) && route.visible === false ) return;
					
					// Create route list.
					stack += Fmt( format.join( "" ), {
						path: route.path,
						name: route.name
					});
					
					// Check if route has children paths.
					// And if path is readable.
					if( Type( route.children, Array ) && route.readable )
					{
						// Mapping children routes.
						stack += self.iterator( Mapper( route.children,
							
							/*
							 * Resolve children route.
							 *
							 * @params Number u
							 * @params Object child
							 *
							 * @return Object
							 */
							function( u, child )
							{
								return({
									path: Fmt( "{}/{}", route.path, child.path ),
									name: child.name,
									children: child.children,
									component: child.component
								});
							}
						))
					}
				});
				return( stack );
			},
			
			/*
			 * HTML Paragraph replacer.
			 *
			 * @params String paragraph
			 *
			 * @return String
			 */
			paragraph: function( paragraph )
			{
				var regexp = /((?<bold>\*{1,2})|(?<underline>\b\_{1,2})|(?<italic>\~{1,2}))(?<value>[^\1]*)(\1)/gm;
				var string = "";
				var index = 0;
				var match;
				
				while( ( match = regexp.exec( paragraph ) ) !== null )
				{
					// Get regex group name.
					var kind = Object.keys( match.groups ).find( group => Type( match.groups[group], String ) );
						kind = kind === "bold" ? "fb-45" : `text-${kind}`;
					
					// Format captured character.
					var value = `<span class="${kind}">${match.groups.value}</span>`;
					
					string += paragraph.substring( index, regexp.lastIndex - match[0].length );
					string += value;
					index = regexp.lastIndex;
				}
				return( string + paragraph.substring( index ) );
			},
			
			/*
			 * Rendering element.
			 *
			 * @return String
			 *  HTML Raw element
			 */
			render: function()
			{
				return(
					Eremento.arrange(
						this.create(
							this.configs.routes.sitemap
						)
					)
				);
			}
		},
		components: {}
	};
	
</script>

<template>
	<div class="sitemap flex flex-center">
		<div class="sitemap-block bg-2">
			<div class="sitemap-content pd-18">
				<h2 class="title mg-bottom-8">Sitemap</h2>
				<!--<div class="sitemap-paragraphs mg-bottom-14" v-html="render()"></div>-->
				<component v-bind:is="binding"></component>
			</div>
		</div>
	</div>
</template>

<style>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Sitemap Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.sitemap {
		width: 100vw;
		height: auto;
	}
	@media( max-width: 750px ) {
		.sitemap {
			width: 100%;
			display: block;
		}
	}
		.sitemap-block {
			width: 65vw;
			display: block;
		}
		@media( max-width: 750px ) {
			.sitemap-block {
				width: auto;
			}
		}
			.sitemap-content {
				width: auto;
				height: auto;
			}
			[data-link="path"].sitemap-route {
				text-decoration: underline;
			}
			[data-link="name"].sitemap-route {
				text-transform: capitalize;
			}
	
</style>