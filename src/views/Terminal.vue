
<script>

	import { mapState } from "vuex";
	
	import { isMobile, isMobileUserAgent } from "../scripts/common";
	import { Configs } from "../scripts/configs";
	import { Fmt } from "../scripts/formatter";
	import { isEmpty, isNotEmpty } from "../scripts/logics";
	import { Banner, Terminal } from "../scripts/terminal";
	import { ANSI, History } from "../scripts/terminal/shell";
	import { Typed } from "../scripts/types";
	
	export default {
		data: () => ({
			
			/** @type {ANSI} */
			ansi: new ANSI(),
			
			/** @type {Configs} */
			configs: null,
			
			labels: {
				after: "",
				before: "",
				splited: ""
			},
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
		mounted: function() {
			this.onkeydown();
		},
		methods: {
			
			/**
			 * Execute given command
			 * 
			 * @param {KeyboardEvent} e 
			 * 
			 */
			execute: async function( e ) {
				this.ontrigger( e );
				switch( e.key ) {
					case "Enter":
						await this.terminal.exec( this.model );
						this.model = "";
						break;
					case "Tab":
						this.model+= "\x20";
						e.preventDefault();	
						break;
				}
			},
			
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
							if( e.keyCode in codes ) {
								if( e.keyCode !== 38 ) {
									if( e.keyCode === 40 ) {
									}
									else {
										this.labels.before = this.ansi.colorize( model.substring( 0, index ) );
										this.labels.splited = model.substring( index, index+1 );
										this.labels.after = this.ansi.colorize( model.substring( index+1 ) );
									}
								}
								else {
									// Up
								}
							}
							else {
								this.labels.before = this.ansi.colorize( model.substring( 0, index ) );
								this.labels.splited = model.substring( index, index+1 );
								this.labels.after = this.ansi.colorize( model.substring( index+1 ) );
							}
						}
						this.ontrigger();
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
			}
			
		},
		beforeRouteLeave: function( to, from ) {
			return true;
		}
	};
	
</script>

<template>
	<div class="terminal">
		<div class="terminal-screen">
			<div class="terminal-output">
				<div class="terminal-line" v-html="terminal.window.innerHTML"></div>
				<div class="terminal-form">
					<label class="terminal-prompt" data-label="$PS1" v-html="terminal.ps1()"></label>
					<label class="terminal-label" data-label="before" v-html="labels.before"></label>
				<label class="terminal-label blinking-1x" data-blink data-label="split" v-html="labels.splited" :style="{ backgroundColor: 'white', width: '9px', color: 'black' }"></label>
				<label class="terminal-label" data-label="after" v-html="labels.after"></label>
				<input class="terminal-input blinking-1x" data-blink data-label="input" :style="{ borderRight: labels.splited === '' && model !== '' || model === '' ? '9px solid white' : 'none', transition: 'none' }" autocapitalize="off" ref="input" type="text" v-model="model"
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
	</div>
</template>

<style scoped>
	
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
