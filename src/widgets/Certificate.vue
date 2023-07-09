
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Datime from "/src/scripts/Datime.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Shorttext from "/src/scripts/Shorttext.js";
	import Type from "/src/scripts/Type.js";
	
	export default {
		data: () => ({
			preview: null,
			certificates: []
		}),
		computed: mapState([
			"configs"
		]),
		created: function()
		{
			this.certificates = this.configs.certificate.certificates;
		},
		methods: {
			
			/*
			 * @inherit Datime
			 *
			 */
			datetime: datetime => new Datime( datetime ),
			
			/*
			 * HTML Paragraph replacer.
			 *
			 * @params String paragraph
			 * @params Boolean<False>|Number
			 *
			 * @return String
			 */
			paragraph: function( paragraph, shortable = false )
			{
				var string = "";
				var index = 0;
				var match;
				
				if( shortable )
				{
					var regexp = /(\*{1,2}|\_{1,2}|\~)(?<value>[^\1]*)(\1)/gm;
					
					while( ( match = regexp.exec( paragraph ) ) !== null )
					{
						string += paragraph.substring( index, regexp.lastIndex - match[0].length );
						string += match.groups.value;
						index = regexp.lastIndex;
					}
					return( this.shorttext( string + paragraph.substring( index ), shortable ) );
				}
				else {
					var regexp = /((?<bold>\*{1,2})|(?<underline>\b\_{1,2})|(?<italic>\~{1,2}))(?<value>[^\1]*)(\1)/gm;
					
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
				}
			},
			
			/*
			 * @inherit Shorttext
			 *
			 */
			shorttext: ( strings, length ) => Shorttext( strings, length ),
			
			/*
			 * Return formated url for certificate origin source.
			 *
			 * @params String target
			 *
			 * @return String
			 */
			source: function( target )
			{
				return( Fmt( "{}/{}", this.configs.certificate.source.origin, target ) );
			},
			
			/*
			 * Return formated url for certificate tumbnail.
			 *
			 * @params String target
			 *
			 * @return String
			 */
			tumbnail: function( target )
			{
				return( Fmt( "{}/{}", this.configs.certificate.source.tumbnail, target ) );
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
					<div class="certificate-modal-single pd-14">
						<div class="certificate-modal-avatar-fixed flex flex-center">
							<div class="certificate-modal-avatar-wrapper avatar-wrapper">
								<img class="avatar-image lazy" :data-src="tumbnail( preview.tumbnail )" :alt="preview.title" title="Certificate Preview Image" v-lazyload />
								<div class="avatar-cover"></div>
							</div>
						</div>
						<h5 class="title center mg-bottom-24" data-title="certificate.title">{{ preview.title }}</h5>
					</div>
				</div>
			</div>
		</div>
		<div class="certificates">
			<div class="certificate rd-square" v-for="certificate in certificates" v-scroll-reveal="{ delay: 600 }">
				<div class="certificate-body" v-scroll-reveal="{ delay: 600 }">
					<div class="certificate-avatar avatar-wrapper" @click="preview = certificate">
						<img class="avatar-image lazy" :data-src="tumbnail( certificate.tumbnail )" :alt="certificate.title" title="Certificate Preview Image" v-lazyload />
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
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Certifiate Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.certificate-modal {
		width: auto;
		height: 100%;
	}
		.certificate-modal-single {
		}
			.certificate-modal-avatar-fixed {
				width: 100%;
				height: 300px;
				position: relative;
				/** background: red; */
			}
			@media( max-width: 750px ) {
				.certificate-modal-avatar-fixed {
				}
			}
			@media( max-width: 360px ) {
				.certificate-modal-avatar-fixed {
				}
			}
				.certificate-modal-avatar-wrapper {
				}
				@media( max-width: 750px ) {
					.certificate-modal-avatar-wrapper {
					}
				}
				@media( max-width: 360px ) {
					.certificate-modal-avatar-wrapper {
					}
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
				height: 257px;
			}
		}
	
</style>
