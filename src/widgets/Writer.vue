
<script>
	
	// Import Scripts
	import Type from "/src/scripts/Type.js";
	
	export default {
		data: () => ({
			index: 0,
			write: "",
			array: false
		}),
		props: {
			speed: {
				type: Number,
				require: true
			},
			text: {
				type: String,
				require: true
			}
		},
		mounted: function()
		{
			this.typing();
		},
		methods: {

			/*
			 * Typing text.
			 *
			 * @return Void
			 */
			typing: function()
			{
				// Check if current index less than text length.
				if( this.index <= this.text.length )
				{
					// Substring text.
					this.write = this.text.substring( 0, this.index++ );
					
					// Set time out of typing.
					setTimeout( () => this.typing(), this.typingSpeed );
				}
			}
		}
	};
</script>

<template>
	<div class="writer">
		<div class="writer-text">{{ write }}</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Writer Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.writer {
		height: auto;
	}
	.writer-text {
		overflow: hidden;
		white-space: wrap;
	}
	
</style>