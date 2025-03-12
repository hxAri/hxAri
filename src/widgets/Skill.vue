
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts.
	import Image from "/src/scripts/Image.js";
	
	export default {
		data: () => ({
			programming: {
				expertise: [],
				percentage: 100
			}
		}),
		computed: {
			...mapState([
				"configs"
			])
		},
		methods: {
			resolver: function( logo ) {
				return Image.search( this.configs.image, "language", logo );
			}
		},
		created: function() {
			this.programming = this.configs.programming;
		}
	};
	
</script>

<template>
	<div class="skill">
		<div class="skill-wrapper flex flex-left flex-wrap">
			<div class="skill-single" :title="expertise.name" v-for="expertise in programming.expertises">
				<div class="skill-avatar avatar flex flex-center rd-square">
					<div class="skill-avatar-wrapper avatar-wrapper flex flex-center">
						<img class="avatar-image lazy" :alt="expertise.name" :data-src="resolver( expertise.logo )" v-lazyload />
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
	 * Skill Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	 .skill {
	}
		.skill-wrapper {
			gap: 14px;
		}
		@media screen and (max-width: 750px) {
			.skill-wrapper {
				gap: 10px;
			}
		}
			.skill-single {
				display: block;
			}
				.skill-avatar.avatar {
					width: 85.6px;
					height: 85.6px;
					background: var(--background-2);
				}
				@media screen and (max-width: 1080px) {
					.skill-avatar.avatar {
						width: 87.8px;
						height: 87.8px;
					}
				}
				@media screen and (max-width: 750px) {
					.skill-avatar.avatar {
						width: 40px;
						height: 40px;
						background: transparent
					}
				}
					.skill-avatar-wrapper.avatar-wrapper {
						width: inherit;
						height: inherit;
					}
	
</style>
