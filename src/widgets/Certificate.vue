
<script>
	
	import { mapState } from "vuex";
	import MarkdownIt from "markdown-it";
	
	// Import Scripts
	import UnixTime from "/src/scripts/UnixTime.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Shorttext from "/src/scripts/Shorttext.js";
	import Type from "/src/scripts/Type.js";
	
	export default {
		data: () => ({
			preview: null,
			certificates: [],
			markdown: null
		}),
		computed: mapState([
			"configs"
		]),
		created: function()
		{
			this.certificates = this.configs.certificate.certificates;
			this.markdown = new MarkdownIt({
				html: false
			});
		},
		methods: {
			
			/**
			 * Return new UnixTime instance.
			 *
			 * @params Number|String datetime
			 *
			 * @return UnixTime
			 */
			 datetime: datetime => new UnixTime( datetime ),
			
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
					var kind = Object.keys( match.groups ).find( group => Type( match.groups[group], String ) );
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
			 * @inherit Shorttext
			 *
			 */
			shorttext: ( strings, length ) => Shorttext( strings, length ),
			
			/**
			 * Return formated url for certificate origin source.
			 *
			 * @params String target
			 *
			 * @return String
			 */
			source: function( target ) {
				return Fmt( "{}/{}", this.configs.certificate.source.origin, target );
			},
			
			/**
			 * Return formated url for certificate thumbnail.
			 *
			 * @params String target
			 *
			 * @return String
			 */
			thumbnail: function( target ) {
				return Fmt( "{}/{}", this.configs.certificate.source.thumbnail, target );
			}
		}
	};
	
</script>

