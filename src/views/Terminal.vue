
<script>
	
	// Import Scripts
	import Fmt from "../scripts/Fmt.js";
	import Cookie from "../scripts/Cookie.js";
	import MultiRequest from "../scripts/MultiRequest.js";
	import Request from "../scripts/Request.js";
	import Terminal from "../scripts/Terminal.js";
	import Theme from "../scripts/Theme.js";
	import Type from "../scripts/Type";
	
	export default {
		data: () => ({
			terminal: null
		}),
		props: {
			cookie: {
				type: Cookie,
				require: true
			},
			theme: {
				type: Theme,
				require: true
			}
		},
		mounted: function()
		{
			// ...
		}
	};
	
</script>

<template>
	<div class="terminal">
		Buahahah Poak
	</div>
</template>

<style scoped>
</style>
