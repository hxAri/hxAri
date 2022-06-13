$T.create = {
	index: `
		<div class="template">
			<div class="header">
				<div class="header-banner flex pd-14">
					<div class="avatar">
						<div class="avatar-wrapper flex flex-center rd-circle">
							<router-link to="/">
								<div class="avatar-background"></div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
			<div class="breakr"></div>
			<Banner />
			<Parent v-if="match()" />
			<Burogu v-else />
			<Footer />
		</div>
	`,
	banner: `
		<div class="banner">
			<div class="album"></div>
			<div class="cover"></div>
		</div>
	`,
	footer: `
		<div class="footer flex flex-center">
			<div class="footer-wrapper">
				<div class="footer-content dp-flex">
					<div class="footer-group pd-14">
						<h5 class="mg-bottom-8">Pages</h5>
						<p class="fc-1m">Some important pages.</p>
						<li class="li dp-inline-block mg-right-10" v-for="i in pages">
							<router-link :to="{ path: i.path }" class="fs-14">{{ i.slot }}</router-link>
						</li>
					</div>
					<div class="footer-group pd-14">
						<h5 class="mg-bottom-8">Follow Me</h5>
						<p class="">Stay connected with me.</p>
						<li class="li dp-inline-block mg-right-10" v-for="i in socmed">
							<a :href="i.link" target="_blank" rel="noopener noreferrer">
								<i :class="i.icon"></i>
							</a>
						</li>
					</div>
				</div>
				<div class="footer-single">
					<p class="">&copy hxAri 2022</p>
				</div>
			</div>
		</div>
	`,
	parent: `
		<div class="parent">
			<div class="sidebr">
				<div class="wrapper">
					<div class="picture flex flex-center rd-circle">
						<div class="border flex flex-center rd-circle">
							<div class="spaces flex flex-center rd-circle">
								<div class="avatar">
									<div class="avatar-wrapper flex flex-center rd-circle">
										<div class="avatar-background"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="github">
						<p class="fullname fc-sh-00m ff-latto fs-24 fb-50 fc-1m mg-0">Ari | Backdev</p>
						<p class="username fc-sh-00m ff-latto fs-20 fb-35">hxAri</p>
					</div>
				</div>
				<div class="abouts">
					<button class="button resume fb-45 flex flex-center mg-bottom-20 pd-10 rd-square">
						View Resume
					</button>
					<div class="group">
						<div class="single flex mg-bottom-8">
							<i class="bx bxs-map mg-right-8"></i> Indonesian
						</div>
						<div class="single flex mg-bottom-8">
							<i class="bx bxs-phone mg-right-8"></i> +62 8583 9211 030
						</div>
						<div class="single flex mg-bottom-8">
							<i class="bx bx-mail-send mg-right-8"></i> ari160824@gmail.com 
						</div>
					</div>
				</div>
			</div>
			<div class="viewer">
				<Tabs />
				<router-view :style="{ marginTop: '-2px' }" />
			</div>
		</div>
	`
};