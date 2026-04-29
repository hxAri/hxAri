
<script>
	
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { mapState } from "vuex";
	
	import { isMobile, isMobileUserAgent } from "/src/scripts/common";
	import { Configs } from "/src/scripts/configs";
	import { Fmt } from "/src/scripts/formatter";
	import { isEmpty, isNotEmpty } from "/src/scripts/logics";
	import { Banner, Terminal } from "/src/scripts/terminal";
	import { ANSI } from "/src/scripts/terminal/shell";
	import { Typed } from "/src/scripts/types";
	
	export default {
		data: () => ({
			
			actives: new Map(),
			
			/** @type {ANSI} */
			ansi: new ANSI(),
			
			/** @type {Configs} */
			configs: null,
			
			labels: {
				after: "",
				before: "",
				splited: ""
			},
			loading: false,
			model: "",
			shortcuts: [
				{
					name: "Escape",
					code: 27,
					text: "ESC"
				},
				{
					name: "Slash",
					text: "/"
				},
				{
					name: "Dash",
					code: "",
					text: "-"
				},
				{
					name: "Home",
					code: 36,
					text: "HOME"
				},
				{
					name: "ArrowUp",
					code: 38,
					icon: [ "bx", "bx-up-arrow-alt" ]
				},
				{
					name: "End",
					code: 35,
					text: "END"
				},
				{
					name: "PageUp",
					code: 33,
					text: "PGUP"
				},
				{
					name: "Control",
					code: 17,
					text: "CTRL"
				},
				{
					name: "Alternative",
					code: 18,
					text: "ALT"
				},
				{
					name: "Shift",
					code: 16,
					text: "SHIFT", //icon: [ "bx", "bx-sort-alt-2", "bx-rotate-90" ]
				},
				{
					name: "ArrowLeft",
					code: 37,
					icon: [ "bx", "bx-left-arrow-alt" ]
				},
				{
					name: "ArrowDown",
					code: 40,
					icon: [ "bx", "bx-down-arrow-alt" ]
				},
				{
					name: "ArrowRight",
					code: 39,
					icon: [ "bx", "bx-right-arrow-alt" ]
				},
				{
					name: "PageEnd",
					code: 34,
					text: "PGDN"
				}
			],
			
			/** @type {Terminal} */
			terminal: null
			
		}),
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · Terminal";
				}
			},
			"$route.path": {
				deep: true,
				immediate: true,
				handler: function( to, from ) {
					this.$store.state.terminal.shell.exports.set( "PWD", to );
					if( isNotEmpty( from ) ) {
						this.$store.state.terminal.shell.exports.set( "OLDPWD", from );
					}
				}
			}
		},
		components: {
			Swiper,
			SwiperSlide
		},
		computed: {
			...mapState([
				"profile"
			])
		},
		created: function() {
			this.configs = this.$store.state.configs;
			this.terminal = this.$store.state.terminal;
			var contacts = [];
			if( this.configs?.author?.contact?.email ?? null ) {
				contacts.push( Fmt( "\x1b[0;37m * Email          : \x1b[4;37m{}", this.configs.author.contact.email ) );
			}
			var socials = [];
			for( let socmed of Object.keys( this.configs?.author?.socmed ?? {} ) ) {
				if( isEmpty( this.configs.author.socmed[socmed] ) || [ "github", "gitlab" ].indexOf( socmed ) <= -1 ) {
					continue;
				}
				socials.push( Fmt( "\x1b[0;37m * {}{}: \x1b[4;37m{}", socmed.charAt( 0 ).toUpperCase() + socmed.slice( 1 ), "\x20".repeat( 15 - socmed.length ), this.configs.author.socmed[socmed] ) );
			}
			var params = [
				"\x20",
				"\x1b[0;37mWelcome to Virtual Terminal!",
				"\x20",
				"\x1b[0;37mSocials           :",
				"\x20",
				...socials,
				"\x20",
				"\x1b[0;37mContact           :",
				"\x20",
				...contacts,
				"\x20",
				Fmt( "\x1b[0;37mReport issues at  : \x1b[4;37m{}", this.configs.terminal.issues ),
				"\x20",
				"\x1b[0;37mEverything you do here is saved in your browser's",
				"\x1b[0;37mlocal storage, you can delete it at any time 😐",
				"\x20"
			];
			this.terminal.shell.stdout.clear();
			if( isMobileUserAgent() ) {
				this.terminal.shell.stdout.write( Fmt( [ ...Banner, ...params ].join( "\x0a" ) ) );
			}
			else {
				this.terminal.shell.stdout.write( Fmt( Banner.join( "\x0a" ), ...params ) );
			}
		},
		methods: {
			
			/**
			 * Execute given command
			 * 
			 * @param {KeyboardEvent} e 
			 * 
			 */
			execute: async function( e ) {
				var command = this.model;
				switch( e.key ) {
					case "Enter":
						this.model = "";
						await this.terminal.exec( command );
						console.log( "Executed" );
						break;
					case "Tab":
						this.model = this.terminal.shell.complete( command );
						e.preventDefault();	
						break;
					case "ArrowUp":
						var prev = this.terminal.shell.historyPrev();
						if( prev !== null ) this.model = prev;
						e.preventDefault();
						break;
					case "ArrowDown":
						var next = this.terminal.shell.historyNext();
						if( next !== null ) this.model = next;
						e.preventDefault();
						break;
				}
				this.ontrigger( e );
			},
			
			/** @inheritdoc */
			fmt: Fmt,
			
			/**
			 * Set input text selection to end.
			 *
			 * @param {Event|FocusEvent|InputEvent|KeyboardEvent|PointerEvent} e
			 *
			 * @return {void}
			 * 
			 */
			onkeydown: function( e ) {
				if( Typed( this.$refs.input, HTMLInputElement ) ) {
					if( this.isMobile() ) {
						this.labels.after = this.ansi.colorize( this.model );
						this.labels.splited = "";
						this.labels.before = "";
						this.$refs.input.selectionEnd = this.model.length;
						this.$refs.input.selectionStart = this.model.length;
					}
					else {
						var codes = [ 37, 38, 39, 40 ];
						var model = this.model;
						var input = this.$refs.input;
						var index = input.selectionStart;
						if( Typed( e, KeyboardEvent ) ) {
							if( codes.includes( e.keyCode ) ) {
								this.labels.before = this.ansi.colorize( model.substring( 0, index ) );
								this.labels.splited = model.substring( index, index+1 );
								this.labels.after = this.ansi.colorize( model.substring( index+1 ) );
							}
							else {
								this.labels.before = this.ansi.colorize( model.substring( 0, index ) );
								this.labels.splited = model.substring( index, index+1 );
								this.labels.after = this.ansi.colorize( model.substring( index+1 ) );
							}
						}
						this.ontrigger( e );
					}
				}
				else {
					this.labels.after = "";
					this.labels.splited = "";
					this.labels.before = this.ansi.colorize( this.model );
				}
			},
			
			/**
			 * Trigger android soft keyboard.
			 *
			 * @param {InputEvent} e
			 *
			 * @return {void}
			 * 
			 */
			ontrigger: function( e ) {
				try {
					this.$refs.input.focus();
				}
				catch( e ) {
					console.error( e );
				}
			},
			
			/** @inheritdoc */
			isMobile: isMobile,
			
			/** @inheritdoc */
			isMobileUserAgent: isMobileUserAgent,
			
			/**
			 * Handle keyboard.
			 *
			 * @param {String} name
			 * @param {String} text
			 * @param {Number} code
			 *
			 * @returns {void}
			 * 
			 */
			keyhandler: function( name, text, code ) {
				if( text ) {
					this.model+= text;
				}
				this.execute({ key: name, preventDefault: () => {} });
			},
			
			/**
			 * Handle keyboard shortcut event.
			 *
			 * @param {Object} shortcut
			 *
			 * @returns {void}
			 * 
			 */
			keyshort: function( shortcut ) {
				if( Typed( shortcut, Object ) ) {
					this.keyhandler( shortcut.name, shortcut.text, shortcut.code );
				}
			},
			
			/**
			 * Show hide process detail info
			 * 
			 * @param {Number} pid
			 * 
			 * @returns {void}
			 * 
			 */
			 showProcessDetail: function( pid ) {
				var keyset = Fmt( "terminal-process-item-{}", pid );
				var element = document.getElementById( keyset );
				if( Typed( element, HTMLDivElement ) ) {
					element.classList.toggle( "active" );
				}
				if( this.actives.has( keyset ) ) {
					this.actives.delete( keyset );
				}
				else {
					this.actives.set( keyset, true );
				}
			},
			
		},
		mounted: function() {
			if( isNotEmpty( this.$route.query?.command ) ) {
				this.model = this.$route.query.command;
			}
			this.ontrigger();
		},
		beforeRouteLeave: function( to, from ) {
			return true;
		}
	};
	
