
<script>
	
	// Import HightlighterJs.
	import hljs from "highlight.js";
	
	export default {
		data: () => ({
		}),
		computed: {
			development: () => process.env.NODE_ENV === "development"
		},
		methods: {
			focus: function( e ) {
				e.target.focus();
				console.log( e );
			},
			highlight: function( e, c ) {
				var highlighted = hljs.highlight( c, { language: "json" } ).value;
				var splited = highlighted.split( "\x0a" );
				var rendered = [];
				for( let split of splited ) {
					rendered.push( `<p>${split}</p>` );
				}
				e.innerHTML = rendered.join( "\x0a" );
			},
			input: function( e ) {
				this.highlight( this.$refs.code, e.target.innerText );
			}
		}
	};
	
</script>

<template>
	<div class="testing-development" v-if="development">
		<pre><code ref="code"></code></pre>
		<div class="testing-editable" contenteditable="true" @input="input" @keydown="focus">
		</div>
	</div>
	<div class="testing-production" v-else>
		<p class="text">Nothing Happen Here</p>
	</div>
</template>

<style scoped>
	
	.testing-development {
	}
		.testing-editable {
			word-wrap: nowrap;
		}
	
</style>