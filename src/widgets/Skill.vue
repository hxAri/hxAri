
<script>
	
	import { mapState } from "vuex";
	
	// Import Scripts
	import Eremento from "/src/scripts/Eremento.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Image from "/src/scripts/Image.js";
	import Type from "/src/scripts/Type.js";
	import Value from "/src/scripts/logics/Value.js";
	
	export default {
		data: () => ({
			image: Image
		}),
		computed: {
			...mapState([
				"configs"
			]),
			binding: function() {
				return {
					template: this.building()
				};
			}
		},
		created: function() {
			this.percentage = this.configs.skill.percentage;
			this.structs = this.configs.skill.structs;
			this.depth = this.configs.skill.depth;
		},
		methods: {
			building: function() {
				var template = this.iterator( this.structs, 1 );
				console.log( JSON.stringify( template, null, 4 ) );
				var element = Eremento.arrange( template.name, template.attributes );
				console.log( element );
				return element;
			},
			iterator: function( structs, depth ) {
				var results = [];
				if( this.depth <= depth ) {
					return [];
				}
				for( let i in structs ) {
					var detail = {
						name: "details",
						attributes: {
							class: "tree-details",
							innerHTML: [
								{
									name: "summary",
									attributes: {
										class: "tree-summary",
										innerHTML: structs[i].name
									}
								}
							]
						}
					};
					var struct = {
						name: "li",
						attributes: {
							class: "",
							innerHTML: detail
						}
					};
					if( Type( structs[i].description, Array ) ) {
						for( let u in structs[i].description ) {
							detail.attributes.innerHTML.push({
								name: "summary",
								attributes: {
									class: "tree-summary",
									innerText: structs[i].description[u]
								}
							});
						}
					}
					if( Type( structs[i].childrens, Array ) ) {
						var childrens = this.iterator( structs[i].childrens, depth+1 );
						if( Value.isNotEmpty( childrens ) ) {
							detail.attributes.innerHTML.push( childrens );
						}
					}
					results.push( struct );
				}
				return {
					name: "ul",
					attributes: {
						class: depth === 1 ? "tree" : "sub-tree",
						innerHTML: results
					}
				};
			}
		}
	};
	
</script>

<template>
	<div class="skill-tree" v-scroll-reveal="{ delay: 650 }">
		<div class="skill-tree-single" v-for="skill in configs.skill.structs">
			<div class="skill-tree-content">
				<div class="skill-tree-header flex flex-left">
					<hr class="skill-tree-line mg-0 mg-top-0" />
					<div class="avatar flex flex-center skill-avatar mg-right-2">
						<div class="avatar-wrapper flex flex-center skill-avatar-wrapper">
							<img class="avatar-image lazy lazy-load" :data-src="skill.image ? image.resolver( configs.image, skill.image ) : image.search( configs.image, skill.type, skill.name.toLowerCase() )" v-lazyload />
							<div class="avatar-cover"></div>
						</div>
					</div>
					<div class="skill-tree-title fb-45 subtitle">{{ skill.name }}</div>
					<div class="skill-progress flex flex-right">
						<span class="skill-progress-percentage fb-55 subtitle"> {{ skill.percentage }}% </span>
						<progress class="skill-progress-bar progress" :max="percentage" :value="skill.percentage"></progress>
					</div>
				</div>
				<div class="skill-tree-descriptions">
					<p class="skill-tree-description" v-for="description in skill.description">{{ description }}</p>
				</div>
				<div class="skill-tree" v-scroll-reveal="{ delay: 650 }">
					<div class="skill-tree-single" v-for="children in skill.childrens">
						<div class="skill-tree-content">
							<div class="skill-tree-header flex flex-left">
								<hr class="skill-tree-line mg-0 mg-top-0" />
								<div class="avatar flex flex-center skill-avatar mg-right-2">
									<div class="avatar-wrapper flex flex-center skill-avatar-wrapper">
										<img class="avatar-image lazy lazy-load" :data-src="children.image ? image.resolver( configs.image, children.image ) : image.search( configs.image, children.type, children.name.toLowerCase() )" v-lazyload />
										<div class="avatar-cover"></div>
									</div>
								</div>
								<div class="skill-tree-title fb-45 subtitle">{{ children.name }}</div>
								<div class="skill-progress flex flex-right">
									<span class="skill-progress-percentage fb-55 subtitle"> {{ children.percentage }}% </span>
									<progress class="skill-progress-bar progress" :max="percentage" :value="children.percentage"></progress>
								</div>
							</div>
							<div class="skill-tree-descriptions">
								<p class="skill-tree-description text" v-for="description in children.description">{{ description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	.skill-tree {
		border-left: 2px solid var(--border-3);
	}
		.skill-tree .skill-tree-single .skill-tree-content .skill-tree {
			width: 96.6%;
			/* width: 94.6%; */
			margin-left: 3.4%;
			/* margin-left: 5.4%; */
		}
		@media screen and ( max-width: 1080px ) {
			.skill-tree .skill-tree-single .skill-tree-content .skill-tree {
				width: 94.6%;
				margin-left: 5.4%;
			}
		}
		.skill-tree-single {
			width: auto;
			/* background: orange; */
		}
			.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single {
				/* background-color: red; */
			}
			.skill-tree-content {
				/* background-color: blue; */
			}
				.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content {
					/* background-color: red; */
				}
				.skill-tree-header {
					position: relative;
					/* background: purple; */
				}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header {
						/* background-color: red; */
					}
					.skill-tree-line {
						width: 2%;
						border-top: 2px solid var(--border-2);
					}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-tree-line {
						width: 1.6%;
					}
					@media screen and ( max-width: 1080px ) {
						.skill-tree-line,
						.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-tree-line {
							width: 3%;
						}
					}
					.skill-avatar {
						/* background: cadetblue; */
						/* border-left: 2px solid green; */
					}
					.skill-tree-title {
						width: 85%;
						/* background: silver; */
					}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-tree-title {
						width: 80%;
					}
					@media screen and ( max-width: 1080px ) {
						.skill-tree-title {
							width: 75%;
						}
						.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-tree-title {
							width: 74%;
						}
					}
					.skill-progress {
						gap: 8%;
						width: 15%;
						height: 40px;
						/* background: violet; */
					}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-progress {
						width: 15%;
					}
					@media screen and ( max-width: 1080px ) {
						.skill-progress {
							width: 16%;
						}
						.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-header .skill-progress {
							width: 17%;
						}
					}
						.skill-progress-percentage {
							margin-right: 4px;
						}
						.skill-progress-bar {
							width: 60%;
						}
				.skill-tree-descriptions {
					width: 96.6%;
					margin-left: 3.4%;
					padding-left: 1.6%;
					/* background: greenyellow; */
					border-left: 2px solid var(--border-3);
				}
				.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-descriptions {
					/* background-color: red; */
					width: 96.9%;
					margin-left: 3.1%;
					padding-left: 1.6%;
				}
				@media screen and ( max-width: 1080px ) {
					.skill-tree-descriptions {
						width: 94.6%;
						margin-left: 5.4%;
						padding-left: 3%;
					}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-descriptions {
						width: 94.6%;
						margin-left: 5.4%;
						padding-left: 3.3%;
					}
				}
					.skill-tree-description {
						/* background: turquoise; */
					}
					.skill-tree .skill-tree-single .skill-tree-content .skill-tree .skill-tree-single .skill-tree-content .skill-tree-descriptions .skill-tree-description {
					}
	
</style>