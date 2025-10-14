
<script>

	import { mapState } from "vuex";
	
	// Import Scripts
	import { ANSI, Terminal } from "../scripts/terminal";
	import Common from "/src/scripts/Common.js";
	import Fmt from "/src/scripts/Fmt.js";
	import Mapper from "/src/scripts/Mapper.js";
	import Type from "/src/scripts/Type";
	
	export default {
		data: () => ({
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
		},
		mounted: function() {
		},
		methods: {
			ps1: function() {
				return this.terminal.ps1();
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
			</div>
			<div v-html="ps1()"></div>
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
