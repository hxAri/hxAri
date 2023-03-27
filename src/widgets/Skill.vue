
<script>
	
	// Import Scripts
	import Json from "../scripts/Json.js";
	import Request from "../scripts/Request.js";
	import Type from "../scripts/Type.js";
	
	export default {
		data: () => ({
			error: false,
			loading: true,
			progress: null
		}),
		props: {
			image: {
				type: Object
			}
		},
		mounted: async function()
		{
			// Copy object instance.
			var self = this;
			
			// Get expertise skills.
			await Request( "GET", "https://raw.githubusercontent.com/hxAri/hxAri/main/skills.json" )
			
			// Handle request responses.
			.then( r =>
			{
				// Check if response status code is ok.
				if( r.status === 200 )
				{
					self.progress = Json.decode( r.response );
				}
				else {
					self.error = Request.StatusText( r.status  );
				}
			})
			.catch( e => self.error = Type( e, XMLHttpRequest, () => "No Internet Connection", () => e ) );
			
			// Disable loading.
			self.loading = false;
		}
	};
	
</script>

<template>
	<div class="" v-if="loading">
		Please wait...
	</div>
	<div class="" v-else-if="error">
		{{ error }}
	</div>
	<div class="skill-lists" v-else v-scroll-reveal="{ delay: 650 }">
		<div class="skill-single flex flex-left" v-for="skill in progress.skills">
			<div class="skill-avatar avatar-wrapper mg-right-10 flex flex-center" v-scroll-reveal="{ delay: 650 }">
				<img class="avatar-image" :title="skill.name" :alt="skill.name" :data-src="image.language[skill.name.toLowerCase()]" v-lazyload />
				<div class="avatar-cover"></div>
			</div>
			<progress class="skill-progress progress mg-right-10" :max="progress.max" :value="skill.value"></progress>
			{{ skill.value }}% {{ skill.name }}
		</div>
	</div>
</template>

<style scoped>
	
	.skill-loading {
	}
	.skill-error {
	}
	.skill-single {
		width: 100%;
	}
		.skill-avatar {
			width: 26px;
			height: 26px;
		}
		.skill-progress {
			width: 60%;
		}
	@media (max-width: 750px) {
		.skill-progress {
			width: 46%;
		}
	}
	
</style>
