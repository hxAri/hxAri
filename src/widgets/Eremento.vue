
<script>
	
	// Import Scripts
	import Eremento from "/src/scripts/Eremento.js";
	
	// Import Widgets
	import Error from "/src/widgets/Error.vue";
	
	export default {
		data: () => ({
			error: false,
			render: false,
			result: null
		}),
		props: {
			data: {
				type: Function,
				required: false
			},
			methods: {
				type: Object,
				required: false
			},
			template: {
				type: Object,
				required: true
			},
			component: {
				type: Object,
				required: false
			}
		},
		computed: {
			
			/**
			 * Return dynamic component object.
			 *
			 * @return Object
			 *  Object of component
			 */
			binding: function()
			{}
		},
		created: async function()
		{
			// Enable arrange loading.
			this.render = true;
			this.error = false;
			
			// Trying to arrange HTML Object.
			await this.arrange()
				
				// If something wrong when arrange object.
				.catch( e =>
				{
					this.error = e;
				});
			
			// Disable arrange loading.
			this.render = false;
		},
		methods: {
			arrange: async function()
			{
				
			}
		},
		components: {
			Error
		}
	};
	
</script>

<template>
	<div class="eremento">
		<div class="" v-if="loading">
			Await
		</div>
		<div class="" v-else-if="error">
			400
		</div>
		<div class="" v-else>
			Ok
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Eremento Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	/* .eremento { */
	/* } */
	
</style>