
<script>
	
	import { mapState } from "vuex";
	
	import Image from "/src/scripts/image";
	
	// Import Widgets.
	import Error from "/src/widgets/Error.vue";
	
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · Paint Art";
				}
			}
		},
		computed: {
			...mapState([
				"configs",
				"error",
				"loading"
			])
		},
		components: {
			Error
		},
		methods: {
			
			/**
			 * Paint Art Image Resolver
			 * 
			 * @param {String} anime
			 *  Anime image keyset
			 * 
			 * @returns {String}
			 *  Image url
			 */
			resolver: function( anime ) {
				return Image.search( this.configs.image, "anime", anime );
			}
			
		}
	};
	
</script>

<template>
	<div class="loading flex flex-center pd-24" v-if="loading">
		<div class="animate">
			<div class="spinner"></div>
		</div>
	</div>
	<Error v-else-if="error">
		<h3 class="title">Something Wrong</h3>
		<p class="sub-title">{{ error }}</p>
	</Error>
	<div class="paintart flex flex-center" v-else>
		<div class="paintart-wrapper">
			<div class="paintart-groups pd-14">
				<div class="paintart-single pd-14">
					<h2 class="title">
						<i class="bx bxs-flag mg-right-14"></i>Paint Art
					</h2>
					<hr class="hr mg-top-14 mg-bottom-14" />
					<div class="text mg-bottom-14">
						<p class="text mg-0" v-for="description in configs.paintart.description">{{ description }}</p>
					</div>
					<div class="paintart-masonry">
						<div class="paintart-masonry-item mg-bottom-14 mg-lc-bottom rd-square" v-for="image, kimage in configs.image.items.anime">
							<div class="paintart-avatar avatar-wrapper flex flex-center">
								<img class="paintart-avatar-image avatar-image lazy" :title="image.name" :alt="image.name" :data-src="resolver( kimage )" v-lazyload />
								<div class="paintart-avatar-cover avatar-cover"></div>
							</div>
							<div class="paintart-masonry-overlay fb-45 fs-14 pd-14 text-center">
								{{ image.title }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Loading Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.loading {
		width: 100vw;
		height: 100vh;
	}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Paintart Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.paintart {
		width: 100vw;
		height: auto;
	}
	@media( max-width: 750px ) {
		.paintart {
			display: block;
		}
	}
		.paintart-wrapper {
			height: fit-content;
			width: 50%;
		}
		@media( max-width: 1080px ) {
			.paintart-wrapper {
				width: 80%;
			}
		}
		@media (max-width: 750px) {
			.paintart-wrapper {
				width: 100%;
				height: auto;
			}
		}
			.paintart-groups {
				background: var(--background-2);
			}
			@media( max-width: 750px ) {
				.paintart-single {
					border-radius: 4px;
					border: 1px solid var(--border-3);
				}
			}
				.paintart-masonry {
					column-count: 4;
					column-gap: 18px;
				}
				@media( max-width: 750px ) {
					.paintart-masonry {
						column-count: 1;
					}
				}
					.paintart-masonry-item {
						display: inline-block;
						width: 100%;
						position: relative;
						overflow: hidden;
						break-inside: avoid;
						transition: transform 0.3s ease;
					}
					.paintart-masonry-item:hover {
						transform: scale(1.02);
						cursor: zoom-in;
					}
					.paintart-masonry-item:hover .paintart-masonry-overlay {
						opacity: 1;
					}
						.paintart-avatar {
							background: var(--background-3);
							height: auto;
							width: 100%;
						}
						.paintart-masonry-overlay {
							background: rgba( 0, 0, 0, 0.5 );
							bottom: 0;
							color: #f8f8ff;
							opacity: 0;
							position: absolute;
							transition: opacity 0.3s;
							width: 100%;
						}
	
	.hr {
		width: 100%;
	}
	
</style>
