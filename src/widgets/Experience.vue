
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Datime from "/src/scripts/Datime.js";
	
	export default {
		data: () => ({
			experiences: []
		}),
		computed: mapState([
			"configs"
		]),
		created: function()
		{
			this.experiences = this.configs.experiences;
		},
		methods: {
			
			/*
			 * @inherit Datime
			 *
			 */
			datetime: datetime => new Datime( datetime ),
		}
	};
	
</script>

<template>
	<div class="template">
		<div class="experiences">
			<div class="experience mg-bottom-14 mg-lc-bottom pd-bottom-14 pd-lc-bottom" v-for="experience in experiences">
				<p class="title fb-45 mg-0">{{ experience.title }}</p>
				<p class="sub-title fb-45 mg-0">{{ experience.company }}</p>
				<p class="sub-title fb-4 mg-bottom-12">
					Started from <span class="fb-45">{{ datetime( experience.timestamp.begin ).format( "%d-%m-%Y" ) }}</span> to <span class="fb-45">{{ datetime( experience.timestamp.end ).format( "%d-%m-%Y" ) }}</span>
				</p>
				<p class="text mg-bottom-12 mg-lc-bottom" v-for="description in experience.description">{{ description }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Experience Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.experiences {
	}
		.experience {
			border-bottom: 1px solid var(--border-3);
		}
		.experience:last-child {
			border-bottom: 0;
		}
	
</style>
