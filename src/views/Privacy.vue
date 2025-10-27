
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Eremento from "/src/scripts/eremento";
	import { Not } from "/src/scripts/logics";
	import { Typed } from "/src/scripts/types";
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · Privacy";
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
			 * @params Array<Object|String> contents
			 *
			 * @return Array<Object>
			 */
			create: function( contents ) {
				var result = [];
				for( let content of contents ) {
					
					// If content has option.
					if( Typed( content, Object ) ) {
						
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
			 * @params String paragraph
			 *
			 * @return String
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
			 * @return String
			 *  HTML Raw element
			 */
			render: function() {
				return Eremento.arrange(
					this.create(
						this.configs.routes.privacy
					)
				);
			}
		},
		components: {}
	};
	
</script>

<template>
	<div class="privacy flex flex-center">
		<div class="privacy-block bg-2">
			<div class="privacy-content pd-18">
				<h2 class="title mg-bottom-8">Privacy</h2>
				<div class="privacy-paragraphs" v-html="render()"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Privacy Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.privacy {
		width: 100vw;
		height: auto;
	}
	@media( max-width: 750px ) {
		.privacy {
			width: 100%;
			display: block;
		}
	}
		.privacy-block {
			width: 65vw;
			display: block;
		}
		@media( max-width: 750px ) {
			.privacy-block {
				width: auto;
			}
		}
			.privacy-content {
				width: auto;
				height: auto;
			}
	
</style>
