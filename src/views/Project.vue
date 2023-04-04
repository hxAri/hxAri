
<srcipt>
	export default {
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Projects";
				}
			}
		}
	};
</srcipt>

<template>
	<div class="project">
		Projects
	</div>
</template>