</script>

<template>
	<div class="terminal">
		<Swiper class="terminal-swiper" slidesPerView="auto" :initialSlide="1" :resistanceRatio="0" :slideToClickedSlide="true">
			<SwiperSlide class="terminal-swiper-slide terminal-swiper-menu">
				<div class="terminal-menu-header">
					<div class="terminal-menu-header-wrapper flex flex-left pd-14">
						<span class="fb-55">TABLE PROCESSES</span>
						<pre class="fb-45 mg-left-8">`{{ terminal.kernel.table.size }}`</pre>
					</div>
				</div>
				<div class="terminal-menu-processes scroll-x scroll-hidden">
					<div class="terminal-process-header" v-if="( terminal.kernel.table.size >= 1 )">
						<div class="terminal-process-column flex flex-left pd-14">
							<div class="terminal-process-title flex">
								<div class="terminal-process-title-uid fb-45">UID</div>
								<div class="terminal-process-title-gid fb-45">GID</div>
								<div class="terminal-process-title-pid fb-45">PID</div>
								<div class="terminal-process-title-stat fb-45">STAT</div>
								<div class="terminal-process-title-start fb-45">START</div>
							</div>
						</div>
					</div>
					<div class="terminal-process-item" :id="fmt( 'terminal-process-item-{}', pid )" :ref="fmt( 'terminal-process-item-{}', pid )" v-for="process, pid in Object.fromEntries( terminal.kernel.table )">
						<div class="terminal-process-column flex flex-left pd-14">
							<div class="terminal-process-title flex">
								<div class="terminal-process-title-uid" title="UID">{{ process.user.username }}</div>
								<div class="terminal-process-title-gid" title="GID">{{ process.user.gid }}</div>
								<div class="terminal-process-title-pid" title="PID">{{ process.pid }}</div>
								<div class="terminal-process-title-stat" title="STAT">{{ process.state.charAt( 0 ).toUpperCase() }}</div>
								<div class="terminal-process-title-start" title="START">{{ process.start.format( "%Y-%m-%d %H:%M" ) }}</div>
							</div>
							<div class="terminal-process-options flex flex-center">
								<i class="bx bx-chevrons-up fs-20" title="Process Details Hide" @click="showProcessDetail( pid )" v-if="actives.has( fmt( 'terminal-process-item-{}', pid ) )"></i>
								<i class="bx bx-chevrons-down fs-20" title="Process Details" @click="showProcessDetail( pid )" v-else></i>
							</div>
						</div>
						<div class="terminal-process-detail" :id="fmt( 'terminal-process-detail-{}', pid )">
							<div class="terminal-process-detail-container flex flex-center">
								<div class="terminal-process-detail-wrapper">
									<div class="terminal-process-detail-info pd-14">
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">UID</div>
											<div class="terminal-process-detail-info text">{{ process.user.uid }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">PID</div>
											<div class="terminal-process-detail-info text">{{ process.pid }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">SPID</div>
											<div class="terminal-process-detail-info text">{{ process.pid }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">PPID</div>
											<div class="terminal-process-detail-info text">{{ process.pid }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">C</div>
											<div class="terminal-process-detail-info text">?</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">STIME</div>
											<div class="terminal-process-detail-info text">{{ process.start.format( "%H:%M" ) }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">TTY</div>
											<div class="terminal-process-detail-info text">?</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">STAT</div>
											<div class="terminal-process-detail-info text">{{ process.state.charAt( 0 ).toUpperCase() }}</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">TIME</div>
											<div class="terminal-process-detail-info text">0:00</div>
										</div>
										<div class="terminal-process-detail-single flex flex-left">
											<div class="terminal-process-detail-info fb-45 subtitle">CMD</div>
											<div class="terminal-process-detail-info text"></div>
										</div>
									</div>
									<hr class="terminal-process-detail-hr-end" />
									<div class="terminal-process-detail-closeable flex flex-center pd-14" @click="showProcessDetail( pid )">
										<i class="bx bx-chevrons-up fs-20"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</SwiperSlide>
			<SwiperSlide class="terminal-swiper-slide terminal-swiper-main">
				<div class="terminal-screen scroll-y">
					<div class="terminal-output" @click="ontrigger">
						<div class="terminal-line" v-html="terminal.window.innerHTML"></div>
						<div class="terminal-form">
							<label class="terminal-prompt" data-label="$PS1" v-html="terminal.ps1()"></label>
							<label class="terminal-label" data-label="before" v-html="labels.before"></label>
							<label class="terminal-label blinking-1x" data-blink data-label="split" v-html="labels.splited" :style="{ backgroundColor: 'white', width: '9px', color: 'black' }"></label>
							<label class="terminal-label" data-label="after" v-html="labels.after"></label>
							<input class="terminal-input blinking-1x" data-label="input" :style="{ borderRight: labels.splited === '' && model !== '' || model === '' ? '9px solid white' : 'none', transition: 'none' }" autocapitalize="off" ref="input" type="text" v-model="model"
								@click="onkeydown"
								@keyup="onkeydown"
								@focus="onkeydown"
								@input="onkeydown"
								@change="onkeydown"
								@keypress="onkeydown"
								@keydown="execute" />
						</div>
					</div>
					<div class="terminal-shortcut mg-top-10" v-if="isMobile()">
						<div class="terminal-shortcut-key flex flex-center" v-for="shortcut in shortcuts" @click="keyshort( shortcut )">
							<p class="title flex flex-center" v-if="shortcut.text">{{ shortcut.text }}</p>
							<p class="title flex flex-center" v-else>
								<i :class="[ 'title', ...shortcut.icon ]"></i>
							</p>
						</div>
					</div>
				</div>
			</SwiperSlide>
		</Swiper>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Terminal SwiperJs Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	 .swiper {
		width: 100%;
		height: 100%;
	}
		.terminal-swiper-slide {
			height: 800px;
		}
		@media( max-width: 750px ) {
			.terminal-swiper-slide {
				height: 660px;
			}
		}
		.terminal-swiper-menu {
			min-width: 100px;
			width: 70%;
			max-width: 460px;
			background: var(--background-3);
			border-right: 1px solid var(--border-3);
		}
			.terminal-main-header,
			.terminal-menu-header {
				width: 100%;
				background: var(--background-2);
				border-bottom: 1px solid var(--border-2);
			}
				.terminal-menu-header-wrapper {
					height: 71px;
				}
			.terminal-menu-processes {
				height: 91%;
				overflow-y: scroll;
			}
				.terminal-process-header,
				.terminal-process-item {
					height: 7%;
					border-bottom: 1px solid var(--border-2);
					background: var(--background-3);
					overflow: hidden;
					position: relative;
					transition: background .4s ease, height .3s ease-in-out;
				}
				.terminal-process-item:hover {
					background: var(--background-4);
				}
				.terminal-process-item.active {
					background: var(--background-4);
					height: 86.1%;
				}
					.terminal-process-column {
						overflow: hidden;
					}
						.terminal-process-title {
							width: 100%;
						}
							.terminal-process-title-uid,
							.terminal-process-title-gid,
							.terminal-process-title-pid,
							.terminal-process-title-stat,
							.terminal-process-title-start {
								overflow: hidden;
								width: 16%;
							}
							.terminal-process-title-start {
								width: 32%;
							}
						.terminal-process-options {
							border: 0;
							gap: 7px;
							position: absolute;
							right: 14px;
						}
					.terminal-process-detail {
						border-top: 1px solid var(--border-4);
						background: var(--background-4);
						transition: all .6s ease;
					}
					.terminal-process-item.active .terminal-process-detail {
						border-top: 0px;
					}
						.terminal-process-detail-container {
						}
							.terminal-process-detail-wrapper {
								overflow: hidden;
								width: 100%;
							}
								.terminal-process-detail-info {
								}
									.terminal-process-detail-single {
										height: 50px;
									}
										.terminal-process-detail-info.subtitle,
										.terminal-process-detail-info.text {
											width: 50%;
										}
									.terminal-process-detail-hr-end,
									.terminal-process-detail-single {
										width: 100%;
										border-top: 1px solid var(--border-4);
									}
									.terminal-process-detail-closeable {
										background: var(--background-4);
									}
		.terminal-swiper-main {
		}
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Terminal Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.terminal {
		width: auto;
		padding: 14px;
		color: var(--shell-c-0-37m);
		background: var(--shell-c-0-30m);
	}
		.terminal .text,
		.terminal .title,
		.terminal .sub-title {
			color: var(--shell-c-1-37m);
		}
		.terminal-label,
		.terminal-input,
		.terminal-output,
		.terminal-screen {
			font-family: var(--font-fira);
			font-size: 14px;
			font-weight: 400;
			overflow: auto;
			overflow-x: auto;
		}
		.terminal-screen {
			width: 100%;
			height: auto;
			white-space: -moz-pre-wrap !important;
			white-space: pre-wrap;
			word-wrap: break-word;
		}
		@media (max-width: 750px) {
			 .terminal-label,
			 .terminal-input,
			 .terminal-output,
			 .terminal-screen {
				font-size: 10px;
			}
		}
			.terminal-output {
				height: auto;
				min-height: 420px;
				max-height: auto;
			}
			@media (max-width: 750px) {
				.terminal-output {
					min-height: 360px;
				}
			}
				.terminal-output p {
					line-height: 1.2;
					text-wrap: nowrap;
				}
			@media (max-width: 750px) {
			}
				.terminal-label {
					width: auto;
				}
				.terminal-input {
					width: 0px;
					border: 0;
					outline: 0;
					white-space: -moz-pre-wrap !important;
					white-space: pre-wrap;
					color: var(--shell-c-1-37m);
					caret-color: var(--shell-c-1-37m);
					background: var(--shell-c-1-37m);
				}
		.terminal-shortcut {
			display: grid;
			gap: 14px;
			grid-template-columns: repeat( 7, 1fr );
		}
			.terminal-shortcut-key {
				text-align: center;
			}
			.terminal-shortcut-key:focus,
			.terminal-shortcut-key:hover {
				background: var(--background-3);
			}
		@media (max-width: 750px) {
		}
	
</style>