<template>
	<div class="template">
		<div :class="[ 'modal', 'modal', 'flex', 'flex-center', preview ? 'active' : '' ]">
			<div class="modal-exit" @click="preview = null"></div>
			<div :class="[ 'modal-main', 'rd-square', preview ? 'active' : '' ]">
				<div class="certificate-modal scroll-x" v-if="preview">
					<div class="certificate-modal-groups flex">
						<div class="certificate-modal-group overview scroll-y">
							<div class="certificate-modal-single pd-14">
								<div class="certificate-modal-avatar-fixed flex flex-center mg-bottom-14">
									<div class="certificate-modal-avatar-wrapper avatar-wrapper rd-square">
										<img class="avatar-image lazy" :data-src="thumbnail( preview.thumbnail )" :alt="preview.title" title="Certificate Preview Image" v-lazyload />
										<div class="avatar-cover"></div>
									</div>
								</div>
								<h5 class="title center mg-bottom-14" data-title="certificate.title">{{ preview.title }}</h5>
								<p class="text mg-bottom-14">
									<p class="mg-bottom-14 mg-lc-bottom" v-for="description in preview.description">
										<p class="" v-html="markdown.render( description )"></p>
									</p>
								</p>
								<div class="text mg-bottom datetime">
									<p class="sub-title pd-14 rd-square bg-2 mg-bottom-14">
										<i class="bx bx-time-five mg-right-12"></i>
										Obtained {{ datetime( preview.timestamp ).format( "%A, %b %d %Y" ) }}
									</p>
								</div>
								<div class="text mg-bottom cert">
									<a class="sub-title bg-3 dp-block title center mg-bottom-14 pd-14 rd-square fb-4" :href="thumbnail( preview.thumbnail )" target="_blank" rel="noopener noreferrer">Preview</a>
									<a class="sub-title bg-4 dp-block title center pd-14 rd-square fb-4" :href="source( preview.source )" target="_blank" rel="noopener noreferrer">Original</a>
								</div>
							</div>
						</div>
						<hr class="certificate-modal-hr hr dp-none" />
						<div class="certificate-modal-group additional scroll-y">
							<div class="certificate-modal-single pd-14">
								No additional information about this
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="certificates">
			<div class="certificate rd-square" v-for="certificate in certificates" v-scroll-reveal="{ delay: 600 }">
				<div class="certificate-body" v-scroll-reveal="{ delay: 600 }">
					<div class="certificate-avatar avatar-wrapper" @click="preview = certificate">
						<img class="avatar-image lazy" :data-src="thumbnail( certificate.thumbnail )" :alt="certificate.title" title="Certificate Preview Image" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
					<div class="certificate-label fb-45 flex flex-left pd-14">
						{{ shorttext( certificate.title, 34 ) }}
					</div>
				</div>
				<div class="certificate-footer pd-14">
					<p class="text mg-bottom-14 mg-lc-bottom" v-html="paragraph( certificate.description.join( '.\x20' ), 64 )"></p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

	@media( max-width: 750px ) {
		.modal-main {
			border-radius: 4px 4px 0 0;
		}
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Certifiate Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.certificate-modal {
		width: auto;
		height: inherit;
	}
		.certificate-modal-groups {
			width: 100%;
			height: inherit;
			position: relative;
		}
		@media( max-width: 750px ) {
			.certificate-modal-groups {
				display: block;
			}
		}
			.certificate-modal-group.overview {
				width: 40%;
				height: inherit;
				border-right: 1px solid var(--border-3);
			}
			@media( max-width: 750px ) {
				.certificate-modal-group.overview {
					border: 0;
				}
			}
			.certificate-modal-group.additional {
				width: 60%;
				height: 100%;
			}
			@media( max-width: 750px ) {
				.certificate-modal-group.overview,
				.certificate-modal-group.additional {
					width: auto;
					height: auto;
					overflow-y: unset;
				}
				.certificate-modal-hr {
					display: block;
					border-radius: 0px;
					border-top: 2px solid var(--border-2);
				}
			}
		/* .certificate-modal-single { */
		/* } */
			.certificate-modal-avatar-fixed {
				width: 100%;
				height: 240px;
				position: relative;
				/* background: red; */
			}
			@media( max-width: 750px ) {
				.certificate-modal-avatar-fixed {
					height: 208px;
				}
			}
				.certificate-modal-avatar-wrapper {
					width: 100%;
					height: 100%;
					overflow: hidden;
					/* background: teal; */
				}
				@media( max-width: 750px ) {
					.certificate-modal-avatar-wrapper {
						width: 300px;
						height: 100%;
					}
				}
				@media( max-width: 360px ) {
					.certificate-modal-avatar-wrapper {
						width: 100%;
						height: 100%;
					}
				}
			.certificate-modal-single > .cert > a,
			.certificate-modal-single > .datetime > p {
				border: 1px solid var(--border-3);
			}
			.certificate-modal-single > .title.center {
				text-align: center;
			}
			.certificate-modal-single > .datetime > p {
				border: 1px solid var(--border-3);
			}
			.certificate-modal-single > .title.center {
				text-align: center;
			}
	.certificates {
		display: grid;
		height: auto;
		gap: 14px;
		grid-template-columns: repeat( 2, 1fr );
	}
		.certificate {
			width: 100%;
			height: auto;
			overflow: hidden;
			transition: border .3s;
			border: 1px solid var(--border-3);
		}
		.certificate:hover {
			border-color: var(--border-3);
		}
			.certificate-body {
				width: auto;
				height: 260px;
				position: relative;
				background: var(--background-2);
			}
				.certificate-avatar {
					width: auto;
					height: 100%;
				}
				.certificate-label {
					width: 100%;
					height: auto;
					bottom: 0;
					background: rgba(166,166,237,.2);
					color: var(--shell-c-0-30m);
					position: absolute;
				}
			.certificate-footer {
				height: 100%;
				background: var(--background-1);
			}
		@media( max-width: 750px ) {
			.certificates {
				grid-template-columns: repeat( 1, 1fr );
			}
			.certificate-body {
				height: 255px;
			}
		}
	
</style>
