
<script>

	import { mapState } from "vuex";
	
	// Import Scripts
	import Fmt from "/src/scripts/Fmt.js";
	import Mapper from "/src/scripts/Mapper.js";
	import Type from "/src/scripts/Type";
	
	export default {
		data: () => ({
			label: {
				after: null,
				prompt: null,
				before: null
			},
			model: "",
			mouse: {
				from: -1,
				to: -1
			},
			range: {
				begin: -1,
				end: -1
			},
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
				handler: function()
				{
					document.title = "hxAri · Terminal";
				}
			}
		},
		computed: mapState([
			"terminal"
		]),
		created: function()
		{
			this.terminal.binding = this;
			this.terminal.router = this.$router;
			try
			{
				// Check if current route path is main terminal view path.
				if( this.terminal.pwd() === "/" )
				{
					// Push route to home directory.
					this.terminal.router.push( Fmt( "/terminal{}", this.terminal.exports.HOME ) );
				}
				else {
					this.terminal.ls( this.terminal.pwd() );
				}
			}
			catch( error )
			{
				this.terminal.history.push({ output: [ Fmt( "{}: {}", this.terminal.shell, error ) ] });
			}
		},
		mounted: function()
		{
			this.endrange();
			this.mouse.from = this.$refs.input.selectionStart;
		},
		methods: {
			
			pointer: function( e )
			{
				console.log( e )
			},

			/*
			 * Set input text selection to end.
			 *
			 * @params InputEvent e
			 *
			 * @return Void
			 */
			endrange: function( e )
			{
				// Resolve terminal prompt display.
				this.label.prompt = this.terminal.loading === false ? this.terminal.prompt( this.terminal.exports.PS1 ) : null;

				// ...
				if( Type( this.$refs.input, HTMLInputElement ) )
				{
					var after = "";
					var before = "";
					var model = this.model;
					var input = this.$refs.input;
						// input.style.color = input.selectionStart !== model.length ? "var(--shell-c-0-30m)" : "transparent";
					
					if( this.mouse.from < 0 )
					{
						this.mouse.from = model.length;
						this.mouse.to = model.length -1;
					}
					else {
						this.mouse.from = this.mouse.to;
						this.mouse.to = input.selectionStart;
					}
					this.label.after = this.terminal.colorable( model.substring( this.mouse.to, model.length ) );
					this.label.before = this.terminal.colorable( model.substring( 0, this.mouse.to ) );
					this.trigger();
				}
				else {
					this.label.after = null;
					this.label.before = this.terminal.colorable( this.model );
				}
			},
			
			/*
			 * Execute input command.
			 *
			 * @params InputEvent e
			 *
			 * @return Promise
			 */
			executor: async function( e )
			{
				// Focusable.
				this.trigger();
				
				// Check if key is enter.
				if( e.key === "Enter" )
				{
					await this.terminal.run( this.model )
						.then( x => console.log( x ) )
						.catch( e => console.error( e ) );
				}
			},
			
			/*
			 * Handle keyboard event.
			 *
			 * @params Event e
			 * @params Object shortcut
			 *
			 * @return Void
			 */
			keyboard: function( e, shortcut )
			{
				if( Type( shortcut, Object ) )
				{}
				else {
				}
			},
			
			/*
			 * Render Terminal command input and output.
			 *
			 * @return String
			 */
			onrender: function()
			{
				var self = this;
					self.trigger();
				
				return(
					
					// Mapping Terminal Histories.
					Mapper( self.terminal.history,
						
						/*
						 * Handle history.
						 *
						 * @params Number i
						 * @params Object history
						 *
						 * @return String
						 */
						function( i, history )
						{
							var stack = [];
							
							// Check if history has prompt.
							if( Type( history.prompt, String ) )
							{
								// Create opening tag.
								stack.push( "<label class=\"terminal-line-prompt dp-block\">" );
								
								// Create terminal prompt.
								stack.push( history.prompt );
								
								// Check if history has input commands.
								if( Type( history.inputs, String ) )
								{
									stack.push( history.inputs.trim() );
								}
								stack.push( "</label>" );
							}
							
							// Check if history has multiple outputs.
							if( Type( history.output, Array ) )
							{
								stack.push( ...Mapper( history.output, ( i, output ) => Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${output}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) ) );
							}
							
							// Check if history has single outputs.
							else if( Type( history.output, [ Number, String ] ) )
							{
								stack.push( Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.format( `${history.output}`.replaceAll( /\<|\>/g, m => m === "<" ? "&lt" : "&gt" ) ) ) );
							}
							return( stack.join( "" ) );
						}
					).join( "" )
				);
			},
			
			/*
			 * Trigger android soft keyboard.
			 *
			 * @params InputEvent e
			 *
			 * @return Void
			 */
			trigger: function( e )
			{
				try
				{
					this.$refs.input.focus();
				}
				catch( e ) {
				}
			}
		}
	};
	
</script>

<template>
	<div class="terminal">
		<div class="terminal-screen">
			<div class="terminal-output" @click="trigger">
				<div class="terminal-line" v-html="onrender()"></div>
			
			<div class="terminal-form" @click="trigger">
				<label class="terminal-prompt" v-html="label.prompt"></label>
				<label class="terminal-label" v-html="label.before"></label>
				<input class="terminal-input" type="text" v-model="model" autocapitalize="off" ref="input" @click="endrange" @keyup="endrange" @focus="endrange" @input="endrange" @change="endrange" @keypress="endrange" @keydown="executor" />
				<label class="terminal-label" v-html="label.after"></label>
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
					width: 9px;
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
