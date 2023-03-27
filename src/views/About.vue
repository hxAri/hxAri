
<script>
	export default {
		data: () => ({
			texts: [
				"Welcome to my portfolio website, a digital showcase of my expertise as a full-stack developer. This site serves as a hub for my latest projects and demonstrates my technical skills, creativity, and commitment to delivering exceptional web solutions.",
				"Through my work on a variety of web development projects, including Kanashi, Sheyu, etc. I have honed my ability to design and develop responsive, user-friendly, and visually stunning websites. My portfolio website features a range of examples that highlight my proficiency with various programming languages, frameworks, and tools.",
				"As you explore my portfolio, you'll see that I take a client-focused approach to web development, working closely with my clients to understand their unique needs and goals. From conceptualization to implementation, I strive to deliver customized, high-quality web solutions that exceed expectations.",
				"I hope you find my portfolio website informative and engaging. If you have any questions or are interested in discussing a potential project, please don't hesitate to contact me. Thank you for visiting!"
			]
		}),
		props: {
		},
		components: {
		}
	};
</script>

<template>
	<div class="container">
		<div class="deep-container">
			<div class="about pd-top-34 pd-bottom-34">
				<h2 class="title mg-bottom-14">About</h2>
				<p class="text mg-bottom-14 mg-lc-bottom" v-for="text in texts">{{ text }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * About Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.about {}
	
</style>
