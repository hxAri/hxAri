
<script>
	
	import { Typed } from '../scripts/types';
	
	export default {
		computed: {
			image: function() {
				return this.$store.state.vectors.base64.error;
			}
		},
		created: function() {
		}
	};
	
</script>

<template>
	<div class="error flex flex-center">
		<div class="error-wrapper">
			<div class="error-groups pd-14">
				<div class="error-banner pd-14">
					<div class="avatar-wrapper flex flex-center">
						<img class="avatar-image lazy" :data-src="image" v-lazyload />
						<div class="avatar-cover"></div>
					</div>
				</div>
				<div class="error-single pd-14">
					<slot name="default">
						OOPS! Something Wrong <i class="bx bx-sad"></i>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Error Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.error {
		width: 100%;
		height: auto; /** 100% */
		background: var(--background-2);
	}
	@media( max-width: 750px ) {
		.error {
			height: 630px;
		}
	}
		.error-wrapper {
			width: 70%;
			height: fit-content;
		}
		@media (max-width: 750px) {
			.error-wrapper {
				width: 100%;
			}
		}
			.error-groups {
				background: var(--background-2);
			}
				.error-banner {
					width: auto;
					height: 100%;
				}
				@media (max-width: 750px) {
					.error-banner {
						height: 340px;
					}
				}
					.avatar-wrapper {
						width: 100%;
						height: 100%;
					}
				.error-single {
					text-align: center;
				}
	
</style>
