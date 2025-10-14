
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import UnixTime from "/src/scripts/UnixTime.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Image from "/src/scripts/Image.js";
	
	export default {
		data: () => ({
			active: null,
			image: Image,
			experiences: []
		}),
		computed: mapState([
			"configs"
		]),
		created: function() {
			this.experiences = this.configs.experiences;
		},
		methods: {
			
			/**
			 * @inheritdoc UnixTime
			 *
			 */
			datetime: datetime => new UnixTime( datetime ),
			
			/**
			 * Display more information of experience.
			 *
			 * @params Object experience
			 *
			 * @return Void
			 */
			 display: function( experience ) {
				this.active = experience;
			}
		}
	};
	
</script>

<template>
	<div class="template">
		<div :class="[ 'modal', 'modal', 'flex', 'flex-center', active ? 'active' : '' ]">
			<div class="modal-exit" @click="active = null"></div>
			<div :class="[ 'modal-main', 'rd-square', active ? 'active' : '' ]">
				<div class="experience-modal scroll-x" v-if="active">
					<div class="experience-modal-groups flex">
						<div class="experience-modal-group overview scroll-y">
							<div class="experience-modal-single pd-14">
								<div class="experience-modal-avatar-container flex flex-center">
									<div class="avatar flex flex-center rd-square">
										<div class="avatar-wrapper flex flex-center rd-square">
											<img class="avatar-image" :alt="active.company" :title="active.company" :data-src="image.search( configs.image, 'company', active.logo )" v-lazyload />
											<div class="avatar-cover"></div>
										</div>
									</div>
								</div>
								<h4 class="title text-center mg-bottom-14 mg-lc-bottom">{{ active.company }}</h4>
								<div class="experience-modal-info mg-bottom-14" v-if="active.details.length">
									<p class="experience-modal-info-title flex flex-left fs-16">
										<i class="bx bx-info-circle"></i>
										<span class="fb-45">Info</span>
									</p>
									<p class="text mg-bottom-12 mg-lc-bottom pd-left-24" v-for="detail in active.details"> {{ detail }} </p>
								</div>
								<div class="experience-modal-info mg-bottom-14 mg-lc-bottom" v-if="active.address">
									<p class="experience-modal-info-title flex flex-left fx-16">
										<i class="bx bx-map"></i>
										<span class="fb-45">Address</span>
									</p>
									<p class="text mg-bottom-12 mg-lc-bottom fb-45 pd-left-24">
										<a :href="active.gmaplink" target="_blank" rel="noopener noreferrer" v-if="active.gmaplink">{{ active.address }}</a>
										<span class="text" v-else>{{ active.address }}</span>
									</p>
								</div>
								<div class="experience-modal-overview mg-bottom-14" v-if="active.galery.length">
									<h5 class="title fb-45">Galery</h5>
								</div>
							</div>
						</div>
						<div class="experience-modal-group contents scroll-y">
							<div class="experience-modal-single pd-14">
								<div class="experience-modal-content pd-14 rd-square mg-bottom-14 mg-lc-bottom" v-if="active.certificates.length">
									<h5 class="title fb-45">Certificates</h5>
								</div>
								<div class="experience-modal-content pd-14 rd-square mg-bottom-14 mg-lc-bottom" v-if="active.projects.length">
									<h5 class="experience-modal-content-title title fb-45">Projects</h5>
									<div class="experience-modal-content-projects">
										<div class="mg-bottom-14 mg-lc-bottom" v-for="project in active.projects">
											<p class="title fb-45 fs-14">{{ project.name }}</p>
											<p class="sub-title fs-12 fb-4 mg-bottom-12">
												<span class="fb-45">{{ datetime( project.timestamp.begin ).format( "%d %b %Y" ) }}</span> · <span class="fb-45">{{ project.timestamp.end > project.timestamp.begin && project.timestamp.end < datetime().timestamp() ? datetime( project.timestamp.end ).format( "%d %b %Y" ) : "present" }}</span>
											</p>
											<p class="text mg-bottom-12 mg-lc-bottom" v-if="project.description.length" v-for="description in project.description">{{ description }}</p>
											<div class="experience-modal-content-project-skills" v-if="project.skills.length">
												<p class="sub-title fb-45 fs-14">Skills</p>
												<p class="text fb-35">{{ project.skills.join( " · " ) }}</p>
											</div>
											<hr class="hr mg-top-14" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="experiences">
			<div class="experience mg-bottom-14 mg-lc-bottom" @click="display( experience )" v-for="experience in experiences" v-scroll-reveal="{ delay: 600 }">
				<div class="experience-body flex pd-14" v-scroll-reveal="{ delay: 600 }">
					<div class="experience-logo flex flex-center">
						<div class="experience-avatar avatar rd-circle flex">
							<div class="experience-avatar-wrapper avatar-wrapper rd-cirlcle flex flex-center">
								<img class="avatar-image" :alt="experience.company" :title="experience.company" :data-src="image.search( configs.image, 'company', experience.logo )" v-lazyload />
								<div class="avatar-cover"></div>
							</div>
						</div>
					</div>
					<div class="experience-details">
						<p class="title fb-45 fs-14 mg-0">{{ experience.title }}</p>
						<p class="title fb-45 fs-14 mg-0">
							<span>{{ experience.company }}</span> · <span>{{ experience.status }}</span>
						</p>
						<p class="sub-title fs-12 fb-4 mg-bottom-12">
							<span class="fb-45">{{ datetime( experience.timestamp.begin ).format( "%d %b %Y" ) }}</span> · <span class="fb-45">{{ experience.timestamp.end > experience.timestamp.begin && experience.timestamp.end < datetime().timestamp() ? datetime( experience.timestamp.end ).format( "%d %b %Y" ) : "present" }}</span>
						</p>
						<p class="text mg-bottom-12 mg-lc-bottom" v-if="experience.description.length" v-for="descriptions in experience.description">
							<p class="text text-white-space-pre text-wrap mg-0" v-for="description in descriptions">{{ description }}</p>
						</p>
						<p class="text mg-0" style="color: var(--link-1)">show more...</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Experience Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.experiences {
	}
		.experience {
			width: 100%;
			height: auto;
			/* background: violet; */
		}
			.experience-body {
				gap: 14px;
				width: 100%;
				/* background: red; */
			}
				.experience-logo {
					height: auto;
					/* width: 7.4%; */
					width: 10%;
					/* background: lime; */
				}
				/* @media screen and (max-width: 1080px) {
					.experience-logo {
						width: 10%;
					}
				} */
				@media screen and (max-width: 750px) {
					.experience-logo {
						width: 18%;
					}
				}
					.experience-avatar {
						border: 1px solid var(--border-4);
						height: 60px;
						width: 60px;
						/* background: teal; */
					}
						.experience-avatar-wrapper {
							height: inherit;
							width: inherit;
						}
							.experience-avatar-wrapper .avatar-image {
								height: 100%;
								width: 100%;
							}
				.experience-details {
					height: auto;
					max-height: fit-content;
					min-height: 60px;
					width: 92.6%;
					/* background: purple; */
				}
				@media screen and (max-width: 1080px) {
					.experience-details {
						width: 89.6%;
					}
				}
				@media screen and (max-width: 750px) {
					.experience-details {
						width: 82%;
					}
				}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Modal Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	@media screen and ( max-width: 750px ) {
		.modal-main {
			border-radius: 4px 4px 0 0;
		}
	}
	.experience-modal {
		width: auto;
		height: inherit;
	}
		.experience-modal-groups {
			width: 100%;
			height: inherit;
			position: relative;
		}
		@media( max-width: 750px ) {
			.experience-modal-groups {
				display: block;
			}
		}
			.experience-modal-group.overview {
				width: 40%;
				height: inherit;
			}
			.experience-modal-group.contents {
				width: 60%;
				height: inherit;
			}
			@media( max-width: 750px ) {
				.experience-modal-group.overview,
				.experience-modal-group.contents {
					width: auto;
					height: auto;
					overflow-y: unset;
				}
			}
				.experience-modal-single {
				}
					.experience-modal-avatar-container {
						height: 460px;
						width: 100%;
					}
					@media( max-width: 1080px ) {
						.experience-modal-avatar-container {
							height: 320px;
						}
					}
						.experience-modal-avatar-container .avatar {
							border: 1px solid var(--border-1);
							height: 360px;
							width: 360px;
						}
						.experience-modal-avatar-container .avatar-wrapper {
							height: 100%;
							width: 100%;
						}
						@media(max-width: 1080px) {
							.experience-modal-avatar-container .avatar,
							.experience-modal-avatar-container .avatar-wrapper {
								border-radius: 100%;
								height: 274px;
								width: 274px;
							}
						}
					.experience-modal-info {
					}
						.experience-modal-info-title {
							gap: 8px;
						}
					.experience-modal-content {
					}
					@media( max-width: 750px ) {
						.experience-modal-content {
							padding: 0;
						}
					}
	
</style>
