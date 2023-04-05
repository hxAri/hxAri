
<script>
	
	// Import Scripts
	import Choice from "../scripts/Choice.js";
	import Fmt from "../scripts/Fmt.js";
	import Image from "../scripts/Image.js";
	import Mapper from "../scripts/Mapper.js";
	import Request from "../scripts/Request.js";
	import Type from "../scripts/Type.js";
	import Value from "../scripts/logics/Value.js";
	
	export default {
		data: () => ({
			banner: {
				backgroundImage: Fmt( "url({})", Choice( Image.anime ) )
			},
			detail: [
				{
					icon: [ "bx", "bxs-map" ],
					text: "Indonesia, Lampung Province, Pringsewu Regency, Sukoharjo District, 35674"
				},
				{
					icon: [ "bx", "bxl-whatsapp" ],
					text: "+62 858-3913-6990",
					link: "https://wa.me/6285839136990"
				},
				{
					icon: [ "bx", "bx-mail-send" ],
					text: "ari160824@gmail.com",
					link: "mailto:ari160824@gmail.com"
				},
				{
					icon: [ "bx", "bx-world" ],
					text: "https://hxari.github.io/",
					link: "https://hxari.github.io/"
				}
			],
			models: [
				{
					icon: [ "bx", "bx-user" ],
					type: "text",
					name: "name",
					label: "Name",
					error: false,
					value: null
				},
				{
					icon: [ "bx", "bx-tag" ],
					type: "text",
					name: "subject",
					label: "Subject",
					error: false,
					value: null
				},
				{
					icon: [ "bx", "bx-at" ],
					type: "email",
					name: "email",
					label: "Email Address",
					regex: /^((([^<>('")[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/,
					error: false,
					value: null
				},
				{
					icon: [ "bx", "bx-mail-send" ],
					type: "textarea",
					name: "message",
					label: "Email Message",
					error: false,
					value: null
				}
			],
			request: {
				method: "POST",
				url: "https://formspree.io/f/xoqrezbv",
				options: {
					data: {},
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/x-www-form-urlencoded"
					}
				}
			},
			sending: false,
			trigger: {
				text: null,
				type: null
			}
		}),
		watch: {
			title: {
				immediate: true,
				handler: function()
				{
					document.title = "hxAri · Contact";
				}
			}
		},
		methods: {
			allow: function( allow )
			{
				for( let i in this.models )
				{
					this.$refs[this.models[i].name].disabled = allow;
				}
			},
			reset: function()
			{
				for( let i in this.models )
				{
					this.models[i].value = null;
				}
			},
			submit: async function( e )
			{
				// Copy object instance.
				var self = this;
				
				// Disable form event.
				e.preventDefault();
				
				try
				{
					// Disable form inputs.
					self.allow( false );
					
					// Notice client while email is sending.
					self.sending = true;
					
					// Mapping models.
					Mapper( self.models, function( i, model )
					{
						// Reset model error.
						model.error = false;
						
						// Check if value is not empty.
						if( Value.isNotEmpty( model.value ) )
						{
							// Check if model has regex.
							if( Type( model.regex, RegExp ) && model.regex.test( model.value ) === false )
							{
								model.error = true;
								throw new Error( Fmt( "Invalid value for {}", model.label ) );
							}
						}
						else {
							model.error = true;
							throw new Error( Fmt( "Value of {} can't be empty", model.label ) );
						}
						self.request.options.data[model.name] = model.value;
					});
					
					// Send email message.
					await Request( ...Object.values( self.request ) )
					
					// Handle email response.
					.then( r =>
					{
						// Check if request is succesfull sent.
						if( r.status === 200 )
						{
							self.reset();
							self.trigger = {
								text: "Email has been sent successfully",
								type: "success"
							};
						}
						else {
							self.trigger = {
								text: Request.StatusText( r.status ),
								type: "warning"
							};
						}
					})
					
					// When something wrong.
					.catch( e =>
					{
						self.trigger = {
							text: Type( e, XMLHttpRequest, () => "No Internet Connection", () => e ),
							type: "error"
						};
					});
				}
				catch( e )
				{
					self.trigger = {
						text: e,
						type: "error"
					};
				}
				self.allow( true );
				self.sending = false;
			}
		}
	};
	
</script>

<template>
	<div class="template">
		<div class="alert" v-if="( trigger.text && trigger.type )">
			<div class="alert-group">
				<div :class="[ 'alert-single', 'flex', 'flex-left', trigger.type ]">
					<div class="alert-slot">
						{{ trigger.text }}
					</div>
					<button class="alert-close flex flex-center" @click="[ trigger.text = null, trigger.type = null ]">
						<i class="bx bx-x"></i>
					</button>
				</div>
			</div>
		</div>
		<div class="contact flex flex-center">
			<div class="contact-wrapper flex rd-square">
				<div class="contact-info" :style="banner">
					<div class="contact-cover flex flex-center">
						<div class="contact-cover-block">
							<div class="mg-bottom-26">
								<h4 class="title">Contact Information</h4>
								<p class="text">Overall details of my contact information</p>
							</div>
							<div class="contact-detail">
								<div class="contact-detail-single flex flex-left mg-bottom-18 mg-lc-bottom" v-for="info in detail">
									<div class="contact-detail-icon flex flex-center mg-right-18">
										<i :class="[ 'fs-18', ...info.icon ]"></i>
									</div>
									<div class="contact-detail-info">
										<a class="contact-detail-text-link sub-title" v-if="info.link" :href="info.link" target="_blank" rel="noopener noreferrer">{{ info.text }}</a>
										<p class="contact-detail-text-text sub-title" v-else>
											{{ info.text }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="contact-message flex flex-center">
					<div class="contact-message-block">
						<div class="mg-bottom-14">
							<h4 class="title">Contact Me</h4>
							<p class="text">Send me any suggestions or questions.</p>
						</div>
						<form class="contact-form" @submit="submit">
							<div class="form-group flex flex-left" v-for="model in models">
								<label class="form-label" :for="model.name">{{ model.label }}</label>
								<input class="form-input" :type="model.type" :ref="model.name" v-model="model.value" v-if="( model.type !== 'textarea' )" required />
								<textarea class="form-input form-texta" :ref="model.name" v-model="model.value" v-else></textarea>
							</div>
							<div class="form-group">
								<button class="button form-input form-submit">
									Send Mail
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Contact Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.contact {
		width: 100vw;
		height: 730px;
	}
		.contact-wrapper {
			width: 85%;
			height: 80%;
			overflow: hidden;
			background: var(--background-1);
			box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		}
			.contact-info,
			.contact-message {
				width: 50%;
				height: 100%;
			}
			.contact-info {
				background-color: var(--background-2);
				background-position: bottom;
				background-size: cover;
				border-radius: 3px 0px 0px 3px;
				position: relative;
			}
				.contact-cover {
					width: 100%;
					height: 100%;
					background: rgba(0,0,0,.8);
				}
					.contact-cover .title {
						color: #ffffff;
					}
					.contact-cover .sub-title {
						color: #e5e5e5;
					}
					.contact-cover .text {
						color: #cccccc;
					}
					.contact-cover .bx {
						color: #a6b4c0;
					}
					.contact-cover-block,
					.contact-message-block {
						width: 85%;
						height: 75%;
					}
						.contact-detail-icon {
							width: 40px;
							height: 40px;
						}
						.contact-detail-info {
							width: 83.6%;
							height: auto;
						}
		.contact-message {
			background: var(--background-1);
		}
			.contact-form .form-texta {
				height: auto;
			}
	@media (max-width: 750px) {
		.contact {
			height: auto;
			display: block;
		}
			.contact-wrapper {
				width: 100%;
				height: auto;
				display: block;
				box-shadow: none;
				border-radius: 0;
			}
				.contact-info,
				.contact-message {
					width: 100%;
					height: auto;
				}
				.contact-info {
					height: 630px;
				}
					.contact-cover-block {
						height: fit-content;
					}
				.contact-message {
					padding-top: 24px;
					padding-bottom: 24px;
				}
					.contact-message-block {
						height: 90%;
					}
						.contact-form .form-texta {
							height: 150px;
						}
	}
	
</style>