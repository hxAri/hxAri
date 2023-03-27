
<script>
	
	// Import Scripts
	import Fmt from "../scripts/Fmt.js";
	import Cookie from "../scripts/Cookie.js";
	import MultiRequest from "../scripts/MultiRequest.js";
	import Request from "../scripts/Request.js";
	import Terminal from "../scripts/Terminal.js";
	import Theme from "../scripts/Theme.js";
	import Type from "../scripts/Type";
	
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
					code: "",
					text: "ESC"
				},
				{
					name: "",
					code: "",
					text: "/"
				},
				{
					name: "",
					code: "",
					text: "-"
				},
				{
					name: "",
					code: "",
					text: "HOME"
				},
				{
					name: "",
					code: "",
					icon: [ "bx", "bx-up-arrow-alt" ]
				},
				{
					name: "",
					code: "",
					text: "END"
				},
				{
					name: "",
					code: "",
					text: "PGUP"
				},
				{
					name: "",
					code: "",
					icon: [ "bx", "bx-sort-alt-2", "bx-rotate-90" ]
				},
				{
					name: "",
					code: "",
					text: "CTRL"
				},
				{
					name: "",
					code: "",
					text: "ALT"
				},
				{
					name: "",
					code: "",
					icon: [ "bx", "bx-left-arrow-alt" ]
				},
				{
					name: "",
					code: "",
					icon: [ "bx", "bx-down-arrow-alt" ]
				},
				{
					name: "",
					code: "",
					icon: [ "bx", "bx-right-arrow-alt" ]
				},
				{
					name: "",
					code: "",
					text: "PGDN"
				}
			],
			terminal: null
		}),
		props: {
			cookie: {
				type: Cookie,
				require: true
			},
			theme: {
				type: Theme,
				require: true
			}
		},
		mounted: function()
		{
			// ...
		},
		methods: {
			
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
			
			/*
			 * Terminal ONInput
			 *
			 * @params InputEvent e
			 *
			 * @return String
			 */
			oninputs: function( e )
			{
				return( Fmt( "$ {}", this.model ) );
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
			}
		}
	};
	
</script>

<template>
	<div class="terminal">
		<div class="terminal-screen">
			<div class="terminal-output">
				<div class="terminal-line">
					<span class="terminal-text">Hello</span>
				</div>
			</div>
			<div class="terminal-form">
				<label class="terminal-label" v-html="oninputs()"></label>
				<input class="terminal-input" type="text" v-model="model" autocapitalize="off" ref="input" />
			</div>
			<div class="terminal-shortcut dp-none">
				<div class="terminal-shortcut-key" v-for="shortcut in shortcuts">
					<p class="title" v-if="shortcut.text">{{ shortcut.text }}</p>
					<p class="title" v-else>
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
				display: flex;
				background: red;
				margin-bottom: 14px;
			}
				.terminal-label {
					width: 99.1%;
					display: block;
					background: teal;
				}
				.terminal-input {
					width: .9%;
					border: 0;
					outline: 0;
					background: yellow;
				}
				@media (max-width: 750px) {
					.terminal-label {
						width: 97.3%;
					}
					.terminal-input {
						width: 2.7%;
					}
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
