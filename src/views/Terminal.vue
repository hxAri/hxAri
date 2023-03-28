
<script>
	
	// Import Scripts
	import Fmt from "../scripts/Fmt.js";
	import Terminal from "../scripts/Terminal.js";
	import Type from "../scripts/Type";
	import Value from "../scripts/logics/Value.js";
	
	export default {
		data: () => ({
			model: "",
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
			// ...
		},
		methods: {
			
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
			 * @return Void
			 */
			executor: function( e )
			{
				// ...
			},
			
			keyboard: function( e, shortcut )
			{
				if( Type( shortcut, Object ) )
				{
					
				}
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
			oninputs: function( e )
			{
				return( Fmt( "$ {}", this.terminal.colorize( this.model ) ) );
			},
			
			/*
			 * Render Terminal command input and output.
			 *
			 * @params String c
			 *
			 * @return String
			 */
			onrender: function( c = "" )
			{
				return( "*" );
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
			},
		}
	};
	
</script>

<template>
	<div class="terminal">
		<div class="terminal-screen">
			<div class="terminal-output" @click="trigger">
				<div class="terminal-line">
					<span class="terminal-text">Hello</span>
				</div>
			</div>
			<div class="terminal-form">
				<label class="terminal-label" @click="trigger" v-html="oninputs()"></label>
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
		background: var(--shell-c-30m);
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
			.terminal-output {
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
