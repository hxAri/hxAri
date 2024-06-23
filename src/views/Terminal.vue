
<script>

	import { mapState } from "vuex";
	
	// Import Scripts
	import Fmt from "/src/scripts/Fmt.js";
	import Mapper from "/src/scripts/Mapper.js";
	import Type from "/src/scripts/Type";
	
	export default {
		data: () => ({
			label: {
				after: "",
				before: ""
			},
			model: "",
			shortcuts: [
				{
					name: "",
					code: 27,
					text: "ESC"
				},
				{
					name: "",
					text: "/"
				},
				{
					name: "",
					code: "",
					text: "-"
				},
				{
					name: "",
					code: 36,
					text: "HOME"
				},
				{
					name: "",
					code: 38,
					icon: [ "bx", "bx-up-arrow-alt" ]
				},
				{
					name: "",
					code: 35,
					text: "END"
				},
				{
					name: "",
					code: 33,
					text: "PGUP"
				},
				{
					name: "",
					code: 17,
					text: "CTRL"
				},
				{
					name: "",
					code: 18,
					text: "ALT"
				},
				{
					name: "",
					code: 16,
					text: "SHIFT", //icon: [ "bx", "bx-sort-alt-2", "bx-rotate-90" ]
				},
				{
					name: "",
					code: 37,
					icon: [ "bx", "bx-left-arrow-alt" ]
				},
				{
					name: "",
					code: 40,
					icon: [ "bx", "bx-down-arrow-alt" ]
				},
				{
					name: "",
					code: 39,
					icon: [ "bx", "bx-right-arrow-alt" ]
				},
				{
					name: "",
					code: 34,
					text: "PGDN"
				}
			]
		}),
		watch: {
			title: {
				immediate: true,
				handler: function() {
					document.title = "hxAri · Terminal";
				}
			},
			"$route.path": function( to, from ) {
				if( this.terminal ) {
					this.terminal.exports['PWD']['path'] = to
					this.terminal.exports['PWD-OLD'] = from
				}
			}
		},
		computed: {
			...mapState([
				"configs",
				"profile",
				"terminal"
			])
		},
		created: function() {
			this.terminal.binding = this;
			this.terminal.router = this.$router;
			var contacts = [];
				contacts.push( Fmt( "\x1b[0;37m * Email          : \x1b[4;37m{}", this.configs.author.contact.email ?? this.profile.email ?? "hxari@proton.me" ) );
			if( Type( this.configs.author.social.telegram, String ) ) {
				contacts.push( Fmt( "\x1b[0;37m * Telegram       : \x1b[4;37m{}", this.configs.author.social.telegram ) );
			}
			var socials = [];
			for( let social in this.configs.author.social ) {
				if( [ "telegram" ].indexOf( social.toLowerCase() ) <= -1 ) {
					socials.push( Fmt( "\x1b[0;37m * {}{}: \x1b[4;37m{}", social.charAt( 0 ).toUpperCase() + social.slice( 1 ), "\x20".repeat( 15 - social.length ), this.configs.author.social[social] ) );
				}
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
				Fmt( "\x1b[0;37mReport issues at : \x1b[4;37m{}", this.configs.terminal.issues ),
				"\x1b[0;37mType \x1b[1;38;5;32mhelp\x1b[0;40m \x1b[37mif you are confused",
				"\x20"
			];
			if( this.isMobile( false ) ) {
				this.terminal.banner = Fmt( this.terminal.banner.join( "\x0a" ), ...params );
			}
			else {
				this.terminal.banner = Fmt(
					[
						...this.terminal.banner,
						...params.slice( 0, params.length -2 ),
						...[
							"Please open this page in desktop/landscape mode"
						],
						...params.slice( params.length -2 )
					].join( "\x0a" )
				);
			}
			this.terminal.banner = this.terminal.banner.split( "\x0a" );
			if( this.terminal.history.length >= 1 ) {
				for( let i in this.terminal.history ) {
					if( Type( this.terminal.history[i].typing, String ) && this.terminal.history[i].replaced === false ) {
						
						this.terminal.history[i].stdout = this.terminal.banner;
						this.terminal.history[i].replaced = true;
					}
				}
			}
			try {
				if( this.terminal.pwd() === "/" ) {
					this.terminal.router.push( Fmt( "/terminal{}", this.terminal.exports.HOME ) );
				}
				else {
					this.terminal.ls( this.terminal.pwd() );
				}
			}
			catch( error ) {
				this.terminal.history.push({ stdout: [ Fmt( "{}: {}", this.terminal.shell, error ) ] });
			}
			this.endrange();
		},
		mounted: function() {
			this.endrange();
		},
		methods: {
			
			/**
			 * Set input text selection to end.
			 *
			 * @params InputEvent e
			 *
			 * @return Void
			 */
			endrange: function( e ) {
				
				if( Type( this.$refs.input, HTMLInputElement ) ) {
					var codes = [ 37, 38, 39, 40 ];
					var model = this.model;
					var input = this.$refs.input;
					var index = input.selectionStart;
					if( Type( e, KeyboardEvent ) ) {
						if( e.keyCode in codes ) {
							if( e.keyCode !== 38 ) {
								if( e.keyCode === 40 ) {
								}
								else {
									this.label.before = this.terminal.colorable( model.substring( 0, index ) );
									this.label.split = model.substring( index, index+1 );
									this.label.after = this.terminal.colorable( model.substring( index+1 ) );
								}
							}
							else {
								// Up
							}
						}
						else {
							this.label.before = this.terminal.colorable( model.substring( 0, index ) );
							this.label.split = model.substring( index, index+1 );
							this.label.after = this.terminal.colorable( model.substring( index+1 ) );
						}
					}
					this.trigger();
				}
				else {
					this.label.after = "";
					this.label.split = "";
					this.label.before = this.terminal.colorable( this.model );
				}
			},
			
			/**
			 * Execute input command.
			 *
			 * @params InputEvent e
			 *
			 * @return Promise
			 */
			executor: async function( e ) {
				this.trigger();
				if( e.key === "Enter" ) {
					await this.terminal.run( this.model )
						.then( x => console.log( x ) )
						.catch( e => console.error( e ) );
				}
				this.terminal.binding = this;
				this.terminal.router = this.$router;
			},
			
			isMobile: function( optional ) {
				const searchs = [
					/Android/i,
					/webOS/i,
					/iPhone/i,
					/iPad/i,
					/iPod/i,
					/BlackBerry/i,
					/Windows Phone/i
				];
				return Type( optional, Boolean ) ? this.isMobile() === optional : searchs.some( device => navigator.userAgent.match( device ) );
			},
			
			/**
			 * Handle keyboard event.
			 *
			 * @params Event e
			 * @params Object shortcut
			 *
			 * @return Void
			 */
			keyboard: function( e, shortcut ) {
				if( Type( shortcut, Object ) ) {}
				else {
				}
			},
			
			/**
			 * Render Terminal command input and output.
			 *
			 * @return String
			 */
			onrender: function() {
				var self = this;
					self.trigger();
				
				// Mapping Terminal Histories.
				return Mapper( self.terminal.history,
					
					/**
					 * Handle history.
					 *
					 * @params Number i
					 * @params Object history
					 *
					 * @return String
					 */
					function( i, history ) {
						var stack = [];
						
						// Check if history has prompt.
						if( Type( history.prompt, String ) ) {
							
							// Create opening tag.
							stack.push( "<label class=\"terminal-line-prompt dp-block\">" );
							
							// Create terminal prompt.
							stack.push( history.prompt );
							
							// Check if history has input commands.
							if( Type( history.inputs, String ) ) {
								stack.push( history.inputs.trim() );
							}
							stack.push( "</label>" );
						}
						
						if( Type( history.stderr, Array ) ) {
							stack.push( ...Mapper( history.stderr, ( i, error ) => Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${error}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) ) );
						}
						else if( Type( history.stderr, [ Number, String ] ) ) {
							stack.push( Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${history.stderr}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) );
						}
						
						
						// Check if history has multiple outputs.
						if( Type( history.stdout, Array ) ) {
							stack.push( ...Mapper( history.stdout, ( i, output ) => Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${output}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) ) );
						}
						
						// Check if history has single outputs.
						else if( Type( history.stdout, [ Number, String ] ) ) {
							stack.push( Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${history.stdout}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) );
						}
						
						return stack.join( "" );
					}
				).join( "" );
			},
			
			/**
			 * Trigger android soft keyboard.
			 *
			 * @params InputEvent e
			 *
			 * @return Void
			 */
			trigger: function( e ) {
				try {
					this.$refs.input.focus();
				}
				catch( e ) {
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
			<div class="terminal-output" @click="trigger">
				<div class="terminal-line" v-html="onrender()"></div>
				<div class="terminal-form" @click="trigger">
					<label class="terminal-prompt" v-if="terminal.loading">
					</label>
					<label class="terminal-prompt" v-html="terminal.prompt( terminal.exports.PS1 )" v-else></label>
					<label class="terminal-label" v-html="label.before"></label>
					<label class="terminal-label" v-html="label.split" :style="{ backgroundColor: 'white', width: '9px', color: 'black' }"></label>
					<label class="terminal-label" v-html="label.after"></label>
					<input class="terminal-input" :style="{ borderRight: this.label.split === '' && this.model !== '' || this.model === '' ? '9px solid white' : 'none', transition: 'none' }" autocapitalize="off" ref="input" type="text" v-model="model"
						@click="endrange"
						@keyup="endrange"
						@focus="endrange"
						@input="endrange"
						@change="endrange"
						@keypress="endrange"
						@keydown="executor" />
				</div>
			</div>
			<div class="terminal-shortcut dp-none">
				<div class="terminal-shortcut-key flex flex-center" v-for="shortcut in shortcuts" @click="keyboard( $event, shortcut )">
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
				}
			@media (max-width: 750px) {
				/*.terminal-form {*/
					/** margin-bottom: 14px; */
				/*}*/
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
			/*.terminal-shortcut {*/
				/** display: grid; */
			/*}*/
		}
	
</style>