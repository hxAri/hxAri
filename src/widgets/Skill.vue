
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Json from "/src/scripts/Json.js";
	import Request from "/src/scripts/Request.js";
	import Type from "/src/scripts/Type.js";
	
	export default {
		data: () => ({
			percentage: 0,
			skills: null
		}),
		computed: mapState([
			"configs"
		]),
		mounted: function()
		{
			this.percentage = this.configs.skill.percentage;
			this.skills = this.configs.skill.skills;
		}
	};
	
</script>

<template>
	<div class="skill-lists" v-scroll-reveal="{ delay: 650 }">
		<div class="skill-single flex flex-left" v-for="skill in skills">
			<div class="skill-avatar avatar-wrapper mg-right-10 flex flex-center" v-scroll-reveal="{ delay: 650 }">
				<img class="avatar-image" :title="skill.name" :alt="skill.name" :data-src="skill.image" v-lazyload />
				<div class="avatar-cover"></div>
			</div>
			<progress class="skill-progress progress mg-right-10" :max="percentage" :value="skill.values"></progress>
			{{ skill.values }}% {{ skill.name }}
		</div>
	</div>
</template>

<style scoped>
	
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