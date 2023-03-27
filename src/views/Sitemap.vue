
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
			texts: [
				"A sitemap is a page on my portfolio website that provides an overview of the website's structure and content. It is designed to help visitors navigate the website more easily and to help search engines crawl and index the website's pages.",
				"My portfolio website's sitemap includes links to all of the website's main pages, including the home page, about page, portfolio page, blog page, and contact page. It also includes links to any other important pages or sections of the website.",
				"By using the sitemap, visitors can quickly find the information they are looking for without having to navigate through multiple pages. It also helps search engines understand the structure and content of the website, which can improve the website's visibility and ranking in search results.",
				"In addition to the sitemap, my portfolio website also includes a navigation menu that allows visitors to easily access the main pages of the website from any page on the website. This provides an additional level of convenience for visitors and helps ensure that they can find the information they need quickly and easily.",
				"I hope you find the sitemap and navigation menu on my portfolio website helpful. If you have any questions or feedback, please feel free to contact me."
			]
		}),
		props: {
		},
		computed: {
			
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
					 "<li class=\"sitemap-li li-type-none mg-bottom-10 mg-lc-bottom\">",
					 	"<RouterLink class=\"sitemap-route sub-title\" to=\"{}\">",
					 		"{}",
					 	"</RouterLink>",
					 "</li>"
				];
				
				// Mapping routes.
				Mapper( routes, function( i, route )
				{
					// Create route list.
					stack += Fmt( format.join( "" ), route.path, route.name );
					
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
			}
		},
		components: {
		}
	};
	
</script>

<template>
	<div class="container">
		<div class="deep-container">
			<div class="sitemap pd-top-34 pd-bottom-34">
				<h2 class="title mg-bottom-14">Sitemap</h2>
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
	.sitemap-route {
		text-transform: capitalize;
		text-decoration: underline;
	}
	
</style>