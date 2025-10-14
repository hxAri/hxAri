
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Image from "/src/scripts/Image.js";
	
	export default {
		data: () => ({
			technology: {
				skill: {
					percentage: 100
				},
				uses: []
			}
		}),
		computed: {
			...mapState([
				"configs"
			])
		},
		methods: {
			resolver: function( logo, type ) {
				return Image.search( this.configs.image, type, logo );
			}
		},
		created: function() {
			this.technology = this.configs.technology;
			this.technology.uses = this.technology.uses.filter( technology => typeof technology.include != undefined ? technology.include : false );
		}
	};
	
</script>

<template>
	<div class="technology">
		<div class="technology-wrapper flex flex-left flex-wrap">
			<div class="technology-single" :title="used.name" v-for="used in this.technology.uses">
				<div class="technology-avatar avatar flex flex-center rd-square">
					<div class="technology-avatar-wrapper avatar-wrapper flex flex-center">
						<img class="avatar-image lazy" :alt="used.name" :data-src="resolver( used.logo, used.type )" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Technology Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.technology {
	}
		.technology-wrapper {
			gap: 14px;
		}
		@media screen and (max-width: 750px) {
			.technology-wrapper {
				gap: 10px;
			}
		}
			.technology-single {
				display: block;
			}
				.technology-avatar.avatar {
					width: 85.6px;
					height: 85.6px;
					background: var(--background-2);
				}
				@media screen and (max-width: 1080px) {
					.technology-avatar.avatar {
						width: 87.8px;
						height: 87.8px;
					}
				}
				@media screen and (max-width: 750px) {
					.technology-avatar.avatar {
						width: 40px;
						height: 40px;
						background: transparent
					}
				}
					.technology-avatar-wrapper.avatar-wrapper {
						width: inherit;
						height: inherit;
					}
	
</style>
