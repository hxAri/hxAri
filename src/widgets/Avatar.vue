
<script>
	
	import { RouterLink } from "vue-router";
	
	import { Fmt } from "../scripts/formatter";
	import { Callable, Typed } from "../scripts/types";
	import { Mapper } from "../scripts/mapper";
	
	export default {
		data: () => ({
			default: {
				wrapper: [
					"avatar-wrapper",
					"flex",
					"flex-center"
				],
				avatar: [
					"avatar",
					"flex",
					"flex-center"
				],
				cover: [
					"avatar-cover"
				],
				image: [
					"avatar-image",
					"lazy"
				],
				route: [
					"avatar-route"
				],
				link: [
					"avatar-link"
				]
			}
		}),
		props: {
			attrs: {
				type: Object,
				require: false
			},
			blank: {
				type: Boolean,
				require: false
			},
			inject: {
				type: Object,
				require: false
			},
			route: {
				type: [
					Object,
					String
				],
				require: false
			},
			title: {
				type: String,
				require: false
			},
			link: {
				type: [
					Object,
					String
				],
				require: false
			},
			src: {
				type: String,
				require: false
			},
			alt: {
				type: String,
				require: false
			}
		},
		computed: {
			
			/**
			 * Return component binding.
			 *
			 * @return Object
			 */
			binding: function() {
				return this.building();
			}
		},
		methods: {
			
			/**
			 * Avatar component builder.
			 *
			 * @params Object component
			 *
			 * @return Object
			 */
			building: function() {
				
				// Copy object instance.
				var self = this;
				
				// Default format values.
				var values = {
					alt: "Unknown",
					avatar: this.default.avatar,
					cover: this.default.cover,
					image: this.default.image,
					link: this.default.link,
					route: this.default.route,
					slot: "",
					src: "",
					target: "",
					title: "Untitled",
					wrapper: this.default.wrapper
				};
				
				// Component structure.
				var component = {
					emits: {},
					methods: {},
					computed: {},
					components: {},
					
					// Default template format.
					template: [
						"<div class=\"{ avatar }\">",
							"<div class=\"{ wrapper }\">",
								"<img class=\"{ image } lazy\" title=\"{ title }\" alt=\"{ alt }\" data-src=\"{ src }\" v-lazyload />",
								"<div class=\"{ cover }\">",
									"{ slot }",
								"</div>",
							"</div>",
						"</div>"
					]
				};
				
				// Check if avatar has route.
				if( Typed( this.route, [ Object, String ] ) ) {
					
					// Push component template.
					component.template.unshift( "<RouterLink class=\"{ route }\" to=\"{ path }\">" );
					component.template.push( "</RouterLink>" );
					
					// If route is Object type.
					if( Typed( this.route, Object ) ) {
						var path = this.route.path;
							path = Typed( path, String, () => path, () => "/" );
						var query = this.route.query;
							query = Typed( query, Object, () => new URLSearchParams( query ).toString(), () => "" );
						
						values.path = Fmt( "{}?{}", path, query );
					}
					else {
						values.path = this.route;
					}
				}
				
				// Check if avatar has link.
				if( Typed( this.link, [ Object, String ] ) ) {
					var target = this.target;
					
					// Push component template.
					component.template.unshift( "<a class=\"{ link }\" href=\"{ href }\" target=\"{ target }\">" );
					component.template.push( "</a>" );
					
					// If link is Object type.
					if( Typed( this.link, Object ) ) {
						var url = this.link.url;
							url = Typed( url, String, () => url, () => "" );
						var query = this.link.query;
							query = Typed( query, Object, () => new URLSearchParams( query ).toString(), () => "" );
						
						values.href = Fmt( "{}?{}", url, query );
					}
					else {
						values.href = this.link;
					}
					values.target = Typed( this.target, String, () => target, () => "" );
				}
				
				// Check if avatar has injection attributes.
				if( Typed( this.attrs, Object ) ) {
					
					// Mapping avatar attributes.
					Mapper( this.attrs, function( i, attr, value ) {
						
						// Check if class injection is available.
						if( Typed( values[attr], Array ) ) {
							
							// If class has more than one additional class.
							if( Typed( value, Array ) ) {
								values[attr] = [
									...values[attr],
									...value
								];
							}
							else {
								values[attr].push( value );
							}
						}
					});
				}
				
				// Check if avatar has injection properties.
				if( Typed( this.inject, Object ) ) {
					
					// Mapping injections.
					Mapper( this.inject,
						
						/**
						 * Handle component injection.
						 *
						 * @params Int i
						 * @params String key
						 * @params Mixed value
						 *
						 * @return Void
						 */
						function( i, key, val ) {
							if( key === "slot" || key === "template" ) {
								values.slot = Callable( val );
								values.slot = Typed( values.slot, Array, () => values.slot.join( "" ), () => values.slot );
							}
							else {
								components[key] = val;
							}
						}
					);
				}
				
				// Mapping for resolve class names.
				new Mapper( values,
					
					/**
					 * Handle value mapping.
					 *
					 * @params Int i
					 * @params String key
					 * @params Array|String value
					 *
					 * @return Void
					 */
					function( i, key, value ) {
						if( Typed( value, Array ) ) {
							values[key] = value.join( "\x20" );
						}
					}
				);
				
				var alt = this.alt;
				var src = this.src;
				var title = this.title;
				
				// Resolve image attributes.
				values.alt = Typed( alt, String, () => alt, () => "" );
				values.src = Typed( src, String, () => src, () => "" );
				values.title = Typed( title, String, () => title, () => "" );
				
				// Formating component template.
				component.template = Fmt( component.template.join( "" ), values );
				
				// Return Component Object.
				return component;
			}
		},
		template: "<template v-bind:is=\"binding\"></template>"
	};
	
</script>

<template>
	<component v-bind:is="binding"></component>
</template>
