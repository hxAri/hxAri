
<script>
	export default {
		data: () => ({
			texts: [
				"Your privacy is important to me, and I am committed to protecting it. This privacy policy outlines how I collect, use, and protect any personal information that you provide when you visit my portfolio website.",
				"What information do I collect?",
				"I do not collect any personal information from you when you visit my website, unless you choose to provide it to me voluntarily. If you contact me through the contact form on my website or via email, I will collect your name, email address, and any other information you choose to provide.",
				"How do I use your information?",
				"I will only use your personal information to respond to your inquiries, provide you with information about my services, or fulfill any requests that you make. I will not share, sell, or otherwise distribute your information to any third party, unless required to do so by law.",
				"How do I protect your information?",
				"I take reasonable and appropriate measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no data transmission over the internet is completely secure, and I cannot guarantee the absolute security of your information.",
				"Third-party links",
				"My portfolio website may contain links to third-party websites that are not under my control. These links are provided for your convenience and do not imply endorsement or approval of the content, policies, or practices of these websites. Please review the privacy policies of these websites before submitting any personal information.",
				"Changes to this privacy policy",
				"I reserve the right to modify this privacy policy at any time without prior notice. Any changes to the policy will be reflected on this page, and your continued use of my website after such modifications constitutes your acceptance of the new policy.",
				"If you have any questions or concerns about this privacy policy or the way your personal information is handled, please feel free to contact me."
			]
		}),
		props: {
		},
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Privacy";
				}
			}
		},
		components: {
		}
	};
</script>

<template>
	<div class="container">
		<div class="deep-container">
			<div class="privacy pd-top-34 pd-bottom-34">
				<h2 class="title mg-bottom-14">Privacy</h2>
				<p class="text mg-bottom-14 mg-lc-bottom" v-for="text in texts">{{ text }}</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Privacy Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.privacy {}
	
</style>