
<script>
	
	import { mapState } from "vuex";
	
	import Eremento from "../scripts/eremento";
	import { Not } from "/src/scripts/logics";
	import { Typed } from "/src/scripts/types";
	import { Route } from "../scripts/configs";
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · About";
				}
			}
		},
		computed: mapState([
			"configs"
		]),
		methods: {
			
			/**
			 * Create object to arrange with Eremento.
			 *
			 * @param {Array<Route|String>} contents
			 *
			 * @returns {Array<Object>}
			 * 
			 */
			create: function( contents ) {
				var result = [];
				for( let content of contents ) {
					
					// If content has option.
					if( content instanceof Route ) {
						
						/*
						 * If content is subtitle.
						 * Multiline contents does not
						 * Work with sub-title contents.
						 */
						if( content.subtitle ) {
							result.push({
								name: "p",
								attributes: {
									class: "fs-16 fb-45 sub-title mg-bottom-10 mg-lc-bottom",
									innerHTML: this.paragraph( String( content.contents ) )
								}
							});
							continue;
						}
						
						// Normalize if value is Not Array.
						if( Not( content.contents, Array ) ) {
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
				return result;
			},
			
			/**
			 * HTML Paragraph replacer.
			 *
			 * @param {String} paragraph
			 *
			 * @returns {String}
			 * 
			 */
			paragraph: function( paragraph ) {
				
				var regexp = /((?<bold>\*{1,2})|(?<underline>\b\_{1,2})|(?<italic>\~{1,2}))(?<value>[^\1]*)(\1)/gm;
				var string = "";
				var index = 0;
				var match;
				
				while( ( match = regexp.exec( paragraph ) ) !== null ) {
					
					// Get regex group name.
					var kind = Object.keys( match.groups ).find( group => Typed( match.groups[group], String ) );
						kind = kind === "bold" ? "fb-45" : `text-${kind}`;
					
					// Format captured character.
					var value = `<span class="${kind}">${match.groups.value}</span>`;
					
					string += paragraph.substring( index, regexp.lastIndex - match[0].length );
					string += value;
					index = regexp.lastIndex;
				}
				return string + paragraph.substring( index );
			},
			
			
			/**
			 * Rendering element.
			 *
			 * @returns {String}
			 *  HTML Raw element
			 * 
			 */
			render: function() {
				return Eremento.arrange( this.create( this.configs.routes.get( "about" ) ) );
			}
		},
		components: {}
	};
	
</script>

<template>
	<div class="about flex flex-center">
		<div class="about-block bg-2">
			<div class="about-content pd-18">
				<h2 class="title mg-bottom-8">About</h2>
				<div class="about-paragraphs" v-html="render()"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * About Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.about {
		width: 100vw;
		height: auto;
	}
	@media( max-width: 750px ) {
		.about {
			width: 100%;
			display: block;
		}
	}
		.about-block {
			width: 65vw;
			display: block;
		}
		@media( max-width: 750px ) {
			.about-block {
				width: auto;
			}
		}
			.about-content {
				width: auto;
				height: auto;
			}
	
</style>
