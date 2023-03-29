
<script>
	
	// Import Scripts
	import Fmt from "../scripts/Fmt.js";
	import Mapper from "../scripts/Mapper.js";
	import Terminal from "../scripts/Terminal.js";
	import Type from "../scripts/Type";
	import Value from "../scripts/logics/Value.js";
	
	export default {
		data: () => ({
			history: [{
				output: [
					"                                           ",
					"             ::                            ",
					"            ~JJ^... :~^                    ",
					"      .^::~7JJJJJJ??JJJ^                   ",
					"      7JJJYYJ?77??JJJJJJ?!!??:             ",
					"      :JJJ?^.     .^!?JJJJJJ?.             ",
					"    :^?JJJ.    ~7^   .~?JJJJJ?: ..         ",
					"   .?JJJJJ^  .!JY7     .?JJJJ~::^::.       ",
					"    ..^?JJJ??JJJJ:      :JJJ7.:~!~::.      ",
					"       :JJJ?J?7JJ~       7JJ?^:::::.       ",
					"       .!7^..  :^.       ?JJ?!!~~^         ",
					"                        :JJJ7!!!!!         ",
					"                       .?JJ?!!!~~~.        ",
					"                      ^?JJ?!!^:::::.       ",
					"                    :7JJJ7!!~.:~!~::.      ",
					"                  .!JJJJ7!!!!^::^::.       ",
					"                .~JJJJJ7!!!!!!!^ .         ",
					"               ^?JJJJ?!!!!!!!!^            ",
					"             :7JJJJJ?!!!~^^:^^             ",
					"           .!JJJJJJ7!!!^::~~::.            ",
					"          ~?JJJJJJ7!!!!^.^!!^:.            ",
					"        ^?JJJJJJJ7!!!!!!^:::..             ",
					"      :7JJJJJJJ?!!!!!!!!^                  ",
					"      7JJJJJJJ?!!!!!!!~:                   ",
					"                                           "
				]
			}],
			model: "",
			prompt: "\\u@\\h: \\w \\d $",
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
			],
			terminal: new Terminal()
		}),
		mounted: function()
		{
		},
		methods: {
			
			/*
			 * Colorize string.
			 *
			 * @params String string
			 *
			 * @return String
			 */
			colorize: function( string )
			{
				return( this.terminal.colorize( string ) );
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
				e.target.focus();
				e.target.setSelectionRange( this.range.begin, this.range.end );
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
				// Check if key is enter.
				if( e.key === "Enter" )
				{
					this.history.push({
						prompt: this.prompt,
						inputs: this.model,
						output: []
					});
					this.model = "";
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
			 * Terminal ONInput
			 *
			 * @params InputEvent e
			 *
			 * @return String
			 */
			oninput: function( e )
			{
				return( Fmt( "{} {}", ...[
					this.terminal.prompt( this.prompt ),
					this.terminal.colorable( this.model )
				]));
			},
			
			/*
			 * Render Terminal command input and output.
			 *
			 * @return String
			 */
			onrender: function()
			{
				var self = this;
				return(
					
					// Mapping Terminal Histories.
					Mapper( this.history,
						
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
								stack.push( self.terminal.prompt( history.prompt ) );
								
								// Check if history has input commands.
								if( Type( history.inputs, String ) )
								{
									stack.push( self.terminal.colorable( Fmt( "\x20{}", history.inputs ) ) );
								}
								stack.push( "</label>" );
							}
							
							// Check if history has outputs.
							if( Type( history.output, Array ) )
							{
								stack.push( ...Mapper( history.output, ( i, output ) => Fmt( "<label class=\"terminal-line-output dp-block\">{}</label>", self.terminal.colorize( output ) ) ) );
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
				this.$refs.input.focus();
			}
		}
	};
	
</script>

<template>
	<div class="terminal">
		<div class="terminal-screen">
			<div class="terminal-output" @click="trigger">
				<div class="terminal-line" v-html="onrender()"></div>
			</div>
			<div class="terminal-form" @click="trigger">
				<label class="terminal-label" v-html="oninput()"></label>
				<input class="terminal-input" type="text" v-model="model" autocapitalize="off" ref="input" @click="endrange" @keyup="endrange" @focus="endrange" @input="endrange" @change="endrange" @keypress="endrange" @keydown="executor" />
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
		color: var(--shell-c-37m);
		background: var(--shell-c-30m);
	}
		.terminal .text,
		.terminal .title,
		.terminal .sub-title {
			color: var(--shell-c-37m);
		}
		.terminal-label,
		.terminal-input,
		.terminal-output,
		.terminal-screen {
			font-family: "Consolas", monospace;
			font-size: 14px;
			font-weight: 500;
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
			.terminal-output p {
				line-height: 1.2;
			}
			.terminal-form {
				margin-bottom: 14px;
			}
				.terminal-label {
					width: auto;
				}
				.terminal-input {
					width: 9px;
					border: 0;
					outline: 0;
					color: var(--shell-c-37m);
					background: var(--shell-c-37m);
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
			.terminal-shortcut {
				display: grid;
			}
		}
	
</style>
