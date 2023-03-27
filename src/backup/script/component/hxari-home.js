const $Home = {
	data: () => ({
		banner: {
			src: $Image.home.Banner,
			title: "Home Banner",
			alt: "Welcome to the board!"
		}
	}),
	mounted: function()
	{
		// ....
	},
	methods: {},
	components: {
		Avatar: $Avatar
	},
	template: `
		<div class="home">
			<div class="home-banner flex flex-left">
				<div class="home-banner-image flex flex-center">
					<Avatar :options="banner" />
				</div>
				<div class="home-banner-content flex flex-center">
					<div class="home-banner-block">
						<div class="group">
							<h6 class="title">Welcome to,</h6>
							<h1 class="title fb-55">hxAri</h1>
						</div>
						<div class="group">
							<p class="text">
								This site is a documentation site for every open source project I have uploaded or published on Github, as well as a Portfolio for myself.
								Thank you for taking your time to visit this page.
							</p>
							<p class="text mg-top-20">
								Have a nice your live!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	`
};